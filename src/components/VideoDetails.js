import React, { useEffect, useState } from 'react'
import { api_key } from '../Utils/config';
import { BiLike } from 'react-icons/bi'
import { BiDislike } from 'react-icons/bi';
import { FaShareSquare } from 'react-icons/fa';
import { FaDownload } from 'react-icons/fa';

const VideoDetails = ({VideoId}) => {

    const [videoInfo,setVideoInfo] = useState([]);
    const [channelId,setChannelId] = useState("");
    const [ChannelInfo,setChannelInfo] = useState([]);
    const [videoInfoTwo,setVideoInfoTwo] = useState([]);
    const [ChannelInfoTwo, setChannelInfoTwo] = useState();
    const [descriptionText,setDescriptionText] = useState();
    const [desButton , setDesButton] = useState("...more")

     useEffect(()=>{
        VideoApi()
     },[VideoId])

    useEffect(()=>{
        channelApi()
    },[videoInfo])
   
    const ApiKey = api_key;

    const VideoApi= async()=>{
        const data = await fetch(`https://www.googleapis.com/youtube/v3/videos?id=${VideoId}&key=${ApiKey}&part=snippet,statistics`);
        const json = await data.json();
        // console.log(json)
        setVideoInfo(json?.items)
        setChannelId(json?.items[0]?.snippet?.channelId)

    }


    const channelApi=async()=>{
       const data = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics&id=${channelId}&key=${ApiKey}`)
       const json = await data.json()
       setChannelInfo(json)
        
    }

    const views = (views) => {
      if (views >= 1000000) {
          return (views / 1000000).toFixed(1) + 'm';
      } else if (views >= 1000) {
          return (views / 1000).toFixed(0) + 'k';
      } else {
          return views;
      }
  }

  function formatRelativeTime(timeString) {
    const currentTime = new Date();
    const givenTime = new Date(timeString);
    const timeDifference = currentTime - givenTime;

    const minute = 60 * 1000;
    const hour = minute * 60;
    const day = hour * 24;
    const week = day * 7;
    const month = day * 30;
    const year = day * 365;

    if (timeDifference < minute) {
        return 'Just now';
    } else if (timeDifference < hour) {
        const minutes = Math.floor(timeDifference / minute);
        return minutes + (minutes === 1 ? ' minute ago' : ' minutes ago');
    } else if (timeDifference < day) {
        const hours = Math.floor(timeDifference / hour);
        return hours + (hours === 1 ? ' hour ago' : ' hours ago');
    } else if (timeDifference < week) {
        const days = Math.floor(timeDifference / day);
        return days + (days === 1 ? ' day ago' : ' days ago');
    } else if (timeDifference < month) {
        const weeks = Math.floor(timeDifference / week);
        return weeks + (weeks === 1 ? ' week ago' : ' weeks ago');
    } else if (timeDifference < year) {
        const months = Math.floor(timeDifference / month);
        return months + (months === 1 ? ' month ago' : ' months ago');
    } else {
        const years = Math.floor(timeDifference / year);
        return years + (years === 1 ? ' year ago' : ' years ago');
    }
}
   
  
   const handleClick=()=>{
     if( descriptionText && descriptionText.length<300){
      const text = videoInfoTwo[0]?.description
      setDescriptionText(text)
      setDesButton("...show less")
     }
     if(descriptionText && descriptionText.length>300){
      setDescriptionText(descriptionText.slice(0,200))
      setDesButton("...more")
     }
   }

    useEffect(()=>{
      if(videoInfo != null){
        // {console.log(videoInfo)}
         const video = videoInfo?.map((items)=>(
            {
              videoTitle : items?.snippet?.title,
              channelTitle : items?.snippet?.channelTitle,
              publishedAt : items?.snippet?.publishedAt,
              description : items?.snippet?.description,
              viewCount : items?.statistics?.viewCount,
              likeCount : items?.statistics?.likeCount,
              commentCount : items?.statistics?.commentCount,
            }       
        )
        ) 
        setVideoInfoTwo(video)
  
      }
    },[videoInfo])

    useEffect(()=>{
      if(ChannelInfo?.items){
        const info = ({
          imgUrl : ChannelInfo?.items[0]?.snippet?.thumbnails?.default?.url,
          subCount : ChannelInfo?.items[0]?.statistics?.subscriberCount,
        })
        setChannelInfoTwo(info)
      }
    },[ChannelInfo])

    useEffect(()=>{
      const text = videoInfoTwo[0]?.description
      const slicedText = text && text.length > 200 ? text.slice(0,200) : text
      setDescriptionText(slicedText)
    },[videoInfoTwo])

  return (
    <>  
        <p className='font-bold text-xl mt-2'>{videoInfoTwo[0]?.videoTitle}</p>
        <div className='flex mt-3 items-center justify-between'>
          <div  className='flex items-center'>
            <div className='w-11 h-11 rounded-fulljustify-center items-center mr-2' >
             <img className='rounded-full' src={ChannelInfoTwo?.imgUrl}></img>
            </div>
             <div className='flex flex-col'>
                <p className='font-medium'>{videoInfoTwo[0]?.channelTitle}</p>
                <p className='text-xs font-light text-gray-800'>{views(ChannelInfoTwo?.subCount) + '  subscribers'}</p>
             </div>
             <div className='bg-black text-white p-2 ml-4 rounded-full pl-4 pr-4 cursor-pointer hover:bg-gray-700'>
              <button>Subscribe</button>
             </div>
          </div>
          <div className='flex items-center'>
            <div className='flex items-center bg-red-50 justify-between w-32 rounded-3xl'>
              <div className='flex items-center border-r cursor-pointer border-gray-300 w-4/6 hover:bg-red-100 p-2 rounded-l-full '>
                  <BiLike className='text-2xl '/>  
                 <p className='ml-2'>{views(videoInfoTwo[0]?.likeCount)}</p>
              </div>
              <div className='flex items-center cursor-pointer p-2 rounded-r-full hover:bg-red-100'>
                <BiDislike className='text-2xl '/>
              </div>
            </div>
            <div className='flex items-center m-2 bg-red-50 p-2 rounded-full pl-4 pr-4 hover:bg-red-100 cursor-pointer'>
              <FaShareSquare className='mr-2'/>
              <button>share</button>
            </div>
            <div className='flex items-center m-2 bg-red-50 p-2 rounded-full pl-4 pr-4 hover:bg-red-100 cursor-pointer'>
              <FaDownload className='mr-2'/>
              <button>download</button>
            </div>
          </div>
        </div>
        <div className='bg-red-50 box-border mt-2 rounded-xl p-4'>
          <div className='flex text-sm font-medium text-gray-900'>
           <p className='mr-2'>{views(videoInfoTwo[0]?.viewCount) + " views"}</p>
           <p>{formatRelativeTime(videoInfoTwo[0]?.publishedAt)}</p>
          </div>
           <p className='mt-2 font-sans text-sm' onClick={()=>handleClick()}>{descriptionText} {descriptionText && descriptionText.length<200 ? null : <button className='font-bold ml-2' onClick={()=>handleClick()}>{desButton}</button>}</p>
        </div>
    </>
  )
}

export default VideoDetails


