import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [term, setTerm] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("jwt_token");
    navigate("/");
  };

  const handleProfile = () => {
    navigate("/myprofile");
  };

  const handleHome = () => {
    navigate("/home");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (term.trim()) {
      navigate(`/search/${term}`); // passes the search term to Search.jsx
      setTerm("");
    }
  };

  return (
    <div className="w-full shadow-sm border  border-gray-200">
      <div className="max-w-[1100px] mx-auto px-4 flex items-center justify-between h-16">
        {/* LEFT - Logo */}
        <div className="flex items-center">
          <img
            src="https://res.cloudinary.com/dak7gtph6/image/upload/v1752295100/logo_n05zia.jpg"
            alt="Insta Share"
            className="h-8 w-auto mr-3"
          />
          <h1 className="text-2xl font-semibold">Insta Share</h1>
        </div>

        {/* CENTER - Search */}
        <form onSubmit={handleSubmit} className="flex items-center w-1/3">
          <input
            type="search"
            placeholder="Search Caption"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            className="w-full px-4 py-1 border border-gray-300 rounded-l-md focus:outline-none"
          />
          <button
            type="submit"
            className="bg-gray-300 px-3 py-[6px] rounded-r-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="black"
              viewBox="0 0 20 20"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </form>

        {/* RIGHT - Nav Links */}
        <div className="flex items-center space-x-6">
          <h1
            onClick={handleHome}
            className="text-lg hover:text-[#4094EF] cursor-pointer"
          >
            Home
          </h1>
          <h1
            onClick={handleProfile}
            className="text-lg hover:text-[#4094EF] cursor-pointer"
          >
            Profile
          </h1>
          <button
            className="bg-[#4094EF] text-white px-4 py-1 rounded-md text-sm font-medium hover:bg-[#3078d8]"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
