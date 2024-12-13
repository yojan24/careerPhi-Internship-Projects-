import React from "react";
import { Link } from "react-router-dom";

function TabView({ setComponent, component }) {
  // Function to handle tab click and set the component state
  const handleTabClick = (tab) => {
    setComponent(tab); // Update the state in MainApplication
  };

  return (
    <div className="w-full border-b-2 mt-2">
      <ul className="flex justify-center p-2 mx-3">
        <li>
          <Link
            to={"#"}
            className={`mx-3 text-sm md:text-xl p-2 border-b-2 border-white hover:text-purple-400 hover:border-b-2 hover:border-purple-400 hover:bg-gray-100 rounded-t-md ${
              component === "Pending"
                ? "text-purple-400 border-purple-400"
                : "text-black"
            }`}
            onClick={() => handleTabClick("Pending")}
          >
            Pending
          </Link>
        </li>
        <li>
          <Link
            to={"#"}
            className={`mx-3 text-sm md:text-xl p-2 border-b-2 border-white hover:text-purple-400 hover:border-b-2 hover:border-purple-400 hover:bg-gray-100 rounded-t-md ${
              component === "Rejected"
                ? "text-purple-400 border-purple-400"
                : "text-black"
            }`}
            onClick={() => handleTabClick("Rejected")}
          >
            Rejected
          </Link>
        </li>
        <li>
          <Link
            to={"#"}
            className={`mx-3 text-sm md:text-xl p-2 border-b-2 border-white hover:text-purple-400 hover:border-b-2 hover:border-purple-400 hover:bg-gray-100 rounded-t-md ${
              component === "Approved"
                ? "text-purple-400 border-purple-400"
                : "text-black"
            }`}
            onClick={() => handleTabClick("Approved")}
          >
            Approved
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default TabView;
