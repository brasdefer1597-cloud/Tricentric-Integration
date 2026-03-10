import React, { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  icon?: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, icon = '🎯', children }) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-in fade-in duration-300"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={onClose}
    >
      <div
        className="bg-gray-900 rounded-3xl p-8 max-w-lg w-full border-2 border-red-600 shadow-[0_0_50px_rgba(220,38,38,0.2)] animate-in zoom-in-95 duration-300"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="text-center mb-8">
          <span className="text-6xl block mb-4 filter drop-shadow-lg" aria-hidden="true">
            {icon}
          </span>
          <h3 id="modal-title" className="text-3xl font-black text-white uppercase tracking-tighter">
            {title}
          </h3>
          <div className="h-1 w-20 bg-red-600 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="text-gray-200 leading-relaxed mb-8 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
            {children}
        </div>

        <div className="text-center">
          <button
            onClick={onClose}
            aria-label="Cerrar diagnóstico"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-4 px-8 rounded-2xl transition-all shadow-lg active:scale-95 uppercase tracking-widest text-sm"
          >
            ENTENDIDO
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
