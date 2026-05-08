import React, { useEffect, ReactNode } from 'react';

interface StatusFeedbackProps {
  message: ReactNode;
  type?: 'success' | 'error' | 'info';
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
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration, message]);

  const bgColor = {
    success: 'bg-green-600',
    error: 'bg-red-600',
    info: 'bg-yellow-500 text-black',
  }[type];

  const icon = {
    success: '✅',
    error: '⚠️',
    info: 'ℹ️',
  }[type];

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300 ${bgColor} ${type === 'info' ? 'text-black' : 'text-white'} font-bold border border-white/20`}
    >
      <span className="text-xl" aria-hidden="true">{icon}</span>
      <div className="text-sm tracking-tight">{message}</div>
      <button
        onClick={onClose}
        aria-label="Close notification"
        className="ml-2 hover:opacity-70 transition-opacity"
      >
        ✕
      </button>
    </div>
  );
};

export default StatusFeedback;
