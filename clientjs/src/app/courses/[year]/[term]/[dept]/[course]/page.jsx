"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ProfessorCard from "@/components/ProfessorCard";
import Review from "@/components/ReviewList";
import { ScrollToTopButton } from "@/components/LandingPage";
import Rating from "../../../../../reviews/Rating/Rating";

<<<<<<< HEAD
function ratingSystem(review, user) {
  // console.log(review.map(rating => user.rating.find(({ ID }) => ID === rating.ID)))
  return review.map((rating) => user.rating.find(({ ID }) => ID === rating.ID));
}

const userAccount = {
  // Other things
  name: "TBA",
  rating: [
    {
      ID: "123",
      like: true,
      dislike: false,
    },
    {
      ID: "124",
      like: false,
      dislike: true,
    },
    {
      ID: "125",
      like: false,
      dislike: false,
    },
  ],
};

async function fetchCourse(params) {
  const url = `http://localhost:3000/api/courseOutline`;
=======
async function fetchCourse(courseCode) {
  try {
    const response = await axios.get('/api/courses/getCourse?courseCode=' + courseCode);
    console.log(response.data);
    return response.data.course; // Assuming the API returns a course object
>>>>>>> 92355cb0ee90ced936618f924fbaa97b7676042e

  } catch (error) {
    console.error('Error fetching course:', error);
    return null;
  }
}

<<<<<<< HEAD
const reviewComment = [
  {
    // date: "16/01/2023",
    ID: "123",
    likes: 1000,
    dislikes: 500,
    name: "Anonymous",
    day: "16",
    month: "01",
    year: "2023",
    dept: "cmpt",
    value: "225",
    professor: "John Edgar",
    image: "/profile-picture.jpg",
    comment:
      "A very long review about the course being displayed. Could be a bad review of the course or a good review of the course this is just filler text. Subjected to the change when fully implemented.",
    clarity: "4",
    engagement: "4",
  },
  {
    // date: "16/01/2023",
    ID: "124",
    likes: 50,
    dislikes: 100,
    name: "Gary",
    day: "20",
    month: "05",
    year: "2023",
    dept: "cmpt",
    value: "225",
    professor: "John Edgar",
    image: "/profile-picture.jpg",
    comment:
      "A very long review about the course being displayed. Could be a bad review of the course or a good review of the course this is just filler text. Subjected to the change when fully implemented.",
    clarity: "4",
    engagement: "4",
  },
];

const Page = ({ params }) => {
  const [course, setCourse] = useState({ value: "" });
  const userRatingsMapped = ratingSystem(reviewComment, userAccount);
=======
async function fetchReviews(courseId) {
  try {
    const response = await axios.get(`/api/reviews/getCourseReviews?courseId=${courseId}`);
    return response.data.reviews;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return [];
  }
}

const convertToPercent = (rating) => rating / 5 * 100;

const Page = ({ params }) => {
  const [course, setCourse] = useState({});
  const [reviews, setReviews] = useState([]);

>>>>>>> 92355cb0ee90ced936618f924fbaa97b7676042e
  useEffect(() => {
    let courseCode = (params.dept + params.course).toLowerCase();
    fetchCourse(courseCode).then((res) => {
      if (res) {
        setCourse(res);
        fetchReviews(res._id).then(setReviews);  // Fetch reviews once course is loaded
      }
    });
  }, [params]);

  const handleLeaveReviewClick = () => {
    // Use router to navigate to review page with course details
    router.push({
      pathname: '/reviews',
      query: { 
        courseCode: params.course, 
        dept: params.dept, 
        title: course.title 
      }
    });
  };

  return (
<<<<<<< HEAD
    <>
      <div className="ml-[40px] m-[50px] flex flex-col lg:flex-row">
        <ScrollToTopButton />
        <div className="lg:w-[70%] pr-[50px]">
          <h2 className="text-xl">
            {params.dept.toUpperCase()}
            {course.value}
          </h2>
          <h1 className="text-3xl text-[#4570E6] underline underline-offset-4">
            {course.title}
          </h1>
          <p className="text-base mt-[30px] text-justify">{course.description}</p>
          <p className="text-xl mt-[30px]">
            Next Offering: {params.term} {params.year}
          </p>
        </div>
        <div className="lg:w-[30%] mt-[50px] lg:mt-0">
          <h1 className="text-xl lg:text-2xl">CONSIDERATIONS</h1>
          <div className="lg:flex lg:flex-col">
            <h2 className="text-base lg:text-xl">Pre-requisites:</h2>
            <p className="text-sm lg:text-base">{course.prerequisites}</p>
          </div>
=======
    <div className="ml-[40px] m-[50px] flex flex-col lg:flex-row">
      <ScrollToTopButton />
      <div className="lg:w-[70%] pr-[50px]">
        <h2 className="text-xl">
          {params.dept.toUpperCase()} {params.course}
        </h2>
        <h1 className="text-3xl text-[#4570E6] underline underline-offset-4">
          {course.title || 'Loading...'}
        </h1>
        <p className="text-base mt-[30px] text-justify">
          {course.courseDetails || 'Description loading...'}
        </p>
       
        <p className="text-xl mt-[30px]">
          Next Offering: {params.term} {params.year}
        </p>
        


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
{/* 
        {course.title && (
        <Link className="text-white rounded bg-primary-blue hover:text-black hover:bg-primary-yellow p-2" href={`/reviews?courseCode=${params.course}&dept=${params.dept}&title=${course.title}`}>
          Leave a review
        </Link>
        )}       */}
    </div>
      <div className="lg:w-[30%] mt-[50px] lg:mt-0">
        <h1 className="text-xl lg:text-2xl">CONSIDERATIONS</h1>
        <div className="lg:flex lg:flex-col">
          <h2 className="text-base lg:text-xl">Pre-requisites:</h2>
          <p className="text-sm lg:text-base">
            {course.prerequisites || 'Loading prerequisites...'}
          </p>
>>>>>>> 92355cb0ee90ced936618f924fbaa97b7676042e
        </div>
      </div>
      <div className="mt-[10px] flex flex-row">
          {course.value != "" ? <ProfessorCard course={course} /> : <></>}
        </div>
        <div className="mt-[10px] flex flex-col">
          <div className="Reviews">
            <Review review={reviewComment[0]} user={userRatingsMapped} />
            <Review review={reviewComment[1]} user={userRatingsMapped} />
          </div>
        </div>
    </>
  );
};

export default Page;
