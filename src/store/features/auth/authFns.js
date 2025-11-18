import { endpoints } from '../../constant';
import axiosInstance from '../../http';

// AUTH FUNCTIONS
export async function login(params) {
  try {
    const response = await axiosInstance.post(endpoints.login, params);
    return { success: true, response: response?.data };
  } catch (error) {
    return { success: false, error: error?.response?.data?.error || 'Something went wrong' };
  }
}
