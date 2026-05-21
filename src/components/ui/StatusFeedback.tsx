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

  const styles = {
    success: {
      bg: 'bg-green-600',
      text: 'text-white',
      icon: '✅',
    },
    error: {
      bg: 'bg-red-600',
      text: 'text-white',
      icon: '⚠️',
    },
    info: {
      bg: 'bg-yellow-500',
      text: 'text-black',
      icon: 'ℹ️',
    },
  };

  const { bg, text, icon } = styles[type];

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-2rem)] max-w-md p-4 rounded-xl shadow-2xl flex items-center gap-3 border border-white/10 animate-in fade-in slide-in-from-top-4 duration-300 ${bg} ${text}`}
    >
      <span className="text-xl" aria-hidden="true">
        {icon}
      </span>
      <div className="flex-1 font-bold tracking-tight">
        {message}
      </div>
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
