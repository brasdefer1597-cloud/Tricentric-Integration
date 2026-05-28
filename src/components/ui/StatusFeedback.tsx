import React, { useEffect, useState } from 'react';

export type FeedbackType = 'success' | 'error' | 'info';

interface StatusFeedbackProps {
  message: React.ReactNode;
  type: FeedbackType;
  onClose: () => void;
  duration?: number;
}

const StatusFeedback: React.FC<StatusFeedbackProps> = ({
  message,
  type,
  onClose,
  duration = 5000,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Small delay to trigger entry animation
    const timer = setTimeout(() => setIsVisible(true), 10);

    const dismissTimer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Wait for exit animation
    }, duration);

    return () => {
      clearTimeout(timer);
      clearTimeout(dismissTimer);
    };
  }, [onClose, duration, message]);

  const config: Record<FeedbackType, { bg: string; icon: string; label: string }> = {
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
      bg: 'bg-yellow-500 text-black',
      icon: 'ℹ️',
      label: 'Information'
    }
  };

  const { bg, icon, label } = config[type];

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-2rem)] max-w-md transition-all duration-300 ease-out transform ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
      }`}
    >
      <div className={`${bg} px-6 py-4 rounded-2xl shadow-2xl flex items-center justify-between border-2 border-black/10 backdrop-blur-md ${type === 'info' ? 'text-black' : 'text-white'}`}>
        <div className="flex items-center gap-4">
          <span className="text-2xl" aria-hidden="true">{icon}</span>
          <div className="font-black uppercase tracking-tighter text-sm leading-tight">
            <span className="sr-only">{label}: </span>
            {message}
          </div>
        </div>
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(onClose, 300);
          }}
          className="ml-4 hover:scale-110 transition-transform p-1"
          aria-label="Close notification"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default StatusFeedback;
