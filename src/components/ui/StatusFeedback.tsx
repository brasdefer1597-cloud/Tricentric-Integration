import React, { useEffect } from 'react';

interface StatusFeedbackProps {
  message: string | null;
  type?: 'success' | 'error' | 'info';
  onClear: () => void;
  duration?: number;
  className?: string;
}

const StatusFeedback: React.FC<StatusFeedbackProps> = ({
  message,
  type = 'info',
  onClear,
  duration = 5000,
  className = '',
}) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(onClear, duration);
      return () => clearTimeout(timer);
    }
  }, [message, onClear, duration]);

  if (!message) return null;

  const bgStyles = {
    success: 'bg-green-600 border-green-500',
    error: 'bg-red-600 border-red-500',
    info: 'bg-blue-600 border-blue-500',
  };

  const icons = {
    success: '✅',
    error: '💀',
    info: 'ℹ️',
  };

  return (
    <div
      role="status"
      aria-live="polite"
      className={`px-6 py-4 rounded-xl border-2 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300 ${bgStyles[type]} text-white font-black flex items-center gap-3 ${className}`}
    >
      <span className="text-xl" aria-hidden="true">{icons[type]}</span>
      <p className="flex-1 uppercase tracking-tight text-sm">{message}</p>
      <button
        onClick={onClear}
        className="ml-2 hover:scale-110 transition-transform p-1"
        aria-label="Close notification"
      >
        ✕
      </button>
    </div>
  );
};

export default StatusFeedback;
