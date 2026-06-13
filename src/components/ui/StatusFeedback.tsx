import React, { useEffect, useState, useCallback } from 'react';

export type FeedbackType = 'success' | 'error' | 'info';

interface StatusFeedbackProps {
  type: FeedbackType;
  message: React.ReactNode;
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
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-2rem)] max-w-md p-4 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300 ${config.bg} ${config.text || 'text-white'}`}
    >
      <span className="text-xl shrink-0" aria-hidden="true">
        {config.icon}
      </span>
      <div className="flex-1 font-bold text-sm leading-tight">
        {message}
      </div>
      <button
        onClick={onClose}
        aria-label="Close notification"
        className="shrink-0 hover:opacity-70 transition-opacity p-1"
      >
        <span aria-hidden="true">✕</span>
      </button>
    </div>
  );
};

export default StatusFeedback;
