import React, { useEffect } from 'react';

interface StatusFeedbackProps {
  message: string | React.ReactNode;
  type?: 'success' | 'error' | 'info';
  onClose: () => void;
  duration?: number;
}

const StatusFeedback: React.FC<StatusFeedbackProps> = ({
  message,
  type = 'info',
  onClose,
  duration = 5000
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const bgClasses = {
    success: 'bg-green-600 border-green-400',
    error: 'bg-red-600 border-red-400',
    info: 'bg-yellow-600 border-yellow-400',
  };

  const icons = {
    success: '✅',
    error: '❌',
    info: '💡',
  };

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed top-6 right-6 z-[100] flex items-center gap-3 px-6 py-4 rounded-2xl border-2 text-white font-black shadow-[0_0_30px_rgba(0,0,0,0.5)] animate-in fade-in slide-in-from-top-4 duration-300 ${bgClasses[type]}`}
    >
      <span className="text-xl" aria-hidden="true">{icons[type]}</span>
      <div className="uppercase tracking-widest text-sm flex flex-col gap-1">
        {message}
      </div>
      <button
        onClick={onClose}
        aria-label="Close notification"
        className="ml-4 hover:opacity-70 transition-opacity text-white"
      >
        ✕
      </button>
    </div>
  );
};

export default StatusFeedback;
