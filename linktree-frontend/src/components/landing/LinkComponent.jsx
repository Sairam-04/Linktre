import React from "react";

const LinkComponent = () => {
  return (
    <div className="w-4/5 h-28 flex bg-[#d4ffd9] text-black rounded-xl">
      <div className="w-[8%] rounded-tl-xl rounded-bl-xl flex items-center cursor-move">
        <div
          className="flex items-center justify-center border-[#d7dce1] w-8 h-auto"
          tabindex="0"
        //   role="button"
          aria-describedby="rbd-hidden-text-0-hidden-text-0"
          data-rbd-drag-handle-draggable-id="327990947"
          data-rbd-drag-handle-context-id="0"
          draggable="false"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class=" "
            role="img"
            aria-hidden="false"
            aria-labelledby="ltclid27_title "
          >
            <title id="ltclid27_title">Move</title>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5 4C5.55228 4 6 3.55228 6 3C6 2.44772 5.55228 2 5 2C4.44772 2 4 2.44772 4 3C4 3.55228 4.44772 4 5 4ZM6 8C6 8.55228 5.55228 9 5 9C4.44772 9 4 8.55228 4 8C4 7.44772 4.44772 7 5 7C5.55228 7 6 7.44772 6 8ZM6 13C6 13.5523 5.55228 14 5 14C4.44772 14 4 13.5523 4 13C4 12.4477 4.44772 12 5 12C5.55228 12 6 12.4477 6 13ZM12 8C12 8.55228 11.5523 9 11 9C10.4477 9 10 8.55228 10 8C10 7.44772 10.4477 7 11 7C11.5523 7 12 7.44772 12 8ZM11 14C11.5523 14 12 13.5523 12 13C12 12.4477 11.5523 12 11 12C10.4477 12 10 12.4477 10 13C10 13.5523 10.4477 14 11 14ZM12 3C12 3.55228 11.5523 4 11 4C10.4477 4 10 3.55228 10 3C10 2.44772 10.4477 2 11 2C11.5523 2 12 2.44772 12 3Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
      </div>
      <div className="w-[82%] p-2 flex flex-col gap-4">
        <div className="flex flex-col text-lg">
          <div>LinkedIn</div>
          <div>https://linkedin.com/sairamramavath</div>
        </div>
        <div className="flex gap-8">
          <i className="bi bi-pencil-square text-lg"></i>
          <i className="bi bi-star text-lg"></i>
          <i className="bi bi-bar-chart-fill text-lg"></i>
        </div>
      </div>
      <div className="w-[10%] py-2 flex flex-col justify-between items-center">
        <label className="inline-flex items-center cursor-pointer">
          <input type="checkbox" value="" className="sr-only peer" />
          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-0 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
        </label>
        <i className="bi bi-trash-fill text-xl"></i>

      </div>
    </div>
  );
};

export default LinkComponent;
