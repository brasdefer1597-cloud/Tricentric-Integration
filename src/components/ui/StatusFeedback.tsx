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
  const config = CONFIG[type];

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(handleClose, duration);
      return () => clearTimeout(timer);
    }
  }, [handleClose, duration, message]);

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-2rem)] max-w-md ${
        config.bg
      } ${config.text || 'text-white'} p-4 rounded-xl shadow-2xl flex items-center justify-between gap-4 animate-in fade-in slide-in-from-top-4 duration-300`}
    >
      <div className="flex items-center gap-3">
        <span className="text-xl shrink-0" aria-hidden="true">
          {config.icon}
        </span>
        <div className="font-bold tracking-tight leading-tight">
          <span className="sr-only">{config.label}: </span>
          {message}
        </div>
      </div>
      <button
        onClick={handleClose}
        className="shrink-0 hover:bg-black/10 p-1 rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-white outline-none"
        aria-label="Close notification"
      >
        <span className="text-lg leading-none" aria-hidden="true">✕</span>
      </button>
    </div>
  );
};

export default StatusFeedback;
