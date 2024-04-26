import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { closeMenu } from '../Utils/appSlice'
import { useSearchParams } from 'react-router-dom'
import CommmentSec from './CommmentSec'
import LiveChat from './LiveChat'
import RelatedVideo from './RelatedVideoContainer'
import VideoDetails from './VideoDetails'

const WatchVideo = () => {
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(closeMenu())
    },[])
    const [searchParams] = useSearchParams()

    useEffect(()=>{
          window.scrollTo({
            top:0,
          })
    },[searchParams.get("v")])
 
  return (
    <div className='px-5 mt-20 ml-2 w-full flex'>
        <div className='flex  justify-center flex-col w-fit h-fit'>
          <div> 
              <iframe 
              className=' rounded-xl'
              width="850" 
              height="510" 
              src={"https://www.youtube.com/embed/" + searchParams.get("v") }
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              allowFullScreen>
              </iframe>     
          </div>
        <div className=' w-full'>
          <VideoDetails VideoId={searchParams.get("v")}/>
         <CommmentSec videoId={searchParams.get("v")}/>
        </div>
        </div>
          <div className='w-fit ml-3 '>
             <LiveChat />
             <RelatedVideo videoId={searchParams.get("v")}/>
          </div>
    </div>
  )
}

export default WatchVideo