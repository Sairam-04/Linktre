import React from "react";
import VerticalDotsSVG from "./LinkComponentSVG";

const LinkComponent = ({linkData}) => {
  return (
    <div className="w-4/5 h-28 flex bg-[#d4ffd9] text-black rounded-xl">
      <VerticalDotsSVG />
      <div className="w-[82%] p-2 flex flex-col gap-4">
        <div className="flex flex-col text-lg">
          <div>{linkData.linkTitle}</div>
          <div>{linkData.linkUrl}</div>
        </div>
        <div className="flex gap-8">
          <i className="bi bi-pencil-square text-lg cursor-pointer"></i>
          <i className="bi bi-star text-lg cursor-pointer"></i>
          <i className="bi bi-bar-chart-fill text-lg cursor-pointer"></i>
        </div>
      </div>
      <div className="w-[10%] py-2 flex flex-col justify-between items-center">
        <label className="inline-flex items-center cursor-pointer">
          <input type="checkbox" value="" className="sr-only peer hidden" />
          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-0 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
        </label>
        <i className="bi bi-trash-fill text-xl cursor-pointer"></i>
      </div>
    </div>
  );
};

export default LinkComponent;
