"use strict";

// Initial data
const initialAssets = [];

// Load assets
const loadAssets = () => {
  const storedAssets = localStorage.getItem("assets");
  return storedAssets ? JSON.parse(storedAssets) : [];
};

// Save assets to local storage
const saveAssets = (assets) => {
  localStorage.setItem("assets", JSON.stringify(assets));
};

// Initialize assets in local storage if it's empty
const initializeAssets = () => {
  if (!localStorage.getItem("assets")) {
    saveAssets(initialAssets);
  }
};

// Call this function on page load
initializeAssets();

// Pages
const homePage = document.querySelector("#home-page");
const addInvestment = document.querySelector("#add-investment");
const updateInvestment = document.querySelector("#update-investment");

// Buttons
const btn_newInvestment = document.querySelector("#btn-add-new-investment");
const btn_addInvestment = document.querySelector("#btn-add");
const btn_addCancel = document.querySelector("#btn-add-cancel");
const btn_updateInvestment = document.querySelector("#btn-update");
const btn_updateCancel = document.querySelector("#btn-up-cancel");

// Input fields
const newAssetName = document.querySelector("#A_Name");
const newInvested = document.querySelector("#invested");
const newCurrent = document.querySelector("#current");

const updateAssetName = document.querySelector("#up-A_Name");
const updateInvested = document.querySelector("#up-invested");
const updateCurrent = document.querySelector("#up-current");

btn_newInvestment.addEventListener("click", function (e) {
  // e.preventDefault();
  homePage.classList.add("hidden");
  addInvestment.classList.remove("hidden");
});

btn_addCancel.addEventListener("click", function (e) {
  // e.preventDefault();
  homePage.classList.remove("hidden");
  addInvestment.classList.add("hidden");
});

btn_updateCancel.addEventListener("click", function (e) {
  // e.preventDefault();
  homePage.classList.remove("hidden");
  updateInvestment.classList.add("hidden");
});

// Display table
const displayAssets = () => {
  const assets = loadAssets();
  const table = document.getElementById("table");
  const moneyDisplay = document.getElementById("money");

  // Clear existing rows except the header
  const rowCount = table.rows.length;
  for (let i = rowCount - 1; i > 0; i--) {
    table.deleteRow(i);
  }

  let totalPortfolioValue = 0;

  // Add each asset as a new row
  assets.forEach((asset, index) => {
    const content = `
      <tr>
          <td class="border border-gray-300 lg:p-4">${asset.asset_name}</td>
          <td class="border border-gray-300 lg:p-4">$${asset.invested.toFixed(
            2
          )}</td>
          <td class="border border-gray-300 lg:p-4">$${asset.current.toFixed(
            2
          )}</td>
          <td class="border border-gray-300 lg:p-4">${(
            ((asset.current - asset.invested) / asset.invested) *
            100
          ).toFixed(2)}%</td>
          <td class="border border-gray-300 text-center lg:p-4">
              <button class="bg-yellow-500 text-white rounded px-2 py-1" onclick="updateAsset(${index})">
                Update
              </button>
          </td>
          <td class="border border-gray-300 text-center lg:p-4">
              <button class="bg-red-600 text-white rounded px-2 py-1" onclick="deleteAsset(${index})">
                Remove
              </button>
          </td>
      </tr>
    `;

    table.insertAdjacentHTML("beforeend", content); // Append new rows
    totalPortfolioValue += asset.current; // Calculate total portfolio value
  });

  // Update the total portfolio value display
  moneyDisplay.innerText = `$${totalPortfolioValue.toFixed(2)}`;
};

// Display assets on page load
displayAssets();

// Delete asset function
const deleteAsset = (index) => {
  const assets = loadAssets();
  if (index >= 0 && index < assets.length) {
    assets.splice(index, 1);
    saveAssets(assets);
    displayAssets();
    drawChart(assets);
  }
};

//update asset
const updateAsset = (index) => {
  homePage.classList.add("hidden");
  updateInvestment.classList.remove("hidden");
  const assets = loadAssets();
  if (index >= 0 && index < assets.length) {
    const asset = assets[index];
    updateAssetName.textContent = asset.asset_name;
    updateInvested.value = asset.invested;
    updateCurrent.value = asset.current;
  }
};

btn_updateInvestment.addEventListener("click", function (e) {
  // e.preventDefault();

  // Check if all fields are filled
  if (!updateInvested.value || !updateCurrent.value) {
    alert("All fields must be filled!");
    return; // Exit the function if validation fails
  }

  const assets = loadAssets();

  // Assuming you have a way to determine which asset is being updated
  const index = assets.findIndex(
    (asset) => asset.asset_name === updateAssetName.textContent
  );

  // Update the selected asset
  if (index >= 0 && index < assets.length) {
    assets[index].invested = parseFloat(updateInvested.value);
    assets[index].current = parseFloat(updateCurrent.value);

    saveAssets(assets); // Save the updated assets back to local storage
    displayAssets(); // Refresh the displayed assets
  }

  updateInvestment.classList.add("hidden");
  homePage.classList.remove("hidden");
});

btn_addInvestment.addEventListener("click", function (e) {
  // e.preventDefault();

  // Check if all fields are filled
  if (!newAssetName.value || !newCurrent.value || !newInvested.value) {
    alert("All fields must be filled!");
    return;
  }

  const assets = loadAssets();

  // Create new asset item
  const newItem = {
    asset_name: newAssetName.value,
    current: parseFloat(newCurrent.value), // Parse as float
    invested: parseFloat(newInvested.value), // Parse as float
  };

  // Add new asset to the array
  assets.push(newItem);
  saveAssets(assets); // Save updated assets to local storage

  // Clear input fields after adding
  newAssetName.value = "";
  newCurrent.value = "";
  newInvested.value = "";

  // Update UI
  homePage.classList.remove("hidden");
  addInvestment.classList.add("hidden");
  displayAssets();
});

// Pie chart function
const drawChart = (assets) => {
  const pieChartDiv = document.getElementById("piechart");

  // Clear the pie chart div
  pieChartDiv.innerHTML = "";

  if (assets.length > 0) {
    const data = [["Asset", "Value"]];

    assets.forEach((asset) => {
      data.push([asset.asset_name, asset.current]); // Push asset data to the chart
    });

    const chartData = google.visualization.arrayToDataTable(data);

    const options = {
      legend: "none",
      backgroundColor: "#E5E7EB",
    };

    const chart = new google.visualization.PieChart(pieChartDiv);
    chart.draw(chartData, options);
  } else {
    // Display "No Data" message
    pieChartDiv.innerHTML =
      '<p class="text-center text-gray-500">No Data Available</p>';
  }
};

// Load Google Charts
google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(() => drawChart(loadAssets())); // Initial chart drawing
