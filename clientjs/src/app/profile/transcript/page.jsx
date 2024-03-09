"use client";
import { useState } from 'react';
import parsePDFToCourses from './pdfParser';

function Transcript() {
  const [parsedCourses, setParsedCourses] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [yearRange, setYearRange] = useState({ firstYear: new Date().getFullYear(), lastYear: new Date().getFullYear() });
  const [addingCourse, setAddingCourse] = useState({ year: '', term: '', showInput: false });

  const addYear = (position) => {
    const updatedParsedCourses = { ...parsedCourses };
    const years = Object.keys(updatedParsedCourses);
    const currentYear = new Date().getFullYear();

    if (years.length === 0) {
      updatedParsedCourses[currentYear.toString()] = { Spring: [], Summer: [], Fall: [] };
      setYearRange({ firstYear: currentYear, lastYear: currentYear });
      setParsedCourses(updatedParsedCourses);
      return;
    }

    const firstYear = Math.min(...years.map(year => parseInt(year)));
    const lastYear = Math.max(...years.map(year => parseInt(year)));

    if (position === 'before') {
      const newFirstYear = firstYear - 1;
      updatedParsedCourses[newFirstYear.toString()] = { Spring: [], Summer: [], Fall: [] };
      setYearRange(prevState => ({ ...prevState, firstYear: newFirstYear }));
    } else if (position === 'after') {
      const newLastYear = lastYear + 1;
      updatedParsedCourses[newLastYear.toString()] = { Spring: [], Summer: [], Fall: [] };
      setYearRange(prevState => ({ ...prevState, lastYear: newLastYear }));
    }

    setParsedCourses(updatedParsedCourses);
  };


  const removeYear = (position) => {
    const updatedParsedCourses = { ...parsedCourses };
    const years = Object.keys(updatedParsedCourses);
    const firstYear = years.length > 0 ? Math.min(...years.map(year => parseInt(year))) : new Date().getFullYear();
    const lastYear = years.length > 0 ? Math.max(...years.map(year => parseInt(year))) : new Date().getFullYear();

    if (position === 'before') {
      const firstYearIndex = 0;
      const newLastYear = firstYear - 1;
      delete updatedParsedCourses[years[firstYearIndex]];
      setYearRange(prevState => ({ ...prevState, lastYear: newLastYear }));

    } else if (position === 'after') {
      const lastYearIndex = years.length - 1;
      const newFirstYear = lastYear - 1;
      delete updatedParsedCourses[years[lastYearIndex]];
      setYearRange(prevState => ({ ...prevState, firstYear: newFirstYear }));
    }
    setParsedCourses(updatedParsedCourses);
  };



  const handleParsePDF = async (file) => {
    try {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const pdfData = event.target.result;
        const courses = await parsePDFToCourses(pdfData);
        if (courses && Object.keys(courses).length > 0) {
          setParsedCourses(courses);
          const transcriptYears = Object.keys(courses).map(yearTerm => parseInt(yearTerm.split(' ')[0]));
          const minYear = Math.min(...transcriptYears);
          setYearRange(prevState => ({ ...prevState, firstYear: minYear }));
          setErrorMessage('');
        } else {
          setParsedCourses(null);
          setErrorMessage('File must be an Unofficial Transcript.');
        }
      };
      reader.readAsArrayBuffer(file);
    } catch (error) {
      console.error('Error:', error);
      setParsedCourses(null);
      setErrorMessage('Unsupported file type or unable to read courses.');
    }
  };


  const handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;

    if (files.length > 0) {
      const file = files[0];
      if (file.type === 'application/pdf') {
        handleParsePDF(file);
      } else {
        setParsedCourses(null);
        setErrorMessage('Unsupported file type or unable to read courses.');
      }
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file.type === 'application/pdf') {
      handleParsePDF(file);
    } else {
      setParsedCourses(null);
      setErrorMessage('Unsupported file type or unable to read courses.');
    }
  };

  const allowDrop = (event) => {
    event.preventDefault();
  };

  const handleRemoveCourse = (year, term, courseToRemove) => {
    const updatedCourses = { ...parsedCourses };
    const termCourses = updatedCourses[`${year} ${term}`];
    const updatedTermCourses = termCourses.filter(course => course !== courseToRemove);
    updatedCourses[`${year} ${term}`] = updatedTermCourses;
    setParsedCourses(updatedCourses);
  };

  const handleAddCourse = (year, term, newCourse) => {
    const updatedCourses = { ...parsedCourses };
    if (!updatedCourses[`${year} ${term}`]) {
      updatedCourses[`${year} ${term}`] = [];
    }
    if (updatedCourses[`${year} ${term}`].includes(newCourse)) {
      alert('Course already exists');
      return;
    }
    if (updatedCourses[`${year} ${term}`].length < 5) {
      updatedCourses[`${year} ${term}`].push(newCourse);
      setParsedCourses(updatedCourses);
      setAddingCourse({ year: '', term: '', showInput: false });
    } else {
      alert('Maximum 5 courses allowed per term');
    }
  };

  const renderContent = () => {
    if (errorMessage !== '') {
      return (
        <div>
          <p className='text-red-500'>
            Unsupported file type or unable to read courses.
            <br />
            Please upload your Unofficial Transcript as a PDF file.
            <br />
            If the error persists, please try another method or contact us.
          </p>
        </div>
      );
    }

    if (parsedCourses === null) {
      return null;
    }

    const years = {};
    Object.keys(parsedCourses).forEach(yearTerm => {
      const [year, term] = yearTerm.split(' ');
      if (!years[year]) {
        years[year] = { Spring: [], Summer: [], Fall: [] };
      }

      years[year][term] = parsedCourses[yearTerm];
    });

    return (
      <div>
        {Object.keys(years).map(year => (
          <div key={year} className="mb-4 p-4 bg-gray-200 rounded-lg">
            <h3 className="text-lg font-semibold">{year}</h3>
            <div className="flex flex-wrap justify-between mt-2">
              {['Spring', 'Summer', 'Fall'].map(term => (
                <div key={term} className="w-1/3 p-2">
                  <h4 className="text-md font-semibold">{term}</h4>
                  <ul className="mt-2">
                    {years[year][term].length > 0 ? (
                      years[year][term].map(course => (
                        <li key={course} className="py-1 rounded-lg bg-gray-300 flex flex-row justify-between w-[8rem] pl-1 mb-1">
                          {course}
                          <button onClick={() => handleRemoveCourse(year, term, course)} className='bg-gray-300 ml-2 rounded-full border border-gray-400 font-bold px-2 text-gray-600'>-</button>
                        </li>
                      ))
                    ) : (
                      <li className="py-1">null term</li>
                    )}
                    {addingCourse.showInput && addingCourse.year === year && addingCourse.term === term && (
                      <li>
                        <input
                          type="text"
                          placeholder="Add a course"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              handleAddCourse(year, term, e.target.value);
                              e.target.value = '';
                            }
                          }}
                        />
                      </li>
                    )}
                    {years[year][term].length < 6 && (
                      <li>
                        <button onClick={() => setAddingCourse({ year, term, showInput: true })} className='bg-gray-300 rounded-full border border-gray-400 font-bold px-2 text-gray-600'>+</button>
                      </li>
                    )}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };


  return (
    <div className="p-4">
      <h1 className="text-3xl font-semibold mb-4">PDF Parser</h1>
      <div
        className="border-dashed border-2 border-gray-400 p-8 mb-4"
        onDrop={handleDrop}
        onDragOver={allowDrop}
      >
        <p className="text-gray-500">Drag and drop your PDF file here, or</p>
        <input
          type="file"
          onChange={handleFileChange}
          accept=".pdf"
          className="mt-4"
        />
      </div>
      <div className="mt-8">
        <button onClick={() => addYear('before')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">+</button>
        <button onClick={() => removeYear('before')} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4">-</button>

        <h2 className="text-2xl font-semibold mb-4">Parsed Courses:</h2>
        {renderContent()}
        <button onClick={() => addYear('after')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">+</button>
        <button onClick={() => removeYear('after')} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4">-</button>

      </div>
    </div>
  );
}

export default Transcript;
