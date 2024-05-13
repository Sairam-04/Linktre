import React, { useEffect, useState } from "react";
import { getUser } from "../../utils/localStorage";
import AllLinksComponent from "./AllLinksComponent";
import CreateLink from "./CreateLink";

const LinksPage = () => {
  const [addLinkClick, setAddLinkClick] = useState(false);
  const onCreateLinkClick = () =>{
    setAddLinkClick(!addLinkClick);
  }
  return (
    <>
      <div className={`w-full relative h-[91vh] flex px-4 py-1 ${addLinkClick ? "blur-sm" : ""}`}>
      <div className="w-3/5 h-full overflow-y-auto py-3 px-2 flex flex-col items-center pt-8 gap-8">
        <div className="w-full bg-[#2e2f2e] text-white flex justify-between items-center text-md p-2 mb-3 rounded-3xl">
          <span className="font-semibold">
            Your ConnectVerse is live :
            <span className="font-light"> http://kfdfkd:123lgd</span>
          </span>
          <span className="flex gap-2 items-center">
            Share your links to your socials
            <button className="bg-[#b6b6b6] cursor-copy text-black px-2 py-1 text-md rounded-full shadow-inner">
              {" "}
              Copy Here
            </button>
          </span>
        </div>
        <button
          className="flex bg-[#3c7d54] w-[60%] py-2 text-white text-lg gap-3 items-center justify-center
            rounded-2xl"
            onClick={onCreateLinkClick}
        >
          <span>
            <i className="bi bi-plus-circle flex items-center"></i>
          </span>
          <span>Add Link</span>
        </button>
        <AllLinksComponent />
      </div>
      <div className="w-2/5 h-full border-l-[1px] border-green-100"></div>
    </div>
    {
        addLinkClick && (
          <CreateLink onCreateLinkClick={onCreateLinkClick} />
        )
      }
    </>
    
  );
};

export default LinksPage;
