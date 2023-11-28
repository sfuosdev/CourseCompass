"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Card from "./Card";
import BackCard from "./BackCard";

import ReactCardFlip from "react-card-flip";

const CardFlip = ({ course }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  return (
    <div
      className="cursor-pointer flex items-center justify-center"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      {/* <motion.div
        className="transform-style-3d"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 360 }}
        transition={{ duration: 0.6, animationDirection: "normal" }}
        onAnimationComplete={() => setIsAnimating(false)}
      > */}
      <ReactCardFlip isFlipped={isFlipped}>
        <Card course={course} />
        <BackCard course={course} />
      </ReactCardFlip>
      {/* </motion.div> */}
    </div>
  );
};

export default CardFlip;
