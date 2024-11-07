import React, { useState } from "react";

export const departments = [
  { text: "ACMA", value: "acma", name: "Actuarial Mathematics" },
  { text: "ALS", value: "als", name: "Applied Legal Studies" },
  { text: "APMA", value: "apma", name: "Applied Mathematics" },
  { text: "ARAB", value: "arab", name: "Arabic" },
  { text: "ARCH", value: "arch", name: "Archaeology" },
  { text: "BISC", value: "bisc", name: "Biological Sciences" },
  {
    text: "BPK",
    value: "bpk",
    name: "Biomedical Physiology and Kinesiology",
  },
  { text: "BUS", value: "bus", name: "Business Administration" },
  { text: "CA", value: "ca", name: "Contemporary Arts" },
  { text: "CHEM", value: "chem", name: "Chemistry" },
  { text: "CHIN", value: "chin", name: "Chinese" },
  { text: "CMNS", value: "cmns", name: "Communication" },
  { text: "CMPT", value: "cmpt", name: "Computing Science" },
  { text: "COGS", value: "cogs", name: "Cognitive Science" },
  { text: "CRIM", value: "crim", name: "Criminology" },
  { text: "DATA", value: "data", name: "Data Science" },
  { text: "DMED", value: "dmed", name: "Digital Media" },
  { text: "EASC", value: "easc", name: "Earth Sciences" },
  { text: "ECO", value: "eco", name: "Ecological Restoration" },
  { text: "ECON", value: "econ", name: "Economics" },
  { text: "EDPR", value: "edpr", name: "Education Professional" },
  { text: "EDUC", value: "educ", name: "Education" },
  { text: "ENGL", value: "engl", name: "English" },
  { text: "ENSC", value: "ensc", name: "Engineering Science" },
  { text: "ENV", value: "env", name: "Environment" },
  { text: "EVSC", value: "evsc", name: "Environmental Science" },
  {
    text: "FAL",
    value: "fal",
    name: "Foundations of Academic Literacy",
  },
  {
    text: "FAN",
    value: "fan",
    name: "Foundations of Analytical and Quantitative Reasoning",
  },
  {
    text: "FASS",
    value: "fass",
    name: "Faculty of Arts and Social Sciences",
  },
  { text: "FEP", value: "fep", name: "Exchange Study" },
  { text: "FREN", value: "fren", name: "French" },
  { text: "GA", value: "ga", name: "Global Asia" },
  { text: "GEOG", value: "geog", name: "Geography" },
  { text: "GERM", value: "germ", name: "German" },
  { text: "GERO", value: "gero", name: "Gerontology" },
  { text: "GRAD", value: "grad", name: "Graduate" },
  { text: "GRK", value: "grk", name: "Greek" },
  {
    text: "GSWS",
    value: "gsws",
    name: "Gender Sexuality and Women's Studies",
  },
  { text: "HIST", value: "hist", name: "History" },
  { text: "HSCI", value: "hsci", name: "Health Sciences" },
  { text: "HUM", value: "hum", name: "Humanities" },
  {
    text: "IAT",
    value: "iat",
    name: "Interactive Arts and Technology",
  },
  { text: "INDG", value: "indg" },
  { text: "INLG", value: "inlg" },
  {
    text: "INS",
    value: "ins",
    name: "Individualized Interdisciplinary Studies",
  },
  { text: "IS", value: "is", name: "International Studies" },
  { text: "ITAL", value: "ital", name: "Italian" },
  { text: "JAPN", value: "japn", name: "Japanese" },
  { text: "LBRL", value: "lbrl", name: "Liberal Arts" },
  { text: "LBST", value: "lbst", name: "Labour Studies" },
  { text: "LING", value: "ling", name: "Linguistics" },
  { text: "LS", value: "ls", name: "Liberal Studies" },
  {
    text: "MACM",
    value: "macm",
    name: "Mathematics and Computing Science",
  },
  { text: "MASC", value: "masc", name: "Marine Science" },
  { text: "MATH", value: "math", name: "Mathematics" },
  {
    text: "MBB",
    value: "mbb",
    name: "Molecular Biology and Biochemistry",
  },
  {
    text: "MSE",
    value: "mse",
    name: "Mechatronic Systems Engineering",
  },
  { text: "NEUR", value: "neur", name: "Neuroscience" },
  { text: "NUSC", value: "nusc", name: "Nuclear Science" },
  { text: "ONC", value: "onc", name: "Oncology" },
  { text: "PHIL", value: "phil", name: "Philosophy" },
  { text: "PHYS", value: "phys", name: "Physics" },
  { text: "PLAN", value: "plan", name: "Planning" },
  { text: "PLCY", value: "plcy", name: "Public Policy" },
  { text: "POL", value: "pol", name: "Political Science" },
  { text: "PSYC", value: "psyc", name: "Psychology" },
  { text: "PUB", value: "pub", name: "Publishing" },
  { text: "PUNJ", value: "punj", name: "Punjabi" },
  {
    text: "REM",
    value: "rem",
    name: "Resource and Environmental Management",
  },
  { text: "SA", value: "sa", name: "Sociology and Anthropology" },
  { text: "SCI", value: "sci", name: "Science" },
  { text: "SD", value: "sd", name: "Sustainable Development" },
  { text: "SEE", value: "see", name: "Sustainable Energy Engineering" },
  { text: "SPAN", value: "span", name: "Spanish" },
  { text: "STAT", value: "stat", name: "Statistics" },
  { text: "TEKX", value: "tekx", name: "Technology - FAS" },
  { text: "TRSS", value: "trss", name: "Terrorism, Risk & Security Studies" },
  { text: "UGRAD", value: "ugrad", name: "Undergrad" },
  { text: "URB", value: "urb", name: "Urban Studies" },
  { text: "WL", value: "wl", name: "World Literature" },
];

