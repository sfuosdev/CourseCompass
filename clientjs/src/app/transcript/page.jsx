"use client";
import { useState, useEffect } from 'react';
import parsePDFToCourses from './pdfParser';

function Page() {
  const [parsedCourses, setParsedCourses] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleParsePDF = async (file) => {
    try {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const pdfData = event.target.result;
        const courses = await parsePDFToCourses(pdfData);
        if (courses && Object.keys(courses).length > 0) {
          setParsedCourses(courses);
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
        years[year] = { Spring: [], Summer: [], Fall: [], cumulativeUnits: null };
      }
  
      years[year][term] = parsedCourses[yearTerm];
      if (parsedCourses[yearTerm]?.cumulativeUnits !== undefined) {
        years[year].cumulativeUnits = parsedCourses[yearTerm].cumulativeUnits;
      }
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
                        <li key={course} className="py-1">{course}</li>
                      ))
                    ) : (
                      <li className="py-1">null term</li>
                    )}
                  </ul>
                </div>
              ))}
              {years[year].cumulativeUnits !== null && (
                <div className="w-full p-2 mt-4">
                  <p className="text-md font-semibold">Cumulative Units: {years[year].cumulativeUnits}</p>
                </div>
              )}
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
        <h2 className="text-2xl font-semibold mb-4">Parsed Courses:</h2>
        {renderContent()}
      </div>
    </div>
  );
}

export default Page;


