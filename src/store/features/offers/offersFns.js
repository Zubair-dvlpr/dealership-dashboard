import { endpoints } from '../../constant';
import axiosInstance from '../../http';

// OFFERS LIST
export async function offersBookedList(params) {
  try {
    const response = await axiosInstance.get(endpoints.bookedList, { params });
    // console.log('Offers List Response:', response?.data?.data);
    return { success: true, data: response?.data?.data };
  } catch (error) {
    return { success: false, error: error?.response?.data?.error || 'Something went wrong' };
  }
}

export async function offersGeneratedList(params) {
  try {
    const response = await axiosInstance.get(endpoints.generatedList, { params });
    return { success: true, data: response?.data?.data };
  } catch (error) {
    return { success: false, error: error?.response?.data?.error || 'Something went wrong' };
  }
}

export async function updateOfferStatus(offerId, status) {
  try {
    const response = await axiosInstance.put(`${endpoints.updateOffer}/${offerId}`, {
      status
    });

    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error?.response?.data || 'Update failed' };
  }
}

export async function purchaseOffer(params) {
  const { offerId, ...rest } = params;
  try {
    const response = await axiosInstance.put(`${endpoints.updatePurchaseOffer}/${offerId}`, {
      ...rest
    });

    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error?.response?.data || 'Update failed' };
  }
}

export async function heatmapoffersList(params) {
  try {
    const response = await axiosInstance.get(endpoints.heatmapoffersList, {
      params
    });
    return { success: true, data: response?.data?.data };
  } catch (error) {
    return { success: false, error: error?.response?.data?.error || 'Something went wrong' };
  }
}

export async function dependency() {
  try {
    const response = await axiosInstance.get(endpoints.dependency);
    return { success: true, data: response?.data?.data };
  } catch (error) {
    return { success: false, error: error?.response?.data?.error || 'Something went wrong' };
  }
}
