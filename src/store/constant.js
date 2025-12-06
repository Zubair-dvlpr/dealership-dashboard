// const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;
// const apiEndpoint = 'https://api.cvxhq.com';
const apiEndpoint = 'http://localhost:8000';
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
  generatedList: `${baseURL}/offer/generated/list`,
  bookedList: `${baseURL}/offer/booked/list`,
  updateOffer: `${baseURL}/offer/update`,
  updatePurchaseOffer: `${baseURL}/offer/purchase`,

  heatmapoffersList: `${baseURL}/offer/list`,

  // dependency
  dependency: `${baseURL}/dependency`,

  // ANALYTICS
  getAnalytics: `${baseURL}/dashboard/analytics`,

  // STRIPE
  addStripeCard: `${baseURL}/customer/stripe/add-card`,

  getStripeCard: `${baseURL}/customer/stripe/get-card`,

  removeStripeCard: `${baseURL}/customer/stripe/remove-card`,

  createPaymentIntentStripe: `${baseURL}/customer/stripe/create-payment-intent`
};
