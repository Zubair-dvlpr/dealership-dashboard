import { create } from 'zustand';
import { deleteLicenseKey, licenseGenerateKey, licenseListing } from './licenseFns';
import { showToast } from '../../../components/shared/ShowToast';

export const useLicenseStore = create(set => ({
  state: {
    licenses: [],
    loading: false,
    error: null,
    licenseKey: null,
    addLoading: false,
    deleteLoading: false
  },
  licenseListing: async () => {
    set({ loading: true });

    const _data = await licenseListing();
    // CHECK
    if (_data?.success) {
      const mappedData = _data?.data?.map((item, index) => ({
        _id: item?._id,
        id: index + 1,
        key: item?.key,
        domain: item?.domain,
        licenseKey: item?._id,
        status: item?.isActive,
        creationDate: item?.createdAt,

        // NEW FIELDS
        dealershipName: item?.dealershipName || '-',
        phone: item?.phone || '-',
        email: item?.email || '-',
        platform: item?.platform || '-',

        action: 'edit'
      }));

      set({ licenses: mappedData, loading: false, error: null });
    } else {
      set({ error: error?.message, loading: false });
    }
    return _data;
  },
  generateKey: async params => {
    set({ addLoading: true });

    const _data = await licenseGenerateKey(params);
    console.log(_data);
    // CHECK
    if (_data?.success) {
      set({ licenseKey: _data?.data?.key, addLoading: false, error: null });
    } else {
      set({ error: _data?.error?.message, addLoading: false });
    }
  },
  deleteLicenseKey: async params => {
    set({ deleteLoading: true });

    const _data = await deleteLicenseKey(params);

    if (_data.success) {
      set({ deleteLoading: false, error: null });
    } else {
      showToast(_data?.error?.message, 'error', { position: 'top-right' });
      set({ error: _data?.error?.message, deleteLoading: false });
    }

    return _data;
  }
}));
