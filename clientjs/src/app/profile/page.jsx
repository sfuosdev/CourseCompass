"use client";

import ProfileHero from "@/components/ProfileHero";
import ProfileCompletionList from "@/components/ProfileCompletionList";
import FavouriteCoursesList from "@/components/FavouriteCoursesList";
import { useState, useEffect } from "react";
import { departments } from "@/components/LoginSignupModal";
import Transcript from "./transcript/page";

const userInfo = {
  fullname: "Peter Chan",
  email: "peterchan214@gmail.com",
  credits: 40,
  year: "2",
  major: "Computer Science",
  minor: "",
  schedule: "",
  coursereviews: [],
  professorreviews: [],
};

const year = () => {
  switch (userInfo.year) {
    case 1:
      return "1 ";
  }
};

function UploadScheduleView() {
  return (
    <div className="h-[50%] w-auto">
      <div className="p-[20px]">
        <div className="py-3 font-medium text-[30px]">
          Import your current schedule
        </div>
        <div className="pb-9 font-normal text-[18px]">
          Import your current schedule by clicking here
        </div>
      </div>
    </div>
  );
}
function ImportCoursesView() {
  return (
    <div className="h-[50%] w-auto">
      <div className="p-[20px]">
        <div className="py-3 font-medium text-[30px]">
          Import course history
        </div>
        <div className="pb-9 font-normal text-[18px]">
          Import your course history to leave reviews by either uploading your
          transcript or adding the courses manually
          <Transcript />
        </div>
      </div>
    </div>
  );
}
function MajorInfoView() {
  const [formData, setFormData] = useState({
    majors: [],
    minors: [],
  });

  const handleInputChange = (e) => {
    const options = e.target.options;
    let value = [];
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        if (options[i].value === "none") {
          // If 'None' is selected, reset the selection
          value = [];
          break;
        } else {
          value.push(options[i].value);
        }
      }
    }
    setFormData({ ...formData, [e.target.name]: value });
  };

  return (
    <div className="h-[50%] w-auto">
      <div className="p-[20px]">
        <div className="py-3 font-semibold text-[30px]">
          Add your degree information
        </div>
        <div className="pb-9 font-normal text-[16px]">
          Please provide additional information on your (intended) program,
          major(s), minor(s), specialization(s), and concentration(s).
        </div>
        <form>
          <select
            multiple
            name="majors"
            value={formData.majors}
            onChange={handleInputChange}
            className="block w-full p-2 mb-2"
          >
            <option value="none">None</option>
            {departments.map((dept) => (
              <option key={dept.value} value={dept.value}>
                {dept.name}
              </option>
            ))}
          </select>
          <label htmlFor="minors">Minors:</label>
          <select
            multiple
            name="minors"
            value={formData.minors}
            onChange={handleInputChange}
            className="block w-full p-2 mb-2"
          >
            <option value="none">None</option>
            {departments.map((dept) => (
              <option key={dept.value} value={dept.value}>
                {dept.name}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="block w-full bg-primary-blue text-white p-2 rounded mb-2"
          >
            Update information
          </button>
        </form>
      </div>
    </div>
  );
}

function SwitchComponent({ viewSelector, majors, minors }) {
  switch (viewSelector) {
    case 1:
      return <UploadScheduleView />;
    case 2:
      return <ImportCoursesView />;
    case 3:
      return <MajorInfoView majors={majors} minors={minors} />;
    default:
      return userInfo.schedule === "" ? "" : <UploadScheduleView />;
  }
}

export default function Profile() {
  const [viewSelector, setViewSelector] = useState(1);

  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch user data from the API
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        // Retrieve the user ID from localStorage
        const userId = localStorage.getItem("user_id");
        if (!userId) {
          throw new Error("No user ID found in localStorage.");
        }

        const response = await fetch(`/api/user/${userId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setUserData(data.data);
      } catch (error) {
        console.error("Fetching user data failed", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    // As localStorage is not accessible during server-side rendering,
    // we call the fetchUserData inside the useEffect hook,
    // so it only runs on the client-side after component mounts.
    fetchUserData();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!userData) return <div>No user data found</div>;

  const getDepartmentName = (value) => {
    const department = departments.find((dept) => dept.value === value);
    return department ? department.name : value; // Return the full name if found, otherwise return the abbreviation
  };
  return (
    <div>
      <ProfileHero fullname={userData.username} email={userData.email} />

      <div>
        <p>Majors: {userData.majors.map((major) => getDepartmentName(major))}</p>
        <p>Minors: {userData.minors.map((minor) => getDepartmentName(minor))}</p>
      </div>

      <div className="flex flex-col md:flex-row">
        <div className="w-screen md:w-[70%]">
          <SwitchComponent
            viewSelector={viewSelector}
            majors={userData.majors}
            minors={userData.minors}
          />
          {/* <MajorInfoView /> */}
        </div>
        <div className="flex flex-col w-screen md:w-[30%]">
          <ProfileCompletionList setViewSelector={setViewSelector} />
          <FavouriteCoursesList setViewSelector={setViewSelector} />
        </div>
      </div>
    </div>
  );
}
