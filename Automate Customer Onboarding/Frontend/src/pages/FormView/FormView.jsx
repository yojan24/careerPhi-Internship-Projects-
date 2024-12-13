import React, { useEffect } from "react";
import { useGetKycQuery } from "../../Redux/api/kycApiSlice";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Loader } from "../../components/index";

function FormView() {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const { data: kyc, isLoading, error, refetch } = useGetKycQuery();
  // console.log(kyc);

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, []);
  if (isLoading) {
    return <Loader />; // Show a loading message or spinner
  }

  if (error) {
    return <div>Error loading KYC data. Please try again later.</div>; // Show an error message
  }

  if (!kyc) {
    return <div>No KYC data available.</div>; // Handle case where no data is found
  }
  return (
    <div className="max-w-full py-2">
      <h1 className="w-full text-center font-bold text-2xl md:text-4xl py-4 my-5 text-[#563A9C] tracking-wide drop-shadow-lg">
        KYC FORM
      </h1>
      <div className="max-w-full mx-12">
        {/* Application Details */}
        <div className="grid md:grid-cols-2 grid-cols-1 gap-5 md:gap-6">
          {/* Left Column: Application Id & Status */}
          <div className="flex flex-col gap-4">
            <div className="flex">
              <label className="w-1/3 text-left font-semibold">
                Application Id:
              </label>
              <p className="h-8 rounded-md ml-1">{kyc._id}</p>
            </div>
            <div className="flex">
              <label className="w-1/3 text-left font-semibold">
                Application Status:
              </label>
              <p className="h-8 rounded-md ml-1">{kyc.status}</p>
            </div>
          </div>

          {/* Right Column: Photo */}
          <div className="flex justify-center md:justify-end order-first md:order-last">
            <img
              src={`${kyc.photo?.src}`}
              className="w-32 h-32 md:w-40 md:h-40 border-2 border-gray-300 rounded-md"
              alt="KYC"
            />
          </div>
        </div>
      </div>

      {/* Display Submitted Data */}
      <div>
        <p className="text-xl py-2 ml-2 md:ml-12 font-semibold">
          Personal Details:
        </p>
        <hr className="h-1 bg-[#892be26f]" />
        <div className="max-w-full ml-2 md:ml-12 py-2 pt-8 md:text-lg text-md grid md:grid-cols-2 grid-cols-1 gap-5 md:gap-3 md:gap-y-6">
          {/* Full Name */}
          <div className="flex justify-start">
            <label className="w-1/4 text-left md:w-1/3 lg:w-1/6">
              Full Name:
            </label>
            <p className="w-2/3 h-8 ml-1">{kyc.name}</p>
          </div>

          {/* Date of Birth */}
          <div className="flex justify-start">
            <label className="w-1/4 text-left md:w-1/3 lg:w-1/6">
              Date of Birth:
            </label>
            <p className="h-8 ml-1">
              {new Date(kyc.DOB).toLocaleDateString("en-GB")}
            </p>
          </div>

          {/* Gender */}
          <div className="flex justify-start gap-1">
            <h2 className="w-1/4 text-left md:w-1/3 lg:w-1/6">
              Select Gender:
            </h2>
            <p className="ml-1">{kyc.gender}</p>
          </div>

          {/* Nationality */}
          <div className="flex justify-start">
            <label className="w-1/4 text-left md:w-1/3 lg:w-1/6">
              Nationality:
            </label>
            <p className="ml-1">{kyc.nationality}</p>
          </div>

          {/* Country of Residence (Conditional) */}
          {kyc.CountryOfResidence && (
            <div className="flex justify-start">
              <label className="w-1/4 text-left md:w-1/3 lg:w-1/6">
                Country of Residence:
              </label>
              <p className="ml-1">{kyc.CountryOfResidence}</p>
            </div>
          )}
        </div>
      </div>

      {/* Contact Details */}
      <div className="w-full pt-5">
        <p className="text-xl py-2 ml-2 md:ml-12 font-semibold">
          Contact Details:
        </p>
        <hr className="h-1 bg-[#892be26f]" />
        <div className="max-w-full ml-2 md:ml-12 py-2 pt-8 md:text-lg text-md grid md:grid-cols-2 grid-cols-1 gap-5 md:gap-3 md:gap-y-6">
          {/* Email */}
          <div className="flex justify-start">
            <label className="w-1/4 text-left md:w-1/3 lg:w-1/6">Email:</label>
            <p className="w-1/2 h-8 ml-1">{kyc.email}</p>
          </div>

          {/* Phone Number */}
          <div className="flex justify-start">
            <label className="w-1/4 text-left md:w-1/3 lg:w-1/6">
              Phone Number:
            </label>
            <p className="w-1/2 h-8 ml-1">{kyc.phone}</p>
          </div>
        </div>
      </div>

      {/* Address Details */}
      <div className="w-full pt-5">
        <p className="text-xl py-2 ml-2 md:ml-12 font-semibold">
          Address Details:
        </p>
        <hr className="h-1 bg-[#892be26f]" />
        <div className="max-w-full ml-2 md:ml-12 py-2 pt-8 md:text-lg text-md grid md:grid-cols-2 grid-cols-1 gap-5 md:gap-3 md:gap-y-6">
          {/* Current Address */}
          <div className="flex justify-start">
            <label className="w-1/4 text-left md:w-1/3 lg:w-1/6">
              Current Address:
            </label>
            <p className="w-2/3 ml-1">{kyc.address}</p>
          </div>

          {/* City */}
          <div className="flex justify-start">
            <label className="w-1/4 text-left md:w-1/3 lg:w-1/6">City:</label>
            <p className="h-8 ml-1">{kyc.city}</p>
          </div>

          {/* Postal Code */}
          <div className="flex justify-start">
            <label className="w-1/4 text-left md:w-1/3 lg:w-1/6">
              Postal Code:
            </label>
            <p className="h-8 ml-1">{kyc.postalCode}</p>
          </div>
        </div>
      </div>

      {/* Documents Required */}
      <div className="w-full pt-5">
        <p className="text-xl py-2 ml-2 md:ml-12 font-semibold">
          Documents Required:
        </p>
        <hr className="h-1 bg-[#892be26f]" />
        <div className="max-w-full ml-2 md:ml-12 py-2 pt-8 md:text-lg text-md grid md:grid-cols-2 grid-cols-1 gap-5 md:gap-3 md:gap-y-6">
          {/* Address Proof Type */}
          <div className="flex justify-start">
            <label className="w-1/4 text-left md:w-1/3 lg:w-1/6">
              Address Proof Type:
            </label>
            <p className="ml-1">{kyc.addressProofType}</p>
          </div>

          {/* Address Proof */}
          <div className="flex justify-start">
            <label className="w-1/4 text-left md:w-1/3 lg:w-1/6">
              Address Proof:
            </label>
            <a
              href={`${kyc.addProof?.src}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-3/5 h-8 text-blue-400 rounded-md ml-1 hover:underline"
            >
              {kyc.addProof?.original_name}
            </a>
          </div>

          {/* Identity Proof Type */}
          <div className="flex justify-start">
            <label className="w-1/4 text-left md:w-1/3 lg:w-1/6">
              Identity Proof Type:
            </label>
            <p className="ml-1">{kyc.identityProofType}</p>
          </div>

          {/* Identity Proof */}
          <div className="flex justify-start">
            <label className="w-1/4 text-left md:w-1/3 lg:w-1/6">
              Identity Proof:
            </label>
            <a
              href={`${kyc.identityProof?.src}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-3/5 h-8 text-blue-400 rounded-md ml-1 hover:underline"
            >
              {kyc.identityProof?.original_name}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormView;
