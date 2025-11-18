import { create } from 'zustand';
import { offersList } from './offersFns';
import { formatPhoneNumber, formatTime } from '../../../utils/utils';

export const useOffersStore = create(set => ({
  state: {
    list: {
      loading: false,
      data: [],
      error: null
    },
    add: {
      loading: false,
      data: null,
      error: null
    },
    heatMap: {
      loading: false,
      data: [],
      error: null
    }
  },
  offersListing: async () => {
    set(prev => ({ list: { ...prev?.list, loading: true } }));

    const _data = await offersList();
    // CHECK
    if (_data?.success) {
      const mappedData = _data?.data?.map((item, index) => ({
        id: index + 1,
        name: item?.name,
        domain: item?.license?.domain,

        // Correct Submitted date
        submittedDate: item?.submittedDate,

        // Original createdAt time
        time: formatTime(item?.createdAt),

        phone: formatPhoneNumber(item?.phone) || item?.phone,
        vehicle: item?.vehicle,
        kilometres: item?.kilometres,
        finalOffer: item?.finalOffer,
        profit: item?.profit,
        deductions: item?.deductions,
        expires: item?.expires,
        postalCode: item?.postalCode,
        shortLink: item?.shortLink,
        creationDate: item?.createdAt,
        median: item?.median,

        // ⭐ NEW FIELDS YOU ARE MISSING ⭐
        iaPurchased: item?.iaPurchased || false,
        purchasedDetails: item?.purchasedDetails || {},

        booking_datetime: item?.purchasedDetails?.booking_datetime || null,
        booking_date: item?.purchasedDetails?.booking_date || null,
        booking_time: item?.purchasedDetails?.booking_time || null,

        // optional (for table)
        pickupType: item?.pickupType || "Pickup",   // or null
        transportStatus: item?.transportStatus || "Pending",

        completeItem: item
      }));

      set(prev => ({ list: { ...prev?.list, data: mappedData, loading: false, error: null } }));
    } else {
      set(prev => ({ list: { ...prev?.list, error: error?.message, loading: false } }));
    }
  },

  offersListWithFilters: async params => {
    set(prev => ({ heatMap: { ...prev?.heatMap, loading: true } }));

    const _data = await offersList(params);
    // CHECK
    if (_data?.success) {
      set(prev => ({
        heatMap: { ...prev?.heatMap, data: _data?.data, loading: false, error: null }
      }));
    } else {
      set(prev => ({ heatMap: { ...prev?.heatMap, error: _data?.message, loading: false } }));
    }
  }
}));
