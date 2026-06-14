import React, { useEffect, useCallback } from 'react';

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
    label: 'Info',
    text: 'text-black',
  },
};

const StatusFeedback: React.FC<StatusFeedbackProps> = ({
  message,
  type,
  onClose,
  duration = 5000,
}) => {
  const [isPaused, setIsPaused] = React.useState(false);
  const config = CONFIG[type];

  useEffect(() => {
    if (isPaused) return;

    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration, message, isPaused]);

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={config.label}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-2rem)] max-w-md p-4 rounded-xl shadow-2xl flex items-center justify-between gap-4 animate-in fade-in slide-in-from-top-4 duration-300 ${config.bg} ${config.text || 'text-white'}`}
    >
      <div className="flex items-center gap-3">
        <span className="text-xl" aria-hidden="true">
          {config.icon}
        </span>
        <div className="font-bold text-sm leading-tight">
          {message}
        </div>
      </div>
      <button
        onClick={onClose}
        aria-label="Close notification"
        className="flex-shrink-0 hover:bg-black/10 p-1 rounded transition-colors"
      >
        ✕
      </button>
    </div>
  );
};

export default StatusFeedback;
