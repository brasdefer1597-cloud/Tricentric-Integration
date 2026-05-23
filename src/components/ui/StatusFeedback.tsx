import React, { useEffect } from 'react';

export type FeedbackType = 'success' | 'error' | 'info';

interface StatusFeedbackProps {
  message: React.ReactNode;
  type: FeedbackType;
  onClose: () => void;
  duration?: number;
}

const StatusFeedback: React.FC<StatusFeedbackProps> = ({
  message,
  type,
  onClose,
  duration = 5000
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration, message]);

  const typeStyles = {
    success: 'bg-green-600 text-white border-green-400',
    error: 'bg-red-600 text-white border-red-400',
    info: 'bg-yellow-500 text-black border-yellow-300'
  };

  const icons = {
    success: '✅',
    error: '⚠️',
    info: 'ℹ️'
  };

  return (
    <div
      className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-2rem)] max-w-md animate-in fade-in slide-in-from-top-4 duration-300"
      role="status"
    >
      <div className={`${typeStyles[type]} border-2 p-4 rounded-xl shadow-2xl flex items-center gap-4`}>
        <span className="text-xl shrink-0" aria-hidden="true">{icons[type]}</span>
        <div className="flex-grow font-bold tracking-tight">
          {message}
        </div>
        <button
          onClick={onClose}
          className="shrink-0 hover:opacity-70 transition-opacity p-1"
          aria-label="Close notification"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default StatusFeedback;
