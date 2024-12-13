import React, { useEffect, useState, useRef } from "react";
import { Loader, Stepper } from "../../components";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useGetKycQuery } from "../../Redux/api/kycApiSlice";
function Kycstatus() {
  const stepsConfig = [
    { name: "Apply" },
    { name: "Processing" },
    { name: "Accepted" },
  ];
  const [isProcessing, setProcessing] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const { userInfo } = useSelector((state) => state.auth);
  const [kyc, setKyc] = useState({});
  const { data, isLoading, error, refetch } = useGetKycQuery();

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
    if (data) {
      setKyc(data);
      refetch();
      // Dynamically set the step based on KYC status
      if (data.status === "Approved") {
        setStep(4);
      } else if (data.status === "Processing") {
        setStep(2);
        setProcessing(true); // KYC is still being processed
      } else if (data.status === "Apply") {
        setStep(1);
        setProcessing(false); // KYC is applied, waiting for review
      } else {
        setProcessing(false); // Default case when KYC status is neither processing nor approved
      }
    }
  }, [data, userInfo, navigate]);
  if (isLoading) {
    return <Loader />; // Show a loading message or spinner
  }

  return (
    <section className="h-[92vh] w-full">
      <h1 className="w-full text-center font-bold text-2xl md:text-4xl py-4 my-5 text-[#563A9C] tracking-wide drop-shadow-lg">
        KYC
      </h1>
      <div>
        {userInfo?.kycApplied ? (
          <div>
            <Stepper step={step} stepsConfig={stepsConfig} />
            <div className="py-2 mt-3 flex justify-center items-center">
              <div className=" mx-auto overflow-x-auto bg-white shadow-lg rounded-lg">
                <table
                  className="text-xs md:text-xl lg:text-2xl table-auto border border-gray-300  
                border-collapse: separate; width: 100%"
                >
                  <thead className="bg-purple-600  text-white uppercase">
                    <tr>
                      <th className="py-4 md:px-12 px-1 text-center font-semibold">
                        Application ID
                      </th>
                      <th className="py-4 md:px-12 px-1 text-center font-semibold">
                        Name
                      </th>
                      <th className="py-4 md:px-12 px-1 text-center font-semibold">
                        Status
                      </th>
                      <th className="py-4 md:px-12 px-1 text-center font-semibold">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50">
                      <td className="py-4 md:px-12 px-1 text-center">
                        {kyc._id}
                      </td>
                      <td className="py-4 md:px-12 px-1 text-center">
                        {kyc.name}
                      </td>
                      <td
                        className={`py-4 md:px-12 px-1 text-center ${
                          isProcessing ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {kyc.status}
                      </td>
                      <td className="py-4 px-2 text-center">
                        {isProcessing ? (
                          <Link
                            to="/document"
                            className="text-blue-600 hover:underline"
                          >
                            View
                          </Link>
                        ) : (
                          <Link
                            to="/kycform"
                            className="inline-block px-4 py-2 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-400 transition duration-300"
                          >
                            Update
                          </Link>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <div>
            {userInfo?.isEmailVerified ? (
              <div>
                <Stepper step={1} stepsConfig={stepsConfig} />
                <div className="text-xl">
                  <p className="ml-3 p-2 text-gray-600">
                    Please complete your KYC verification by clicking below:
                    <Link
                      to="/kycform"
                      className="inline-block bg-blue-500 text-white p-2 ml-3 rounded-lg 
        hover:bg-blue-400 active:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                    >
                      Apply
                    </Link>
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-xl">
                <p className="ml-3 p-2 text-gray-600">
                  <span className="font-semibold text-red-500">
                    Email verification is required
                  </span>{" "}
                  to proceed with KYC. Please verify your email address before
                  continuing:
                  <Link
                    to="/verify"
                    className="inline-block bg-blue-500 text-white p-2 ml-3 rounded-lg 
                    hover:bg-blue-400 active:bg-blue-300 active:outline-none active:ring-2 active:ring-blue-500 active:text-black transition duration-200"
                  >
                    Verify Now
                  </Link>
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default Kycstatus;
