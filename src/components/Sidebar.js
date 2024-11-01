import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AiFillHome, AiFillYoutube, AiFillPlayCircle, AiOutlineHistory } from 'react-icons/ai';
import { MdSubscriptions, MdVideoLibrary, MdWhatshot, MdMusicNote, MdLiveTv, MdShoppingCart } from 'react-icons/md';

const Sidebar = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);

  // Early return if sidebar is closed
  if (!isMenuOpen) return null;

  return (
    <div className="md:p-4 w-16 md:w-fit mt-14 fixed h-full bg-white overflow-y-auto">
      <ul className="py-3  pl-2 md:pl-0 ">
        <Link to="/">
          <li className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg">
            <AiFillHome className="text-xl" />
            <span className="hidden md:inline text-sm">Home</span> {/* Smaller text size */}
          </li>
        </Link>
        <li className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg">
          <MdWhatshot className="text-xl" />
          <span className="hidden md:inline text-sm">Shorts</span> {/* Smaller text size */}
        </li>
        <li className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg">
          <MdSubscriptions className="text-xl" />
          <span className="hidden md:inline text-sm">Subscriptions</span> {/* Smaller text size */}
        </li>
        <li className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg">
          <AiFillYoutube className="text-xl" />
          <span className="hidden md:inline text-sm">YouTube Music</span> {/* Smaller text size */}
        </li>
      </ul>

      <h2 className="font-bold text-gray-700 mt-4 pl-2 text-[0.6rem] md:text-sm">Library</h2> {/* Smaller text size */}
      <ul className="py-3 pl-2 md:pl-0">
        <li className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg">
          <MdVideoLibrary className="text-xl" />
          <span className="hidden md:inline text-sm">Library</span> {/* Smaller text size */}
        </li>
        <li className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg">
          <AiOutlineHistory className="text-xl" />
          <span className="hidden md:inline text-sm">History</span> {/* Smaller text size */}
        </li>
        <li className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg">
          <AiFillPlayCircle className="text-xl" />
          <span className="hidden md:inline text-sm">Your Videos</span> {/* Smaller text size */}
        </li>
        <li className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg">
          <MdSubscriptions className="text-xl" />
          <span className="hidden md:inline text-sm">Watch Later</span> {/* Smaller text size */}
        </li>
      </ul>

      <h2 className="font-bold text-gray-700 mt-4 pl-[2px] text-[0.6rem] md:text-sm">Subscriptions</h2> {/* Smaller text size */}
      <ul className="py-3 pl-2 md:pl-0">
        <li className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg">
          <span className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">S</span>
          <span className="hidden md:inline text-sm">Sample Channel</span> {/* Smaller text size */}
        </li>
        <li className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg">
          <span className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">S</span>
          <span className="hidden md:inline text-sm">Sample Channel</span> {/* Smaller text size */}
        </li>
        <li className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg">
          <span className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">S</span>
          <span className="hidden md:inline text-sm">Sample Channel</span> {/* Smaller text size */}
        </li>
      </ul>

      <h2 className="font-bold text-gray-700 mt-4 pl-2 text-[0.6rem] md:text-sm">Explore</h2> {/* Smaller text size */}
      <ul className="py-3 pl-2 md:pl-0">
        <li className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg">
          <MdWhatshot className="text-xl" />
          <span className="hidden md:inline text-sm">Trending</span> {/* Smaller text size */}
        </li>
        <li className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg">
          <MdShoppingCart className="text-xl" />
          <span className="hidden md:inline text-sm">Shopping</span> {/* Smaller text size */}
        </li>
        <li className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg">
          <MdMusicNote className="text-xl" />
          <span className="hidden md:inline text-sm">Music</span> {/* Smaller text size */}
        </li>
        <li className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg">
          <MdLiveTv className="text-xl" />
          <span className="hidden md:inline text-sm">Live</span> {/* Smaller text size */}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
