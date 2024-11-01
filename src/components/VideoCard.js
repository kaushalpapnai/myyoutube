import React from 'react'

const VideoCard = ({info}) => {
//  console.log(info)
 const {snippet,statistics} = info;
 const {channelTitle,title,thumbnails} = snippet;

 const views = (views) => {
  if (views >= 1000000) {
      return (views / 1000000).toFixed(1) + 'm';
  } else if (views >= 1000) {
      return (views / 1000).toFixed(0) + 'k';
  } else {
      return views;
  }
}

const slicedTitle=()=>{
  if(title && title.length>50){
    return title.slice(0,50)
  }
  else{
    return title
  }
}

  return (
    <div className='p-2 md:m-3 lg:m-3'>
        <img className='rounded-lg w-full' alt="image" src={thumbnails.medium.url}></img>
        <ul>
            <li className='font-bold py-1'>{slicedTitle() + "..."}</li>
            <li className='text-sm text-gray-600'>{channelTitle}</li>
            <li className='text-sm text-gray-600'>{views(statistics.viewCount)} views</li>
        </ul>
    </div>
  )
}

export default VideoCard