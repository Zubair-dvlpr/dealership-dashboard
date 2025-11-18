const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;
// const apiEndpoint = 'https://api.cvxhq.com';
const apiVersion = 'api/v1';
export const baseURL = `${apiEndpoint}/${apiVersion}`;
// export const baseURL = `${apiEndpoint}`;

export const endpoints = {
  // AUTH
  login: `${baseURL}/auth/login`,
  logout: `${baseURL}/auth/logout`,

  // LICENSE
  license: `${baseURL}/liscense`,
  addLicenseKey: `${baseURL}/liscense/generate-key`,
  deleteLicenseKey: `${baseURL}/liscense/delete-key`,
  // OFFERS
  offersList: `${baseURL}/offer/list`,

  heatmapoffersList: `${baseURL}/offer/list`,

  // dependency
  dependency: `${baseURL}/dependency`,

  // ANALYTICS
  getAnalytics: `${baseURL}/dashboard/analytics`
};
