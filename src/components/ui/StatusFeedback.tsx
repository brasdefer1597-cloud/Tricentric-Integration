import React, { useEffect } from 'react';

export type FeedbackType = 'success' | 'error' | 'info';

interface StatusFeedbackProps {
  message: React.ReactNode;
  type: FeedbackType;
  onClose: () => void;
  duration?: number;
}

const StatusFeedback: React.FC<StatusFeedbackProps> = ({ message, type, onClose, duration = 5000 }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration, message]);

  const bgColor = {
    success: 'bg-green-600',
    error: 'bg-red-600',
    info: 'bg-yellow-500 text-black',
  }[type];

  const icon = { success: '✅', error: '⚠️', info: 'ℹ️' }[type];

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-[100] min-w-[300px] max-w-[90vw] p-4 rounded-xl shadow-2xl flex items-center gap-4 border border-white/20 animate-in fade-in slide-in-from-top-4 duration-300 ${bgColor} text-white font-bold`}
    >
      <span className="text-xl" aria-hidden="true">{icon}</span>
      <div className="flex-1 text-sm tracking-wide">{message}</div>
      <button onClick={onClose} className="p-1 hover:bg-black/10 rounded transition-colors" aria-label="Close notification">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

export default StatusFeedback;
