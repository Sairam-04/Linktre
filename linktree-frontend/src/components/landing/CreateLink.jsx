import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewLink } from "../../features/links/slice";

const CreateLink = ({ onCreateLinkClick }) => {
  const [linkInputData, setLinkInputData] = useState({
    linkTitle: "",
    linkUrl: "",
  });
  const [errors, setErrors] = useState({});
  const [addLinkAPIError, setAddLinkAPIError] = useState();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.users.fetchUserData.data);
  const addLinkStatus = useSelector((state) => state.links.newLink.status);
  const addLinkError = useSelector((state) => state.links.newLink.error);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLinkInputData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const validateForm = (values) => {
    const errors = {};
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/
    if (!values.linkTitle) {
      errors.linkTitle = "Title is Required";
    } else if (values.linkTitle.length < 3) {
      errors.linkTitle = "Title length should be more than 3 characters";
    }

    if (!values.linkUrl) {
      errors.linkUrl = "URL is Required";
    } else if (!urlRegex.test(values.linkUrl)) {
      errors.linkUrl = "URL is not Valid";
    }
    return errors;
  };

  const submitLink = (e) => {
    e.preventDefault();
    const errors = validateForm(linkInputData);
    setErrors(errors);
    if (!Object.keys(errors).length && !addLinkAPIError) {
      dispatch(
        addNewLink({
          linkTitle: linkInputData.linkTitle,
          linkUrl: linkInputData.linkUrl,
          username: userData?.username,
        })
      );
      addLinkAPIError("");
      onCreateLinkClick();
    }
  };

  useEffect(() => {
    if (addLinkStatus === "rejected") {
      setAddLinkAPIError(addLinkError);
    }
  }, [addLinkStatus]);

  return (
    <div
      className="absolute text-white overflow-hidden w-[35%] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[50vh] max-h-fit z-[50] bg-[#2d312b] rounded-xl drop-shadow-[0_35px_35px_rgba(0,0,0,2)]"
      onSubmit={submitLink}
    >
      <div className="flex justify-between items-center px-2 pl-10">
        <div className="text-xl">Add New Link</div>
        <div
          className="cursor-pointer hover:text-red-500"
          onClick={() => onCreateLinkClick()}
        >
          <i className="bi bi-x text-4xl"></i>
        </div>
      </div>
      <div className="h-[1.75px] bg-white mx-4 mt-1 mb-2 rounded-lg"></div>
      <div className="inputfields flex flex-col gap-5 px-5 py-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="linkTitle">Title</label>
          <input
            type="text"
            name="linkTitle"
            value={linkInputData.linkTitle}
            onChange={handleChange}
            className="input-field"
            placeholder="Type your Title"
          />
          {errors && (
              <div className="text-red-500 text-sm pl-2 pt-1">{errors.linkTitle}</div>
            )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="linkUrl">Url</label>
          <input
            type="text"
            name="linkUrl"
            value={linkInputData.linkUrl}
            onChange={handleChange}
            className="input-field"
            placeholder="Type your URL"
          />
          {errors && (
              <div className="text-red-500 text-sm pl-2 pt-1">{errors.linkUrl}</div>
            )}
        </div>
      </div>
      {
        addLinkAPIError ? <div className="text-red-500 text-sm">{addLinkAPIError}</div> : null
      }
      <div className="h-[1.75px] bg-white mx-4 mt-5 mb-4 rounded-lg"></div>
      <div className="flex justify-end px-4 items-center">
        <button
          onClick={submitLink}
          disabled={addLinkStatus === "pending"}
          className="bg-green-500 text-white px-5 py-1 text-xl rounded-lg"
        >
          {addLinkStatus === "pending" ? (
            <svg aria-hidden="true" role="status" class="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
            </svg>
          ) : <></>}
          {"  "}Submit
        </button>
      </div>
    </div>
  );
};

export default CreateLink;
