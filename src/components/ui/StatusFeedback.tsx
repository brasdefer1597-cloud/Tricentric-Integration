import React, { useEffect, ReactNode } from 'react';

export type FeedbackType = 'success' | 'error' | 'info';

interface StatusFeedbackProps {
  message: ReactNode;
  type: FeedbackType;
  onClose: () => void;
  duration?: number;
}

const StatusFeedback: React.FC<StatusFeedbackProps> = ({
  message,
  type,
  onClose,
  duration = 5000
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration, message]);

  const config: Record<FeedbackType, { bg: string; icon: string; label: string; text?: string }> = {
    success: {
      bg: 'bg-green-600',
      icon: '✅',
      label: 'Success'
    },
    error: {
      bg: 'bg-red-600',
      icon: '⚠️',
      label: 'Error'
    },
    info: {
      bg: 'bg-yellow-500',
      icon: 'ℹ️',
      label: 'Information',
      text: 'text-black'
    }
  };

  const { bg, icon, label, text = 'text-white' } = config[type];

  return (
    <div
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-2rem)] max-w-md ${bg} ${text} p-4 rounded-xl shadow-2xl flex items-center justify-between animate-in fade-in slide-in-from-top-4 duration-300 border border-white/20`}
      role="status"
      aria-label={label}
    >
      <div className="flex items-center gap-3">
        <span className="text-xl" aria-hidden="true">{icon}</span>
        <div className="font-bold text-sm tracking-tight leading-tight">
          {message}
        </div>
      </div>
      <button
        onClick={onClose}
        className="ml-4 p-1 hover:bg-black/10 rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-white"
        aria-label="Close notification"
      >
        ✕
      </button>
    </div>
  );
};

export default StatusFeedback;
