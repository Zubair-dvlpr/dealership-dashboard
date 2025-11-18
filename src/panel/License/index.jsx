import React, { useEffect, useState } from 'react';
import { Copy, Search } from 'lucide-react';
import { Button, Table } from '../../components/shared';
import { licenseColumnData, licenseTableColumnExtensions } from '../../utils/data';
import { useLicenseStore } from '../../store/features/license/useLicenseStore';
import { Action, LicenseDate, LicenseStatus } from '../../components/shared/TableUtilities';
import Modal from '../../components/shared/Modal';
import TableSkeleton from '../../components/shared/Skeleton/TableSkeleton';
import CreateLicenseModal from '../../components/shared/Modal/CreateLicenseModal';

export const License = () => {
  const licenseStore = useLicenseStore();
  // STATE
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [isShowCopied, setIsShowCopied] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [updatePaymentModal, setUpdatePaymentModal] = useState(null);
  const [deleteModal, setDeleteModal] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);

  const dataProviders = [
    {
      columnName: ['status'],
      func: restProps => <LicenseStatus row={restProps?.row} />
    },
    {
      columnName: ['creationDate'],
      func: restProps => <LicenseDate row={restProps?.row} />
    },
    {
      columnName: ['action'],
      func: restProps => (
        <Action
          row={restProps?.row}
          onDelete={() => {
            setDeleteModal(true);
            setSelectedRow(restProps?.row);
          }}
        />
      )
    }
  ];

  // COPY TO CLIPBOARD

  const copyToClipboard = () => {
    navigator.clipboard.writeText(licenseStore?.licenseKey);
    setIsShowCopied(true);
    setTimeout(() => {
      setIsShowCopied(false);
    }, 2000);
  };

  // DELETE LICENSE
  const deleteLicenseKey = async () => {
    const data = await licenseStore.deleteLicenseKey({ licenseId: selectedRow?._id });
    if (data?.success) {
      setDeleteModal(false);
      licenseStore.licenseListing();
    }
  };

  // GETTING LISTING
  useEffect(() => {
    licenseStore.licenseListing();
  }, []);

  return (
    <React.Fragment>
      <div className=''>
        {/* // GENERATE KEY AND SEARCH BAR  */}
        <div className='flex items-center mb-4 gap-2'>
          <div className='relative flex-10'>
            <input
              type='text'
              placeholder='Search licenses...'
              className='bg-panel border border-ink/25 focus:border-ink indent-7 rounded-lg py-2.5 px-4 pr-10 w-full ring-0 focus:ring-0 focus:outline-none'
            />
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-ink/50 bg-panel' />
          </div>
          <div className='w-[12%]'>
            <Button onClick={() => setOpenCreate(true)} className='border !py-2.5'>
              Create License
            </Button>
          </div>
        </div>
        {/* // GENERATE KEY AND SEARCH BAR  */}

        {/* // TABLE */}
        <div className='h-full'>
          {licenseStore?.loading ? (
            <TableSkeleton />
          ) : (
            <Table
              rowData={{
                rows: licenseStore?.licenses,
                totalCount: licenseStore?.licenses?.length
              }}
              columns={licenseColumnData}
              tableColumnExtensions={licenseTableColumnExtensions}
              dataProviders={dataProviders}
              selectedIds={selectedIds}
              setSelectedIds={setSelectedIds}
              setUpdatePaymentModal={setUpdatePaymentModal}
              setDeleteModal={setDeleteModal}
            />
          )}
        </div>
      </div>

      <CreateLicenseModal
        isOpen={openCreate}
        onClose={() => setOpenCreate(false)}
        loading={licenseStore.addLoading}
        onSubmit={async form => {
          await licenseStore.generateKey(form);
          setOpenCreate(false);
          setIsOpen(true); // open generated key modal
        }}
      />

      {/* // MODAL */}
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        position='center'
        title={'Generated Key'}
      >
        <div className='mb-4'>
          <p className='text-gray-600 mb-4 bg-panel '>
            Your new license key has been generated successfully:
          </p>
          <div className=' border-2 border-dashed border-ink rounded-xl p-4 font-mono text-sm break-all'>
            {licenseStore?.licenseKey}
          </div>
        </div>
        <div className='flex space-x-3 '>
          <Button
            onClick={copyToClipboard}
            className='!flex-1 !bg-dark  py-3 px-4 rounded-xl font-medium transition-all duration-200 flex items-center justify-center'
          >
            <Copy className='w-4 h-4 mr-2' />
            {isShowCopied ? 'Copied!' : 'Copy Key'}
          </Button>
          <Button
            onClick={() => setIsOpen(false)}
            className='flex-1 border border-gray-200 hover:bg-gray-50 text-gray-700 py-3 px-4 rounded-xl font-medium transition-all duration-200'
          >
            Close
          </Button>
        </div>
      </Modal>

      <Modal
        isOpen={Boolean(updatePaymentModal)}
        onClose={() => setUpdatePaymentModal(null)}
        title='Update Payment Method'
        position='center'
      >
        <div className='mb-4'>
          <p className='text-gray-200 mb-3'>Update payment method for:</p>

          <div className='p-3 border border-gray-200 rounded bg-gray-700 font-mono text-sm'>
            {updatePaymentModal?.key}
          </div>

          <div className='mt-5 flex justify-end gap-3'>
            <Button
              className='px-4 py-2 text-sm border border-gray-300 rounded-lg'
              onClick={() => setUpdatePaymentModal(null)}
            >
              Cancel
            </Button>

            <Button
              className='px-4 py-2 text-sm bg-blue-600 text-white rounded-lg'
              onClick={() => {
                // frontend only
                setUpdatePaymentModal(null);
              }}
            >
              Proceed to Update
            </Button>
          </div>
        </div>
      </Modal>

      {/* // DELETE MODAL */}
      <Modal
        isOpen={Boolean(deleteModal)}
        onClose={() => setDeleteModal(null)}
        title='Delete License'
        position='center'
      >
        <div className='mb-4'>
          <p className='text-gray-200 mb-4'>Are you sure you want to delete this license?</p>

          <div className='p-3 border border-gray-800 rounded bg-gray-700 font-mono text-sm mb-6'>
            {selectedRow?.key}
          </div>

          <div className='flex justify-end gap-3'>
            <Button
              className='px-4 py-2 text-sm border border-gray-300'
              onClick={() => setDeleteModal(null)}
            >
              Cancel
            </Button>

            <Button
              className='px-4 py-2 text-sm bg-red-700 hover:bg-red-800 text-white'
              onClick={deleteLicenseKey}
              loading={licenseStore?.deleteLoading}
            >
              Yes, Delete
            </Button>
          </div>
        </div>
      </Modal>
    </React.Fragment>
  );
};
