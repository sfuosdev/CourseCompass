"use client";
// Nothing important can be deleted
import ProfessorCard from "@/components/ProfessorCard";
import Review from "@/components/ReviewList";

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

function ratingSystem(review, user) {
  // console.log(review.map(rating => user.rating.find(({ ID }) => ID === rating.ID)))
  return review.map((rating) => user.rating.find(({ ID }) => ID === rating.ID));
}

const params = {
  year: "2024",
  term: "spring",
  dept: "cmpt",
  course: "225",
};

const courses = [
  {
    professor: "Anne Lavergne",
    sections: [
      "D100",
      "D101",
      "D102",
      "D103",
      "D104",
      "D105",
      "D106",
      "D107",
      "D108",
    ],
  },
  {
    professor: "Toby Donaldson",
    sections: [
      "D200",
      "D201",
      "D202",
      "D203",
      "D204",
      "D205",
      "D206",
      "D207",
      "D208",
    ],
  },
];

export default function tester() {
  // Should correlate "user" with the reviews on the page
  // ie. This should only contain the reviews the user has interated with
  const userRatingsMapped = ratingSystem(reviewComment, userAccount);

  return (
    <>
      <div className="grid grid-cols-2">
        <div className="course-teaching">
          <div className="textplace"></div>
          <div className="p-6">Teaching</div>
          <ProfessorCard courses={courses} params={params} />
        </div>
        <div className="Considerations"></div>
      </div>

      <div className="Reviews">
        <Review review={reviewComment[0]} user={userRatingsMapped} />
        <Review review={reviewComment[1]} user={userRatingsMapped} />
      </div>
    </>
  );
}
