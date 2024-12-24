import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ImageSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0); // State to track active slide

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    beforeChange: (current, next) => {
      setActiveIndex(next); // Update active index before change
    },
    customPaging: (i) => (
      <button className="w-3 h-3 rounded-full focus:outline-none">
        <span
          className={`block  w-full h-full rounded-full ${
            i === activeIndex ? "bg-yellow-500" : "bg-gray-300"
          }`}
        ></span>
      </button>
    ),
  };

  return (
    <div className="slider flex flex-col items-center pt-16 w-64 h-64">
      <Slider {...settings} className="w-full h-full ">
        {/* Slide 1 */}
        <div className="image-wrapper flex justify-center items-center p-4 bg-transparent rounded-lg shadow-lg">
          <img
            src="/images/slider1.svg" // Image path relative to the public folder
            alt="Slider 1"
            className="w-full h-40 object-contain rounded-lg"
          />
        </div>

        {/* Slide 2 */}
        <div className="image-wrapper flex justify-center items-center p-4 bg-transparent rounded-lg shadow-lg">
          <img
            src="/images/slider2.svg" // Image path relative to the public folder
            alt="Slider 2"
            className="w-full h-40 object-contain rounded-lg"
          />
        </div>

        {/* Slide 3 */}
        <div className="image-wrapper flex justify-center items-center p-4 bg-transparent rounded-lg shadow-lg">
          <img
            src="/images/slider3.svg" // Image path relative to the public folder
            alt="Slider 3"
            className="w-full h-40 object-contain rounded-lg"
          />
        </div>
      </Slider>
    </div>
  );
};

export default ImageSlider;
