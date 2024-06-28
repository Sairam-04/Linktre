import React, { useEffect, useState } from "react";
import VerticalDotsSVG from "./LinkComponentSVG";
import EditLinkComponent from "./EditLinkComponent";
import Popup from "../utilities/PopUpComponent";
import DeleteLink from "./DeleteLink";
import { useDispatch, useSelector } from "react-redux";
import { updateLinkContent } from "../../features/links/slice";
import { toast, Slide } from "react-toastify";


const LinkComponent = ({ linkData }) => {
  const [editClick, setEditClick] = useState(false);
  const [deleteClick, setDeleteClick] = useState(false);
  const [visibility, setVisibility] = useState(linkData.visibility);
  const [tempVisibility, setTempVisibility] = useState(linkData.visibility);
  const dispatch = useDispatch();
  const updateLinkStatus = useSelector(
    (state) => state.links.updateLinkData.status
  );
  const updateLinkError = useSelector(
    (state) => state.links.updateLinkData.error
  );
  const userData = useSelector((state) => state.users.fetchUserData.data);

  const updateData = (newVisibility) => {
    dispatch(
      updateLinkContent({
        username: userData.username,
        id: linkData._id,
        visibility: newVisibility,
      })
    );
  };

  const handleVisibilityChange = () => {
    const newVisibility = !visibility;
    setTempVisibility(newVisibility);
    updateData(newVisibility);
  };

  useEffect(() => {
    if (updateLinkStatus === "init" || !updateLinkError) {
      setVisibility(tempVisibility);
      // toast.success(`Updated the Link - ${linkData.linkTitle}`, {
      //   position: "top-right",
      //   autoClose: 5000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "colored",
      //   transition: Slide,
      // });
    } else if (updateLinkStatus === "rejected") {
      setTempVisibility(visibility);
    }
  }, [updateLinkStatus, updateLinkError]);

  const onEditClick = () => {
    setEditClick(!editClick);
  };

  const onDeleteClick = () => {
    setDeleteClick(!deleteClick);
  };
  return (
    <>
      <div className="w-4/5 h-28 flex bg-[#2e2f2e] text-white rounded-xl">
        <VerticalDotsSVG />
        <div className="w-[82%] p-2 flex flex-col gap-4">
          <div className="flex flex-col text-lg">
            <div>{linkData.linkTitle}</div>
            <div>{linkData.linkUrl}</div>
          </div>
          <div className="flex gap-8">
            <i
              className="bi bi-pencil-square text-lg cursor-pointer hover:scale-125"
              onClick={() => onEditClick()}
            ></i>
            <i className="bi bi-star text-lg cursor-pointer hover:scale-125"></i>
            <i className="bi bi-bar-chart-fill text-lg cursor-pointer hover:scale-125"></i>
          </div>
        </div>
        <div className="w-[10%] py-2 flex flex-col justify-between items-center">
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={visibility}
              onChange={handleVisibilityChange}
              name="visibility"
              className="sr-only peer hidden"
            />
            <div className="relative w-11 h-6 bg-[#727579] peer-focus:outline-none peer-focus:ring-0 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-[#4a4a4a] peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#3c7d54]"></div>
          </label>
          <i
            className="bi bi-trash-fill text-xl cursor-pointer hover:scale-125 hover:text-red-400"
            onClick={() => onDeleteClick()}
          ></i>
        </div>
      </div>
      {editClick && (
        <Popup heading={"Edit Link"} isOpen={editClick} onClose={onEditClick}>
          <EditLinkComponent linkData={linkData} onEditClick={onEditClick} />
        </Popup>
      )}
      {deleteClick && (
        <Popup
          heading={"Delete Link"}
          isOpen={deleteClick}
          onClose={onDeleteClick}
        >
          <DeleteLink linkData={linkData} onDeleteClick={onDeleteClick} />
        </Popup>
      )}
    </>
  );
};

export default LinkComponent;
