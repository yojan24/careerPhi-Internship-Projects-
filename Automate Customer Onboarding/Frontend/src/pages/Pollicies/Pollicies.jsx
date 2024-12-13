import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { MdHealthAndSafety } from "react-icons/md";
import { BiSolidCarGarage } from "react-icons/bi";

function Pollicies() {
  const { userInfo } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false); // Correct useState syntax
  const navigate = useNavigate();

  return (
    <section className="min-h-[92vh] w-full">
      <h1 className="w-full text-center font-bold text-2xl md:text-4xl py-4 my-5 text-[#563A9C] tracking-wide drop-shadow-lg">
        Our Insurance Policies
      </h1>

      {/* Car Insurance Policy */}
      <div className="bg-white border border-gray-100 shadow-md rounded-xl mb-8 hover:shadow-xl transition-all">
        <div className="flex items-center justify-between p-8">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-full bg-gray-200 flex justify-center items-center">
              <BiSolidCarGarage size={50} className="text-purple-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                Car Insurance
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                "Protecting your car is protecting your future. Drive with peace
                of mind."
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-medium text-gray-900">
              Premium Range: ₹2,750 - ₹21,750
            </p>
          </div>
        </div>
        <div className="px-8 pb-8">
          <button
            onClick={() => {
              userInfo?.isKYC ? navigate("/car-insurance") : setOpen(true); // Correct use of setOpen
            }}
            className="w-full bg-purple-600 text-white py-3 rounded-lg text-sm font-semibold hover:bg-purple-700 transition-colors"
          >
            Apply Now
          </button>
        </div>
      </div>

      {/* Health Insurance Policy */}
      <div className="bg-white border border-gray-100 shadow-md rounded-xl mb-8 hover:shadow-xl transition-all">
        <div className="flex items-center justify-between p-8">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-full bg-gray-200 flex justify-center items-center">
              <MdHealthAndSafety size={50} className="text-purple-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                Health Insurance
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                "Your health is your greatest asset. Protect it for a brighter
                tomorrow."
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-medium text-gray-900">
              Premium Range: ₹1,200 - ₹15,000
            </p>
          </div>
        </div>
        <div className="px-8 pb-8">
          <button
            onClick={() => {
              userInfo?.isKYC ? navigate("/health-insurance") : setOpen(true); // Correct use of setOpen
            }}
            className="w-full bg-purple-600 text-white py-3 rounded-lg text-sm font-semibold hover:bg-purple-700 transition-colors"
          >
            Apply Now
          </button>
        </div>
      </div>

      {/* Modal for KYC */}
      {open && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div className="absolute bg-black opacity-50 inset-0" />
          <div className="relative w-full md:w-1/2 lg:w-1/3 xl:w-1/4 bg-white p-8 rounded-lg shadow-lg z-10">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Action Required
              </h3>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-600 hover:text-gray-900 focus:outline-none"
              >
                <span className="text-2xl font-bold">×</span>
              </button>
            </div>
            <p className="text-gray-700 text-sm mb-4">
              To proceed with your application, you need to complete the KYC
              (Know Your Customer) process. Please ensure that your details are
              up-to-date to enjoy a seamless experience.
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Pollicies;
