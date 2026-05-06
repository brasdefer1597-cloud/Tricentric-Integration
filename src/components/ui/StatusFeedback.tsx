import React, { useEffect } from 'react';

export type FeedbackType = 'success' | 'error' | 'info';

interface StatusFeedbackProps {
  message: React.ReactNode;
  type?: FeedbackType;
  onClose: () => void;
  duration?: number;
}

const StatusFeedback: React.FC<StatusFeedbackProps> = ({
  message,
  type = 'info',
  onClose,
  duration = 5000,
}) => {
  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  const bgColors = {
    success: 'bg-green-600',
    error: 'bg-red-600',
    info: 'bg-yellow-600 text-white',
  };

  const icons = {
    success: '✓',
    error: '💀',
    info: '⚠️',
  };

  return (
    <div
      role="status"
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-[100] min-w-[320px] max-w-[90vw] p-4 rounded-2xl shadow-2xl flex items-center gap-4 animate-in fade-in slide-in-from-top-4 duration-300 ${bgColors[type]} text-white border border-white/20 backdrop-blur-md`}
    >
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20 text-xl shrink-0" aria-hidden="true">
        {icons[type]}
      </div>
      <div className="flex-1 text-sm font-black uppercase tracking-tight leading-tight">
        {message}
      </div>
      <button
        onClick={onClose}
        className="p-1 hover:bg-white/20 rounded-lg transition-colors shrink-0"
        aria-label="Close notification"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
      </button>
    </div>
  );
};

export default StatusFeedback;
