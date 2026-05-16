import React, { useEffect } from 'react';

export type FeedbackType = 'info' | 'success' | 'error';

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
    if (!message) return;

    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  const typeStyles = {
    info: 'bg-yellow-500 text-black',
    success: 'bg-green-600 text-white',
    error: 'bg-red-600 text-white',
  };

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 rounded-full font-black uppercase tracking-widest text-xs shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300 ${typeStyles[type]}`}
    >
      <span className="text-sm">
        {type === 'success' && '✓'}
        {type === 'error' && '✕'}
        {type === 'info' && '⚠'}
      </span>
      {message}
      <button
        onClick={onClose}
        aria-label="Close notification"
        className="ml-2 hover:opacity-70 transition-opacity"
      >
        ✕
      </button>
    </div>
  );
};

export default StatusFeedback;
