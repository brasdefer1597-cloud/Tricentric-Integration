import { useEffect } from 'react';
export type FeedbackType = 'success' | 'error' | 'info';
export default function StatusFeedback({ message, type, onClose }: { message: any; type: FeedbackType; onClose: () => void }) {
  useEffect(() => { if (message) { const t = setTimeout(onClose, 5000); return () => clearTimeout(t); } }, [message, onClose]);
  if (!message) return null;
  const s = { success: 'bg-green-600', error: 'bg-red-600', info: 'bg-yellow-500 text-black' }[type];
  return (
    <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-[100] p-4 rounded-xl border-2 text-white shadow-2xl animate-in fade-in slide-in-from-top-4 ${s}`} role="status">
      {message} <button onClick={onClose} className="ml-2 font-bold" aria-label="Close">✕</button>
    </div>
  );
}
