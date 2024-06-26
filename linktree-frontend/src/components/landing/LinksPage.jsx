import React, { useEffect, useState } from "react";
import { getUser } from "../../utils/localStorage";
import AllLinksComponent from "./AllLinksComponent";
import CreateLink from "./CreateLink";
import MobileView from "./MobileView";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Popup from "../utilities/PopUpComponent";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LinksPage = () => {
  const [addLinkClick, setAddLinkClick] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [copyUrl, setCopyUrl] = useState("");
  const userData = useSelector((state) => state.users.fetchUserData.data);
  const userStatus = useSelector((state) => state.users.fetchUserData.status);
  const onCreateLinkClick = () => {
    setAddLinkClick(!addLinkClick);
  };
  useEffect(() => {
    if (userData && userData?.username) {
      setCopyUrl(
        `${window.location.protocol}//${window.location.hostname}:${window.location.port}/socials/${userData?.username}`
      );
    }
  }, [userData]);
  const copyText = async () => {
    try {
      await navigator.clipboard.writeText(copyUrl);
      setCopySuccess(true);
      setTimeout(() => {
        setCopySuccess(false);
      }, 2000);
    } catch (err) {
      setCopySuccess(false);
    }
  };

  return (
    <>
      <div
        className={`sm:w-full relative h-[91vh] flex px-4 py-1 ${
          addLinkClick ? "blur-sm" : ""
        }`}
      >
        <div className="sm:w-3/5 w-full h-full overflow-y-auto py-3 px-2 flex flex-col items-center pt-8 gap-8">
          <div className="w-full bg-[#2e2f2e] text-white flex justify-between items-center text-md p-2 mb-3 rounded-3xl">
            <span className="font-semibold">
              Your ConnectVerse is live :
              <a
                href={copyUrl ? copyUrl : ""}
                target="_blank"
                rel="noopener noreferrer"
                className="font-light text-blue-500 underline ml-2"
              >
                {copyUrl && copyUrl}
              </a>
            </span>
            <span className="flex gap-2 items-center">
              Share your links to your socials
              <button
                className="bg-[#b6b6b6] cursor-copy text-black px-2 py-1 text-md rounded-full shadow-inner"
                onClick={() => copyText()}
              >
                {" "}
                {copySuccess ? "copied" : "copy"}
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
        <div className="sm:flex hidden w-2/5 h-full border-l-[1px] border-green-100 px-5 flex-col justify-center items-center">
          <MobileView />
        </div>
      </div>
      {addLinkClick && (
        <Popup
          heading={"Add New Link"}
          isOpen={addLinkClick}
          onClose={onCreateLinkClick}
        >
          <CreateLink onCreateLinkClick={onCreateLinkClick} />
        </Popup>
      )}
      <ToastContainer />
    </>
  );
};

export default LinksPage;
