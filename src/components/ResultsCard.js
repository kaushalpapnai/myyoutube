import React from 'react'

const ResultsCard = ({item}) => {
  return (
    <div className='flex m-5'>
        <img src={item?.snippet?.thumbnails?.medium?.url} alt='images' className='border rounded-lg' />
        <ul className='ml-3'>
            <li className='m-2 font-bold text-lg'>{item?.snippet?.title}</li>
            <li className='m-2 font-light text-sm'>{new Date(item?.snippet?.publishedAt).toLocaleString()}</li>
            <ul className='flex'>
                <li className='m-2 font-light text-sm'>{item?.snippet?.channelTitle}</li>
            </ul>
            <li className='m-2 font-light text-sm'>{item?.snippet?.description !== null ? item?.snippet?.description : "nothing"}</li>
        </ul>
    </div>
)
}

export default ResultsCard