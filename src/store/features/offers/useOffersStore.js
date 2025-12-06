import { create } from 'zustand';
import { offersBookedList, offersGeneratedList, updateOfferStatus } from './offersFns';
import { formatPhoneNumber, formatTime } from '../../../utils/utils';
import { showToast } from '../../../components/shared/ShowToast';
import { immer } from 'zustand/middleware/immer';

export const useOffersStore = create(
  immer(set => ({
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
      },
      update: {
        loading: false,
        data: null,
        error: null
      }
    },
    offersBookedListing: async () => {
      set(prev => ({ list: { ...prev?.list, loading: true } }));

      const _data = await offersBookedList();

      // CHECK
      if (_data?.success) {
        const mappedData = _data?.data?.offers.map((item, index) => ({
          id: index + 1,
          _id: item?._id,
          name: item?.name,
          domain: item?.license?.domain,

          // Correct Submitted date
          submittedDate: item?.submittedDate,

          // Original createdAt time
          time: formatTime(item?.createdAt),
          vin: item?.vin,
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
          source: item?.license.platform,
          appointmentType: item?.appointmentType || 'In-Person',
          appointmentStatus: item?.appointmentStatus || 'Pending',
          // ⭐ NEW FIELDS YOU ARE MISSING ⭐
          iaPurchased: item?.iaPurchased || false,
          purchasedDetails: item?.purchasedDetails || {},
          status: item?.status || 'Pending',
          booking_datetime: item?.purchasedDetails?.booking_datetime || null,
          booking_date: item?.purchasedDetails?.booking_date || null,
          booking_time: item?.purchasedDetails?.booking_time || null,

          // optional (for table)
          pickupType: item?.pickupType || 'Pickup', // or null
          transportStatus: item?.transportStatus || 'Pending',

          completeItem: item
        }));

        // ⭐ NEW: Save stats
        const mappedStats = {
          today: _data?.data?.stats?.appointmentsToday || 0,
          thisWeek: _data?.data?.stats?.appointmentsThisWeek || 0,
          thisMonth: _data?.data?.stats?.appointmentsThisMonth || 0,
          completionRate: Number(_data?.data?.stats?.completionRate || 0)
        };

        set(prev => ({
          list: { ...prev?.list, data: mappedData, loading: false, error: null },
          stats: mappedStats
        }));
      } else {
        set(prev => ({ list: { ...prev?.list, error: error?.message, loading: false } }));
      }
    },
    offersGeneratedListing: async () => {
      set(prev => ({ list: { ...prev?.list, loading: true } }));

      const _data = await offersGeneratedList();

      // CHECK
      if (_data?.success) {
        console.log('Offers Store List Response:', _data);
        const mappedData = _data?.data?.offers.map((item, index) => ({
          id: index + 1,
          name: item?.name,
          domain: item?.license?.domain,

          // Correct Submitted date
          submittedDate: item?.submittedDate,

          // Original createdAt time
          time: formatTime(item?.createdAt),
          vin: item?.vin,
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
          source: item?.license.platform,
          appointmentType: item?.appointmentType || 'In-Person',
          appointmentStatus: item?.appointmentStatus || 'Pending',
          // ⭐ NEW FIELDS YOU ARE MISSING ⭐
          iaPurchased: item?.iaPurchased || false,
          purchasedDetails: item?.purchasedDetails || {},

          booking_datetime: item?.purchasedDetails?.booking_datetime || null,
          booking_date: item?.purchasedDetails?.booking_date || null,
          booking_time: item?.purchasedDetails?.booking_time || null,

          // optional (for table)
          pickupType: item?.pickupType || 'Pickup', // or null
          transportStatus: item?.transportStatus || 'Pending',

          completeItem: item
        }));

        // ⭐ NEW: Save stats
        const mappedStats = {
          today: _data?.data?.stats?.appointmentsToday || 0,
          thisWeek: _data?.data?.stats?.appointmentsThisWeek || 0,
          thisMonth: _data?.data?.stats?.appointmentsThisMonth || 0,
          completionRate: Number(_data?.data?.stats?.completionRate || 0)
        };

        set(prev => ({
          list: { ...prev?.list, data: mappedData, loading: false, error: null },
          stats: mappedStats
        }));
      } else {
        set(prev => ({ list: { ...prev?.list, error: error?.message, loading: false } }));
      }
    },
    updateStatus: async (offerId, status) => {
      set(state => {
        state.state.update.loading = true;
      });
      const _data = await updateOfferStatus(offerId, status);
      if (_data.success) {
        set(state => {
          state.state.update.loading = false;
          state.state.update.data = _data.data;
        });
      } else {
        set(state => {
          state.state.update.loading = false;
          state.state.update.error = _data.error;
        });
        showToast(_data?.error?.message, 'error');
      }

      return _data;
    },
    offersListWithFilters: async params => {
      set(prev => ({ heatMap: { ...prev?.heatMap, loading: true } }));

      const _data = await offersBookedList(params);
      // CHECK
      if (_data?.success) {
        set(prev => ({
          heatMap: { ...prev?.heatMap, data: _data?.data, loading: false, error: null }
        }));
      } else {
        set(prev => ({ heatMap: { ...prev?.heatMap, error: _data?.message, loading: false } }));
      }
    }
  }))
);
