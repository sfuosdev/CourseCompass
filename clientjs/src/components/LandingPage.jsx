import Link from "next/link";
import SearchBar from "./SearchBar";
import { useState, useEffect } from "react";

async function importCourses() {
  try {
    const response = await fetch('/api/courses/importCourses');
    const data = await response.json();

    if (data.success) {
      alert('Courses imported successfully!');
    } else {
      alert('Failed to import courses: ' + data.error);
    }
  } catch (error) {
    console.error('Error importing courses:', error);
    alert('Error importing courses. Check the console for more details.');
  }
}

const LandPage = () => (
  <div className="relative top-[-1rem] bg-primary-white flex flex-col items-center justify-center p-4 md:h-[100vh] lg:h-[90vh] sm:space-y-4 lg:space-y-5 md:scale-135">
    {/* <button onClick={importCourses} className="text-white rounded bg-primary-blue hover:text-black hover:bg-primary-yellow p-2">
      Import SFU Courses
    </button> */}
    <h1 className="font-MabryPro font-bold text-4xl text-center">Plan Your Academic Journey</h1>
    <p className="w-[65vw] text-center font-MabryPro"> Find out which semester the courses you need are being offered next, pre-requisites, anticipated dates of offerings and the next courses you can take! </p>
    {/*search bar below*/}
    <SearchBar page='LandPage' />
    <p className="opacity-50">or</p>
    <Link href="/reviews" className="text-white rounded bg-primary-blue hover:text-black hover:bg-primary-yellow p-2">Leave a review</Link>
    <div className="animate-bounce flex flex-col items-center pt-[2rem]">
      <p>Scroll to learn more</p>

      <svg xmlns="http://www.w3.org/2000/svg" width="23" height="13" viewBox="0 0 23 13" fill="none" className="opacity-50">
        <path d="M22.6094 2.22173L12.6094 12.2217C12.5166 12.3147 12.4063 12.3885 12.2849 12.4388C12.1635 12.4891 12.0333 12.515 11.9019 12.515C11.7705 12.515 11.6404 12.4891 11.519 12.4388C11.3976 12.3885 11.2873 12.3147 11.1944 12.2217L1.19442 2.22173C1.00678 2.03409 0.901367 1.77959 0.901367 1.51423C0.901367 1.24886 1.00678 0.994368 1.19442 0.806727C1.38206 0.619087 1.63656 0.513672 1.90192 0.513672C2.16729 0.513672 2.42178 0.619087 2.60942 0.806727L11.9019 10.1005L21.1944 0.806727C21.2873 0.713817 21.3976 0.640117 21.519 0.589834C21.6404 0.539552 21.7705 0.513672 21.9019 0.513672C22.0333 0.513672 22.1634 0.539552 22.2848 0.589834C22.4062 0.640117 22.5165 0.713817 22.6094 0.806727C22.7023 0.899638 22.776 1.00994 22.8263 1.13133C22.8766 1.25272 22.9025 1.38283 22.9025 1.51423C22.9025 1.64562 22.8766 1.77573 22.8263 1.89712C22.776 2.01852 22.7023 2.12882 22.6094 2.22173Z" fill="black" />
      </svg>
    </div>
  </div>

);
const Slide1 = () => (
  <section className="border w-full h-fill bg-primary-white">
    <div className="flex flex-row w-[80rem] items-center justify-start">
      <div className="flex flex-col ml-[-0.4rem] sm:ml-[4rem] p-2 pl-20 items-start space-y-2">
        <h1 className="font-MabryPro font-bold">About</h1>
        <p className="font-MabryPro w-[60vw] lg:w-[30rem]">
          Course Compass is a platform that allows you to plan, not just your next semester, but your entire degree by predicting future course offering dates and guiding you through your next courses.
        </p>
        <Link
          href="/about"
          className="text-white rounded-full px-4 py-2 bg-primary-blue hover:text-black hover:bg-primary-yellow"
        >
          Credits
        </Link>
      </div>
      <img className="opacity-0 md:opacity-100 lg:scale-75" src="/slide1-presentation.png" alt="generic image" />
    </div>
  </section>
);

