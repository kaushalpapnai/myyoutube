import React, { useEffect } from 'react'
import VideoContainer from './VideoContainer'
import { useDispatch } from 'react-redux'
import {openMenu}  from '../Utils/appSlice'
import ButtonCarousel from './ButtonCarousel'
 
const MainContainer = () => {
   const dispatch = useDispatch();
   useEffect(()=>{
     dispatch(openMenu())
   })
  return (
    <>
    <div className=' ml-44 border border-green-400 mt-20 w-screen'>
       {/* <ButtonCarousel /> */}
       <VideoContainer/>   
    </div>
    
    </>
  )
}

export default MainContainer