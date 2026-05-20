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
  duration = 5000,
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
    info: 'bg-yellow-500 text-black border-yellow-400',
  };

  const icons = {
    success: '✅',
    error: '⚠️',
    info: 'ℹ️',
  };

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-2rem)] max-w-md p-4 rounded-xl border-2 shadow-2xl flex items-start gap-3 animate-in fade-in slide-in-from-top-4 duration-300 ${typeStyles[type]}`}
    >
      <span className="text-xl shrink-0" aria-hidden="true">
        {icons[type]}
      </span>
      <div className="flex-1 font-bold text-sm leading-tight pt-0.5">
        {message}
      </div>
      <button
        onClick={onClose}
        aria-label="Close notification"
        className="shrink-0 hover:opacity-70 transition-opacity"
      >
        ✕
      </button>
    </div>
  );
};

export default StatusFeedback;
