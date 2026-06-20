import React, { useEffect, useState, useCallback } from 'react';

export type FeedbackType = 'success' | 'error' | 'info';

interface StatusFeedbackProps {
  type: FeedbackType;
  message: React.ReactNode;
  duration?: number;
  onClose: () => void;
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
  type,
  message,
  duration = 5000,
  onClose,
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const config = FEEDBACK_CONFIG[type];

  const closeFeedback = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (isPaused || !duration) return;

    const timer = setTimeout(() => {
      closeFeedback();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, closeFeedback, isPaused, message]);

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={config.label}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300 w-[calc(100%-2rem)] max-w-md ${config.bg} ${config.text || 'text-white'}`}
    >
      <span className="text-xl shrink-0" aria-hidden="true">
        {config.icon}
      </span>
      <div className="flex-1 font-bold text-sm tracking-tight leading-tight">
        {message}
      </div>
      <button
        onClick={closeFeedback}
        aria-label="Close notification"
        className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/10 transition-colors"
      >
        ✕
      </button>
    </div>
  );
};

export default StatusFeedback;
