import React, { useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";

const TimedCarousel = () => {
  const sliderRef = useRef();
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    centerMode: true,
    centerPadding: "70px",
    appendDots: (dots) => (
      <div style={{ bottom: "10px" }}>
        <ul style={{ display: "flex", justifyContent: "center" }}>{dots}</ul>
      </div>
    ),
    customPaging: (i) => (
      <div
        className={`m-2 h-2 w-2 border border-secondary-darkBlue rounded-full cursor-pointer mx-2 ${
          currentSlide === i ? "bg-secondary-darkBlue" : "bg-white"
        }`}
        onClick={() => {
          sliderRef.current.slickGoTo(i);
          setCurrentSlide(i);
          sliderRef.current.slickPlay();
        }}
      />
    ),
    afterChange: (current) => {
      setCurrentSlide(current);
    },
  };

  return (
    <Slider ref={sliderRef} {...settings}>
      {/* slide 1*/}
      <div className="w-full h-[23rem] bg-primary-whiteBlue grid grid-cols-2 gap-4">
        <div className="flex flex-row items-center justify-end p-2">
          <p className="font-MabryPro">
            Course Compass is a platform that
            <br />
            allows you to plan, not just your next
            <br />
            semester, but{" "}
            <span className="text-secondary-blue">
              your entire degree by
              <br />
              predicting future course offering
            </span>{" "}
            dates and
            <br />
            guiding you through your next
            <br />
            courses.
          </p>
          <img
            className="scale-75"
            src="/slide1-presentation.png"
            alt="generic image"
          />
        </div>
      </div>
      {/* slide 2*/}
      <div className="w-full h-[23rem] bg-primary-whiteBlue grid grid-cols-2 gap-4">
        <div className="flex flex-row items-center justify-end p-2">
          <div className="flex flex-col items-center justify-end p-2">
            <h1 className="font-family-MabryPro font-bold">What Next?</h1>
            <p className="font-MabryPro p-2">
              Unsure how to plan your academic journey? Find out which semester
              <br /> the courses you need are being offered next - this updated
              list has the
              <br /> pre-reqs, anticipated dates of offerings and let’s you know
              what courses
              <br /> you can take next!
              <br />{" "}
            </p>
            <Link
              href="/Courses"
              className=" text-white rounded-full p-2 bg-primary-blue 
                          hover:text-black hover:bg-primary-yellow"
            >
              Start Search
            </Link>
          </div>
          <img
            className="scale-75"
            src="/slide2-courses.png"
            alt="generic image"
          />
        </div>
      </div>
      {/* slide 3*/}
      <div className="w-full h-[23rem] bg-primary-whiteBlue grid grid-cols-2 gap-4">
        <div className="flex flex-row items-center justify-end p-2">
          <div className="flex flex-col items-center justify-end p-2">
            <h1 className="font-family-MabryPro font-bold">Reviews</h1>
            <p className="font-MabryPro p-2">
              Learn more about each course through student experiences. Help the
              <br /> next student by sharing your own experience, and upvoting
              or downvoting
              <br /> existing reviews!{" "}
            </p>
            <Link
              href="#"
              className="text-white rounded-full p-2 bg-primary-blue 
                            hover:text-black hover:bg-primary-yellow"
            >
              Leave a Review
            </Link>
          </div>
          <img
            className="scale-75"
            src="/slide3-reviews.png"
            alt="generic image"
          />
        </div>
      </div>
    </Slider>
  );
};

export default TimedCarousel;
