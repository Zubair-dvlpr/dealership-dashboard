import { useAuthStore } from '../store/features/auth/useAuthStore';
import { setAuthToken } from '../store/http';

export const useIsAuthenticatedUser = () => {
  const state = useAuthStore();
  if (state?.user?.accessToken) {
    setAuthToken(state?.user?.accessToken);
    return true;
  }
  return false;
};

export const getOrderedColumns = (columns = [], freezedColumns = []) => {
  if (!Array?.isArray(columns) || !Array?.isArray(freezedColumns)) {
    console.warn('Invalid input to getOrderedColumns. Returning original columns.');
    return columns || [];
  }

  const frozen = freezedColumns
    ?.map(colName => columns?.find(col => col?.name === colName))
    ?.filter(Boolean);

  const remaining = columns?.filter(col => !freezedColumns?.includes(col?.name));

  return [...frozen, ...remaining];
};

// Formate Price
export const formatPrice = (
  value,
  minimumFractionDigit,
  locale = 'en-US'
  // currency = 'USD'
) => {
  if (value === '' || isNaN(value)) return '';
  return new Intl.NumberFormat(locale, {
    currency: 'USD',
    style: 'currency',
    minimumFractionDigits: minimumFractionDigit || 0,
    maximumFractionDigits: 2
  }).format(value);
};

export const extractDomain = url => {
  const match = url?.match(/^(https?:\/\/[^/]+?\.(com|net|org|io|ai|dev|pk|us|url))/i);
  return match ? match[0] : url;
};

export function formatPhoneNumber(phoneNumberString) {
  var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
  var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    var intlCode = match[1] ? '+1 ' : '';
    return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
  }
  return null;
}

export function formatTime(isoString) {
  const date = new Date(isoString);
  return date.toLocaleTimeString('en-US', { hour12: true });
}
