import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewLink, deleteLinkContent, getAllLinks, updateLinkContent } from "../../features/links/slice";
const Landing = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const allLinks = useSelector((state) => state.links.links.data);
  const status = useSelector((state) => state.links.links.status);
  const addLinkStatus = useSelector((state) => state.links.newLink.status);
  const addLinkError = useSelector((state) => state.links.newLink.error);
  const deleteLinkStatus = useSelector((state) => state.links.deleteLinkData.status);
  const updateLinkStatus = useSelector((state) => state.links.updateLinkData.status);
  useEffect(() => {
    dispatch(
      getAllLinks({
        username: "sairam",
      })
    );
  }, []);

  useEffect(()=>{
    if(addLinkStatus === "rejected"){
        setError(addLinkError);
    }
  }, [addLinkStatus])

  const addLink = () =>{
    dispatch(addNewLink({
        linkTitle: "ansdjsndjsndjs",
        linkUrl: "nfjdnfdfjdnf",
        username: "sairam"
    }))
  }

  const deleteData = () =>{
    dispatch(deleteLinkContent({
      username: "sairam",
      id: "65f6c89c5fac1a2557fdd347"
    }))
  }

  const updateData = () => {
    dispatch(updateLinkContent({
      username: "sairam",
      id: "65f2de9ba0ae8ed5bbff95cb",
      "visibility": false,
      "isStarred" : false,
      "linkTitle" : "Instagram"
    }))
  }

  return <div>
    
    {status === "pending" ? <>Loading ...</> :  allLinks.map((ele, ind)=> (
      <div className="text-center" key={ind}>{ele.linkTitle}</div>
    ))}
    <hr /><br />
    <button onClick={()=> addLink()}
        disabled = {addLinkStatus === "pending"}
    >
        {
            addLinkStatus === "pending" ? "Loading ...." : "Add Link"
        }
    </button>

    <br /><br /><br />

    <button onClick={()=> deleteData()}
        disabled = {deleteLinkStatus === "pending"}
    >
        {
            deleteLinkStatus === "pending" ? "Loading ...." : "Delete Link"
        }
    </button>

    <br /><br /><br />

    
    <button onClick={()=> updateData()}
        disabled = {updateLinkStatus === "pending"}
    >
        {
            updateLinkStatus === "pending" ? "Loading ...." : "Update Link"
        }
    </button>

    <br /><br /><br />

    {
        error ? error : null
    }
</div>;
};

export default Landing;
