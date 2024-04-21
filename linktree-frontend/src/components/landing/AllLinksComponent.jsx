import React, { useEffect } from 'react'
import LinkComponent from './LinkComponent'
import { useDispatch, useSelector } from 'react-redux'
import { getAllLinks } from '../../features/links/slice';
import Loader from '../loaders/Loader';

const AllLinksComponent = () => {
  const dispatch = useDispatch();
  const allLinksData = useSelector((state) => state.links.links.data);
  const status = useSelector((state) => state.links.links.status);
  const err = useSelector((state) => state.links.links.error);
  const userData = useSelector((state) => state.users.fetchUserData.data)
  
  useEffect(()=>{
    dispatch(getAllLinks({username:userData?.username}));
  }, [])
  return (
    <div className='w-full h-screen overflow-y-auto flex flex-col gap-5 items-center'>
      {
        status === "pending" ? <Loader /> : (
          allLinksData.map((ele, ind) =>(
            <LinkComponent linkData = {ele} key={ind} />
          ))
        )
      }
    </div>
  )
}

export default AllLinksComponent
