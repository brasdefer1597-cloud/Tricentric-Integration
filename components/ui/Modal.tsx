import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  icon?: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, icon = '🎯', children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-gray-900 rounded-xl p-8 max-w-md mx-4 border-4 border-red-500 shadow-2xl animate-scaleIn">
        <div className="text-center mb-6">
          <span className="text-5xl block mb-4">{icon}</span>
          <h3 className="text-2xl font-bold text-yellow-400 mb-2">{title}</h3>
        </div>
        <div className="text-gray-300 italic text-sm mb-6">
          {children}
        </div>
        <div className="text-center">
          <button
            onClick={onClose}
            className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-6 rounded-lg transition-all"
          >
            UNDERSTOOD
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
