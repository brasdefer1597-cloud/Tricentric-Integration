import React, { useEffect, useState, useCallback } from 'react';

export type FeedbackType = 'success' | 'error' | 'info';

interface StatusFeedbackProps {
  message: React.ReactNode;
  type: FeedbackType;
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
    label: 'Information',
    text: 'text-black',
  },
};

const StatusFeedback: React.FC<StatusFeedbackProps> = ({
  message,
  type,
  onClose,
  duration = 5000,
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const config = CONFIG[type];

  const closeFeedback = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (isPaused) return;

    const timer = setTimeout(() => {
      closeFeedback();
    }, duration);

    return () => clearTimeout(timer);
  }, [closeFeedback, duration, isPaused, message]);

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-2rem)] max-w-md ${config.bg} ${config.text || 'text-white'} p-4 rounded-xl shadow-2xl flex items-center justify-between gap-4 animate-in slide-in-from-top-4 duration-300 border border-white/10`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="flex items-center gap-3">
        <span className="text-xl shrink-0" aria-hidden="true">
          {config.icon}
        </span>
        <div className="font-bold text-sm leading-tight">
          <span className="sr-only">{config.label}: </span>
          {message}
        </div>
      </div>
      <button
        onClick={closeFeedback}
        className="shrink-0 hover:bg-black/10 p-1.5 rounded-lg transition-colors"
        aria-label="Close notification"
      >
        <span aria-hidden="true" className="text-lg font-bold">✕</span>
      </button>
    </div>
  );
};

export default StatusFeedback;
