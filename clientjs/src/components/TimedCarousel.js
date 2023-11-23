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
    autoplaySpeed: 7000,
    pauseOnHover: false,
    appendDots: (dots) => (
      <div style={{ bottom: "24px" }}>
        <ul style={{ display: "flex", justifyContent: "center" }}>{dots}</ul>
      </div>
    ),
    customPaging: (i) => (
      <div
        className={`m-2 h-2 w-2 border border-secondary-darkBlue rounded-full cursor-pointer mx-2 relative ${
          currentSlide === i ? "bg-secondary-darkBlue" : "bg-white"
        }`}
        onClick={() => {
          sliderRef.current.slickGoTo(i);
          setCurrentSlide(i);
        }}
        >
        <div className="absolute top-[-5px] bottom-[-5px] left-[-5px] right-[-5px]"></div>{/*click error for dots*/}
        
      </div>
    ),
    afterChange: (current) => {
      setCurrentSlide(current);
    },
  };

  const SlideContent = ({ title, text, buttonText, buttonLink, imageName }) => (
    <div className="border w-full h-fill bg-primary-whiteBlue">
      <div className="flex flex-row w-[80rem] items-center justify-start">
        <div className="flex flex-col ml-[4rem] p-2 pl-20 items-start space-y-2">
          <h1 className="font-family-MabryPro font-bold">{title}</h1>
          <p className=" font-family-MabryPro object-cover w-[60vw] lg:w-[30rem]" dangerouslySetInnerHTML={{ __html: text }}>{}</p>
          <Link
            href={buttonLink}
            className="text-white rounded-full px-4 py-2 bg-primary-blue hover:text-black hover:bg-primary-yellow"
          >
            {buttonText}
          </Link>
        </div>
        <img className="hidden lg:scale-75" src={imageName} alt="generic image" />
      </div>
    </div>
  );

  return (
    <Slider ref={sliderRef} {...settings}>
      {SlideContent({
        title: "About",
        text: `
          Course Compass is a platform that allows you 
          to plan, not just your next semester, but <span class="text-secondary-blue">your entire 
          degree by predicting future course offering dates </span>
          and guiding you through your next courses.
                    
        `,
        buttonText: "Credits",
        buttonLink: "#",
        imageName: "/slide1-presentation.png",
      })}

      {SlideContent({
        title: "What Next?",
        text: `
          Unsure how to plan your academic journey? Find out which semester
          the courses you need are being offered next - this updated list has the
          pre-reqs, anticipated dates of offerings and let’s you know what courses
          you can take next!
          
        `,
        buttonText: "Start Search",
        buttonLink: "/courses",
        imageName: "/slide2-courses.png",
      })}

      {SlideContent({
        title: "Reviews",
        text: `
          Learn more about each course through student experiences.
          Help the next student by sharing your own experience, and
          upvoting or downvoting existing reviews!
        `,
        buttonText: "Leave a Review",
        buttonLink: "#",
        imageName: "/slide3-reviews.png",
      })}
    </Slider>
  );
};

export default TimedCarousel;
