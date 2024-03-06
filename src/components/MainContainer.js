import React, { useEffect } from 'react'
import ButtonList from './ButtonList'
import VideoContainer from './VideoContainer'
import { useDispatch } from 'react-redux'
import {openMenu}  from '../Utils/appSlice'
 
const MainContainer = () => {
   const dispatch = useDispatch();
   useEffect(()=>{
     dispatch(openMenu())
   })
  return (
    <div className='flex flex-col mt-14 justify-center ml-44'>
       <ButtonList/>
       <VideoContainer/>   
    </div>
  )
}

export default MainContainer