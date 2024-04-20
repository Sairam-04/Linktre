import React from "react";

const CreateLink = ({ onCreateLinkClick }) => {
  return (
    <div className="absolute text-white overflow-hidden w-[35%] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[50vh] z-[50] bg-[#2d312b] rounded-xl ">
      <div className="flex justify-between items-center px-2 pl-10">
        <div className="text-xl">Add New Link</div>
        <div className="cursor-pointer hover:text-red-500" onClick={() => onCreateLinkClick()}>
          <i className="bi bi-x text-4xl"></i>
        </div>
      </div>
      <div className="h-[1.75px] bg-white mx-4 mt-1 mb-2 rounded-lg"></div>
      <div className="inputfields flex flex-col gap-5 px-5 py-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="Type your Title"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="url">Url</label>
          <input
            type="text"
            name="url"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="Type your URL"
          />
        </div>
      </div>
      <div className="h-[1.75px] bg-white mx-4 mt-5 mb-4 rounded-lg"></div>
      <div className="flex justify-end px-4 items-center">
        <button className="bg-green-500 text-white px-5 py-1 text-xl rounded-lg">Submit</button>
      </div>
    </div>
  );
};

export default CreateLink;