const LoginSignupModal = ({ onClose, onLoginSuccess }) => {
  const [isLoginActive, setIsLoginActive] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    majors: [],
    minors: [],
  });

  const handleInputChange = (e) => {
    if (e.target.name === "majors" || e.target.name === "minors") {
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
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLoginActive ? "/api/user/login" : "/api/user/signup";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        if (isLoginActive) {
          handleLoginSuccess(data.data);
        } else {
          console.log("User created:", data.data);
          onClose(); // Close the modal on successful signup
        }
      } else {
        /*
        console.error(
          isLoginActive ? "Login error:" : "Signup error:",
          data.error
        );
        */
        // Alert signup error
        alert(
          isLoginActive
            ? `Login error: ${data.error}`
            : `Signup error: ${data.error}`
        );
      }
    } catch (error) {
      console.error("Request failed:", error);
    }
  };

  const handleLoginSuccess = (userData) => {
    console.log("User logged in:", userData);
    if (typeof window !== "undefined") {
      localStorage.setItem("user_id", userData._id);
      onLoginSuccess(userData._id);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded relative">
        <button
          onClick={onClose}
          className="absolute top-0 right-0 mt-2 mr-2 text-lg font-semibold"
        >
          &#x2715;
        </button>
        {isLoginActive ? (
          <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="block w-full p-2 mb-2"
                value={formData.email}
                onChange={handleInputChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="block w-full p-2 mb-2"
                value={formData.password}
                onChange={handleInputChange}
              />
              <button
                type="submit"
                className="block w-full bg-primary-blue text-white p-2 rounded mb-2"
              >
                Login
              </button>
            </form>
            <button
              onClick={() => setIsLoginActive(false)}
              className="text-blue-600"
            >
              Sign up instead
            </button>
          </div>
        ) : (
          <div>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="username"
                placeholder="Username"
                className="block w-full p-2 mb-2"
                value={formData.username}
                onChange={handleInputChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="block w-full p-2 mb-2"
                value={formData.email}
                onChange={handleInputChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="block w-full p-2 mb-2"
                value={formData.password}
                onChange={handleInputChange}
              />
              <label htmlFor="majors">Majors:</label>
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
                Sign Up
              </button>
            </form>
            <button
              onClick={() => setIsLoginActive(true)}
              className="text-blue-600"
            >
              Login instead
            </button>
          </div>
        )}
        <button onClick={onClose} className="mt-4">
          Close
        </button>
      </div>
    </div>
  );
};

export default LoginSignupModal;
