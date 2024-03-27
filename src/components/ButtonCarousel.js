import React from 'react'
import Slider from "react-slick";   
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

  
  const ButtonCarousel = () => {

    const NextArrow = (props) => {
      const { className, style, onClick } = props;
      return (
        <div className={className} style={{ ...style, display: "block" }} onClick={onClick}>
          Next
        </div>
      );
    };
  
    const PrevArrow = (props) => {
      const { className, style, onClick } = props;
      return (
        <div className={className} style={{ ...style, display: "block" }} onClick={onClick}>
          Prev
        </div>
      );
    };

    let settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
    };

    return (
      <>
      <div className='border border-red-300 '>
       <Slider {...settings}>
        <h3 className='carousel-item'>1</h3>
        <h3>1</h3>
        <h3>1</h3>
        <h3>1</h3>
        <h3>1</h3>
        <h3>1</h3>
        <h3>1</h3>
        <h3>1</h3>
        <h3>1</h3>
        <h3>1</h3>
      </Slider>
      </div>
      </>
    )
  }


export default ButtonCarousel