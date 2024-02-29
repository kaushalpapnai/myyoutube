import React from 'react'

const VideoCard = ({info}) => {
//  console.log(info)
 const {snippet,statistics} = info;
 const {channelTitle,title,thumbnails} = snippet;
  return (
    <div className='p-2 m-2 w-72 shadow-sm'>
        <img className='rounded-lg' alt="image" src={thumbnails.medium.url}></img>
        <ul>
            <li className='font-bold py-1'>{title}</li>
            <li>{channelTitle}</li>
            <li>{statistics.viewCount} views</li>
        </ul>
    </div>
  )
}

export default VideoCard