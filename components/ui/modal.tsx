import React, { ReactNode } from 'react';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div onClick={onClose} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm z-50">
      <div onClick={(e) => e.stopPropagation()} className="bg-gray-900 rounded-xl p-8 shadow-2xl max-w-lg w-full relative border border-gray-700 text-white">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl text-gray-300 hover:text-gray-100"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
