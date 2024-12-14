import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetKycByIdQuery,
  useUpdateStatusMutation,
} from "../../Redux/api/kycApiSlice";
import { useForm } from "react-hook-form";
import {
  useAddNotifMutation,
  useUpdateStausOfUserMutation,
} from "../../Redux/api/userApiSlice";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../Redux/features/authSlice";
import { showLoader, hideLoader } from "../../Redux/features/loader";

import { Loader } from "../../components";
function AdminFormView() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [kyc, setKyc] = useState({});
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const { register, handleSubmit } = useForm();
  const [addNotification] = useAddNotifMutation();
  const [userKycStatus] = useUpdateStausOfUserMutation();
  const [updateStatus] = useUpdateStatusMutation();
  const { data, error, isLoading } = useGetKycByIdQuery(id);
  const navigate = useNavigate();
  useEffect(() => {
    if (data) {
      setKyc(data); // Set the KYC data to state once it is fetched
    }
  }, [data]);

  if (isLoading) return <Loader />;
  if (error) return <p>Error loading KYC data</p>;

  const cancel = async () => {
    navigate("/kycApplications");
  };
  const approved = async () => {
    dispatch(showLoader());
    try {
      const data1 = {
        email: `${kyc.email}`,
        notification: {
          subject: "Application of Kyc Approved",
          content:
            "We are pleased to inform you that your KYC application has been successfully approved.Your application has been reviewed, and all necessary documents have been verified.",
        },
      };
      await addNotification(data1).unwrap();
      const updateData = {
        status: "Approved",
        mail: {
          subject: "Application of Kyc Approved",
          content:
            "We are pleased to inform you that your KYC application has been successfully approved.Your application has been reviewed, and all necessary documents have been verified.",
        },
      };
      const response = await updateStatus({
        updateData,
        ID: kyc._id,
      }).unwrap();

      const updatedStatus = {
        status: "true",
      };
      await userKycStatus({ updatedStatus, ID: kyc.user });
      toast.success("Approved successfully", {
        autoClose: 1000,
      });

      navigate("/kycApplications");
      dispatch(hideLoader());
    } catch (err) {
      dispatch(hideLoader());
      toast.error(err?.data?.message || err.error, {
        autoClose: 1000,
      });
    }
  };

  const rejected = async (data) => {
    try {
      dispatch(showLoader());
      const data1 = {
        email: `${kyc.email}`,
        notification: {
          subject: "Application of Kyc Rejected",
          content: data.content,
        },
      };
      await addNotification(data1).unwrap();
      // dispatch(
      //   login({
      //     ...userInfo,
      //     notifications: [...userInfo.notifications, data1.notification],
      //   })
      // );
      const updateData = {
        status: "Rejected",
        mail: data1.notification,
      };
      const response = await updateStatus({
        updateData,
        ID: kyc._id,
      }).unwrap();
      dispatch(hideLoader());
      navigate("/kycApplications");
    } catch (err) {
      dispatch(hideLoader());
      toast.error(err?.data?.message || err.error, {
        autoClose: 1000,
      });
    }
  };

  return (
    <div className="max-w-full min-h-[92vh] py-2">
      <h1 className="w-full text-center font-bold text-2xl md:text-4xl py-4 my-5 text-[#563A9C] tracking-wide drop-shadow-lg">
        KYC FORM
      </h1>
      <div className="max-w-full mx-2 md:mx-12">
        {/* Application Details */}
        <div className="grid md:grid-cols-2 grid-cols-1 gap-5 md:gap-6">
          {/* Left Column: Application Id & Status */}
          <div className="flex flex-col gap-4">
            <div className="flex">
              <label className="w-1/4 text-left md:w-1/3 lg:w-1/4 font-semibold">
                Application Id:
              </label>
              <p className="h-8 rounded-md ml-1 font-normal">{kyc._id}</p>
            </div>
            <div className="flex">
              <label className="w-1/4 text-left md:w-1/3 lg:w-1/4 font-semibold">
                Application Status:
              </label>
              <p className="h-8 rounded-md ml-1 font-normal">{kyc.status}</p>
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
            <label className="w-1/4 text-left md:w-1/3 lg:w-1/6 font-semibold">
              Full Name:
            </label>
            <p className="w-2/3 h-8 ml-1 font-normal">{kyc.name}</p>
          </div>

          {/* Date of Birth */}
          <div className="flex justify-start">
            <label className="w-1/4 text-left md:w-1/3 lg:w-1/6 font-semibold">
              Date of Birth:
            </label>
            <p className="h-8 ml-1 font-normal">
              {new Date(kyc.DOB).toLocaleDateString("en-GB")}
            </p>
          </div>

          {/* Gender */}
          <div className="flex justify-start gap-1">
            <h2 className="w-1/4 text-left md:w-1/3 lg:w-1/6 font-semibold">
              Select Gender:
            </h2>
            <p className="ml-1 font-normal">{kyc.gender}</p>
          </div>

          {/* Nationality */}
          <div className="flex justify-start">
            <label className="w-1/4 text-left md:w-1/3 lg:w-1/6 font-semibold">
              Nationality:
            </label>
            <p className="ml-1 font-normal">{kyc.nationality}</p>
          </div>

          {/* Country of Residence (Conditional) */}
          {kyc.CountryOfResidence && (
            <div className="flex justify-start">
              <label className="w-1/4 text-left md:w-1/3 lg:w-1/6 font-semibold">
                Country of Residence:
              </label>
              <p className="ml-1 font-normal">{kyc.CountryOfResidence}</p>
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
            <label className="w-1/4 text-left md:w-1/3 lg:w-1/6 font-semibold">
              Email:
            </label>
            <p className="w-1/2 h-8 ml-1 font-normal">{kyc.email}</p>
          </div>

          {/* Phone Number */}
          <div className="flex justify-start">
            <label className="w-1/4 text-left md:w-1/3 lg:w-1/6 font-semibold">
              Phone Number:
            </label>
            <p className="w-1/2 h-8 ml-1 font-normal">{kyc.phone}</p>
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
            <label className="w-1/4 text-left md:w-1/3 lg:w-1/6 font-semibold">
              Current Address:
            </label>
            <p className="w-2/3 ml-1 font-normal">{kyc.address}</p>
          </div>

          {/* City */}
          <div className="flex justify-start">
            <label className="w-1/4 text-left md:w-1/3 lg:w-1/6 font-semibold">
              City:
            </label>
            <p className="h-8 ml-1 font-normal">{kyc.city}</p>
          </div>

          {/* Postal Code */}
          <div className="flex justify-start">
            <label className="w-1/4 text-left md:w-1/3 lg:w-1/6 font-semibold">
              Postal Code:
            </label>
            <p className="h-8 ml-1 font-normal">{kyc.postalCode}</p>
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
            <label className="w-1/4 text-left md:w-1/3 lg:w-1/6 font-semibold">
              Address Proof Type:
            </label>
            <p className="ml-1 font-normal">{kyc.addressProofType}</p>
          </div>

          {/* Address Proof */}
          <div className="flex justify-start">
            <label className="w-1/4 text-left md:w-1/3 lg:w-1/6 font-semibold">
              Address Proof:
            </label>
            <a
              href={`${kyc.addProof?.src}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-3/5 h-8 text-blue-400 rounded-md ml-1 hover:underline break-words"
            >
              {kyc.addProof?.original_name}
            </a>
          </div>

          {/* Identity Proof Type */}
          <div className="flex justify-start">
            <label className="w-1/4 text-left md:w-1/3 lg:w-1/6 font-semibold">
              Identity Proof Type:
            </label>
            <p className="ml-1 font-normal">{kyc.identityProofType}</p>
          </div>

          {/* Identity Proof */}
          <div className="flex justify-start">
            <label className="w-1/4 text-left md:w-1/3 lg:w-1/6 font-semibold">
              Identity Proof:
            </label>
            <a
              href={`${kyc.identityProof?.src}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-3/5 h-8 text-blue-400 rounded-md ml-1 hover:underline break-words"
            >
              {kyc.identityProof?.original_name}
            </a>
          </div>
        </div>
      </div>

      {kyc && kyc?.status !== "Rejected" && kyc?.status !== "Approved" && (
        <div className="w-full py-2 flex justify-center gap-3 ">
          <button
            className="w-32 sm:w-40 md:w-48 bg-green-500 hover:bg-green-400 active:bg-green-300 active:text-black p-2 text-xl text-white rounded-md"
            onClick={approved}
          >
            Approve
          </button>
          <button
            className="w-32 sm:w-40 md:w-48 bg-red-500 hover:bg-red-400 active:bg-red-300 active:text-black p-2 text-xl text-white rounded-md"
            onClick={() => setOpen(true)}
          >
            Reject
          </button>
          <button
            className="w-32 sm:w-40 md:w-48 bg-gray-500 hover:bg-gray-400 active:bg-gray-300 active:text-black p-2 text-xl text-white rounded-md"
            onClick={cancel}
          >
            Cancel
          </button>
        </div>
      )}
      {open && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div className="absolute bg-black opacity-40 inset-0" />{" "}
          <div className=" relative md:w-1/2 w-4/5 bg-white p-4 rounded-md z-10">
            <div className="w-full  flex flex-col">
              <div className="w-full flex flex-col gap-2 z-10 ">
                <button
                  onClick={() => setOpen(false)}
                  className="w-full text-end py-2 text-xl font-semibold"
                >
                  X
                </button>
                <form
                  onSubmit={handleSubmit(rejected)}
                  className="w-full flex flex-col gap-2 z-10 "
                >
                  <label>Subject</label>
                  <input
                    className="py-2 rounded-md text-xl border-2 border-gray-300 shadow-sm"
                    value="Application of Kyc Rejected"
                    {...register("subject")}
                  />
                  <label>Description</label>
                  <textarea
                    className="py-2 rounded-md text-xl border-2 border-gray-300 shadow-sm"
                    {...register("content", {
                      required: true,
                    })}
                  />
                  <div className="flex pt-2 justify-end">
                    <button
                      type="submit"
                      className="p-2 bg-red-500 rounded-md hover:bg-red-400 border-2 border-white active:border-red-500 active:bg-white text-lg "
                    >
                      submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminFormView;
