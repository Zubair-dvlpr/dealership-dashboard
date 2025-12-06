import { useCallback, useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import {
  addStripeCard,
  getStripeCard,
  removeStripeCard
} from '../../store/features/stripe/stripeFns';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export default function BillingTabWrapper() {
  const [clientSecret, setClientSecret] = useState('');
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addingNewCard, setAddingNewCard] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Fetch saved payment methods
  const fetchCards = useCallback(async () => {
    setLoading(true);
    const result = await getStripeCard();
    if (result?.success) {
      setCards(result.data?.cards || []);
      setLoading(false);
    } else {
      setLoading(false);
      console.log('Error', result?.error);
    }
  }, []);

  // Create SetupIntent only when needed
  const createSetupIntent = async () => {
    try {
      setProcessing(true);
      const result = await addStripeCard();
      console.log('SetupIntent Result:', result.data);
      if (result?.success && result.data?.clientSecret) {
        setClientSecret(result?.data?.clientSecret);
        setAddingNewCard(true);
      } else {
        alert('Failed to initialize card setup. Please try again.');
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong.');
    } finally {
      setProcessing(false);
    }
  };

  // Load cards on mount
  useEffect(() => {
    fetchCards();
  }, [fetchCards]);

  const appearance = {
    theme: 'night',
    variables: {
      colorPrimary: '#9BE7B4',
      colorBackground: '#0F1220',
      colorText: '#ffffff',
      colorDanger: '#df1b41',
      fontFamily: 'Inter, sans-serif',
      borderRadius: '12px'
    }
  };

  const hasCards = cards.length > 0;

  // REMOVE CARD
  const removeCard = async cardId => {
    setDeleteLoading(true);
    const _data = await removeStripeCard({ cardId });
    if (_data?.success) {
      setDeleteLoading(false);
      fetchCards();
    } else {
      setDeleteLoading(false);
    }
  };

  return (
    <div className='w-full flex justify-center py-10  min-h-max'>
      <div className='w-full max-w-lg p-6 rounded-xl  shadow-xl border border-[#1C2030]'>
        <h2 className='text-2xl text-white mb-6 font-bold'>Payment Methods</h2>

        {/* Loading State */}
        {loading ? (
          <div className='text-center text-gray-400 py-8'>Loading your cards...</div>
        ) : (
          <>
            {/* Saved Cards List */}
            <div className='space-y-4 mb-8'>
              {hasCards ? (
                cards.map(pm => (
                  <SavedCard
                    key={pm.id}
                    card={pm}
                    isDefault={pm.is_default}
                    onDelete={() => removeCard(pm.id)}
                    onSetDefault={async () => {
                      // await setDefaultCard(pm.id);
                      fetchCards();
                    }}
                  />
                ))
              ) : (
                <p className='text-gray-400 text-center py-8'>No payment methods added yet.</p>
              )}
            </div>

            {/* Add New Card Section */}
            {!addingNewCard ? (
              <button
                onClick={createSetupIntent}
                disabled={processing}
                className='w-full py-4 border-2 border-dashed border-[#9BE7B4] rounded-xl text-[#9BE7B4] font-semibold hover:bg-[#9BE7B4]/10 transition'
              >
                {processing ? 'Preparing...' : '+ Add New Card'}
              </button>
            ) : (
              clientSecret && (
                <Elements options={{ appearance, clientSecret }} stripe={stripePromise}>
                  <AddCardForm
                    onSuccess={() => {
                      setAddingNewCard(false);
                      setClientSecret('');
                      fetchCards(); // Refresh list
                    }}
                    onCancel={() => {
                      setAddingNewCard(false);
                      setClientSecret('');
                    }}
                  />
                </Elements>
              )
            )}
          </>
        )}
      </div>
    </div>
  );
}

// Reusable Saved Card Component
function SavedCard({ card, isDefault, onDelete, onSetDefault }) {
  return (
    <div className='bg-[#1A1E2E] p-5 rounded-xl border border-[#2A2F45] flex items-center justify-between'>
      <div className='flex items-center gap-4'>
        {/* Official Brand Logo */}
        <div className='text-2xl'>
          {card?.brand === 'visa' && 'Visa'}
          {card?.brand === 'mastercard' && 'MasterCard'}
          {card?.brand === 'amex' && 'Amex'}
          {!['visa', 'mastercard', 'amex'].includes(card?.brand) && 'Card'}
        </div>

        <div className='text-white'>
          <p className='font-semibold capitalize'>
            {card?.brand} •••• {card?.last4}
          </p>
          <p className='text-sm text-gray-400'>
            Expires {String(card?.exp_month).padStart(2, '0')}/{card?.exp_year}
          </p>
        </div>

        {/* {isDefault && (
          <span className='ml-3 px-3 py-1 bg-green-500/20 text-green-400 text-xs rounded-full font-medium'>
            Default
          </span>
        )} */}
      </div>

      <div className='flex gap-3 text-sm'>
        {/* {!isDefault && (
          <button onClick={onSetDefault} className='text-[#9BE7B4] hover:underline'>
            Set Default
          </button>
        )} */}
        <button onClick={onDelete} className='text-red-400 hover:underline'>
          Remove
        </button>
      </div>
    </div>
  );
}

// Add Card Form
function AddCardForm({ onSuccess, onCancel }) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);
    setError(null);

    const { error } = await stripe.confirmSetup({
      elements,
      confirmParams: {
        return_url: window.location.href // Important: for 3DS if needed
      },
      redirect: 'if_required'
    });

    if (error) {
      setError(error.message);
      setProcessing(false);
    } else {
      // Success!
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-6 mt-6'>
      <div className='bg-[#1A1E2E] p-5 rounded-xl border border-[#2A2F45]'>
        <PaymentElement />
      </div>

      {error && (
        <div className='text-red-400 text-sm bg-red-900/20 p-3 rounded-lg border border-red-800'>
          {error}
        </div>
      )}

      <div className='flex gap-3'>
        <button
          type='submit'
          disabled={!stripe || processing}
          className='flex-1 py-3 bg-[#9BE7B4] text-black font-bold rounded-lg hover:bg-[#8BE6A8] transition disabled:opacity-50'
        >
          {processing ? 'Adding Card...' : 'Add Card'}
        </button>
        <button
          type='button'
          onClick={onCancel}
          className='px-6 py-3 border border-gray-600 text-gray-400 rounded-lg hover:bg-gray-800 transition'
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

// function PaymentCard({ card, isDefault, onDelete, onSetDefault, customerId }) {
//   const stripe = useStripe();
//   const elements = useElements();

//   const handlePurchase = async () => {
//     if (!stripe) return;
//     const _data = await createPaymentIntent();
//     if (_data.success) {
//       // const result = await stripe.confirmCardPayment(_data?.data?.clientSecret);
//       const result = await stripe.confirmCardPayment(_data?.data?.clientSecret, {
//         payment_method: {
//           card: elements.getElement(PaymentElement)
//         }
//         // optional: billing details
//         // billing_details: { name: 'Customer Name' },
//       });
//       console.log('result', result);
//       if (result.error) {
//         alert(result.error.message);
//       } else if (result.paymentIntent.status === 'succeeded') {
//         alert('Payment Successful! Offer purchased.');
//         // ✅ Update offer status in your DB here
//       }
//     }
//   };

//   return (
//     <table className='w-full text-white border border-gray-700'>
//       <thead>
//         <tr>
//           <th className='border px-4 py-2'>Offer</th>
//           <th className='border px-4 py-2'>Price</th>
//           <th className='border px-4 py-2'>Status</th>
//           <th className='border px-4 py-2'>Action</th>
//         </tr>
//       </thead>
//       <tbody>
//         {dummyOffers.map(offer => (
//           <tr key={offer.id}>
//             <td className='border px-4 py-2'>{offer.title}</td>
//             <td className='border px-4 py-2'>${offer.price}</td>
//             <td className='border px-4 py-2'>{offer.status}</td>
//             <td className='border px-4 py-2'>
//               {offer.status !== 'purchased' ? (
//                 <button
//                   onClick={() => handlePurchase(offer)}
//                   className='bg-green-500 px-3 py-1 rounded text-black'
//                 >
//                   Purchase
//                 </button>
//               ) : (
//                 <span className='text-gray-400'>Purchased</span>
//               )}
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// }
