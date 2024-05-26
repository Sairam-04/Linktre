import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllLinks } from "../../features/links/slice";

const UserTreePage = () => {
  const { username } = useParams();
  console.log(username);
  const dispatch = useDispatch();
  const allLinksData = useSelector((state) => state.links.links.data);
  const status = useSelector((state) => state.links.links.status);
  const err = useSelector((state) => state.links.links.error);
  useEffect(() => {
    dispatch(getAllLinks({ username: username }));
  }, [dispatch]);
  return (
    <div className="h-screen w-full bg-gradient-to-b text-white from-black via-stone-800 to-gray-900 py-8 flex flex-col gap-5 items-center">
      <div className="userdetails flex flex-col gap-2">
        <div className="w-[80px] h-[80px] rounded-full bg-white text-black flex justify-center items-center text-3xl">
          {username[0]}
        </div>
        <div className="text-xl font-medium">@{username}</div>
      </div>
      <div className="flex flex-col w-[90%] justify-center gap-5 overflow-auto items-center">
        {status === "idle"
          ? allLinksData.map((ele, ind) => (
              <a className="mobileview__box__user" href={ele.linkUrl} target="_blank">
                <div></div>
                <div className="text-white">{ele.linkTitle}</div>
                <div className="mobileview__box__icon__user">
                  <i className="bi bi-three-dots"></i>
                </div>
              </a>
            ))
          : null}
      </div>
    </div>
  );
};

export default UserTreePage;
