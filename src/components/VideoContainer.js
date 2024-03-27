import React, { useEffect, useState } from 'react'
import {YOUTUBE_API} from '../Utils/config'
import VideoCard from './VideoCard'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { toggleMenu } from '../Utils/appSlice'


const VideoContainer = () => {
  const [videoInfo,setVideoInfo] = useState([])

   useEffect(()=>{
     getVideos()
   },[])

   const getVideos = async ()=>{
    const data = await fetch(YOUTUBE_API)
    const json = await data.json()
    // console.log(json)
    setVideoInfo(json.items)
   }

  return (
    <>
       <div className='grid 2xl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1  '>
          {videoInfo.map((items)=>{
            return <Link key={items.id} to={"/watch?v="+items.id} >
                <VideoCard  info={items}/>
            </Link>
          })}
       </div>
    
    </>
  )
}

export default VideoContainer