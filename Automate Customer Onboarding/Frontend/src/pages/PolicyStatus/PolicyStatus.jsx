import React, { useEffect, useState } from "react";
import { useGetCarInsQuery } from "../../Redux/api/carApiSlice";
import { useNavigate } from "react-router-dom";
import { BiSolidCarGarage } from "react-icons/bi";
import { MdHealthAndSafety } from "react-icons/md";
import { InsurancePaper, Loader } from "../../components";
import { useGetHealthInsQuery } from "../../Redux/api/healthApiSlice";

function PolicyStatus() {
  const navigate = useNavigate();

  const {
    data,
    isLoading: isCarLoading,
    error: carError,
  } = useGetCarInsQuery();
  const {
    data: health,
    isLoading: isHealthLoading,
    error: healthError,
  } = useGetHealthInsQuery();

  const [InsData, SetInsData] = useState([]);
  const [InsHData, SetInsHData] = useState([]);

  // Populate the states when the data is fetched
  useEffect(() => {
    if (data) SetInsData(data);
    if (health) SetInsHData(health);
  }, [data, health]);

  // Handle loading and error states for both car and health insurance
  if (isCarLoading || isHealthLoading) {
    return <Loader />;
  }

  if (carError || healthError) {
    return (
      <h1 className="text-center text-xl font-semibold text-red-700">
        Something went wrong while fetching the data.
      </h1>
    );
  }
  return (
    <section className="min-h-[92vh] bg-gray-100 p-5">
      <h1 className="w-full text-center font-bold text-2xl md:text-4xl py-4 my-5 text-[#563A9C] tracking-wide drop-shadow-lg">
        Policy Status
      </h1>
      {InsData.length === 0 && InsHData.length === 0 ? (
        <h1 className="w-full text-center mt-5 text-xl text-gray-500">
          You have not applied for any insurance policies.
        </h1>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Render Car Insurance Data */}
          {InsData.map((item, i) => (
            <div
              className="bg-white border rounded-md shadow-md p-5 hover:shadow-lg w-full flex flex-col justify-evenly"
              key={i}
            >
              <div className="flex items-center mb-3">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex justify-center items-center mr-4">
                  <BiSolidCarGarage size={40} className="text-purple-600" />
                </div>
                <div>
                  <h2 className="font-bold text-lg text-gray-800">
                    {item.ownerName}
                  </h2>
                  <p className="text-sm text-gray-600">
                    Policy No: {item.policyNo}
                  </p>
                </div>
              </div>
              <div className="text-sm text-gray-700">
                <p>
                  <strong>Car:</strong> {item.carVariant} ({item.carNumber})
                </p>
                <p>
                  <strong>Fuel:</strong> {item.fuel}
                </p>
                <p>
                  <strong>Plan:</strong> {item.planType}
                </p>
                <p>
                  <strong>Expire:</strong>{" "}
                  {new Date(item.expire).toLocaleDateString()}
                </p>
                <p>
                  <strong>Paid:</strong> ₹{item.payment.toLocaleString()}
                </p>
              </div>
              <InsurancePaper
                carNumber={item.carNumber}
                carVariant={item.carVariant}
                fuel={item.fuel}
                engineNumber={item.engineNumber}
                chassisNumber={item.chassisNumber}
                registrationDate={item.registrationDate
                  .split("T")[0]
                  .replaceAll("-", "/")}
                expire={item.expire.split("T")[0].replaceAll("-", "/")}
                planType={item.years}
                idv={item.idv}
                payment={item.payment}
                ownerName={item.ownerName}
                gender={item.gender}
                phone={item.phone}
                age={item.age}
                policyNo={item.policyNo}
              />
            </div>
          ))}

          {/* Render Health Insurance Data */}
          {InsHData.map((item, i) => (
            <div
              className="bg-white border rounded-md shadow-md p-5 hover:shadow-lg w-full flex flex-col justify-evenly"
              key={i}
            >
              <div className="flex items-center mb-3">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex justify-center items-center mr-4">
                  <MdHealthAndSafety size={50} className="text-purple-600" />
                </div>
                <div>
                  {/* Optional chaining to handle missing data */}
                  <h2 className="font-bold text-lg text-gray-800">
                    {item.insurerName}
                  </h2>
                  <p className="text-sm text-gray-600">
                    Policy No: {item.policyNo}
                  </p>
                </div>
              </div>
              <div className="text-sm text-gray-700">
                <p>
                  <strong>Insurer:</strong> {item.insurer}
                </p>
                <p>
                  <strong>Age:</strong> {item.age}
                </p>
                <p>
                  <strong>City:</strong> {item.city}
                </p>
                <p>
                  <strong>Disease:</strong> {item.disease.join(", ")}
                </p>
                <p>
                  <strong>Years of Coverage:</strong> {item.years}
                </p>
                <p>
                  <strong>Paid:</strong> ₹{item.payment.toLocaleString()}
                </p>
              </div>
              <InsurancePaper
                InsuranceType="Health Insurance"
                insurerName={item.insurerName}
                ownerName={item.insurerName}
                gender={item.gender}
                phone={item.phone}
                age={item.age}
                city={item.city}
                policyNo={item.policyNo}
                expire={new Date(item.createdAt).toLocaleDateString()}
                payment={item.payment}
                planType={item.years}
                idv={item.idv}
                registrationDate={new Date(item.createdAt).toLocaleDateString()}
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default PolicyStatus;
