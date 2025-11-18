import { endpoints } from '../../constant';
import axiosInstance from '../../http';

// AUTH FUNCTIONS
export async function licenseListing(params) {
  try {
    const response = await axiosInstance.get(endpoints.license);
    return { success: true, data: response?.data?.data };
  } catch (error) {
    return { success: false, error: error?.response?.data?.error || 'Something went wrong' };
  }
}
// GENERATE KEYS
export async function licenseGenerateKey(params) {
  try {
    const response = await axiosInstance.post(endpoints.addLicenseKey, { ...params });
    return { success: true, data: response?.data?.data };
  } catch (error) {
    return { success: false, error: error?.response?.data?.error || 'Something went wrong' };
  }
}
// DELETE KEYS
export async function deleteLicenseKey(params) {
  try {
    const response = await axiosInstance.delete(
      `${endpoints.deleteLicenseKey}/${params.licenseId}`
    );
    return { success: true, data: response?.data?.data };
  } catch (error) {
    return { success: false, error: error?.response?.data?.error || 'Something went wrong' };
  }
}
