import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deleteLinkContent } from "../../features/links/slice";

const DeleteLink = ({ linkData, onDeleteClick }) => {
  const dispatch = useDispatch();
  const [deleteClick, setDeleteClick] = useState(false);
  const userData = useSelector((state) => state.users.fetchUserData.data);

  const deleteData = () => {
    setDeleteClick(!deleteClick);
    dispatch(
      deleteLinkContent({
        username: userData.username,
        id: linkData._id,
      })
    );
  };

  const deleteLinkStatus = useSelector(
    (state) => state.links.deleteLinkData.status
  );
  const deleteLinkError = useSelector(
    (state) => state.links.deleteLinkData.error
  );

  useEffect(() => {
    if (deleteClick && deleteLinkStatus === "init") {
      toast.success(`Deleted link: ${linkData.linkTitle}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (deleteClick && deleteLinkStatus === "rejected") {
      toast.error("Failed to delete the link.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }, [deleteClick, deleteLinkStatus, linkData.linkTitle]);

  return (
    <div className="px-5 py-2 flex flex-col gap-7 w-full">
      <div className="text-xl">
        Are you sure you want to delete "{linkData.linkTitle}" this item ?
      </div>
      <div className="flex gap-4 items-end">
        <button
          className="bg-red-400 text-white px-5 py-2 text-xl rounded-lg hover:scale-105 hover:bg-red-500"
          onClick={()=>deleteData()}
        >
          Delete
        </button>
        <button
          className="bg-[#4f96b0] text-white px-5 py-2 text-xl rounded-lg hover:scale-105 hover:bg-[#316172]"
          onClick={() => onDeleteClick() } // Optionally handle cancel button
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteLink;
