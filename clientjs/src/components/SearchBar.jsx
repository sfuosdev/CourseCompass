import { useState, useEffect, useRef } from 'react';

const SearchPage = ({ page }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchMode, setSearchMode] = useState('code');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [error, setError] = useState(null);
  const searchContainerRef = useRef(null);
  const debounceTimeoutRef = useRef(null);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleRadioChange = (mode) => {
    setSearchMode(mode);
  };

  const handleClickOutside = (event) => {
    if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
      setShowSearchResults(false);
    }
  };

  const handleSearchBarFocus = () => {
    setShowSearchResults(true);
  };

  const debounceSearch = (value) => {
    clearTimeout(debounceTimeoutRef.current);
    debounceTimeoutRef.current = setTimeout(() => {
      fetchSearchResults(value);
    }, 100); // Adjust the debounce delay as needed
  };

  const fetchSearchResults = async (value) => {
    try {
      const response = await fetch(`/api/search/searchCourses?searchTerm=${value}&searchMode=${searchMode}`);
      const data = await response.json();
      setSearchResults(data.courses);
      setShowSearchResults(true);
      setError(null);
    } catch (error) {
      console.error('Error fetching search results:', error);
      setError('Error fetching search results');
      setShowSearchResults(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      clearTimeout(debounceTimeoutRef.current); // Cleanup debounce timeout on unmount
    };
  }, [showSearchResults]);

  useEffect(() => {
    if (!searchMode) {
      setError('No search mode selected');
      setShowSearchResults(false);
      return;
    }

    if (searchTerm.trim() !== '') {
      debounceSearch(searchTerm.trim());
    } else {
      setShowSearchResults(false);
    }

    // Cleanup debounce timeout on new search term
    return () => {
      clearTimeout(debounceTimeoutRef.current);
    };
  }, [searchTerm, searchMode]);

  return (
    <div className="flex flex-col items-center mt-4">
      <div className="flex inline-flex flex-col mb-[-2rem]" ref={searchContainerRef}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          onFocus={handleSearchBarFocus}
          placeholder="Search courses and professors eg. CMPT 120, John Smith"
          className={`relative p-[1rem] w-[70vw] md:w-[50vw] lg:w-[50vw] h-[2.7rem] mb-[-0.5rem] ${page === 'LandPage' ? 'rounded-md' : 'rounded-full'} mt-[0.6rem] ml-[1rem] md:ml-[0rem] border border-black 
          bg-white text-black`}
        />
        <div className="relative flex flex-row items-start mt-2 ml-[1rem]">
          <p className='mr-2'>Search By:</p>
          <label className="mr-4">
             Code
            <input
              type="radio"
              value="code"
              checked={searchMode === 'code'}
              onChange={() => handleRadioChange('code')}
              className="ml-2"
            />
          </label>
          <label className="mr-4">
             Title
            <input
              type="radio"
              value="title"
              checked={searchMode === 'title'}
              onChange={() => handleRadioChange('title')}
              className="ml-2"
            />
          </label>
          <label>
            Professor
            <input
              type="radio"
              value="professor"
              checked={searchMode === 'professor'}
              onChange={() => handleRadioChange('professor')}
              className="ml-2"
            />
          </label>
        </div>
        {/* Display search results */}
        {showSearchResults && searchTerm.length > 0 && (
          <div className={`${page === 'LandPage' ? 'relative' : 'absolute'} border-2 ml-[1rem] md:ml-[0rem] border-black bg-white rounded-md ${page === 'LandPage' ? '' : 'ml-[4rem] sm:ml-[6rem] md:ml-[0rem] top-[9rem]'} z-10 w-full max-w-[70vw] md:max-w-[50vw] lg:max-w-[50vw] h-[20rem] overflow-y-auto shadow-lg shadow-gray-400`}>
            {searchResults.length > 0 ? (
              <div> {/* Adjust max-width as needed */}
                {searchResults.map(course => (
                  <a
                    key={course._id}
                    href={`/courses/2024/spring/${course.dept}/${course.name}`}
                    className="block px-4 py-2 border-b border-gray-200 hover:bg-gray-100"
                  >
                    <span className='font-bold'>{course.dept} {course.name} </span>- {course.title}
                  </a>
                ))}
              </div>
            ) : (
              <p className="text-center bold text-red-500 pt-[4rem]">No results found</p>
    )}
  </div>
)}
      </div>
    </div>
  );
};

export default SearchPage;
