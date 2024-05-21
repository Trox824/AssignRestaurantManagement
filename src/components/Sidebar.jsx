import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 h-screen text-white flex flex-col justify-between">
      <div>
        <div className="p-4 text-2xl font-semibold">Home Page</div>
        <nav className="mt-10">
          <Link
            to="/"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
          >
            Menu
          </Link>
          <Link
            to="/reservation"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
          >
            Reservation
          </Link>
          <Link
            to="/analytics"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
          >
            Analytics
          </Link>
        </nav>
      </div>
      <Link
        to="/logout"
        className="block py-2.5 px-4 w-full bg-red-500 hover:bg-red-700 text-center"
      >
        Logout
      </Link>
    </div>
  );
};

export default Sidebar;
