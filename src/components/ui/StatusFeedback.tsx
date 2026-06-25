import React, { useState, useEffect } from 'react';

export type FeedbackType = 'success' | 'error' | 'info';

interface StatusFeedbackProps {
  message: React.ReactNode;
  type: FeedbackType;
  onClose: () => void;
  duration?: number;
}

const FEEDBACK_CONFIG: Record<FeedbackType, { bg: string; icon: string; label: string; text?: string }> = {
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
  duration = 5000
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
      className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-2rem)] max-w-md animate-in fade-in slide-in-from-top-4 duration-300"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="alert"
      aria-live="polite"
      aria-label={config.label}
    >
      <div className={`${config.bg} ${config.text || 'text-white'} p-4 rounded-xl shadow-2xl flex items-center justify-between gap-3 border border-white/10`}>
        <div className="flex items-center gap-3">
          <span className="text-xl shrink-0" aria-hidden="true">{config.icon}</span>
          <div className="font-bold text-sm leading-tight">
            {message}
          </div>
        </div>
        <button
          onClick={onClose}
          className="shrink-0 p-1 hover:bg-black/10 rounded-lg transition-colors"
          aria-label="Close notification"
        >
          <span className="text-xl leading-none">✕</span>
        </button>
      </div>
    </div>
  );
};

export default StatusFeedback;
