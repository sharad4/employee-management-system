import React from 'react'

const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'>
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                <button
                 onClick={onClose}
                 className='absolute top-4 right-4 text-gray-400 hover:text-gray-600'
                >
                    ×
                </button>
            </div>
            <div className="p-6">
                {children}
            </div>
        </div>
    </div>
  );
};

export default Modal;