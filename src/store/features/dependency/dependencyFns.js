import { endpoints } from '../../constant';
import axiosInstance from '../../http';

export async function dependency() {
  try {
    const response = await axiosInstance.get(endpoints.dependency);
    return { success: true, data: response?.data?.data };
  } catch (error) {
    return { success: false, error: error?.response?.data?.error || 'Something went wrong' };
  }
}
