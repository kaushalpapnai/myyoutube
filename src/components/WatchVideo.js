import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { closeMenu } from '../Utils/appSlice'
import { useSearchParams } from 'react-router-dom'

const WatchVideo = () => {
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(closeMenu())
    },[])
    const [searchParams] = useSearchParams()
    console.log(searchParams.get("v"))
 
  return (
    <div className='px-5 mt-2 ml-2'>
         <iframe 
         width="750" 
         height="400" 
         src={"https://www.youtube.com/embed/" + searchParams.get("v") }
         title="YouTube video player" 
         frameBorder="0" 
         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
         allowFullScreen>
         </iframe>
    </div>
  )
}

export default WatchVideo