import React, { useState } from 'react';

const LoginSignupModal = ({ onClose, onLoginSuccess }) => {
  const [isLoginActive, setIsLoginActive] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    // Add additional fields as per your API requirements
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLoginActive ? '/api/user/login' : '/api/user/signup';
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        if (isLoginActive) {
          handleLoginSuccess(data.data);
        } else {
          console.log('User created:', data.data);
          onClose(); // Close the modal on successful signup
        }
      } else {
        console.error(isLoginActive ? 'Login error:' : 'Signup error:', data.error);
      }
    } catch (error) {
      console.error('Request failed:', error);
    }
  };

  const handleLoginSuccess = (userData) => {
    console.log('User logged in:', userData);
    if (typeof window !== 'undefined') {
      localStorage.setItem('user_id', userData._id); // Store user _id to localStorage
      onLoginSuccess(userData._id); // Pass the user _id to the Navbar
    }
    onClose(); // Close the modal
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded relative">
        {/* Close Button (X) */}
        <button onClick={onClose} className="absolute top-0 right-0 mt-2 mr-2 text-lg font-semibold">&#x2715;</button>

        {/* Toggle between Login and Signup forms */}
        {isLoginActive ? (
          // Login Form
          <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
              <input type="email" name="email" placeholder="Email" className="block w-full p-2 mb-2" value={formData.email} onChange={handleInputChange} />
              <input type="password" name="password" placeholder="Password" className="block w-full p-2 mb-2" value={formData.password} onChange={handleInputChange} />
              <button type="submit" className="block w-full bg-primary-blue text-white p-2 rounded mb-2">Login</button>
            </form>
            <button onClick={() => setIsLoginActive(false)} className="text-blue-600">Sign up instead</button>
          </div>
        ) : (
          // Signup Form
          <div>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
              <input type="text" name="username" placeholder="Username" className="block w-full p-2 mb-2" value={formData.username} onChange={handleInputChange} />
              <input type="email" name="email" placeholder="Email" className="block w-full p-2 mb-2" value={formData.email} onChange={handleInputChange} />
              <input type="password" name="password" placeholder="Password" className="block w-full p-2 mb-2" value={formData.password} onChange={handleInputChange} />
              {/* Include additional fields here if necessary */}
              <button type="submit" className="block w-full bg-primary-blue text-white p-2 rounded mb-2">Sign Up</button>
            </form>
            <button onClick={() => setIsLoginActive(true)} className="text-blue-600">Login instead</button>
          </div>
        )}

        {/* Additional Close Button */}
        <button onClick={onClose} className="mt-4">Close</button>
      </div>
    </div>
  );
};

export default LoginSignupModal;
