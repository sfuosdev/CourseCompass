"use client";

import CourseOutline from "@/components/CourseOutline";
import SelectionMenu from "@/components/SelectionMenu";
import { useState } from "react";
import { Outline } from "@/components/CourseOutline";

export default function Home() {
  const [outline, setOutline] = useState<Outline | null>();

  return (
    <div>
      <SelectionMenu {...{ outline, setOutline }} />
      <CourseOutline {...outline} />
    </div>
  );
}
