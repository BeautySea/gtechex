/* eslint-disable react-refresh/only-export-components */
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom'; // Import ReactDOM

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'warning';
}

const Toast: React.FC<ToastProps> = ({ message, type }) => {
  const [visible, setVisible] = useState(true);
  let bgColorClass = '';
  let textColorClass = '';

  switch (type) {
    case 'success':
      bgColorClass = 'bg-green-500';
      textColorClass = 'text-white';
      break;
    case 'error':
      bgColorClass = 'bg-red-500';
      textColorClass = 'text-white';
      break;
    case 'warning':
      bgColorClass = 'bg-yellow-500';
      textColorClass = 'text-black';
      break;
    default:
      bgColorClass = 'bg-gray-800';
      textColorClass = 'text-white';
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 py-2 px-4 rounded-md shadow-md z-50">
      <div className={`py-2 px-4 rounded-md ${bgColorClass} ${textColorClass}`}>
        <p>{message}</p>
      </div>
    </div>
  );
};

export const showToast = (
  message: string,
  type: 'success' | 'error' | 'warning'
) => {
  const toastElement = document.createElement('div');
  document.body.appendChild(toastElement);

  const removeToast = () => {
    document.body.removeChild(toastElement);
  };

  ReactDOM.render(<Toast message={message} type={type} />, toastElement);

  setTimeout(removeToast, 5000);
};

export default Toast;
