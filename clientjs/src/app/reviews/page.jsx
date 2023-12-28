// pages/review.js
"use client";
import { useState } from 'react';
import Rating from './Rating/Rating';

const Review = () => {
  const [ratingValue, setRatingValue] = useState(undefined);

  const [formData, setFormData] = useState({
    fullName: '',
    faculty: '',
    course: '',
    difficulty: '',
    usefulness: '',
    courseExperience: '',
    professor: '',
    clarity: '',
    engagement: '',
    professorExperience: '',
  });

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to backend
    console.log('Form data:', formData);
  };

  const handleRatingAction = (value) => {
    setRatingValue(value);
  };

  return (
    <div className="flex flex-col items-center p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Leave a review</h1>
      <p className="mb-6">
        We care about student engagement and satisfaction and value your feedback.
        Help a friend and leave a review on a course you have taken previously and
        support other students by upvoting their reviews.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="course" className="block mb-1 font-semibold">What Course do you want to review?</label>
          <input
            type="text"
            id="course"
            name="course"
            value={formData.course}
            onChange={handleChange}
            required
            className="border p-2 w-full rounded"
          />
        </div>
        <div className="md:flex flex-row gap-8">
        <div className="mb-4">
          <label htmlFor="difficulty" className="block mb-1 font-semibold">
            How Difficult was this course?
          </label>
          <div className="ml-2 flex flex-row scale-110">
          <Rating
            iconSize="l"
            showOutOf={true}
            enableUserInteraction={true}
            onClick={handleRatingAction}
          />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="usefulness" className="block mb-1 font-semibold">
            How Useful was this course?
          </label>
          <div className="ml-2 flex flex-row scale-110">
          <Rating
            iconSize="l"
            showOutOf={true}
            enableUserInteraction={true}
            onClick={handleRatingAction}
          />
          </div>
        </div>
        </div>
        <div className="mb-4">
          <label htmlFor="courseExperience" className="block mb-1 font-semibold">
            Describe your experience with the course:
          </label>
          <textarea
            id="courseExperience"
            name="courseExperience"
            value={formData.courseExperience}
            onChange={handleChange}
            required
            className="border p-2 w-full rounded"
          />
        </div>
        {/* <div className="mb-4">
          <label htmlFor="professor" className="block mb-1 font-semibold">
            What was your professor's name?
          </label>
          <input
            type="text"
            id="professor"
            name="professor"
            value={formData.professor}
            onChange={handleChange}
            required
            className="border p-2 w-full rounded"
          />
        </div>
        <div className="md:flex flex-row gap-4">
        <div className="mb-4">
          <label htmlFor="rating" className="block mb-1 font-semibold">
            How would you rate the clarity of your professor?
          </label>
          <div className="ml-2 flex flex-row scale-110">
          <Rating
            iconSize="l"
            showOutOf={true}
            enableUserInteraction={true}
            onClick={handleRatingAction}
          />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="engagement" className="block mb-1 font-semibold">
            How would you rate the engagement of your professor?
          </label>
          <div className="ml-2 flex flex-row scale-110">
          <Rating
            iconSize="l"
            showOutOf={true}
            enableUserInteraction={true}
            onClick={handleRatingAction}
          />
          </div>
        </div>
        </div>
        <div className="mb-4">
          <label htmlFor="professorExperience" className="block mb-1 font-semibold">
            Describe your experience with the Professor:
          </label>
          <textarea
            id="professorExperience"
            name="professorExperience"
            value={formData.professorExperience}
            onChange={handleChange}
            required
            className="border p-2 w-full rounded"
          />
        </div> */}
        <button
          type="submit"
          className="bg-primary-blue hover:bg-primary-yellow hover:text-black text-white font-semibold py-2 px-4 rounded"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default Review;
