"use client"
import { ScrollToTopButton } from "@/components/LandingPage";
import axios from "axios";
import { useEffect, useState } from "react";
import Review from "@/components/ReviewList";

async function fetchInstructor(instructorName) {
    try {
        const res = await axios.get("/api/instructors/getInstructor?name=" + instructorName);
        console.log(res);
        return res.data;
    } catch (error) {
        console.error("Fetch Instructor Error: \n", error);
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

// Guessing
const instructor = {
    profileUrl: "https://www.sfu.ca/computing/people/faculty/johnedgar.html",
    commonName: "???",
    firstName: "John",
    lastName: "Edgar",
    phone: "604",
    roleCode: "???",
    name: "johnedgar",
    officeHours: "courses",
    office: "ASB 7000",
    email: "john@sfu.ca",
}

function RatingView() {
    return (
        <div className="">
            <div className="">
                <div className="text-xl lg:text-2xl">Rating</div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt accusantium quia numquam quod magnam blanditiis dolores, consequuntur sint adipisci fugiat ea dignissimos, excepturi alias veritatis suscipit laboriosam, consequatur eaque voluptates?
            </div>
        </div>
    );
}

export default function page({ params }) {
    // const [instructor, setInstructor] = useState();

    // useEffect(() => {
    //     fetchInstructor(params.instructor).then((res) => setInstructor(res));
    // });

    // console.log(instructor);
    const reviews = {
        length: 0
    }
    const handleLeaveReviewClick = () => {
        let courseCode = params.course.toLowerCase();
        router.push(`/reviews?courseCode=${courseCode}`);
    };

    return (
        <div className="ml-[40px] m-[50px] flex flex-col lg:flex-row">
            <ScrollToTopButton />
            <div className="lg:w-[80%]">
                <div className="text-3xl text-[#4570E6] underline underline-offset-4">
                    {instructor.firstName + " " + instructor.lastName}
                </div>
                <div className="flex lg:w-1/2 my-3 lg:text-[20px] text-[14px] font-semibold justify-between">
                    <div className="flex flex-col py-3 px-2 w-1/2 lg:w-full bg-[#F3F4FA] rounded-lg shadow-inner border-2">
                        <div className="lg:text-[24px] text-[18px] font-bold">Overview</div>
                        <div className="p-2">Department: <span>{instructor.roleCode}</span></div>
                        <div className="p-2">Office: <span>{instructor.office}</span></div>
                        <div className="p-2">Office Hours: <span>{instructor.officeHours}</span></div>
                        <div className="p-2">Email: <a className="underline underline-offset-4 hover:text-primary-yellow" href={`mailto: ${instructor.email}`}>{instructor.email}</a></div>
                    </div>
                    <div className="lg:hidden w-1/4">
                        <RatingView />
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
                <button
                    onClick={handleLeaveReviewClick}
                    className="mt-6 text-white rounded bg-primary-blue hover:text-black hover:bg-primary-yellow p-2">
                    Leave a review
                </button>
            </div>
            <div className="hidden w-2/6 lg:flex mt-12">
                <RatingView />
            </div>
        </div>
    );
}