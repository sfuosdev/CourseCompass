"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ProfessorCard from "@/components/ProfessorCard";
import Review from "@/components/ReviewList";
import { ScrollToTopButton } from "@/components/LandingPage";
import Card from "../../components/Card";
import { useRouter } from "next/navigation";

async function fetchCourse(courseCode) {
  try {
    const response = await axios.get(
      "/api/courses/getCourse?courseCode=" + courseCode
    );

    return { status: 200, data: response.data.course }; // Assuming the API returns a course object
  } catch (error) {
    console.error("Error fetching course:", error);

    try {
      const response = await axios.get(
        `/api/courses/search?query=${courseCode.slice(0, 5)}`
      );
      return { status: 201, data: response.data };
    } catch (error) {
      // catch error, either redirect to department list or suggest the departments
      console.error(
        `Error invaild department ${courseCode.slice(0, 4)}: ${error}`
      );
      return null;
    }
  }
}

async function fetchReviews(courseId) {
  try {
    const response = await axios.get(
      `/api/reviews/getCourseReviews?courseId=${courseId}`
    );
    return response.data.reviews;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return [];
  }
}

const Page = ({ params }) => {
  
  const [course, setCourse] = useState({});
  const [reviews, setReviews] = useState([]);
  const [statusCode, setStatusCode] = useState();
  const [coursesList, setCoursesList] = useState([]);
  const [canReview, setCanReview] = useState(false);
  const router = useRouter();
  

  useEffect(() => {
    let courseCode = params.course.toLowerCase();
    fetchCourse(courseCode).then(async (res) => {
      if (res.status === 200) {
        setStatusCode(res.status);
        setCourse(res.data);
        fetchReviews(res.data._id).then((reviews) => setReviews(reviews)); // Fetch reviews once course is loaded
        const completed = await hasUserCompletedCourse(courseCode); // Check if user has completed this course
        setCanReview(completed); // Update state based on whether user completed the course
      } else {
        setStatusCode(res.status);
        setCoursesList(res.data);
      }
    });
  }, [params]);

  const handleLeaveReviewClick = () => {
    let courseCode = params.course.toLowerCase();
    router.push(`/reviews?courseCode=${courseCode}`);
  };

  const hasUserCompletedCourse = async (courseCode) => {
    try {
      const userId = localStorage.getItem('user_id'); // Retrieve the user ID
      if (!userId) {
        console.warn('User ID not found');
        return false;
      }
      const response = await axios.get(`/api/user/getAllTakenCourses?userId=${userId}`);
      console.log("Completed courses:", response.data.completedCourses);
      return response.data.completedCourses.some(course => course.courseCode.toLowerCase() === courseCode.toLowerCase());
    } catch (error) {
      console.error("Error checking completed courses:", error);
      return false;
    }
  };

  const addFavoriteCourse = async () => {
    // Retrieve the user ID from local storage
    const userId = localStorage.getItem('user_id');
    const courseCode = course.courseCode; // Assuming `course` state contains the course code
  
    if (!userId) {
      console.error('User ID not found');
      alert('You must be logged in to add favorites.');
      return;
    }
  
    try {
      const response = await axios.post('/api/user/addFavoriteCourse', { userId, courseCode });
      alert(response.data.message); // Provide user-friendly feedback
      // Optionally, update the state or UI to reflect the change
    } catch (error) {
      console.error("Error adding favorite course:", error.response ? error.response.data.error : error.message);
      alert("Failed to add the course to favorites."); // User-friendly error message
    }
  };
  

  const View = () => {
    switch (statusCode) {
      case 201:
        return (
          <>
            <div className="lg:w-[80%] pr-[50px]">
              <h2 className="text-xl">
                {params.dept.toUpperCase()} {params.course}
              </h2>
              <div className="lg:w-[100%] pb-6 pr-[50px]">
                <h1 className="text-3xl text-[#4570E6] underline underline-offset-4">
                  {`The Course ${params.dept.toUpperCase()} ${
                    params.course
                  } does not exist`}
                </h1>
              </div>
              <div className="flex flex-wrap gap-4">
                {coursesList.courses.map((course) => (
                  <Card course={course} params={params} key={course._id} />
                ))}
              </div>
            </div>
          </>
        );
      default:
        return (
          <>
            <ScrollToTopButton />
            <div className="lg:w-[80%] pr-[50px]">
              <h2 className="text-xl">
                {params.dept.toUpperCase()} {params.course}
              </h2>
              <h1 className="text-3xl text-[#4570E6] underline underline-offset-4">
                {course.title || "Loading..."}
              </h1>
              <button
                onClick={addFavoriteCourse}
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Add to Favorites
              </button>
              <p className="text-base mt-[30px] text-justify">
                {course.courseDetails || "Description loading..."}
              </p>

              <p className="text-xl mt-[30px]">
                Next Offering: {params.term} {params.year}
              </p>
              <div className="mt-[20px] mr-[20px]">
                <div className="mt-[10px] flex flex-row">
                  {course.value != "" ? (
                    <ProfessorCard course={course} />
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <h2 className="text-xl pt-6">Reviews</h2>
              {reviews.length > 0 ? (
                reviews.map((review, index) => (
                  <Review review={review} key={index} />
                ))
              ) : (
                <p>No reviews yet.</p>
              )}
              {canReview && (
                <button
                  onClick={handleLeaveReviewClick}
                  className="mt-6 text-white rounded bg-primary-blue hover:text-black hover:bg-primary-yellow p-2"
                >
                  Leave a review
                </button>
              )}
            </div>
            <div className="lg:w-[30%] mt-[50px] lg:mt-0">
              <h1 className="text-xl lg:text-2xl">CONSIDERATIONS</h1>
              <div className="lg:flex lg:flex-col">
                <h2 className="text-base lg:text-xl">Pre-requisites:</h2>
                <p className="text-sm lg:text-base">
                  {(course.prerequisites === ""
                    ? "No Previous courses required"
                    : course.prerequisites) || "Loading prerequisites..."}
                </p>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="ml-[40px] m-[50px] flex flex-col lg:flex-row">
      <View />
    </div>
  );
};

export default Page;
