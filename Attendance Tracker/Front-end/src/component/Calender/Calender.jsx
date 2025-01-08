import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // Import React Icons

// Helper function to get the number of days in a month
const getDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

// Helper function to get the first day of the month (Sunday = 0, Monday = 1, etc.)
const getFirstDayOfMonth = (year, month) => {
  return new Date(year, month, 1).getDay();
};

const Calendar = ({ entries }) => {
  const currentDate = new Date();
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());

  // Get the first day of the month and the number of days in the month
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
  const daysInMonth = getDaysInMonth(currentYear, currentMonth);

  // Generate the calendar grid (with empty spaces for previous month's trailing days)
  const days = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(null); // Empty space for days before the start of the month
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  // Handle month navigation
  const changeMonth = (direction) => {
    let newMonth = currentMonth + direction;
    let newYear = currentYear;

    if (newMonth > 11) {
      newMonth = 0;
      newYear += 1;
    } else if (newMonth < 0) {
      newMonth = 11;
      newYear -= 1;
    }

    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  // Format month and year for display
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const monthYearLabel = `${monthNames[currentMonth]} ${currentYear}`;

  // Function to get the status of a particular day
  const getStatusForDay = (day) => {
    const entry = entries?.find(
      (entry) =>
        new Date(entry.date).getDate() === day &&
        new Date(entry.date).getMonth() === currentMonth &&
        new Date(entry.date).getFullYear() === currentYear
    );
    return entry ? entry.status : null;
  };

  // Function to map the status to a background color
  const getStatusBackgroundColor = (status) => {
    switch (status) {
      case "Present":
        return "bg-green-400"; // Green for present
      case "Absent":
        return "bg-red-400"; // Red for absent
      case "Holiday":
        return "bg-gray-400"; // Gray for holiday
      default:
        return "bg-transparent"; // Default if no status
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-6">
      <div className="flex justify-between items-center mb-4">
        {/* Left Arrow Button */}
        <button
          className="px-4 py-2 bg-teal-500 text-white rounded-full hover:bg-teal-600 transition-all"
          onClick={() => changeMonth(-1)}
        >
          <FaChevronLeft size={20} />
        </button>

        {/* Month and Year Label */}
        <h2 className="text-2xl font-semibold text-teal-700">
          {monthYearLabel}
        </h2>

        {/* Right Arrow Button */}
        <button
          className="px-4 py-2 bg-teal-500 text-white rounded-full hover:bg-teal-600 transition-all"
          onClick={() => changeMonth(1)}
        >
          <FaChevronRight size={20} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center font-semibold text-gray-700">
        {/* Days of the week header */}
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
          <div
            key={index}
            className="flex items-center justify-center h-10 text-sm font-medium"
          >
            {day}
          </div>
        ))}

        {/* Calendar days */}
        {days.map((day, index) => {
          if (!day) {
            return <div key={index} className="h-10"></div>;
          }

          const status = getStatusForDay(day);
          const bgColor = getStatusBackgroundColor(status);

          return (
            <div
              key={index}
              className={`flex items-center justify-center w-full h-full rounded-full 
              }`}
            >
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full text-md font-semibold ${bgColor} 
                ${
                  status ? "text-white" : "text-gray-700"
                } cursor-pointer hover:shadow-md transition-all `}
              >
                {day}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
