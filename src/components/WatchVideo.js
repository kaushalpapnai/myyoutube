import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { closeMenu } from "../Utils/appSlice";
import { useSearchParams } from "react-router-dom";
import CommmentSec from "./CommmentSec";
import LiveChat from "./LiveChat";
import RelatedVideo from "./RelatedVideoContainer";
import VideoDetails from "./VideoDetails";

const WatchVideo = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const [isCommentModalOpen, setCommentModalOpen] = useState(false);

  useEffect(() => {
    dispatch(closeMenu());
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, [searchParams.get("v")]);

  const toggleCommentModal = () => {
    setCommentModalOpen(!isCommentModalOpen);
  };

  return (
    <div className="md:px-5 mt-16 md:ml-2 w-screen flex flex-col md:flex-row">
      <div className="flex justify-center flex-col h-fit">
        <div>
          <iframe
            className="md:rounded-xl w-full h-full aspect-video"
            src={`https://www.youtube.com/embed/${searchParams.get(
              "v"
            )}?autoplay=1`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
        <div className="w-full">
          <VideoDetails VideoId={searchParams.get("v")} />
          {/* Conditional rendering for mobile view */}
          <div className="md:hidden flex justify-center">
            <button
              className="w-full h-full m-4 p-2 bg-gray-500 text-white rounded-md shadow-md"
              onClick={toggleCommentModal}
            >
              {isCommentModalOpen ? "Hide Comments" : "Show Comments"}
            </button>
          </div>
          {/* Modal for comments (only for mobile) */}
          {isCommentModalOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 transition-transform duration-300 ease-in-out transform"
              onClick={toggleCommentModal}
            >
              <div
                className="bg-white rounded-lg p-5 w-11/12 md:w-1/2 max-h-full overflow-y-auto relative"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="fixed mr-2 top-3 bg-gray-800 w-10 rounded-full right-3 p-2 text-white hover:text-gray-800"
                  onClick={toggleCommentModal}
                >
                  &#10006; {/* Close icon */}
                </button>
                <h2 className="text-xl font-bold mb-4">Comments</h2>
                <CommmentSec videoId={searchParams.get("v")} />
              </div>
            </div>
          )}
          {/* Always show comments section on medium and large screens */}
          <div className="hidden md:block">
            <h2 className="text-xl font-bold mb-4">Comments</h2>
            <CommmentSec videoId={searchParams.get("v")} />
          </div>
        </div>
      </div>
      <div className="w-fit md:ml-3">
        <LiveChat />
        <RelatedVideo videoId={searchParams.get("v")} />
      </div>
    </div>
  );
};

export default WatchVideo;
