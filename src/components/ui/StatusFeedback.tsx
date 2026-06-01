import React, { useEffect } from 'react';

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
  const config = FEEDBACK_CONFIG[type];

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [onClose, duration, message]);

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-2rem)] max-w-md p-4 rounded-xl shadow-2xl flex items-center justify-between border border-white/10 animate-in fade-in slide-in-from-top-4 duration-300 ${config.bg} ${config.text || 'text-white'}`}
    >
      <div className="flex items-center gap-3">
        <span className="text-xl" aria-hidden="true">
          {config.icon}
        </span>
        <div className="font-bold text-sm leading-tight">
          <span className="sr-only">{config.label}: </span>
          {message}
        </div>
      </div>
      <button
        onClick={onClose}
        className="ml-4 p-1 hover:bg-black/10 rounded-md transition-colors"
        aria-label="Close notification"
      >
        <span aria-hidden="true" className="text-lg">✕</span>
      </button>
    </div>
  );
};

export default StatusFeedback;
