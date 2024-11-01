import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AiFillHome, AiFillYoutube, AiFillPlayCircle, AiOutlineHistory } from 'react-icons/ai';
import { MdSubscriptions, MdVideoLibrary, MdOutlineExplore, MdWhatshot, MdMusicNote, MdLiveTv, MdShoppingCart } from 'react-icons/md';

const Sidebar = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);

  // Early return if sidebar is closed
  if (!isMenuOpen) return null;

  return (
    <div className="p-4 w-fit mt-14 fixed h-full bg-white overflow-y-auto">
      <ul className="py-3">
        <Link to="/">
          <li className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg">
            <AiFillHome className="text-xl" />
            <span>Home</span>
          </li>
        </Link>
        <li className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg">
          <MdWhatshot className="text-xl" />
          <span>Shorts</span>
        </li>
        <li className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg">
          <MdSubscriptions className="text-xl" />
          <span>Subscriptions</span>
        </li>
        <li className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg">
          <AiFillYoutube className="text-xl" />
          <span>YouTube Music</span>
        </li>
      </ul>

      <h2 className="font-bold text-gray-700 mt-4">Library</h2>
      <ul className="py-3">
        <li className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg">
          <MdVideoLibrary className="text-xl" />
          <span>Library</span>
        </li>
        <li className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg">
          <AiOutlineHistory className="text-xl" />
          <span>History</span>
        </li>
        <li className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg">
          <AiFillPlayCircle className="text-xl" />
          <span>Your Videos</span>
        </li>
        <li className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg">
          <MdSubscriptions className="text-xl" />
          <span>Watch Later</span>
        </li>
      </ul>

      <h2 className="font-bold text-gray-700 mt-4">Subscriptions</h2>
      <ul className=" py-3">
        <li className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg">
          <span className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">S</span>
          <span>Sample Channel</span>
        </li>
        <li className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg">
          <span className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">S</span>
          <span>Sample Channel</span>
        </li>
        <li className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg">
          <span className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">S</span>
          <span>Sample Channel</span>
        </li>
      </ul>

      <h2 className="font-bold  text-gray-700 mt-4">Explore</h2>
      <ul className="py-3">
        <li className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg">
          <MdWhatshot className="text-xl" />
          <span>Trending</span>
        </li>
        <li className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg">
          <MdShoppingCart className="text-xl" />
          <span>Shopping</span>
        </li>
        <li className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg">
          <MdMusicNote className="text-xl" />
          <span>Music</span>
        </li>
        <li className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg">
          <MdLiveTv className="text-xl" />
          <span>Live</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
