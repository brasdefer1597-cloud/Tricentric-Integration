import React, { useEffect, useCallback } from 'react';

export type FeedbackType = 'success' | 'error' | 'info';

interface StatusFeedbackProps {
  message: string | React.ReactNode;
  type?: FeedbackType;
  onClose: () => void;
  duration?: number;
}

const StatusFeedback: React.FC<StatusFeedbackProps> = ({
  message,
  type = 'info',
  onClose,
  duration = 5000,
}) => {
  const handleClose = useCallback(onClose, [onClose]);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, handleClose, message]);

  const typeStyles = {
    success: 'bg-green-600 text-white border-green-400',
    error: 'bg-red-600 text-white border-red-400',
    info: 'bg-yellow-500 text-black border-yellow-400',
  };

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-4 rounded-xl border-2 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300 ${typeStyles[type]}`}
    >
      <span className="text-xl" aria-hidden="true">
        {type === 'success' && '✅'}
        {type === 'error' && '❌'}
        {type === 'info' && 'ℹ️'}
      </span>
      <div className="font-bold tracking-tight">{message}</div>
      <button
        onClick={handleClose}
        className="ml-4 p-1 hover:bg-black/10 rounded-full transition-colors leading-none"
        aria-label="Close notification"
      >
        ✕
      </button>
    </div>
  );
};

export default StatusFeedback;
