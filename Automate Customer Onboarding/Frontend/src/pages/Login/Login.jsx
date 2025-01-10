import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLoginMutation } from "../../Redux/api/userApiSlice";
import { IoEyeOffSharp } from "react-icons/io5";
import { IoEye } from "react-icons/io5";
import { login as setCrendentials } from "../../Redux/features/authSlice";
import { showLoader, hideLoader } from "../../Redux/features/loader";

import { toast } from "react-toastify";
function Login() {
  const { register, handleSubmit } = useForm();
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  const [login] = useLoginMutation();
  useEffect(() => {
    if (userInfo) {
      navigate("/profile");
    }
  }, [navigate, userInfo]);

  const submit = async (data) => {
    try {
      dispatch(showLoader());
      // console.log(data);

      const result = await login(data).unwrap();
      console.log(result);
      dispatch(setCrendentials({ ...result }));
      toast.success("login Successfully", { autoClose: 1000 });
      navigate("/profile");
      dispatch(hideLoader());
    } catch (err) {
      dispatch(hideLoader());
      // console.log(err);
      toast.error(err?.data?.message || err.error, {
        autoClose: 1000,
      });
    }
  };

  return (
    <section className="bg-gray-200 w-full min-h-[92vh] flex justify-center items-center">
      <div className="w-full flex flex-col items-center justify-center px-6 py-6 lg:py-0">
        <div className="w-full  bg-gray-50 rounded-xl shadow  md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-5 space-y-4 md:space-y-3 sm:p-6">
            <h1 className="text-lg font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-center">
              Sign in
            </h1>
            <form onSubmit={handleSubmit(submit)}>
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
                <div className="relative">
                  <input
                    type={isPasswordVisible ? "text" : "password"} // toggle between 'text' and 'password'
                    placeholder="**********"
                    className="w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                    {...register("password")}
                  />
                  <span
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-xl"
                  >
                    {isPasswordVisible ? <IoEye /> : <IoEyeOffSharp />}
                  </span>
                </div>
              </div>
              <div className="pt-2 mt-3">
                <button className="w-full py-3  bg-[#8A2BE2] text-xl text-white font-semibold rounded-md hover:bg-[#892be2e1] active:bg-[#892be2c4] active:outline-none active:ring-2 active:ring-[#8A2BE2]">
                  Sign In
                </button>
              </div>
            </form>
            <p className="text-sm font-light text-gray-500 text-center ">
              Don’t have an account yet?{" "}
              <Link
                to="/signup"
                className="font-medium text-primary-600 hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
