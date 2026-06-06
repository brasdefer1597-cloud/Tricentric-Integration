import React, { useEffect, ReactNode } from 'react';

export type FeedbackType = 'success' | 'error' | 'info';

interface StatusFeedbackProps {
  type: FeedbackType;
  message: ReactNode;
  onClose: () => void;
  duration?: number;
}

const CONFIG: Record<FeedbackType, { bg: string; icon: string; label: string; text?: string }> = {
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

const StatusFeedback: React.FC<StatusFeedbackProps> = ({
  type,
  message,
  onClose,
  duration = 5000,
}) => {
  const { bg, icon, label, text = 'text-white' } = CONFIG[type];

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [onClose, duration, message]);

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-2rem)] max-w-md ${bg} ${text} p-4 rounded-xl shadow-2xl flex items-start gap-3 transition-all duration-300`}
    >
      <span className="text-xl shrink-0" aria-hidden="true">
        {icon}
      </span>
      <div className="flex-1 text-sm font-bold">
        <span className="sr-only">{label}: </span>
        {message}
      </div>
      <button
        onClick={onClose}
        className="shrink-0 hover:opacity-70 transition-opacity font-bold px-1"
        aria-label="Close notification"
      >
        ✕
      </button>
    </div>
  );
};

export default StatusFeedback;
