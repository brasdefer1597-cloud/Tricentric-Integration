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
    label: 'Success notification',
  },
  error: {
    bg: 'bg-red-600',
    icon: '⚠️',
    label: 'Error notification',
  },
  info: {
    bg: 'bg-yellow-500',
    icon: 'ℹ️',
    label: 'Information',
    text: 'text-black',
  },
};

export const StatusFeedback: React.FC<StatusFeedbackProps> = ({
  message,
  type,
  onClose,
  duration = 5000,
}) => {
  const config = CONFIG[type];

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration, message]);

  return (
    <div
      role="status"
      aria-label={config.label}
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-2rem)] max-w-md p-4 rounded-xl shadow-2xl flex items-center justify-between gap-4 animate-in fade-in slide-in-from-top duration-300 ${config.bg} ${config.text || 'text-white'}`}
    >
      <div className="flex items-center gap-3">
        <span className="text-xl shrink-0" aria-hidden="true">
          {config.icon}
        </span>
        <div className="font-bold text-sm leading-tight">{message}</div>
      </div>
      <button
        onClick={onClose}
        className="shrink-0 hover:opacity-70 transition-opacity p-1"
        aria-label="Close notification"
      >
        <span aria-hidden="true" className="text-lg">✕</span>
      </button>
    </div>
  );
};

export default StatusFeedback;
