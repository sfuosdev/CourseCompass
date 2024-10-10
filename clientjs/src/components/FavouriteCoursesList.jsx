import React, { useEffect, useState } from "react";
import axios from "axios";

const FavouriteCoursesList = () => {
  const [courseList, setCourseList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchFavoriteCourses = async () => {
      // Retrieve the user ID from local storage
      const userId = localStorage.getItem('user_id');
      
      if (!userId) {
        console.error('User ID not found');
        setIsLoading(false);
        return;
      }

      try {
        const response = await axios.get(`/api/user/getAllFavoriteCourses?userId=${userId}`);
        setCourseList(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching favorite courses:", error);
        setIsLoading(false);
      }
    };

    fetchFavoriteCourses();
  }, []);

  const removeFavoriteCourse = async (courseId) => {
    const userId = localStorage.getItem('user_id');
  
    try {
      await axios.post('/api/user/removeFavoriteCourse', { userId, courseId });
      setCourseList(currentList => currentList.filter(course => course._id !== courseId));
    } catch (error) {
      console.error("Error removing favorite course:", error);
      // Optionally, show an error message to the user
    }
};


  return (
    <div className="flex flex-col pt-3 pb-5 pl-1 pr-2 m-2 border shadow-md rounded-lg">
      <div className="py-3 font-medium text-[22px]">Favourites</div>
      <hr></hr>
      <div>
        {isLoading ? (
          <p>Loading...</p>
        ) : courseList.length === 0 ? (
          "No favourite courses found"
        ) : (
          courseList.map(course => (
            <div key={course._id} className="py-2">
              {/* Adjust the display as needed */}
              <div className="font-semibold">{course.title}</div>
              <div className="text-sm">{course.courseCode}</div>
              <button
                onClick={() => removeFavoriteCourse(course._id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FavouriteCoursesList;
