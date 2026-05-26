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
    if (duration === Infinity) return;
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration, message]);

  const config: Record<FeedbackType, { bg: string; icon: string; label: string; text?: string }> = {
    success: {
      bg: 'bg-green-600',
      icon: '✅',
      label: 'Success',
    },
    error: {
      bg: 'bg-red-600',
      icon: '⚠️',
      label: 'Error',
    },
    info: {
      bg: 'bg-yellow-500',
      icon: 'ℹ️',
      label: 'Info',
      text: 'text-black',
    },
  };

  const { bg, icon, label, text = 'text-white' } = config[type];

  return (
    <div
      role="status"
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-2rem)] max-w-md ${bg} ${text} px-6 py-4 rounded-2xl shadow-2xl flex items-center justify-between gap-4 animate-in fade-in slide-in-from-top-4 duration-300`}
    >
      <div className="flex items-center gap-3">
        <span className="text-xl" aria-hidden="true">{icon}</span>
        <div className="font-bold tracking-tight leading-tight">
          <span className="sr-only">{label}: </span>
          {message}
        </div>
      </div>
      <button
        onClick={onClose}
        aria-label="Close notification"
        className="shrink-0 hover:opacity-70 transition-opacity p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20 rounded"
      >
        <span aria-hidden="true" className="text-xl font-bold">✕</span>
      </button>
    </div>
  );
};

export default StatusFeedback;
