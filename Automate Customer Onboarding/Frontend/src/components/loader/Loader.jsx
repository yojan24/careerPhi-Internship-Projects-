import React from "react";
import MoonLoader from "react-spinners/MoonLoader";
function Loader() {
  return (
    <div className="fixed top-0 left-0 w-full min-h-screen bg-black bg-opacity-20 flex justify-center items-center z-50">
      <MoonLoader color="#563A9C" />
    </div>
  );
}

export default Loader;
