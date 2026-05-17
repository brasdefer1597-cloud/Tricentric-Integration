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
    info: 'bg-yellow-500 text-black border-yellow-400', // yellow-crudo branding
  };

  return (
    <div
      className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-2rem)] max-w-md animate-in fade-in slide-in-from-top-4 duration-300"
      role="status"
    >
      <div className={`flex items-center justify-between p-4 rounded-xl border shadow-2xl ${typeStyles[type]}`}>
        <div className="font-bold tracking-tight text-sm uppercase">
          {message}
        </div>
        <button
          onClick={onClose}
          className="ml-4 opacity-70 hover:opacity-100 transition-opacity p-1"
          aria-label="Dismiss feedback"
        >
          <span className="text-xl leading-none">×</span>
        </button>
      </div>
    </div>
  );
};

export default StatusFeedback;
