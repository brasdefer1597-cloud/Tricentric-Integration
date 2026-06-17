import React, { useEffect, useState } from 'react';

export type FeedbackType = 'success' | 'error' | 'info';

interface StatusFeedbackProps {
  message: React.ReactNode;
  type: FeedbackType;
  onClose: () => void;
  duration?: number;
}

const FEEDBACK_CONFIG: Record<FeedbackType, { bg: string; icon: string; label: string; text: string }> = {
  success: {
    bg: 'bg-green-600',
    icon: '✅',
    label: 'Success',
    text: 'text-white'
  },
  error: {
    bg: 'bg-red-600',
    icon: '⚠️',
    label: 'Error',
    text: 'text-white'
  },
  info: {
    bg: 'bg-yellow-500',
    icon: 'ℹ️',
    label: 'Information',
    text: 'text-black'
  },
};

const StatusFeedback: React.FC<StatusFeedbackProps> = ({
  message,
  type,
  onClose,
  duration = 5000,
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const config = FEEDBACK_CONFIG[type];

  useEffect(() => {
    if (isPaused) return;

    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration, isPaused, message]);

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={config.label}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-2rem)] max-w-md ${config.bg} ${config.text} px-6 py-4 rounded-2xl shadow-2xl flex items-center justify-between gap-4 animate-in slide-in-from-top-full duration-300`}
    >
      <div className="flex items-center gap-3">
        <span className="text-xl" aria-hidden="true">
          {config.icon}
        </span>
        <div className="font-bold text-sm leading-tight">{message}</div>
      </div>
      <button
        onClick={onClose}
        aria-label="Close notification"
        className="text-current opacity-70 hover:opacity-100 transition-opacity p-1 font-black"
      >
        ✕
      </button>
    </div>
  );
};

export default StatusFeedback;
