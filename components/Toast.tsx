import React, { useEffect } from 'react';
import { ExclamationCircleIcon } from './icons/ExclamationCircleIcon';
import { StarIcon } from './icons/StarIcon';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const isSuccess = type === 'success';

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm p-4">
      <div
        className={`flex items-center w-full p-4 text-white rounded-lg shadow-lg ${
          isSuccess ? 'bg-green-500/80 backdrop-blur-sm border border-green-400' : 'bg-red-500/80 backdrop-blur-sm border border-red-400'
        }`}
        role="alert"
      >
        <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg bg-black/20">
          {isSuccess ? (
            <StarIcon className="w-5 h-5 text-yellow-300" />
          ) : (
            <ExclamationCircleIcon className="w-5 h-5 text-yellow-300" />
          )}
          <span className="sr-only">{isSuccess ? 'Success' : 'Error'} icon</span>
        </div>
        <div className="ml-3 text-sm font-medium">{message}</div>
        <button
          type="button"
          className="ml-auto -mx-1.5 -my-1.5 bg-white/10 text-white hover:text-white rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-white/20 inline-flex items-center justify-center h-8 w-8"
          onClick={onClose}
          aria-label="Close"
        >
          <span className="sr-only">Close</span>
          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Toast;
