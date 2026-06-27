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
    text: 'text-white'
  },
  error: {
    bg: 'bg-red-600',
    icon: '⚠️',
    label: 'Error',
    text: 'text-white'
  },
  info: {
    bg: 'bg-yellow-500',
    icon: 'ℹ️',
    label: 'Information',
    text: 'text-black'
  }
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
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-2rem)] max-w-md ${config.bg} ${config.text || ''} p-4 rounded-xl shadow-2xl flex items-center justify-between gap-4 animate-in fade-in zoom-in-95 duration-300`}
      role="status"
      aria-live="polite"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="flex items-center gap-3">
        <span className="text-xl" aria-hidden="true">{config.icon}</span>
        <span className="font-bold tracking-tight">{message}</span>
      </div>

      <button
        onClick={onClose}
        className="p-1 hover:bg-black/10 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-current"
        aria-label="Close notification"
      >
        <span aria-hidden="true">✕</span>
      </button>
    </div>
  );
};

export default StatusFeedback;
