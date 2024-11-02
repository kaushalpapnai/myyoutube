import React, { useEffect, useState } from "react";
import { YOUTUBE_API } from "../Utils/config";
import { Link } from "react-router-dom";

const RelatedVideo = ({ videoId }) => {
  const [relatedVideo, setRelatedVideo] = useState([]);

  useEffect(() => {
    fetchRelatedVideos();
  }, [videoId]);

  const fetchRelatedVideos = async () => {
    const data = await fetch(YOUTUBE_API);
    const json = await data.json();
    setRelatedVideo(json?.items);
  };

  const views = (views) => {
    if (views >= 1000000) {
      return (views / 1000000).toFixed(1) + "M";
    } else if (views >= 1000) {
      return (views / 1000).toFixed(0) + "K";
    } else {
      return views;
    }
  };

  const formatRelativeTime = (timeString) => {
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
      return "Just now";
    } else if (timeDifference < hour) {
      const minutes = Math.floor(timeDifference / minute);
      return minutes + (minutes === 1 ? " minute ago" : " minutes ago");
    } else if (timeDifference < day) {
      const hours = Math.floor(timeDifference / hour);
      return hours + (hours === 1 ? " hour ago" : " hours ago");
    } else if (timeDifference < week) {
      const days = Math.floor(timeDifference / day);
      return days + (days === 1 ? " day ago" : " days ago");
    } else if (timeDifference < month) {
      const weeks = Math.floor(timeDifference / week);
      return weeks + (weeks === 1 ? " week ago" : " weeks ago");
    } else if (timeDifference < year) {
      const months = Math.floor(timeDifference / month);
      return months + (months === 1 ? " month ago" : " months ago");
    } else {
      const years = Math.floor(timeDifference / year);
      return years + (years === 1 ? " year ago" : " years ago");
    }
  };

  const sliceCharTitle = (title) => {
    return title.length > 60 ? title.slice(0, 60) + "..." : title;
  };

  return (
    <>
      {relatedVideo?.map((item) => (
        <Link to={`/watch?v=${item.id}`} key={item.id}>
          <div className="grid grid-cols-1 md:grid-cols-3  box-border md:rounded-lg overflow-hidden mt-4 md:mt-4">
            {/* Thumbnail Image */}
            <div className="col-span-1  w-full md:h-full aspect-video overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src={item?.snippet?.thumbnails?.medium?.url}
                alt="Thumbnail"
              />
            </div>
            {/* Video Details */}
            <div className="col-span-2 p-4 md:ml-3 md:p-0 flex flex-col justify-center">
              <h1 className="text-sm md:text-base lg:text-lg font-semibold text-gray-800">
                {sliceCharTitle(item?.snippet?.title)}
              </h1>
              <div className="mt-2 md:mt-0 text-xs md:text-sm text-gray-600">
                <p className="font-normal">{item?.snippet?.channelTitle}</p>
                <div className="flex space-x-1 text-xs md:text-sm text-gray-600">
                  <p>{views(item?.statistics?.viewCount)} Views</p>
                  <span>·</span>
                  <p>{formatRelativeTime(item?.snippet?.publishedAt)}</p>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
};

export default RelatedVideo;
