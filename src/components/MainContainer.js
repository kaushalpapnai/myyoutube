import React, { useEffect } from 'react';
import VideoContainer from './VideoContainer';
import { useDispatch, useSelector } from 'react-redux';
import { openMenu } from '../Utils/appSlice';

const MainContainer = () => {
  const dispatch = useDispatch();
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);

  useEffect(() => {
    dispatch(openMenu());
  }, [dispatch]);

  return (
    <div
      className={`mt-[3rem] w-screen
      ${isMenuOpen ? 'ml-[3.7rem] md:ml-44' : ''}`}
    >
      {/* <ButtonCarousel /> */}
      <VideoContainer />
    </div>
  );
};

export default MainContainer;
