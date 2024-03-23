import React, { useEffect, useState } from 'react'
import { api_key } from '../Utils/config';

const VideoDetails = ({VideoId}) => {

    const [videoInfo,setVideoInfo] = useState([]);
    const [channelId,setChannelId] = useState("");
    const [ChannelInfo,setChannelInfo] = useState("");

     useEffect(()=>{
        VideoApi()
     },[])

    useEffect(()=>{
        channelApi()
    },[videoInfo])
   
    const ApiKey = api_key;

    const VideoApi= async()=>{
        const data = await fetch(`https://www.googleapis.com/youtube/v3/videos?id=${VideoId}&key=${ApiKey}&part=snippet`);
        const json = await data.json();
        // console.log(json)
        setVideoInfo(json?.items[0]?.snippet)
        setChannelId(json?.items[0]?.snippet?.channelId)
        console.log(json?.items[0]?.snippet?.channelId)

    }


    const channelApi=async()=>{
       const data = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics&id=${channelId}&key=${ApiKey}`)
       const json = await data.json()
       setChannelInfo(json)
        
    }

  return (
    <>  
        {ChannelInfo.items != null ? <div>
        <img src={ChannelInfo?.items[0]?.snippet?.thumbnails?.default?.url}></img>
        <p>{ChannelInfo?.items[0]?.statistics?.subscriberCount}</p>
        <p>{ChannelInfo?.items[0]?.statistics?.viewCount}</p>
        </div> : null}
        {ChannelInfo.items != null ? console.log(videoInfo) : null}
        {videoInfo? <div>
        <h1>{videoInfo?.title}</h1>
        <p>{videoInfo?.channelTitle}</p>
        <p>{videoInfo?.publishedAt}</p>
        <p>{videoInfo?.description}</p>
        </div> : null}
    </>
  )
}

export default VideoDetails