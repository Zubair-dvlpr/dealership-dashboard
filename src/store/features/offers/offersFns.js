import { endpoints } from '../../constant';
import axiosInstance from '../../http';

// OFFERS LIST
export async function offersList(params) {
  try {
    const response = await axiosInstance.get(endpoints.offersList, { params });
    return { success: true, data: response?.data?.data };
  } catch (error) {
    return { success: false, error: error?.response?.data?.error || 'Something went wrong' };
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
