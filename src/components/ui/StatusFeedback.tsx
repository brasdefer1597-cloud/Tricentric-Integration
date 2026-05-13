import React, { useEffect, type ReactNode } from 'react';

export type FeedbackType = 'info' | 'success' | 'error';

interface StatusFeedbackProps {
  message: ReactNode;
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

  const styles = {
    info: 'bg-yellow-500 text-black border-yellow-600',
    success: 'bg-green-600 text-white border-green-700',
    error: 'bg-red-600 text-white border-red-700',
  };

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-[100] min-w-[300px] max-w-[90vw] p-4 rounded-xl border-2 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300 ${styles[type]}`}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="font-bold text-sm uppercase tracking-tight">{message}</div>
        <button
          onClick={onClose}
          aria-label="Dismiss notification"
          className="hover:opacity-70 transition-opacity"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default StatusFeedback;
