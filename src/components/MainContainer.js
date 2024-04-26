import React, { useEffect } from 'react'
import VideoContainer from './VideoContainer'
import { useDispatch } from 'react-redux'
import {openMenu}  from '../Utils/appSlice'
import { useSelector } from 'react-redux'
 
const MainContainer = () => {
  
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(openMenu())
  },[])
  const appSlice = useSelector((store)=>store.app.isMenuOpen) 
  return (
    <>
    <div className={` border border-green-400 mt-20 w-screen ml-${appSlice? "44" : "none"}`}>
       {/* <ButtonCarousel /> */}
       <VideoContainer/>   
    </div>
    
    </>
  )
}

export default MainContainer