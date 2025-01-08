import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
} from "chart.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

const PieChart = ({ days = [] }) => {
  console.log(days);

  const data = {
    labels: ["Present", "Absent", "Holiday"],
    datasets: [
      {
        data: days, // Percentages
        backgroundColor: ["#4caf50", "#f44336", "#2196f3"], // Color for each slice
        hoverBackgroundColor: ["#388e3c", "#d32f2f", "#1976d2"],
      },
    ],
  };

  return (
    <div
      style={{ width: "100%", height: "400px" }}
      className="w-full flex justify-center py-2"
    >
      <Pie data={data} />
    </div>
  );
};

export default PieChart;
