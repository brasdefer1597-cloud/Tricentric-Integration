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

  const bgColor = {
    success: 'bg-green-600 text-white',
    error: 'bg-red-600 text-white',
    info: 'bg-yellow-500 text-black',
  }[type];

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 rounded-xl shadow-2xl font-black uppercase tracking-tighter ${bgColor} flex items-center gap-3 border-2 border-white/20 transition-all duration-300 animate-in fade-in slide-in-from-top-4`}
    >
      <span className="text-xl">
        {type === 'success' && '✅'}
        {type === 'error' && '⚠️'}
        {type === 'info' && 'ℹ️'}
      </span>
      <div className="text-sm font-bold">{message}</div>
      <button
        onClick={onClose}
        className="ml-4 opacity-50 hover:opacity-100 transition-opacity p-1"
        aria-label="Close notification"
      >
        ✕
      </button>
    </div>
  );
};

export default StatusFeedback;
