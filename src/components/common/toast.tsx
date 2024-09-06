import { toast } from 'react-toastify';

export const showToastMessage = (message: string) => {
  toast.success(message, {
    position: 'top-right',
  });
};

export const showToastErrorMessage = (message: string) => {
  toast.error(message, {
    position: 'top-right',
  });
};

export const showToastWarningMessage = (message: string) => {
  toast.warning(message, {
    position: 'top-right',
  });
};

export const showToastInfoMessage = (message: string) => {
  toast.info(message, {
    position: 'top-right',
  });
};
