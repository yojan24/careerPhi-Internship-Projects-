import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useAddNotifMutation,
  useProfileMutation,
  useUploadIMGMutation,
} from "../../Redux/api/userApiSlice";
import {
  useApplyKycMutation,
  useGetKycQuery,
  useUpdateKycMutation,
} from "../../Redux/api/kycApiSlice";
import { useNavigate } from "react-router-dom";
import { login } from "../../Redux/features/authSlice";
import { hideLoader, showLoader } from "../../Redux/features/loader";
const KycForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [update, setUpdate] = useState(false);
  const [showCountryResi, setCountryResi] = useState();
  const { watch, register, reset, handleSubmit, getValues } = useForm();
  const [addnotification] = useAddNotifMutation();
  const [upload] = useUploadIMGMutation();
  const [apply] = useApplyKycMutation();
  const [updateKyc] = useUpdateKycMutation();
  const [updateUser] = useProfileMutation();
  const nationality = watch("nationality");
  const { data: kyc, isLoading, error, refetch } = useGetKycQuery();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (kyc) {
      setUpdate(true);
      // Wait until the KYC data is available before resetting the form
      reset({
        email: kyc.email,
        phone: kyc.phone,
        name: kyc.name,
        DOB: new Date(kyc.DOB).toISOString().split("T")[0],
        nationality: kyc.nationality,
        CountryOfResidence: kyc.CountryOfResidence,
        address: kyc.address,
        city: kyc.city,
        postalCode: kyc.postalCode,
        identityProofType: kyc.identityProofType,
        addressProofType: kyc.addressProofType,
        gender: kyc.gender,
      });
    } else if (userInfo) {
      reset({
        email: userInfo.email,
        name: userInfo.name,
        phone: userInfo.phone,
        gender: userInfo.gender,
      });
    }
  }, [kyc, userInfo, reset]); // Ensure this runs only when 'kyc' or 'userInfo' changes

  // Watch for nationality change to set showCountryResi state
  useEffect(() => {
    setCountryResi(nationality === "other"); // Update based on nationality
  }, [nationality]);

  const handleImage = async (file) => {
    if (file) {
      try {
        const formData = new FormData();
        formData.append("image", file[0]);

        const photo = await upload(formData).unwrap();
        // console.log(photo);

        const data = {
          public_id: photo.public_id,
          src: photo.src,
          original_name: photo.original_name,
        };

        return data;

        // Send the updated profile data
      } catch (err) {
        toast.error(err?.data?.message || err.error, {
          autoClose: 1000,
        });
      }
    }
  };

  const handleFormSubmit = (data) => {
    if (update) {
      updateForm(); // Update KYC data if it's an existing application
    } else {
      submit(data); // Submit a new KYC application
    }
  };
  const submit = async (data) => {
    try {
      dispatch(showLoader());
      if (data.photo && data.photo[0]) {
        const photoData = await handleImage(data.photo);
        data.photo = photoData;
      }

      if (data.file1 && data.file1[0]) {
        const addressProofData = await handleImage(data.file1);
        data.addProof = addressProofData;
      }

      if (data.file2 && data.file2[0]) {
        const identityProofData = await handleImage(data.file2);
        data.identityProof = identityProofData;
      }
      data.status = "Processing";

      delete data.file1;
      delete data.file2;
      console.log("data", data);

      const response = await apply(data).unwrap();
      console.log(response);

      const data1 = {
        email: `${userInfo.email}`,
        notification: {
          subject: "KYC Application Successfully Submitted",
          content:
            "We are pleased to inform you that your KYC application has been successfully submitted. Your application is under review, and it will take up to 48 hours to process. We will notify you once the verification process is complete.",
        },
      };

      console.log("notification");

      await addnotification(data1).unwrap();

      await updateUser({ kycApplied: true }).unwrap();
      console.log("update and notif");

      // Show success message
      dispatch(
        login({
          ...userInfo,
          kycApplied: true,
          notifications: [data1.notification],
        })
      );
      toast.success("KYC Applied successfully", { autoClose: 1000 });
      dispatch(hideLoader());
      navigate("/kycStatus");
    } catch (err) {
      dispatch(hideLoader());
      console.log("Error", err.message);
      toast.error(err?.data?.message || err.error, { autoClose: 1000 });
    }
  };

  const updateForm = async () => {
    try {
      dispatch(showLoader());
      const formData = getValues();

      if (formData.photo && formData.photo[0]) {
        const photoData = await handleImage(formData.photo);
        formData.photo = photoData;
      } else {
        delete formData.photo;
      }

      if (formData.file1 && formData.file1[0]) {
        const addressProofData = await handleImage(formData.file1);
        formData.addProof = addressProofData;
      }

      if (formData.file2 && formData.file2[0]) {
        const identityProofData = await handleImage(formData.file2);
        formData.identityProof = identityProofData;
      }

      formData.status = "Processing";

      console.log("KYC ID:", kyc._id, formData.photo); // Log ID for debugging

      // Only proceed if the ID is valid
      const response = await updateKyc({
        data: formData,
        id: kyc._id,
      }).unwrap();

      console.log(response);

      // Success message
      toast.success("KYC updated successfully!", { autoClose: 1000 });
      dispatch(hideLoader());
      navigate("/kycStatus");
    } catch (err) {
      // Handle errors
      dispatch(hideLoader());
      toast.error(err?.data?.message || err.error, { autoClose: 1000 });
    }
  };
  if (isLoading) {
    return <div>Loading...</div>; // Show a loading message or spinner
  }

  return (
    <div className="max-w-full py-2">
      <h1 className="w-full text-center font-bold text-2xl md:text-4xl py-4 my-5 text-[#563A9C] tracking-wide drop-shadow-lg">
        KYC FORM
      </h1>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="w-full">
          <p className="text-xl py-2 ml-2 md:ml-12 font-bold">
            Personal Details:
          </p>
          <hr className="h-1 bg-[#892be26f]" />
          <div className="max-w-full ml-2 md:ml-12 py-2 pt-8 md:text-lg text-md grid md:grid-cols-2 grid-cols-1 gap-5 md:gap-3 md:gap-y-6">
            {/* Full Name */}
            <div className="flex justify-start">
              <label className="w-1/4 text-left md:w-1/3 lg:w-1/6 font-semibold">
                Full Name:
              </label>
              <input
                type="text"
                {...register("name")}
                className="w-2/3 h-8 border-2 border-gray-300 rounded-md ml-1 hover:bg-gray-100"
              />
            </div>
            <div className="flex md:flex-nowrap flex-wrap justify-start">
              <label className="w-1/4 text-left md:w-1/3 lg:w-1/6 font-semibold">
                Photo:
              </label>
              <div className="flex flex-col w-3/4 md:w-auto">
                <input
                  type="file"
                  {...register("photo")}
                  className="w-3/5 h-8 border-2 border-gray-300 rounded-md ml-1 hover:bg-gray-100"
                />
                {kyc && (
                  <a
                    href={kyc?.photo?.src}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 ml-1 hover:underline"
                  >
                    {kyc.photo.original_name}
                  </a>
                )}
              </div>
            </div>

            {/* Date of Birth */}
            <div className="flex justify-start">
              <label className="w-1/4 text-left md:w-1/3 lg:w-1/6 font-semibold">
                Date of Birth:
              </label>
              <input
                type="date"
                {...register("DOB")}
                className="border-2 h-8 border-gray-300 rounded-md ml-1 hover:bg-gray-100"
              />
            </div>

            {/* Gender */}
            <div className="flex justify-start gap-1">
              <h2 className="w-1/4 text-left md:w-1/3 lg:w-1/6 font-semibold">
                Select Gender:
              </h2>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="male"
                  value="Male"
                  {...register("gender")}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <label htmlFor="male" className="text-gray-700 font-normal">
                  Male
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="female"
                  value="Female"
                  {...register("gender")}
                  className="w-4 h-4 text-pink-600 border-gray-300 focus:ring-pink-500"
                />
                <label htmlFor="female" className="text-gray-700 font-normal">
                  Female
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="other"
                  value="Other"
                  {...register("gender")}
                  className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                />
                <label htmlFor="other" className="text-gray-700 font-normal">
                  Other
                </label>
              </div>
            </div>

            {/* Nationality */}
            <div className="flex justify-start">
              <label className="w-1/4 text-left md:w-1/3 lg:w-1/6 font-semibold">
                Nationality:
              </label>
              <select
                id="nationality"
                className="ml-1 h-8 md:w-1/6 w-1/4 border-2 border-gray-300 hover:bg-gray-100 rounded-md"
                {...register("nationality")}
              >
                <option value="">Select </option>
                <option value="IND">Indian</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Country of Residence (Conditional) */}
            {showCountryResi && (
              <div className="flex justify-start">
                <label className="w-1/4 text-left md:w-1/3 lg:w-1/6 font-semibold">
                  Country of Residence:
                </label>
                <select
                  id="Country-of-Residence"
                  className="ml-1 h-8 md:w-1/6 w-1/4 border-2 border-gray-300 hover:bg-gray-100 rounded-md"
                  {...register("CountryOfResidence")}
                >
                  <option value="">Select </option>
                  <option value="USA">United States</option>
                  <option value="CAN">Canada</option>
                  <option value="GBR">United Kingdom</option>
                  <option value="AUS">Australia</option>
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Contact Details */}
        <div className="w-full pt-5">
          <p className="text-xl py-2 ml-2 md:ml-12 font-bold">
            Contact Details:
          </p>
          <hr className="h-1 bg-[#892be26f]" />
          <div className="max-w-full ml-2 md:ml-12 py-2 pt-8 md:text-lg text-md grid md:grid-cols-2 grid-cols-1 gap-5 md:gap-3 md:gap-y-6">
            <div className="flex justify-start">
              <label className="w-1/4 text-left md:w-1/3 lg:w-1/6 font-semibold">
                Email:
              </label>
              <input
                type="email"
                {...register("email")}
                className="w-1/2 h-8 border-2 border-gray-300 rounded-md ml-1 hover:bg-gray-100"
              />
            </div>
            <div className="flex justify-start">
              <label className="w-1/4 text-left md:w-1/3 lg:w-1/6 font-semibold">
                Phone Number:
              </label>
              <input
                type="number"
                {...register("phone")}
                className="w-1/2 h-8 border-2 border-gray-300 rounded-md ml-1 hover:bg-gray-100"
              />
            </div>
          </div>
        </div>

        {/* Address Details */}
        <div className="w-full pt-5">
          <p className="text-xl py-2 ml-2 md:ml-12 font-bold">
            Address Details:
          </p>
          <hr className="h-1 bg-[#892be26f]" />
          <div className="max-w-full ml-2 md:ml-12 py-2 pt-8 md:text-lg text-md grid md:grid-cols-2 grid-cols-1 gap-5 md:gap-3 md:gap-y-6">
            <div className="flex justify-start">
              <label className="w-1/4 text-left md:w-1/3 lg:w-1/6 font-semibold">
                Current Address:
              </label>
              <textarea
                {...register("address")}
                className="w-2/3 border-2 border-gray-300 rounded-md ml-1 hover:bg-gray-100"
              />
            </div>
            <div className="flex justify-start">
              <label className="w-1/4 text-left md:w-1/3 lg:w-1/6 font-semibold">
                City:
              </label>
              <input
                type="text"
                {...register("city")}
                className="h-8 border-2 border-gray-300 rounded-md ml-1 hover:bg-gray-100"
              />
            </div>
            <div className="flex justify-start">
              <label className="w-1/4 text-left md:w-1/3 lg:w-1/6 font-semibold">
                Postal Code:
              </label>
              <input
                type="text"
                {...register("postalCode")}
                className="h-8 border-2 border-gray-300 rounded-md ml-1 hover:bg-gray-100"
              />
            </div>
          </div>
        </div>

        {/* Documents Required */}
        <div className="w-full pt-5">
          <p className="text-xl py-2 ml-2 md:ml-12 font-bold">
            Documents Required:
          </p>
          <hr className="h-1 bg-[#892be26f]" />
          <div className="max-w-full ml-2 md:ml-12 py-2 pt-8 md:text-lg text-md grid md:grid-cols-2 grid-cols-1 gap-5 md:gap-3 md:gap-y-6">
            <div className="flex justify-start">
              <label className="w-1/4 text-left md:w-1/3 lg:w-1/6 font-semibold">
                AddressProof Type:
              </label>
              <select
                id="Country-of-Residence"
                className="ml-1 h-8 md:w-1/6 w-1/4 border-2 border-gray-300 hover:bg-gray-100 rounded-md"
                {...register("addressProofType")}
              >
                <option value="">Select </option>
                <option value="Utility Bill">Utility Bill</option>
                <option value="Bank Statement">Bank Statement</option>
                <option value="Bank Statement">Rent Aggrement</option>
              </select>
            </div>

            <div className="flex justify-start">
              <label className="w-1/4 text-left md:w-1/3 lg:w-1/6 font-semibold">
                Address Proof:
              </label>
              <div className="flex flex-col w-3/4 md:w-auto">
                <input
                  type="file"
                  {...register("file1")}
                  className="w-2/3 h-8 border-2 border-gray-300 rounded-md ml-1 hover:bg-gray-100"
                />
                {kyc && (
                  <a
                    href={kyc?.addProof?.src}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 ml-1 hover:underline"
                  >
                    {kyc.addProof.original_name}
                  </a>
                )}
              </div>
            </div>

            {/* identity */}
            <div className="flex justify-start">
              <label className="w-1/4 text-left md:w-1/3 lg:w-1/6 font-semibold">
                IdentityProof Type:
              </label>
              <select
                id="Country-of-Residence"
                className="ml-1 h-8 md:w-1/6 w-1/4 border-2 border-gray-300 hover:bg-gray-100 rounded-md"
                {...register("identityProofType")}
              >
                <option value="">Select</option>
                <option value="Passport">Passport</option>
                <option value="Driver's License">Driver's License</option>
                <option value="Voter ID">Voter ID</option>
                <option value="Aadhar Card">Aadhar Card</option>
                <option value="PAN Card">PAN Card</option>
              </select>
            </div>
            {/* Document Upload */}
            <div className="flex justify-start">
              <label className="w-1/4 text-left md:w-1/3 lg:w-1/6 font-semibold">
                Identity Proof:
              </label>
              <div className="flex flex-col w-3/4 md:w-auto">
                <input
                  type="file"
                  {...register("file2")}
                  className="w-2/3 h-8 border-2 border-gray-300 rounded-md ml-1 hover:bg-gray-100"
                />
                {kyc && (
                  <a
                    href={kyc?.identityProof?.src}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 ml-1 hover:underline"
                  >
                    {kyc.identityProof.original_name}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="py-5 pt-8 flex justify-center items-center gap-8">
          {update ? (
            <div
              onClick={updateForm}
              className="
              bg-[#8A2BE2] text-xl text-white  rounded-md hover:bg-[#892be2e1] p-2 active:bg-[#892be2c4] active:text-black"
            >
              update
            </div>
          ) : (
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-400 active:bg-green-300 active:text-black p-2 text-xl text-white  rounded-md "
            >
              Submit
            </button>
          )}
          <button className="bg-red-500 hover:bg-red-400 active:bg-red-300 active:text-black p-2 text-xl text-white  rounded-md ">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default KycForm;