const Slide2 = () => (
  <section className="border w-full h-fill bg-primary-whiteBlue">
    <div className="flex flex-row w-[80rem] items-center justify-start">
      <img className="ml-[-30rem] md:ml-[-20rem] lg:ml-[5rem] lg:scale-75" src="/slide2-courses.png" alt="generic image" />
      <div className="flex flex-col ml-[3rem] sm:ml-[4rem] p-2 pl-20 items-start space-y-2">
        <h1 className="font-MabryPro font-bold">What Next?</h1>
        <p className="font-MabryPro w-[60vw] lg:w-[30rem]">
          Unsure how to plan your academic journey? Find out which semester the courses you need are being offered next - this updated list has the pre-reqs, anticipated dates of offerings and lets you know what courses you can take next!
        </p>
        <Link
          href="/courses"
          className="text-white rounded-full px-4 py-2 bg-primary-blue hover:text-black hover:bg-primary-yellow"
        >
          Start Search
        </Link>
      </div>
    </div>
  </section>
);

const Slide3 = () => (
  <section className="border w-full h-fill bg-primary-white">
    <div className="flex flex-row w-[80rem] items-center justify-start">
      <div className="flex flex-col ml-[-0.6rem] sm:ml-[3rem] p-2 pl-20 items-start space-y-2">
        <h1 className="font-MabryPro font-bold">Reviews</h1>
        <p className="font-MabryPro w-[60vw] lg:w-[30rem]">
          Learn more about each course through student experiences. Help the next student by sharing your own experience, and upvoting or downvoting existing reviews!
        </p>
        <Link
          href="/reviews"
          className="text-white rounded-full px-4 py-2 bg-primary-blue hover:text-black hover:bg-primary-yellow"
        >
          Leave a Review
        </Link>
      </div>
      <img className="opacity-0 md:opacity-100 lg:scale-75" src="/slide3-reviews.png" alt="generic image" />
    </div>
  </section>
);

export const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-4 right-4 bg-primary-blue text-white rounded-full p-2 
      hover:bg-primary-yellow hover:text-black
      ${isVisible ? "block" : "hidden"
        }`}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M6.29194 13.2925L15.2919 4.2925C15.3848 4.19952 15.4951 4.12576 15.6165 4.07544C15.7379 4.02512 15.868 3.99921 15.9994 3.99921C16.1309 3.99921 16.261 4.02512 16.3824 4.07544C16.5038 4.12576 16.6141 4.19952 16.7069 4.2925L25.7069 13.2925C25.8946 13.4801 26 13.7346 26 14C26 14.2654 25.8946 14.5199 25.7069 14.7075C25.5193 14.8951 25.2648 15.0006 24.9994 15.0006C24.7341 15.0006 24.4796 14.8951 24.2919 14.7075L16.9994 7.41375V27C16.9994 27.2652 16.8941 27.5196 16.7066 27.7071C16.519 27.8946 16.2647 28 15.9994 28C15.7342 28 15.4799 27.8946 15.2923 27.7071C15.1048 27.5196 14.9994 27.2652 14.9994 27L14.9994 7.41375L7.70694 14.7075C7.5193 14.8951 7.26481 15.0006 6.99944 15.0006C6.73408 15.0006 6.47958 14.8951 6.29194 14.7075C6.1043 14.5199 5.99889 14.2654 5.99889 14C5.99889 13.7346 6.1043 13.4801 6.29194 13.2925Z" fill="black" />
      </svg>
    </button>
  );
};


const LandingPage = () => (
  <div>
    <LandPage />
    <ScrollToTopButton />
    <Slide1 />
    <Slide2 />
    <Slide3 />
  </div>
);

export default LandingPage;
