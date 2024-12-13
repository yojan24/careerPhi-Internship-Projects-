import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BiSolidPencil } from "react-icons/bi";
import { login } from "../../Redux/features/authSlice";
import { useForm } from "react-hook-form";
import {
  useProfileMutation,
  useUploadIMGMutation,
} from "../../Redux/api/userApiSlice";
import { hideLoader, showLoader } from "../../Redux/features/loader";
function Profile() {
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [upload] = useUploadIMGMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile] = useProfileMutation();

  useEffect(() => {
    // console.log(userInfo);
    if (userInfo) {
      // console.log(userInfo);
      reset({
        name: userInfo.name || "",
        email: userInfo.email || "",
        phone: userInfo.phone || "",
        password: "", // Keep password field empty, user will input this manually
        passwordConfirm: "", // Keep passwordConfirm field empty
      });
    } else {
      navigate("/login");
    }
  }, [userInfo, navigate]);

  const updateSubmit = async (data) => {
    // Initialize an object to hold the data that needs to be updated
    let updatedData = {};

    // Compare the form data with the current userInfo and only include modified fields
    if (data.photo) {
      updatedData.photo = data.photo;
    }
    if (data.name !== userInfo.name) {
      updatedData.name = data.name;
    }
    if (data.email !== userInfo.email) {
      updatedData.email = data.email;
    }
    if (data.phone.length >= 10 && data.phone !== userInfo.phone) {
      updatedData.phone = data.phone;
    }

    if (data.password !== "" && data.password === data.passwordConfirm) {
      updatedData.password = data.password;
    }

    if (Object.keys(updatedData).length === 0) {
      return toast.warning("No data has been modified", {
        autoClose: 1000,
      });
    }
    console.log(updatedData);

    try {
      // Update the profile with the modified data
      const response = await updateProfile(updatedData).unwrap();
      console.log();

      dispatch(login({ ...response }));
      // Handle successful update
      toast.success("Profile updated successfully!", {
        autoClose: 1000,
      });

      // Optionally, update the userInfo in the store
      dispatch(login({ ...userInfo, ...updatedData }));
    } catch (error) {
      // Handle errors
      toast.error(error.message || "Something went wrong!", {
        autoClose: 1000,
      });
    }
  };

  const handleImageChange = async (e) => {
    dispatch(showLoader());
    const image = e.target.files[0];
    if (image) {
      try {
        const formData = new FormData();
        formData.append("image", image);

        const photo = await upload(formData).unwrap();
        console.log(photo);

        const data = {
          photo: {
            public_id: photo.public_id,
            src: photo.src,
            original_name: photo.original_name,
          },
        };

        console.log(data); // Check that this data looks correct

        // Send the updated profile data
        const result = await updateProfile(data).unwrap();
        dispatch(login({ ...userInfo, photo: result.photo }));
        dispatch(hideLoader());
        toast.success("photo uploaded Successfully", {
          autoClose: 1000,
        });
      } catch (err) {
        dispatch(hideLoader());
        toast.error(err?.data?.message || err.error, {
          autoClose: 1000,
        });
      }
    }
  };
  return (
    <section className="min-h-[92vh]  mb-3  ">
      <h1 className="w-full text-center font-bold text-2xl md:text-4xl py-4 my-5 text-[#563A9C] tracking-wide drop-shadow-lg">
        Profile
      </h1>
      <div className="flex felx-col justify-center items-center">
        <div className="w-full max-w-2xl flex flex-col items-center space-y-6">
          {/* Profile Image Section */}
          <div className="relative mb-6">
            {userInfo?.photo ? (
              <img
                src={userInfo.photo.src}
                alt="Profile"
                className="h-36 w-36 rounded-full border-4 border-gray-200 object-cover"
              />
            ) : (
              <div className="relative w-36 h-36 flex justify-center items-center rounded-full bg-gray-300 text-white cursor-pointer border-4 border-gray-400">
                <input
                  type="file"
                  id="fileInput"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
                <label
                  htmlFor="fileInput"
                  className="absolute inset-0 flex justify-center items-center"
                >
                  <BiSolidPencil className="text-2xl text-gray-700" />
                </label>
              </div>
            )}
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(updateSubmit)}
            className="w-full flex flex-col items-center space-y-4 p-1 md:p-0"
          >
            {/* Name */}
            <div className="flex items-center space-x-4 w-full max-w-2xl">
              <label className="w-32 text-gray-700  font-semibold">Name:</label>
              <input
                type="text"
                className="flex-grow border-2 border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#8A2BE2] shadow-sm"
                {...register("name")}
              />
            </div>

            {/* Email */}
            <div className="flex items-center space-x-4 w-full max-w-2xl">
              <label className="w-32 text-gray-700  font-semibold">
                Email:
              </label>
              <input
                type="email"
                className="flex-grow border-2 border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#8A2BE2] shadow-sm"
                {...register("email")}
              />
              {userInfo?.isEmailVerified !== true && (
                <Link
                  to="/verify"
                  className="py-2 px-4 bg-[#8A2BE2] text-white rounded-md hover:bg-[#892be2dd] active:ring-2 active:ring-[#8A2BE2]"
                >
                  Verify
                </Link>
              )}
            </div>

            {/* Phone */}
            <div className="flex items-center space-x-4 w-full max-w-2xl">
              <label className="w-32 text-gray-700  font-semibold">
                Phone:
              </label>
              <input
                type="tel"
                className="flex-grow border-2 border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#8A2BE2] shadow-sm"
                {...register("phone")}
              />
            </div>

            {/* Password */}
            <div className="flex items-center space-x-4 w-full max-w-2xl">
              <label className="w-32 text-gray-700  font-semibold">
                Password:
              </label>
              <input
                type="password"
                className="flex-grow border-2 border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#8A2BE2] shadow-sm"
                {...register("password")}
              />
            </div>

            {/* Confirm Password */}
            <div className="flex items-center space-x-4 w-full max-w-2xl">
              <label className="w-32 text-gray-700  font-semibold">
                Confirm Password:
              </label>
              <input
                type="password"
                className="flex-grow border-2 border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#8A2BE2] shadow-sm"
                {...register("passwordConfirm")}
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center w-full max-w-2xl">
              <button
                type="submit"
                className="w-1/2 py-3 bg-[#8A2BE2] text-white text-xl font-semibold rounded-md hover:bg-[#892be2dd] active:ring-2 active:ring-[#8A2BE2]"
              >
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Profile;
