"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ProfessorCard from "@/components/ProfessorCard";
import Review from "@/components/ReviewList";
import { ScrollToTopButton } from "@/components/LandingPage";
import Rating from "../../../../../reviews/Rating/Rating";
import Card from "../../../../components/Card";
import { useRouter } from 'next/navigation';

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
      console.error(`Error invaild department ${courseCode.slice(0, 5)}: ${error}`)
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

const convertToPercent = (rating) => (rating / 5) * 100;

const Page = ({ params }) => {
  const [course, setCourse] = useState({});
  const [reviews, setReviews] = useState([]);
  const [statusCode, setStatusCode] = useState();
  const [coursesList, setCoursesList] = useState([]);
  const router = useRouter();

  useEffect(() => {
    let courseCode = (params.dept + params.course).toLowerCase();
    fetchCourse(courseCode).then((res) => {
      if (res.status === 200) {
        setStatusCode(res.status);
        setCourse(res.data);
        fetchReviews(res._id).then(setReviews); // Fetch reviews once course is loaded
      }
      else {
        setStatusCode(res.status);
        setCoursesList(res.data);
      }

    });
  }, [params]);

  const handleLeaveReviewClick = () => {
    let courseCode = (params.dept + params.course).toLowerCase();
    router.push(`/reviews?courseCode=${courseCode}`);
  };

  // console.log(coursesList);
  const View = () => {
    switch (statusCode) {
      case 201:
        return (<>
          <div className="lg:w-[100%] pr-[50px]">
            <h2 className="text-xl">
              {params.dept.toUpperCase()} {params.course}
            </h2>
            <div className="lg:w-[100%] pb-6 pr-[50px]">
              <h1 className="text-3xl text-[#4570E6] underline underline-offset-4">
                {`The Course ${params.dept.toUpperCase()} ${params.course} does not exist`}
              </h1>
            </div>
            {/* Fix this sections later */}
            <div className="flex flex-wrap gap-4">
                  {coursesList.courses.map(course => 
                    <Card
                    course={course}
                    params={params}
                    key={course._id}/>)}
                </div>
          </div>
        </>);
      default:
        return (
          <>
            <ScrollToTopButton />
            <div className="lg:w-[70%] pr-[50px]">
              <h2 className="text-xl">
                {params.dept.toUpperCase()} {params.course}
              </h2>
              <h1 className="text-3xl text-[#4570E6] underline underline-offset-4">
                {course.title || "Loading..."}
              </h1>
              <p className="text-base mt-[30px] text-justify">
                {course.courseDetails || "Description loading..."}
              </p>

              <p className="text-xl mt-[30px]">
                Next Offering: {params.term} {params.year}
              </p>
              <div className="mt-[20px] mr-[20px]">
                <div className="mt-[10px] flex flex-row">
                  {course.value != "" ? <ProfessorCard course={course} /> : <></>}
                </div>
              </div>
              <h2 className="text-xl">Reviews</h2>
              {reviews.length > 0 ? (
                reviews.map((review, index) => (
                  <div key={index}>
                    <div>
                      <span>Usefulness: </span>
                      <Rating
                        ratingInPercent={convertToPercent(review.usefulnessRating)}
                        iconSize="m"
                        showOutOf={true}
                        enableUserInteraction={false}
                      />
                    </div>
                    <div>
                      <span>Difficulty: </span>
                      <Rating
                        ratingInPercent={convertToPercent(review.difficultyRating)}
                        iconSize="m"
                        showOutOf={true}
                        enableUserInteraction={false}
                      />
                    </div>
                    {/* Additional review details can be rendered here */}
                  </div>
                ))
              ) : (
                <p>No reviews yet.</p>
              )}
              <button
                onClick={handleLeaveReviewClick}
                className="text-white rounded bg-primary-blue hover:text-black hover:bg-primary-yellow p-2">
                Leave a review
              </button>
            </div>
            <div className="lg:w-[30%] mt-[50px] lg:mt-0">
              <h1 className="text-xl lg:text-2xl">CONSIDERATIONS</h1>
              <div className="lg:flex lg:flex-col">
                <h2 className="text-base lg:text-xl">Pre-requisites:</h2>
                <p className="text-sm lg:text-base">
                  {(course.prerequisites === '' ? "No Previous courses required" : course.prerequisites) || 'Loading prerequisites...'}
                </p>
              </div>

            </div>
          </>
        )
    };
  };

  return (
    <div className="ml-[40px] m-[50px] flex flex-col lg:flex-row">
      <View />
    </div>
  );
};

export default Page;
