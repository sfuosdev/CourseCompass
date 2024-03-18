import Link from "next/link";
import { useState } from "react";
import Rating from "@/app/reviews/Rating/Rating";

const upArrows = ["⇧", "⬆"];
const downArrows = ["⇩", "⬇"];

function setUserRating() {}

// userEX is user
const userEX = {
  reviewer: String,
  usefulnessRating: Number,
  difficultyRating: Number,
  comment: String,
  date: String,
  upvotes: Number,
  ID: Number,
};

const convertToPercent = (rating) => (rating / 5) * 100;

// 0-4 Year
// 5-7 Month
// 8-10 Day
// Set to MM/DD/YYYY
const convertDate = (date) => (date.toString().slice(5,7) + "/" + date.toString().slice(8,10) + "/" + date.toString().slice(0,4));

// Assuming "user" and the "review" have the same ID numbers
// Going to assume that the "review" and "user" are parsed
// "user" will contain the above or more information
const Review = ({ review }) => {
  const [upvotes, setupvotes] = useState(false);
  const [downvotes, setdownvotes] = useState(false);
  const [upvotesCounter, setupvotesCounter] = useState(review.upvotes);
  const [downvotesCounter, setdownvotesCounter] = useState(review.downvotes);
  const votes = { upvotes: review.upvotes, downvotes: review.downvotes };

  function handleUpVotes() {
    setupvotes(!upvotes);
    if (!upvotes) {
      setdownvotes(upvotes);
      setupvotesCounter(upvotesCounter + 1);
      setdownvotesCounter(votes.downvotes);
    } else setupvotesCounter(upvotesCounter - 1);
    // fix counter later
    // Both need updates for the server
  }

  function handleDownVotes() {
    setdownvotes(!downvotes);
    if (!downvotes) {
      setupvotes(downvotes);
      setdownvotesCounter(downvotesCounter + 1);
      setupvotesCounter(votes.upvotes);
    } else setdownvotesCounter(downvotesCounter - 1);
  }

  const view =
      (<>
        <button
          className="px-2 text-[12px] md:text-[20px]"
          onClick={handleUpVotes}
        >
          {`${upvotes == true ? upArrows[1] : upArrows[0]}`}{" "}
          <span className="text-[8px] md:text-[12px]">{upvotesCounter}</span>
        </button>
        {/* Remove space next to span to put 1000 on the right of arrow */}
        <button
          className="px-2 text-[12px] md:text-[20px]"
          onClick={handleDownVotes}
        >
          {downvotes == true ? downArrows[1] : downArrows[0]}{" "}
          <span className="text-[8px] md:text-[12px]">{downvotesCounter}</span>
        </button>
      </>)

  return (
    <div className="relative md:p-4 md:w-full flex flex-row border-b-2 border-black hover:bg-gray">
      <div className="flex flex-col justify-around  md:justify-between w-1/2">
        <div className="flex flex-col items-stretch text-[10px] md:text-[20px]">
          {`${convertDate(review.date)}`}
          <div>{review.reviewer.username}</div>
          <img
            src={"/profile-picture.jpg"}
            alt={`Picture of ${review.reviewer.username}`}
            className="self-center h-8 w-8 md:h-16 md:w-16 rounded-full"
          ></img>
        </div>
        <div className="flex px-4">{view}</div>
      </div>
      <div className="p-3 md:p-0 flex flex-col w-auto justify-between">
        <div className="py-1 lg:py-3 text-[10px] md:text-[18px]">
          {review.comment}
        </div>
        <div className="grid grid-cols-3 text-[10px] md:text-[18px]">
          <div className="font-semibold">
            Professor: <span className="font-normal">{review.professor}</span>
          </div>
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
        </div>
      </div>
    </div>
  );
}

export default Review;