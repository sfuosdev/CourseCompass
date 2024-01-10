"use client";
import { useState, useEffect } from 'react';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await fetch(`/api/search/searchCourses?searchTerm=${searchTerm}`);
        const data = await response.json();
        if (data.success) {
          setSearchResults(data.courses);
        } else {
          console.error('Failed to fetch courses:', data.error);
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    // Fetch results when searchTerm changes (debounce or throttle if needed)
    if (searchTerm !== '') {
      fetchSearchResults();
    } else {
      setSearchResults([]); // Clear results if search term is empty
    }
  }, [searchTerm]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search courses..."
        className='flex items-center w-[10rem] p-2 border border-gray-300 rounded-md'
      />

      {/* Display search results */}
      {searchResults.length > 0 && (
        <ul>
          {searchResults.map((course) => (
            <li key={course._id}>
              {course.courseCode} - {course.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
