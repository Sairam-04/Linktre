import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewLink, getAllLinks } from "../../features/links/slice";
const Landing = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const allLinks = useSelector((state) => state.links.links.data);
  const status = useSelector((state) => state.links.links.status);
  const addLinkStatus = useSelector((state) => state.links.newLink.status);
  const addLinkError = useSelector((state) => state.links.newLink.error);
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

  return <div>
    
    {status === "pending" ? <>Loading ...</> :  JSON.stringify(allLinks)}
    <hr /><br />
    <button onClick={()=> addLink()}
        disabled = {addLinkStatus === "pending"}
    >
        {
            addLinkStatus === "pending" ? "Loading ...." : "Add Link"
        }
    </button>

    <br /><br /><br />
    {
        error ? error : null
    }
</div>;
};

export default Landing;
