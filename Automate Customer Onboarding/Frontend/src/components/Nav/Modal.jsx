import React from "react";
import { Link } from "react-router-dom";

function Modal({ toggle }) {
  return (
    <div className="absolute right-2 mt-5 w-30 md:w-48 bg-purple-700 rounded-lg shadow-md z-50 ">
      <ul className="text-gray-700">
        <li className="p-3" onClick={toggle}>
          <Link to="/" className="text-white">
            Home
          </Link>
        </li>
        <li className="p-3" onClick={toggle}>
          <Link to="/about-us" className="text-white">
            About us
          </Link>
        </li>
        <li className="p-3" onClick={toggle}>
          <Link to="/contact-us" className="text-white">
            Contact us
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Modal;
