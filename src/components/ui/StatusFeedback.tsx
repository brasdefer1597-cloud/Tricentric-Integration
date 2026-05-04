import React, { useEffect, useState } from 'react';

export type FeedbackType = 'success' | 'error' | 'info';

interface StatusFeedbackProps {
  message: string;
  type?: FeedbackType;
  duration?: number;
  onDismiss?: () => void;
}

const StatusFeedback: React.FC<StatusFeedbackProps> = ({
  message,
  type = 'info',
  duration = 5000,
  onDismiss,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onDismiss?.();
    }, duration);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duration]);

  if (!isVisible) return null;

  const styles = {
    success: 'bg-green-600 border-green-400 text-white',
    error: 'bg-red-600 border-red-400 text-white',
    info: 'bg-yellow-500 border-yellow-400 text-black',
  };

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed bottom-8 right-8 z-[100] flex items-center gap-3 px-5 py-3 rounded-xl border-2 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-300 ${styles[type]}`}
    >
      <span className="text-xl" aria-hidden="true">{type === 'success' ? '✅' : type === 'error' ? '⚠️' : 'ℹ️'}</span>
      <p className="font-black uppercase tracking-wider text-[11px] leading-tight max-w-xs">{message}</p>
      <button onClick={() => { setIsVisible(false); onDismiss?.(); }} className="ml-2 hover:opacity-70 transition-opacity font-bold" aria-label="Close notification">✕</button>
    </div>
  );
};

export default StatusFeedback;
