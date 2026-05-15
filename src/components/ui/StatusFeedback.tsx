import React, { useEffect, useCallback } from 'react';

export type FeedbackType = 'success' | 'error' | 'info';

interface StatusFeedbackProps {
  type: FeedbackType;
  message: React.ReactNode;
  onClose: () => void;
  duration?: number;
}

const StatusFeedback: React.FC<StatusFeedbackProps> = ({
  type,
  message,
  onClose,
  duration = 5000,
}) => {
  const handleClose = useCallback(onClose, [onClose]);

  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [message, duration, handleClose]);

  if (!message) return null;

  const styles = {
    success: 'bg-green-600 text-white border-green-400',
    error: 'bg-red-600 text-white border-red-400',
    info: 'bg-yellow-500 text-black border-yellow-400',
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
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-[100] min-w-[300px] max-w-[90vw] p-4 rounded-xl border-2 shadow-2xl flex items-center justify-between gap-4 animate-in fade-in slide-in-from-top-4 duration-300 ${styles[type]}`}
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl" aria-hidden="true">
          {icons[type]}
        </span>
        <div className="font-bold tracking-tight leading-tight uppercase text-sm">
          {message}
        </div>
      </div>
      <button
        onClick={handleClose}
        aria-label="Close notification"
        className="p-1 hover:opacity-70 transition-opacity focus-visible:ring-2 focus-visible:ring-current rounded-lg"
      >
        <span aria-hidden="true" className="text-xl font-bold">
          ×
        </span>
      </button>
    </div>
  );
};

export default StatusFeedback;
