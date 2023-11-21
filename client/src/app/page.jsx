"use client";

import CourseOutline from "@/components/CourseOutline";
import SelectionMenu from "@/components/SelectionMenu";
import { useState } from "react";


export default function Home() {
  const [outline, setOutline] = useState();

  return (
    <div>
      <SelectionMenu {...{ outline, setOutline }} />
      <CourseOutline {...outline} />
    </div>
  );
}
