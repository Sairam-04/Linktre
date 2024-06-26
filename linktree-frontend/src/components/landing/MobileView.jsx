import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const MobileView = () => {
  const dispatch = useDispatch();
  const allLinksData = useSelector((state) => state.links.links.data);
  const linkStatus = useSelector((state) => state.links.links.status);
  const err = useSelector((state) => state.links.links.error);
  const userData = useSelector((state) => state.users.fetchUserData.data);
  const userStatus = useSelector((state) => state.users.fetchUserData.status);
  return (
    <div className="border-4 h-[90%] dark:bg-gradient-to-b from-black via-stone-800 to-gray-900 w-[70%] rounded-3xl py-8 flex flex-col gap-5 items-center">
      <div className="userdetails flex flex-col gap-2">
        <div className="w-[80px] h-[80px] rounded-full dark:bg-white dark:text-black bg-black text-white flex justify-center items-center text-3xl">
          {userStatus === "idle" ? userData?.username[0] : ""}
        </div>
        <div className="text-xl font-medium">
          @{userStatus === "idle" ? userData?.username : ""}
        </div>
      </div>
      <div className="flex flex-col w-[90%] justify-center gap-5 overflow-auto">
        {linkStatus === "idle" ? (
          allLinksData.filter(ele => ele.visibility === true).map((ele, ind) => (
            <a className="mobileview__box" href={ele.linkUrl} target="_blank">
              <div></div>
              <div className="">{ele.linkTitle}</div>
              <div className="mobileview__box__icon">
                <i className="bi bi-three-dots"></i>
              </div>
            </a>
          ))
        ) : null}
      </div>
    </div>
  );
};

export default MobileView;
