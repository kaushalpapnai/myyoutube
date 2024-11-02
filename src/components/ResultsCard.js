import React from 'react';

const ResultsCard = ({ item }) => {
  return (
    <div className="flex flex-col sm:flex-row md:m-5 p-3 rounded-lg duration-200">
      {/* Thumbnail Image */}
      <img
        src={item?.snippet?.thumbnails?.medium?.url}
        alt="Video Thumbnail"
        className="w-full sm:w-60 lg:w-72 h-auto rounded-lg object-cover mb-3 sm:mb-0" // Increased sizes
      />

      {/* Video Details */}
      <ul className="flex flex-col justify-between sm:ml-4">
        <li className="mb-2 font-medium text-base sm:text-lg lg:text-xl text-gray-900">
          {item?.snippet?.title}
        </li>
        <li className="mb-2 font-light text-xs sm:text-sm text-gray-600">
          {new Date(item?.snippet?.publishedAt).toLocaleString()}
        </li>
        <li className="mb-2 font-light text-xs sm:text-sm text-gray-700">
          {item?.snippet?.channelTitle}
        </li>
        <li className="font-light text-sm hidden md:block sm:text-base text-gray-700">
          {item?.snippet?.description ? item?.snippet?.description : "No description available"}
        </li>
      </ul>
    </div>
  );
};

export default ResultsCard;
