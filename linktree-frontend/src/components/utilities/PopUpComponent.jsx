import React from "react";

const Popup = ({ heading, isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"></div>
      <div className="absolute text-white overflow-hidden w-[35%] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-fit py-5 max-h-fit z-50 bg-[#2d312b] rounded-xl drop-shadow-[0_35px_35px_rgba(0,0,0,2)]">
        <div className="flex justify-between items-center px-2 pl-10">
          <div className="text-xl">{heading}</div>
          <div
            className="cursor-pointer hover:text-red-500"
            onClick={() => onClose()}
          >
            <i className="bi bi-x text-4xl"></i>
          </div>
        </div>
        <div className="h-[1.75px] bg-white mx-4 mt-1 mb-2 rounded-lg"></div>
        <div className='h-fit'>
            {children}
        </div>
      </div>
    </>
  );
};

export default Popup;
