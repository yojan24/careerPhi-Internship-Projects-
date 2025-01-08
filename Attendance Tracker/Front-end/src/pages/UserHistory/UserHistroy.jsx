import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUserByIDQuery } from "../../Redux/api/userApiSlice";
import { PieChart } from "../../component";
import { Calender } from "../../component"; // Import the Calendar component

function UserHistory() {
  const { id } = useParams();
  const [present, setPresent] = useState(0);
  const [absent, setAbsent] = useState(0);
  const [holiday, setHoliday] = useState(0);
  const { data, isLoading, error } = useUserByIDQuery(id);

  // Avoid hooks being run conditionally
  useEffect(() => {
    if (data) {
      let presentCount = 0;
      let absentCount = 0;
      let holidayCount = 0;

      // Safely loop through data when it exists
      if (data.entries) {
        data.entries.forEach((entry) => {
          if (entry.status === "Present") {
            presentCount += 1;
          } else if (entry.status === "Absent") {
            absentCount += 1;
          } else if (entry.status === "Holiday") {
            holidayCount += 1;
          }
        });
      }

      setPresent(presentCount);
      setAbsent(absentCount);
      setHoliday(holidayCount);
    }
  }, [data]); // Add data as a dependency to ensure it re-runs when data changes

  // Handle loading and error states
  if (isLoading) {
    return (
      <h1 className="text-center text-2xl font-semibold text-gray-500">
        Loading...
      </h1>
    );
  }

  if (error) {
    return (
      <h1 className="text-center text-2xl font-semibold text-red-500">
        Error occurred
      </h1>
    );
  }

  return (
    <section className="min-h-[90vh] flex flex-col items-center justify-center p-6 bg-gray-50">
      {/* Check if data is zero and render a placeholder or the PieChart */}
      {present === 0 && absent === 0 && holiday === 0 ? (
        <div className="flex flex-col items-center justify-center space-y-6 text-center p-6 bg-white rounded-xl shadow-xl max-w-md mx-auto hover:shadow-xl">
          <h2 className="text-2xl font-semibold text-gray-800">
            No Attendance Data Available
          </h2>
          <p className="text-md text-gray-500">
            It seems like there are no attendance records for this user.
          </p>
          <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center text-gray-400">
            <span className="font-bold">No Data</span>
          </div>
          <svg
            className="w-16 h-16 text-gray-300 mt-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 6L12 14L20 6"></path>
          </svg>
        </div>
      ) : (
        <div className="w-full max-w-3xl p-6 bg-white rounded-xl shadow-lg transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-xl">
          <div className="flex flex-col sm:flex-row justify-between gap-8">
            {/* Left Section: PieChart */}
            <div className="w-full sm:w-1/2 flex justify-center py-6">
              <div className="w-full max-w-xl min-h-[300px] max-h-[400px] sm:min-h-[350px] sm:max-h-[450px] md:min-h-[350px] md:max-h-[450px] lg:min-h-[350px] lg:max-h-[500px]">
                <PieChart days={[present, absent, holiday]} />
              </div>
            </div>
            {/* Right Section: Calendar */}
            <div className="w-full sm:w-1/2 py-6">
              <Calender entries={data?.entries || []} />
            </div>
          </div>
        </div>
      )}

      {/* Attendance History Section */}
      {data?.entries.length >= 1 && (
        <div className="w-[90%] md:w-[80%] mx-auto mt-8 bg-white p-8 rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl">
          <h1 className="text-teal-700 md:text-3xl text-xl font-semibold w-full text-center mb-4">
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
                  {data?.entries.map((item, i) => (
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
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default UserHistory;
