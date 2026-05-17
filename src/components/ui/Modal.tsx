import React, { useEffect, useRef } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  icon?: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, icon = '🎯', children }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    // Save previous focus
    previousFocusRef.current = document.activeElement as HTMLElement;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }

      if (event.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Set focus to the modal or the first focusable element
    if (modalRef.current) {
        const firstFocusable = modalRef.current.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])') as HTMLElement;
        if (firstFocusable) {
            firstFocusable.focus();
        }
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      // Restore previous focus
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    };
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
        ref={modalRef}
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
            aria-label="Close diagnosis"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-4 px-8 rounded-2xl transition-all shadow-lg active:scale-95 uppercase tracking-widest text-sm focus-visible:ring-2 focus-visible:ring-red-400 focus:outline-none"
          >
            UNDERSTOOD
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
