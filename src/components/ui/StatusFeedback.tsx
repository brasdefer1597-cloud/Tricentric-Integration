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
  const config = FEEDBACK_CONFIG[type];

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (duration <= 0) return;

    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, handleClose, message]);

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-2rem)] max-w-md ${
        config.bg
      } ${config.text || 'text-white'} p-4 rounded-xl shadow-2xl flex items-center justify-between gap-4 animate-in slide-in-from-top-full duration-300`}
    >
      <div className="flex items-center gap-3">
        <span className="text-xl" aria-hidden="true">
          {config.icon}
        </span>
        <span className="font-bold text-sm">{message}</span>
      </div>
      <button
        onClick={handleClose}
        aria-label="Close notification"
        className="text-xl font-bold opacity-70 hover:opacity-100 transition-opacity p-1"
      >
        ✕
      </button>
    </div>
  );
};

export default StatusFeedback;
