import React, { useEffect, useCallback } from 'react';

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
  duration = 5000,
}) => {
  const [isPaused, setIsPaused] = React.useState(false);

  useEffect(() => {
    if (!message || isPaused) return;

    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [message, onClose, duration, isPaused]);

  if (!message) return null;

  const config = FEEDBACK_CONFIG[type];

  return (
    <div
      role="status"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-2rem)] max-w-md ${
        config.bg
      } ${
        config.text || 'text-white'
      } px-4 py-3 rounded-xl shadow-2xl flex items-center justify-between animate-in fade-in slide-in-from-top-4 duration-300`}
    >
      <div className="flex items-center gap-3">
        <span className="text-xl" aria-hidden="true">
          {config.icon}
        </span>
        <div className="font-bold text-sm tracking-wide">{message}</div>
      </div>
      <button
        onClick={onClose}
        aria-label="Close notification"
        className="ml-4 p-1 hover:bg-black/10 rounded-lg transition-colors"
      >
        <span className="text-lg leading-none" aria-hidden="true">
          ✕
        </span>
      </button>
    </div>
  );
};

export default StatusFeedback;
