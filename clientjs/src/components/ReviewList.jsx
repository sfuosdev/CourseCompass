import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const upArrows = ["⇧", "⬆"];
const downArrows = ["⇩", "⬇"];

function setUserRating() {

}


// userEX is user
const userEX = {
    ID: String,
    like: Boolean,
    dislike: Boolean
};

// Assuming "user" and the "review" have the same ID numbers
// Going to assume that the "review" and "user" are parsed
// "user" will contain the above or more information
export default function Review({ review, user }) {
    const [like, setLike] = useState(false);
    const [dislike, setDisLike] = useState(false);
    const [likeCounter, setlikesCounter] = useState(review.likes);
    const [dislikeCounter, setdislikesCounter] = useState(review.dislikes);
    const votes = { like: review.likes, dislike: review.dislikes }

    function handleUpVote() {
        setLike(!like);
        if (!like) {
            setDisLike(like);
            setlikesCounter(likeCounter + 1);
            setdislikesCounter(votes.dislike);
        }
        else
            setlikesCounter(likeCounter - 1);
        // fix counter later
        // Both need updates for the server
    }

    function handleDownVote() {
        setDisLike(!dislike);
        if (!dislike) {
            setLike(dislike);
            setdislikesCounter(dislikeCounter + 1);
            setlikesCounter(votes.like);
        }
        else
            setdislikesCounter(dislikeCounter - 1);
    }

    const view = (user === `` ? (
        <>
            <Link href={`http://localhost:3000`} className="px-2 text-[12px] md:text-[20px]" >
                {`${upArrows[0]}`} <span className="text-[8px] md:text-[12px]">{likeCounter}</span>
            </Link>
            <Link href={`http://localhost:3000`} className="px-2 text-[12px] md:text-[20px]">
                {`${downArrows[0]}`} <span className="text-[8px] md:text-[12px]">{dislikeCounter}</span>
            </Link>
        </>
    ) : (
        <>
            <button className="px-2 text-[12px] md:text-[20px]" onClick={handleUpVote}>
                {`${like == true ? upArrows[1] : upArrows[0]}`} <span className="text-[8px] md:text-[12px]">{likeCounter}</span>
            </button>
            {/* Remove space next to span to put 1000 on the right of arrow */}
            <button className="px-2 text-[12px] md:text-[20px]" onClick={handleDownVote}>
                {dislike == true ? downArrows[1] : downArrows[0]} <span className="text-[8px] md:text-[12px]">{dislikeCounter}</span>
            </button>
        </>
    )
    );

    return (
        <div className="relative md:p-4 mx-5 my-2 md:w-3/4 flex flex-row border-b-4 border-black hover:bg-gray">
            <div className="flex flex-col justify-around  md:justify-between w-1/2">
                <div className="flex flex-col items-stretch text-[10px] md:text-[20px]">
                    {`${review.day}/${review.month}/${review.year}`}
                    <div>
                        {review.name}
                    </div>
                    <img src={review.image}
                        alt={`Picture of ${review.name}`}
                        className="self-center h-8 w-8 md:h-16 md:w-16 rounded-full"></img>
                </div>
                <div className="flex px-4">
                    {view}
                </div>
            </div>
            <div className="p-3 md:p-0 flex flex-col w-auto justify-between">
                <div className="lg:py-3 text-[10px] md:text-[18px]">{review.comment}</div>
                <div className="grid grid-cols-3 text-[10px] md:text-[18px]">
                    <div className="font-semibold">Professor: <span className="font-normal">{review.professor}</span></div>
                    <div className="font-semibold">Clarity: <span className="font-normal">{`${review.clarity}/5`}</span></div>
                    <div className="font-semibold">Engagement: <span className="font-normal">{`${review.engagement}/5`}</span></div>
                </div>
            </div>
        </div>
    );
}