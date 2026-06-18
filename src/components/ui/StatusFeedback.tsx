import React, { useEffect } from 'react';

export type FeedbackType = 'success' | 'error' | 'info';

interface StatusFeedbackProps {
  message: string | React.ReactNode;
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
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration, message]);

  const styles = {
    success: 'bg-green-600 text-white border-green-400',
    error: 'bg-red-600 text-white border-red-400',
    info: 'bg-yellow-500 text-black border-yellow-400',
  };

  const icons = {
    success: '✅',
    error: '⚠️',
    info: 'ℹ️',
  };

  const labels = {
    success: 'Success',
    error: 'Error',
    info: 'Information',
  };

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={labels[type]}
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-2rem)] max-w-md p-4 rounded-xl border-2 shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300 ${styles[type]}`}
      onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
      onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
    >
      <span className="text-xl shrink-0" aria-hidden="true">
        {icons[type]}
      </span>
      <div className="flex-1 font-bold text-sm tracking-wide">
        {message}
      </div>
      <button
        onClick={onClose}
        className="ml-2 p-1 hover:bg-black/10 rounded-lg transition-colors shrink-0"
        aria-label="Close notification"
      >
        ✕
      </button>
    </div>
  );
};

export default StatusFeedback;
