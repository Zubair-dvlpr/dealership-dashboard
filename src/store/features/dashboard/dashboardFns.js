import { endpoints } from '../../constant';
import axiosInstance from '../../http';

// OFFERS LIST
export async function getAnalyticsFn(params) {
  try {
    const response = await axiosInstance.get(endpoints.getAnalytics);
    return { success: true, data: response?.data?.data };
  } catch (error) {
    return { success: false, error: error?.response?.data?.error || 'Something went wrong' };
  }
}
