import React, { useEffect, useState } from "react";
import { api_key } from "../Utils/config";
import { BiLike, BiDislike } from "react-icons/bi";
import { FaShareSquare, FaDownload } from "react-icons/fa";

const VideoDetails = ({ VideoId }) => {
  const [videoInfo, setVideoInfo] = useState([]);
  const [channelId, setChannelId] = useState("");
  const [ChannelInfo, setChannelInfo] = useState([]);
  const [videoInfoTwo, setVideoInfoTwo] = useState([]);
  const [ChannelInfoTwo, setChannelInfoTwo] = useState();
  const [descriptionText, setDescriptionText] = useState();
  const [desButton, setDesButton] = useState("...more");

  useEffect(() => {
    VideoApi();
  }, [VideoId]);

  useEffect(() => {
    channelApi();
  }, [videoInfo]);

  const ApiKey = api_key;

  const VideoApi = async () => {
    const data = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?id=${VideoId}&key=${ApiKey}&part=snippet,statistics`
    );
    const json = await data.json();
    setVideoInfo(json?.items);
    setChannelId(json?.items[0]?.snippet?.channelId);
  };

  const channelApi = async () => {
    const data = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics&id=${channelId}&key=${ApiKey}`
    );
    const json = await data.json();
    setChannelInfo(json);
  };

  const views = (views) => {
    if (views >= 1000000) return (views / 1000000).toFixed(1) + "m";
    else if (views >= 1000) return (views / 1000).toFixed(0) + "k";
    return views;
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

    if (timeDifference < minute) return "Just now";
    else if (timeDifference < hour)
      return `${Math.floor(timeDifference / minute)} minutes ago`;
    else if (timeDifference < day)
      return `${Math.floor(timeDifference / hour)} hours ago`;
    else if (timeDifference < week)
      return `${Math.floor(timeDifference / day)} days ago`;
    else if (timeDifference < month)
      return `${Math.floor(timeDifference / week)} weeks ago`;
    else if (timeDifference < year)
      return `${Math.floor(timeDifference / month)} months ago`;
    return `${Math.floor(timeDifference / year)} years ago`;
  }

  const handleClick = () => {
    if (descriptionText && descriptionText.length < 300) {
      setDescriptionText(videoInfoTwo[0]?.description);
      setDesButton("...show less");
    } else {
      setDescriptionText(descriptionText.slice(0, 200));
      setDesButton("...more");
    }
  };

  useEffect(() => {
    if (videoInfo != null) {
      const video = videoInfo.map((items) => ({
        videoTitle: items?.snippet?.title,
        channelTitle: items?.snippet?.channelTitle,
        publishedAt: items?.snippet?.publishedAt,
        description: items?.snippet?.description,
        viewCount: items?.statistics?.viewCount,
        likeCount: items?.statistics?.likeCount,
        commentCount: items?.statistics?.commentCount,
      }));
      setVideoInfoTwo(video);
    }
  }, [videoInfo]);

  useEffect(() => {
    if (ChannelInfo?.items) {
      setChannelInfoTwo({
        imgUrl: ChannelInfo?.items[0]?.snippet?.thumbnails?.default?.url,
        subCount: ChannelInfo?.items[0]?.statistics?.subscriberCount,
      });
    }
  }, [ChannelInfo]);

  useEffect(() => {
    const text = videoInfoTwo[0]?.description;
    setDescriptionText(text && text.length > 200 ? text.slice(0, 200) : text);
  }, [videoInfoTwo]);

  return (
    <>
      <div className=" p-2 md:p-4 lg:p-6">
        <p className="font-bold text-base md:text-lg lg:text-xl mt-2">
          {videoInfoTwo[0]?.videoTitle}
        </p>
        <div className="flex mt-3 items-center justify-between ">
          <div className="flex items-center">
            <div className="w-8 h-8 md:w-10 md:h-10 lg:w-11 lg:h-11 rounded-full justify-center items-center mr-2">
              <img
                className="rounded-full"
                src={ChannelInfoTwo?.imgUrl}
                alt="Channel"
              />
            </div>
            <div className="flex flex-col">
              <p className="font-medium text-sm md:text-sm">
                {videoInfoTwo[0]?.channelTitle?.length > 7
                  ? `${videoInfoTwo[0]?.channelTitle.slice(0, 7)}...`
                  : videoInfoTwo[0]?.channelTitle}
              </p>

              <p className="text-xs md:text-sm font-light text-gray-800">
                {views(ChannelInfoTwo?.subCount) + " subscribers"}
              </p>
            </div>
            <div className="bg-black text-white text-xs md:text-sm p-2 ml-4 rounded-full cursor-pointer hover:bg-gray-700">
              <button>Subscribe</button>
            </div>
          </div>
          <div className="hidden items-center ml-2 space-x-2 md:flex">
            <div className="flex items-center bg-red-50 justify-between w-24 md:w-28 lg:w-32 rounded-3xl">
              <div className="flex items-center border-r cursor-pointer border-gray-300 w-4/6 hover:bg-red-100 p-2 rounded-l-full">
                <BiLike className="text-lg md:text-xl lg:text-2xl" />
                <p className="ml-1 md:ml-2 text-xs md:text-sm">
                  {views(videoInfoTwo[0]?.likeCount)}
                </p>
              </div>
              <div className="flex items-center cursor-pointer p-2 rounded-r-full hover:bg-red-100">
                <BiDislike className="text-lg md:text-xl lg:text-2xl" />
              </div>
            </div>
            <div className="flex items-center bg-red-50 p-2 rounded-full pl-3 pr-3 md:pl-4 md:pr-4 hover:bg-red-100 cursor-pointer">
              <FaShareSquare className="mr-1 md:mr-2 text-lg md:text-xl" />
              <button className="text-xs md:text-sm">Share</button>
            </div>
            <div className="flex items-center bg-red-50 p-2 rounded-full pl-3 pr-3 md:pl-4 md:pr-4 hover:bg-red-100 cursor-pointer">
              <FaDownload className="mr-1 md:mr-2 text-lg md:text-xl" />
              <button className="text-xs md:text-sm">Download</button>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2 md:hidden justify-between mt-4 mb-4">
          <div className="flex items-center bg-red-50 justify-between w-24 md:w-28 lg:w-32 rounded-3xl">
            <div className="flex items-center border-r cursor-pointer border-gray-300 w-4/6 hover:bg-red-100 p-2 rounded-l-full">
              <BiLike className="text-lg md:text-xl lg:text-2xl" />
              <p className="ml-1 md:ml-2 text-xs md:text-sm">
                {views(videoInfoTwo[0]?.likeCount)}
              </p>
            </div>
            <div className="flex items-center cursor-pointer p-2 rounded-r-full hover:bg-red-100">
              <BiDislike className="text-lg md:text-xl lg:text-2xl" />
            </div>
          </div>
          <div className="flex items-center bg-red-50 p-2 rounded-full pl-3 pr-3 md:pl-4 md:pr-4 hover:bg-red-100 cursor-pointer">
            <FaShareSquare className="mr-1 md:mr-2 text-lg md:text-xl" />
            <button className="text-xs md:text-sm">Share</button>
          </div>
          <div className="flex items-center bg-red-50 p-2 rounded-full pl-3 pr-3 md:pl-4 md:pr-4 hover:bg-red-100 cursor-pointer">
            <FaDownload className="mr-1 md:mr-2 text-lg md:text-xl" />
            <button className="text-xs md:text-sm">Download</button>
          </div>
        </div>
        <div className="bg-red-50 box-border mt-2 rounded-xl p-2 md:p-4 max-h-32 overflow-hidden">
          <div className="flex text-xs md:text-sm font-medium text-gray-900">
            <p className="mr-2">
              {views(videoInfoTwo[0]?.viewCount) + " views"}
            </p>
            <p>{formatRelativeTime(videoInfoTwo[0]?.publishedAt)}</p>
          </div>
          <p
            className="mt-2 font-sans text-xs md:text-sm overflow-hidden text-ellipsis"
            onClick={handleClick}
          >
            {descriptionText}{" "}
            {descriptionText && descriptionText.length < 200 ? null : (
              <button className="font-bold ml-2" onClick={handleClick}>
                {desButton}
              </button>
            )}
          </p>
        </div>
      </div>
    </>
  );
};

export default VideoDetails;
