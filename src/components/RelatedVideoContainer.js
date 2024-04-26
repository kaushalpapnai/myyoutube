import React, { useEffect, useState } from "react";
import { YOUTUBE_API } from "../Utils/config";
import { Link } from 'react-router-dom';

const RelatedVideo = ({videoId}) => {
  const [relatedVideo, setRelatedVideo] = useState([]);

  useEffect(() => {
    Video();
  }, [videoId]);

  const Video = async () => {
    const data = await fetch(YOUTUBE_API);
    const json = await data.json();
    //  console.log(json)
    setRelatedVideo(json?.items);
  };

  const views = (views) => {
    if (views >= 1000000) {
      return (views / 1000000).toFixed(1) + "m";
    } else if (views >= 1000) {
      return (views / 1000).toFixed(0) + "k";
    } else {
      return views;
    }
  };

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
  }

  const sliceCharTitle = (char) => {
    let slicedChar;
    if (char.length > 60) {
      slicedChar = char.slice(0, 60);
      return slicedChar + "...";
    } else {
      return char;
    }
  };

  return (
    <>
      {relatedVideo
        ? relatedVideo?.map((items) => (
            <Link to={`/watch?v=${items.id}`}>
              <div className="flex m-5 box-border" key={items.id}>
                <img
                  className="mr-3 rounded-lg w-44 h-[7rem]"
                  src={items?.snippet?.thumbnails?.medium?.url}
                ></img>
                <div className="box-border w-2/3">
                  <h1>{sliceCharTitle(items?.snippet?.title)}</h1>
                  <p className="mt-1 mb-1 text-sm text-gray-600">
                    {items?.snippet?.channelTitle}
                  </p>
                  <div className="flex">
                    <p className="text-sm text-gray-600 mr-3">
                      {formatRelativeTime(items?.statistics?.viewCount)}
                    </p>
                    <p className="text-sm text-gray-600">
                      {new Date(items?.snippet?.publishedAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))
        : null}
    </>
  );
};

export default RelatedVideo;
// {views(items?.statistics?.viewCount) + " Views"}
