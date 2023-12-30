import { useState, useEffect, useRef } from 'react';

const SearchBar = ({ page }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const searchContainerRef = useRef(null);
  const abortController = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setSearchResults([]); // Clear search results when clicking outside the search bar
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  useEffect(() => {
    abortController.current = new AbortController();

    const fetchSearchResults = async () => {
      try {
        const signal = abortController.current.signal;

        if (searchTerm.trim() !== '') {
          const response = await fetch(`/api/search/searchCourses?searchTerm=${searchTerm}`, { signal });
          const data = await response.json();
          if (!signal.aborted) {
            if (data.success && searchTerm.trim() !== '') {
              // Update search results only if there's a success response and the search term is not empty
              setSearchResults(data.courses);
            } else if (!data.success && searchTerm.trim() !== '') {
              // Show error message if the API call fails and the search term is not empty
              throw new Error(`Failed to fetch courses: ${data.error}`);
            } else {
              // Clear search results if the search term is empty
              setSearchResults([]);
            }
          }
        } else {
          setSearchResults([]); // Clear results if search term is empty
        }
      } catch (error) {
        console.error(`Error fetching courses: ${error}`);
        setSearchResults([]); // Clear results on error
      }
    };

    if (searchTerm.trim() !== '')
      fetchSearchResults();

    return () => {
      if (abortController.current) {
        abortController.current.abort();
      }
    };
  }, [searchTerm]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const showSearchResults = searchResults.length > 0 && searchTerm.trim() !== '';
  // Rendering different search bar styles based on 'page' prop
  switch (page) {
    case 'LandPage':
      return (
        <div className="flex flex-col items-center mt-4">
          <div className="flex inline-flex w-[80vw] md:w-[50vw] rounded-md border-opacity-50 justify-center" ref={searchContainerRef}>
            <svg
              className="relative inline right-[-2rem] md:right-[-2.5rem] mt-[0.5rem] color-black"
              xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <g clip-path="url(#clip0_13_778)">
                <path d="M10.5 18C14.6421 18 18 14.6421 18 10.5C18 6.35786 14.6421 3 10.5 3C6.35786 3 3 6.35786 3 10.5C3 14.6421 6.35786 18 10.5 18Z" stroke="#23272A" stroke-opacity="0.6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M15.8032 15.8037L20.9998 21.0003" stroke="#23272A" stroke-opacity="0.6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </g>
              <defs>
                <clipPath id="clip0_13_778">
                  <rect width="24" height="24" />
                </clipPath>
              </defs>
            </svg>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search courses, professor, departments..."
              className="pl-[2.5rem] md:pl-[4rem] rounded w-full h-[2.5rem] left-2 bg-primary-white text-black border border-black"
            />
            {/* Display search results */}
            {showSearchResults && (
              <div className='absolute border-[0.125rem] border-black bg-primary-white z-10 rounded-md p-2 mt-[3rem] w-[60vw] h-[12rem] overflow-y-auto'>
                {showSearchResults && (
                  <ul className="">
                    {searchResults.map((course) => (
                      <li key={course._id} className='hover:bg-primary-yellow hover:text-black'>
                        <span className='font-bold'>{course.courseCode}</span> - {course.title}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>
      );

    case 'other':
      return (
        <div className="flex flex-col items-center mt-4">
          <div className="flex inline-flex h-[2.5rem] rounded-full" ref={searchContainerRef}>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search courses, professor, departments..."
              className="relative p-[1rem] w-[60vw] lg:w-[50vw] h-full rounded-full mt-[0.6rem] sm:ml-[1rem] md:ml-[0rem] border border-black"
            />
            <svg
              className="relative hidden left-[-2.5rem] mt-[1.125rem] lg:inline"
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="21"
              viewBox="0 0 21 21"
              fill="none"
            >
              <path
                d="M19.125 19.125L13.375 13.375M1.875 8.58333C1.875 9.46428 2.04852 10.3366 
                2.38564 11.1505C2.72277 11.9644 3.2169 12.7039 3.83983 13.3268C4.46275 13.9498 5.20227 
                14.4439 6.01617 14.781C6.83006 15.1182 7.70238 15.2917 8.58333 15.2917C9.46428 15.2917 
                10.3366 15.1182 11.1505 14.781C11.9644 14.4439 12.7039 13.9498 13.3268 13.3268C13.9498 
                12.7039 14.4439 11.9644 14.781 11.1505C15.1182 10.3366 15.2917 9.46428 15.2917 8.58333C15.2917 
                7.70238 15.1182 6.83006 14.781 6.01617C14.4439 5.20227 13.9498 4.46275 13.3268 3.83983C12.7039 
                3.2169 11.9644 2.72277 11.1505 2.38564C10.3366 2.04852 9.46428 1.875 8.58333 1.875C7.70238 1.875 
                6.83006 2.04852 6.01617 2.38564C5.20227 2.72277 4.46275 3.2169 3.83983 3.83983C3.2169 4.46275 
                2.72277 5.20227 2.38564 6.01617C2.04852 6.83006 1.875 7.70238 1.875 8.58333Z"
                stroke="#ADADAD"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          {/* Display search results */}
          {showSearchResults &&
            <div className='absolute border-2 border-black bg-white ml-[30vw] md:ml-[0vw] rounded-md mx-2 p-2 z-10 top-[7rem] w-[90vw] lg:w-[60vw] h-[20rem] overflow-y-auto'>
              {showSearchResults && (
                <ul className="">
                  {searchResults.map((course) => (
                    <li key={course._id} className='hover:bg-gray-400'>
                      <span className='font-bold'>{course.courseCode}</span> - {course.title}                  
                    </li>
                  ))}
                </ul>
              )}
            </div>
          }
        </div>
      );
    default:
      return null;
  }
};

export default SearchBar;
