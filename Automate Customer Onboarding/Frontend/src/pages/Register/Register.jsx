import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../Redux/api/userApiSlice";
import { login } from "../../Redux/features/authSlice";
import { toast } from "react-toastify";
import { showLoader, hideLoader } from "../../Redux/features/loader";
function Register() {
  const { register, handleSubmit } = useForm();
  const [createUser] = useRegisterMutation();
  const navigate = useNavigate();
  // const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const submit = async (data) => {
    try {
      if (data.password !== data.passwordConfirm) {
        return toast.error("passwod do not match", {
          autoClose: 1000,
        });
      }
      dispatch(showLoader()); // Show loader
      const result = await createUser(data).unwrap();
      dispatch(login({ ...result }));
      navigate("/verify");
      dispatch(hideLoader()); // Hide loader
      toast.success("User successfully registered", { autoClose: 1000 });
    } catch (err) {
      dispatch(hideLoader()); // Hide loader on error
      toast.error(err?.data?.message || err.error, { autoClose: 1000 });
    }
  };
  return (
    <section className="bg-gray-200 w-full min-h-[92vh] flex justify-center items-center">
      <div className="w-full flex flex-col items-center justify-center px-6 py-6 lg:py-0">
        <div className="w-full  bg-gray-50 rounded-xl shadow  md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-5 space-y-4 md:space-y-3 sm:p-6">
            <h1 className="text-lg font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-center">
              Sign up
            </h1>
            <form onSubmit={handleSubmit(submit)}>
              <div className="mb-2">
                <label className="block mb-2 text-md text-left font-medium text-gray-700">
                  Name:
                </label>
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                  {...register("name")}
                />
              </div>
              <div className="mb-2">
                <label className="block mb-2 text-md text-left font-medium text-gray-700">
                  Email:
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                  {...register("email")}
                />
              </div>

              <div className="my-2">
                <label className="block mb-2 text-md text-left font-medium text-gray-700">
                  Password:
                </label>
                <input
                  type="password"
                  placeholder="Create a password"
                  className="w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                  {...register("password")}
                />
              </div>
              <div className="my-2">
                <label className="block mb-2 text-md text-left font-medium text-gray-700">
                  Password confirm:
                </label>
                <input
                  type="text"
                  placeholder="Confirm your password"
                  className="w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                  {...register("passwordConfirm")}
                />
              </div>
              <div className="pt-2 mt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-[#8A2BE2] font-semibold text-xl text-white  rounded-md hover:bg-[#892be2e1] active:bg-[#892be2c4] active:outline-none active:ring-2 active:ring-[#8A2BE2]"
                >
                  Sign up
                </button>
              </div>
            </form>
            <p className="text-sm font-light text-gray-500 my-1 text-center ">
              Already have an Account?{" "}
              <Link
                to="/login"
                className="font-medium text-primary-600 hover:underline"
              >
                Sign in{" "}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
