import React from 'react';
import './toast.css';
import { CloseIcon, FailureIcon, SuccessIcon, WarningIcon } from '../Icons';

interface compProps {
  message: string;
  type: string;
  onClose: () => void;
}

const NewCustomToast = ({ message, type, onClose }: compProps) => {
  const iconMap: any = {
    success: <SuccessIcon />,
    failure: <FailureIcon />,
    warning: <WarningIcon />,
  };

  const toastIcon = iconMap[type] || null;

  return (
    <div className={`toast toast--${type}`} role="alert">
      <div className="toast-message">
        {toastIcon && (
          <div className="icon icon--lg icon--thumb">{toastIcon}</div>
        )}
        <p>{message}</p>
      </div>
      <button className="toast-close-btn" onClick={onClose}>
        <span className="icon">
          <CloseIcon />
        </span>
      </button>
    </div>
  );
};

export default NewCustomToast;
