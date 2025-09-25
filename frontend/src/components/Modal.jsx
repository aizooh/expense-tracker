import React from 'react';

const Modal = ({ children, isOpen, onClose, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 right-0 left-0 z-50 flex items-center justify-center w-full h-[calc(100%-1rem)] max-h-full overflow-x-hidden bg-black/20  bg-opacity-50 overflow-y-auto">
      <div className="relative p-4  w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
          {/* Modal Header */}
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200 dark:border-gray-600 rounded-t">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">{title}</h3>
            <button
  type="button"
  onClick={onClose}
  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm inline-flex w-8 h-8 flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
>
  <svg
    className="w-3 h-3"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 14 14"
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M1 1l12 12M13 1L1 13"
    />
  </svg>
</button>

          </div>

          {/* Modal Body */}
          <div className="p-4 space-y-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
