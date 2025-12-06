import React, { useState } from 'react';
import Modal from '../../components/shared/Modal';
import { useOffersStore } from '../../store/features/offers/useOffersStore';
import { Button } from '../../components/shared';
import { showToast } from '../../components/shared/ShowToast';

const ALL_STATUSES = [
  'pending',
  'confirmed',
  'completed',
  'purchased',
  'not-purchased',
  'cancelled',
  'no-show',
  'rescheduled'
];

export const UpdateOfferModal = ({ open, onClose, row }) => {
  const updateStatusFn = useOffersStore(state => state?.updateStatus);
  const offersBookedListingFn = useOffersStore(state => state?.offersBookedListing);

  const updateState = useOffersStore(({ state }) => state?.update);
  console.log('updateState', updateState);

  // STATES
  const current = row?.status?.toLowerCase();
  const [newStatus, setNewStatus] = useState('');
  const [isStripeModal, setIsStripeModal] = useState(false);

  if (!row) return null;

  // Remove current status from dropdown
  let allowedStatuses = ALL_STATUSES.filter(s => s !== current);

  // Custom rule: if already confirmed → hide pending & confirmed
  if (current === 'confirmed') {
    allowedStatuses = allowedStatuses.filter(s => !['pending', 'confirmed'].includes(s));
  }

  // ONCLICKC UPDATE
  const onClickUpdateStatus = async params => {
    if (!newStatus) return;
    const data = await updateStatusFn(row?._id, newStatus);
    const response = data?.data?.data;
    if (data?.success) {
      if (!response?.stripe && response?.paymentRquired) {
        showToast(response?.message, 'error');
      } else if (response?.stripe && response?.paymentRquired) {
        console.log('OPen stripe modal');
        setIsStripeModal(true);
      } else {
        offersBookedListingFn();
        onClose();
      }
    }
  };

  // CLICK TO PAY
  const onClickToPay = async () => {};

  return (
    <React.Fragment>
      <Modal isOpen={open} onClose={onClose} title='Update Appointment Status'>
        <div className='space-y-4'>
          {/* CURRENT STATUS */}
          <div>
            <label className='block text-gray-400 mb-1'>Current Status</label>
            <div className='px-3 py-2 rounded-lg bg-[#23252B] text-gray-200 capitalize'>
              {current}
            </div>
          </div>

          {/* UPDATE TO */}
          <div>
            <label className='block text-gray-400 mb-1'>Update To</label>

            <select
              className='w-full px-3 py-2 rounded-lg bg-[#23252B] text-white border border-[#2B2D34]'
              value={newStatus}
              onChange={e => setNewStatus(e.target.value)}
            >
              <option value=''>Select Status</option>

              {allowedStatuses.map(status => (
                <option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* BUTTONS */}
          <div className='flex justify-end gap-3 pt-2'>
            <button className='px-4 py-2 rounded-lg bg-gray-700 text-white' onClick={onClose}>
              Close
            </button>
            <Button
              className='!w-max px-4'
              variant='secondary'
              loading={updateState?.loading}
              disabled={updateState?.loading}
              onClick={onClickUpdateStatus}
            >
              Update
            </Button>
          </div>
        </div>
      </Modal>

      <StripePaymentModal
        open={isStripeModal}
        onClose={() => setIsStripeModal(false)}
        row={row}
        onClickToPay={onClickToPay}
      />
    </React.Fragment>
  );
};

const StripePaymentModal = ({ open, onClose, row, onClickToPay }) => {
  if (!open) return null;

  const purchaseDate = new Date().toLocaleDateString();
  const purchaseTime = new Date().toLocaleTimeString();

  return (
    <Modal
      isOpen={open}
      onClose={onClose}
      title='Complete Payment'
      className='!w-full max-w-3xl  flex flex-col rounded'
    >
      <div className='flex flex-col h-full bg-[#1E1F23] rounded-lg  justify-between '>
        {/* INFO BOX */}
        <div className='space-y-2 text-base  p-5 rounded-lg'>
          {/* STRIPE STYLE HEADER */}
          <div className='border-b border-border p-5 flex items-center gap-2'>
            <p className='text-gray-300 font-medium'>Secure Payment via Stripe</p>
          </div>

          {/* STRIPE STYLE INFO CARD */}
          <div className='p-6'>
            <div className='bg-[#23252B] p-5 rounded-lg border border-[#2F3239] space-y-4'>
              {/* OFFER NAME */}
              <div className='flex justify-between'>
                <span className='text-gray-400'>Offer</span>
                <span className='text-gray-200 font-medium'>{row?.name}</span>
              </div>

              {/* PURCHASE DATE */}
              <div className='flex justify-between'>
                <span className='text-gray-400'>Purchase Date</span>
                <span className='text-gray-200'>{purchaseDate}</span>
              </div>

              {/* PURCHASE TIME */}
              <div className='flex justify-between'>
                <span className='text-gray-400'>Purchase Time</span>
                <span className='text-gray-200'>{purchaseTime}</span>
              </div>

              {/* CARD BRAND / STRIPE */}
              <div className='flex justify-between items-center pt-2 border-t border-[#2F3239]'>
                <span className='text-gray-400'>Payment Method</span>
                <div className='flex items-center gap-2'>
                  <img
                    src='https://cdn-icons-png.flaticon.com/512/5968/5968382.png'
                    alt='Stripe'
                    className='w-5 h-5 opacity-80'
                  />
                  <span className='text-gray-200'>Stripe (Secure)</span>
                </div>
              </div>
            </div>
          </div>
          <p>
            <span className='font-semibold'>Offer Name:</span> {row?.name}
          </p>
          <p>
            <span className='font-semibold'>Purchase Date:</span> {purchaseDate}
          </p>
          <p>
            <span className='font-semibold'>Purchase Time:</span> {purchaseTime}
          </p>
        </div>

        {/* FOOTER BUTTONS */}
        <div className='p-6 border-t border-border flex justify-end gap-3'>
          <Button variant='secondary' onClick={onClose}>
            Cancel
          </Button>

          <Button variant='primary' onClick={onClickToPay}>
            Pay Now
          </Button>
        </div>
      </div>
    </Modal>
  );
};
