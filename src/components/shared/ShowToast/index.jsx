import React from 'react';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toast = () => {
  return <ToastContainer />;
};

const initialOptions = {
  position: 'top-center',
  autoClose: 3000,
  closeOnClick: true,
  pauseOnHover: true,
  transition: Slide,
  pauseOnFocusLoss: false
};

export const showToast = (message, type = 'info', options = {}) => {
  const toastOptions = {
    ...initialOptions,
    ...options
  };

  switch (type) {
    case 'success':
      toast.success(message, toastOptions);
      break;
    case 'error':
      toast.error(message, toastOptions);
      break;
    case 'warning':
      toast.warn(message, toastOptions);
      break;
    case 'info':
    default:
      toast.info(message, toastOptions);
      break;
  }
};

export default Toast;
