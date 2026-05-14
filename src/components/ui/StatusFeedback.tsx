import React, { useEffect } from 'react';

export type FeedbackType = 'success' | 'error' | 'info';

interface StatusFeedbackProps {
  message: React.ReactNode;
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
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration, message]);

  const bgStyles = {
    success: 'bg-green-600',
    error: 'bg-red-600',
    info: 'bg-yellow-500 text-black',
  };

  const icons = {
    success: '✅',
    error: '💀',
    info: '⚠️',
  };

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300 font-bold text-white ${bgStyles[type]}`}
    >
      <span className="text-xl" aria-hidden="true">{icons[type]}</span>
      <div className="flex-1">{message}</div>
      <button
        onClick={onClose}
        className="ml-4 hover:opacity-70 transition-opacity p-1"
        aria-label="Close notification"
      >
        ✕
      </button>
    </div>
  );
};

export default StatusFeedback;
