import React, { useEffect } from 'react';

export type FeedbackType = 'success' | 'error' | 'info';

interface StatusFeedbackProps {
  message: React.ReactNode;
  type: FeedbackType;
  onClose: () => void;
  duration?: number;
}

const CONFIG: Record<FeedbackType, { bg: string; icon: string; label: string; text?: string }> = {
  success: { bg: 'bg-green-600', icon: '✅', label: 'Success' },
  error: { bg: 'bg-red-600', icon: '⚠️', label: 'Error' },
  info: { bg: 'bg-yellow-500', icon: 'ℹ️', label: 'Information', text: 'text-black' },
};

const StatusFeedback: React.FC<StatusFeedbackProps> = ({
  message,
  type,
  onClose,
  duration = 5000
}) => {
  const config = CONFIG[type];

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [onClose, duration, message]);

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-2rem)] max-w-md p-4 rounded-xl shadow-2xl flex items-center justify-between gap-3 transition-all duration-300 ${config.bg} ${config.text || 'text-white'}`}
    >
      <div className="flex items-center gap-3">
        <span className="text-xl" aria-hidden="true">{config.icon}</span>
        <div className="font-bold text-sm uppercase tracking-wider leading-tight">
          {message}
        </div>
      </div>
      <button
        onClick={onClose}
        className="p-1 hover:bg-black/10 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-white/20 shrink-0"
        aria-label="Close notification"
      >
        <span className="text-lg leading-none">✕</span>
      </button>
    </div>
  );
};

export default StatusFeedback;
