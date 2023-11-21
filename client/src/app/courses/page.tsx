import React from "react";
import { motion } from "framer-motion";
import { slideInFromTop } from "@/utils/motion";

const page = () => {
  return (
    <div>
      <motion.h2 className="text-xl m-y-5" variants={slideInFromTop}>
        Faculty of Applied Science
      </motion.h2>
      <motion.h1 className="text-3xl m-y-5 text-blue">
        School of Computer Science
      </motion.h1>
    </div>
  );
};

export default page;
