import React, { useState, useEffect } from 'react';
import Link from "next/link";
// import "../../src/app/globals.css" /// breaks here

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch user data from the API
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        // Retrieve the user ID from localStorage
        const userId = localStorage.getItem('user_id');
        if (!userId) {
          throw new Error('No user ID found in localStorage.');
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
  return (
    <div style={{ overflowY: 'hidden', overflowX: 'hidden' }} className="min-h-screen bg-gray-100">
      {/* Header with profile image and user info */}
      <div className="bg-blue-600 text-white text-center py-12 relative">
        <div className="container mx-auto">
          <div className="w-32 h-32 mx-auto mb-4">
            <img
              className="rounded-full border-4 border-white inline-block"
              src="/path-to-your-profile.jpg"
              alt="Profile"
            />
          </div>
          <h1 className="text-4xl font-bold">{userData.username}</h1>
          <p className="text-blue-300 mt-2">
            Send notifications to <a href="mailto:Sallin.koutev@gmail.com" className="underline">{userData.email}</a>
          </p>
        </div>
      </div>

      {/* Main content area */}
      <div className="container mx-auto p-8">
        {/* Import class schedule section */}
        <div className="bg-white shadow rounded-lg p-8 mb-6 mt-[-3rem]">
          <h2 className="text-2xl text-gray-800 font-semibold mb-4">Import your class schedule</h2>
          <p className="text-gray-600 mb-6">
            To export it to Google Calendar, Calendar.app, etc...
          </p>
          <button className="bg-yellow-400 text-white px-6 py-2 rounded hover:bg-yellow-500 transition-colors">
            Add current / upcoming term
          </button>
        </div>

        {/* Add courses section */}
        <div className="bg-white shadow rounded-lg p-8 mb-6">
          <h2 className="text-2xl text-gray-800 font-semibold mb-4">Add courses you have taken</h2>
          <button className="bg-yellow-400 text-white px-6 py-2 rounded hover:bg-yellow-500 transition-colors">
            Add previous terms
          </button>
        </div>

        {/* Placeholder for additional sections */}
        {/* Repeat this structure for additional content sections as needed */}
        <div className="bg-white shadow rounded-lg p-8 mb-6">
          <h2 className="text-2xl text-gray-800 font-semibold mb-4">Complete your profile</h2>
          {/* Additional content goes here */}
        </div>

        {/* ...other sections... */}
      </div>
    </div>
  );
};

export default ProfilePage;
