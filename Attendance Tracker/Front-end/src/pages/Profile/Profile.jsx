import React, { useEffect, useState } from "react";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Calender } from "../../component"; // Import Calendar component
import { setData } from "../../Redux/features/authSlice.js";
import "./style.css";
import {
  useCheckInMutation,
  useCheckOutMutation,
} from "../../Redux/api/userApiSlice";

function Profile() {
  const dispatch = useDispatch();
  const [isCheckedIn, setIsCheckedIn] = useState(true);
  const [time, setTime] = useState(new Date());
  const { userInfo } = useSelector((state) => state.auth);

  const [checkIn] = useCheckInMutation();
  const [checkOut] = useCheckOutMutation();

  useEffect(() => {
    setInterval(() => setTime(new Date()), 1000);
  }, []);

  const handleCheckIn = async () => {
    try {
      const msg = await checkIn().unwrap();
      dispatch(setData({ ...userInfo, checkIn: true, todayEntry: true }));
      setIsCheckedIn(true);
      toast.success(`${msg?.message}`);
    } catch (err) {
      toast.error(err?.data?.message || err.error, {
        autoClose: 1000,
      });
    }
  };

  const handleCheckOut = async () => {
    try {
      const msg = await checkOut().unwrap();
      dispatch(setData({ ...userInfo, checkOut: true }));
      toast.success(`${msg?.message}`);
    } catch (err) {
      toast.error(err?.data?.message || err.error, {
        autoClose: 1000,
      });
    }
  };

  return (
    <section className="w-full min-h-[90vh] flex flex-col justify-center py-6">
      {/* Check-In/Check-Out Button Positioned First */}
      <div className="w-full flex justify-center items-center mt-8">
        <div className="bg-white w-[90%] md:w-[45%] lg:w-[40%] p-8 rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl flex flex-col justify-center items-center gap-6">
          <div className="text-4xl font-semibold text-gray-700 flex flex-col justify-center items-center">
            <span className="text-xl text-gray-500">{time.toDateString()}</span>
            {time.toLocaleTimeString()}
          </div>
          {!userInfo?.todayEntry && !userInfo?.checkIn && (
            <button
              onClick={handleCheckIn}
              className="w-3/4 bg-teal-500 text-white rounded-md py-3 text-xl font-semibold hover:bg-teal-600 transition duration-300 active:bg-teal-400 border-2 border-white active:text-black"
            >
              Check In
            </button>
          )}
          {userInfo?.todayEntry && !userInfo?.checkOut && (
            <button
              className="w-3/4 bg-red-500 text-white rounded-md py-3 text-xl font-semibold hover:bg-red-600 transition duration-300 active:bg-red-400 border-2 border-white active:text-black"
              onClick={handleCheckOut}
            >
              Check Out
            </button>
          )}
        </div>
      </div>

      {/* First Row (Button, Calendar, Employee Info) */}
      <div className="w-[90%] md:w-[80%] mx-auto mt-8 flex flex-col md:flex-row gap-6 justify-evenly">
        {/* Calendar Section */}
        <div className="bg-white w-full md:w-[45%] lg:w-[40%] p-4 rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl">
          <Calender entries={userInfo?.entries || []} />
        </div>

        {/* Profile Information Section */}
        <div className="bg-white w-full md:w-[45%] lg:w-[40%] text-sm md:text-base flex flex-col justify-center gap-6 p-6 rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl">
          <div className="flex justify-between items-center">
            <strong className="text-gray-700 font-semibold">
              Employee Id:
            </strong>
            <p className="text-gray-800">{userInfo?.employeeId}</p>
          </div>
          <div className="flex justify-between items-center">
            <strong className="text-gray-700 font-semibold">Name:</strong>
            <p className="text-gray-800">{userInfo?.name}</p>
          </div>
          <div className="flex justify-between items-center">
            <strong className="text-gray-700 font-semibold">Email:</strong>
            <p className="text-gray-800">{userInfo?.email}</p>
          </div>
          <div className="flex gap-5 justify-center">
            <div className="flex gap-1 items-center ">
              <IoCheckmarkDoneCircleOutline
                size={20}
                className={`${
                  userInfo?.todayEntry && userInfo?.checkIn
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              />
              <span>Present</span>
            </div>
            <div className="flex gap-1 items-center ">
              <IoCheckmarkDoneCircleOutline
                size={20}
                className={`${
                  userInfo?.todayEntry && userInfo?.checkIn
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              />
              <span>CheckIn</span>
            </div>
            <div className="flex gap-1 items-center ">
              <IoCheckmarkDoneCircleOutline
                size={20}
                className={`${
                  userInfo?.todayEntry && userInfo?.checkOut
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              />
              <span>CheckOut</span>
            </div>
          </div>
        </div>
      </div>

      {/* Attendance History Section */}
      <div className="w-[90%] md:w-[80%] mx-auto mt-8 bg-white p-8 rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl">
        <h1 className="text-teal-700  md:text-3xl text-xl font-semibold w-full text-center mb-4">
          Attendance History
        </h1>
        <div className="relative w-[90%] mx-auto">
          <div className="overflow-y-auto h-[300px] scrollbar-hide">
            <table className="w-full text-xs md:text-lg lg:text-xl table-auto border-collapse">
              <thead className="sticky top-0 bg-teal-600 text-white uppercase">
                <tr>
                  <th className="py-3 md:px-12 px-1 text-center font-semibold rounded-tl-md">
                    Date
                  </th>
                  <th className="py-3 md:px-12 px-1 text-center font-semibold">
                    Check-In
                  </th>
                  <th className="py-3 md:px-12 px-1 text-center font-semibold">
                    Check-Out
                  </th>
                  <th className="py-3 md:px-12 px-1 text-center font-semibold rounded-tr-md">
                    Attendance Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {userInfo.entries && userInfo.entries.length > 0 ? (
                  userInfo.entries.map((item, i) => (
                    <tr
                      key={i}
                      className={`${
                        item.status === "Absent"
                          ? "bg-red-100"
                          : item.status === "Present"
                          ? "bg-green-100"
                          : "bg-gray-100"
                      }`}
                    >
                      <td className="py-3 md:px-12 px-1 text-center">
                        {item.date.split("T")[0]}
                      </td>
                      <td className="py-3 md:px-12 px-1 text-center">
                        {item.entryTime}
                      </td>
                      <td className="py-3 md:px-12 px-1 text-center">
                        {item.exitTime}
                      </td>
                      <td className="py-3 md:px-12 px-1 text-center">
                        {item.status}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={4}
                      className="py-6 text-center text-gray-500 font-semibold"
                    >
                      No attendance records available. Your entries will appear
                      here once recorded.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Profile;
