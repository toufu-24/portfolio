import React, { ReactNode, useEffect } from 'react';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    if(isOpen){
      document.body.style.overflow = 'hidden';
    }
    else{
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-gray-900 rounded-xl p-8 shadow-2xl w-full max-w-lg max-h-[80vh] overflow-auto relative border border-gray-700 text-white"
        onClick={(e) => e.stopPropagation()}
      >
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
