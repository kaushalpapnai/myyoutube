import React, { useEffect, useState } from 'react'
import { YOUTUBE_API } from '../Utils/config'

const RelatedVideo = () => {
    
    const [relatedVideo,setRelatedVideo] = useState([]);

    useEffect(()=>{
       Video();
    },[])

    const Video = async()=>{
        const data = await fetch(YOUTUBE_API);
       const json = await data.json();
      //  console.log(json)
       setRelatedVideo(json?.items);
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

     const sliceCharTitle=(char)=>{
          let slicedChar;
           if(char.length > 60){
             slicedChar = char.slice(0,60);
             return (slicedChar + "...")
           }
           else{
            return char;
           }

     }

  return (
    <>
      {  
        relatedVideo ? relatedVideo?.map((items)=>(
          <div className='flex m-5 box-border' key={items.id}>
              <img 
              className='mr-3 rounded-lg w-44 h-[7rem]'
              src={items?.snippet?.thumbnails?.medium?.url}></img>
          <div className='box-border w-2/3'>
             <h1>{sliceCharTitle(items?.snippet?.title)}</h1>
             <p className='mt-1 mb-1 text-sm text-gray-600'>{items?.snippet?.channelTitle}</p>
             <div className='flex'>
               <p className='text-sm text-gray-600 mr-3'>{views(items?.statistics?.viewCount) + " Views"}</p>
               <p className='text-sm text-gray-600'>{new Date(items?.snippet?.publishedAt).toLocaleString()}</p>
             </div>
          </div>
         </div>
        )) : null
      }
    </>
  )
}

export default RelatedVideo