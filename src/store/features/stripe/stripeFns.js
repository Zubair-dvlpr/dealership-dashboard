import { endpoints } from '../../constant';
import axiosInstance from '../../http';

// ADD CARDS
export async function addStripeCard(params) {
  try {
    const response = await axiosInstance.post(`${endpoints.addStripeCard}`);
    return { success: true, data: response?.data?.data };
  } catch (error) {
    return { success: false, error: error?.response?.data?.error || 'Something went wrong' };
  }
}

// GET CARD DETAILS
export async function getStripeCard(params) {
  try {
    const response = await axiosInstance.post(`${endpoints.getStripeCard}`);
    return { success: true, data: response?.data?.data };
  } catch (error) {
    return { success: false, error: error?.response?.data?.error || 'Something went wrong' };
  }
}

// REMOVE CARD DETAILS
export async function removeStripeCard(params) {
  try {
    const response = await axiosInstance.post(`${endpoints.removeStripeCard}`, params);
    return { success: true, data: response?.data?.data };
  } catch (error) {
    return { success: false, error: error?.response?.data?.error || 'Something went wrong' };
  }
}
