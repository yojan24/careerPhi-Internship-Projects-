import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  useResendOTPMutation,
  useSendVerificationCodeMutation,
} from "../../Redux/api/userApiSlice";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { login } from "../../Redux/features/authSlice";
const OTP = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [verifyCode] = useSendVerificationCodeMutation();
  const [resendcode] = useResendOTPMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    console.log("userInfo:", userInfo);
    if (userInfo == null) {
      navigate("/signup");
    }
  }, [userInfo, navigate]);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      otp: ["", "", "", "", "", ""], // Now 6 OTP input fields
    },
  });

  // Watch the OTP inputs to detect changes
  const otp = watch("otp");

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      const code = data.otp.join("").toString();
      if (!code) {
        return toast.error("OTP must required", {
          autoClose: 1000,
        });
      }
      await verifyCode(code).unwrap();
      toast.success("Email verify Successfully", {
        autoClose: 1000,
      });
      dispatch(login({ ...userInfo, isEmailVerified: true }));
      navigate("/profile");
    } catch (err) {
      toast.error(err?.data?.message || err.error, {
        autoClose: 1000,
      });
    }
  };
  const rensendOTP = async () => {
    try {
      console.log(userInfo.email);
      const data = {
        email: userInfo.email,
      };
      console.log("Resending OTP for email:", data.email);
      await resendcode(data).unwrap();
      toast.success("Otp resend Successfully", {
        autoClose: 1000,
      });
    } catch (err) {
      toast.error(err?.data?.message || err.error, {
        autoClose: 1000,
      });
    }
  };

  // Handle input changes
  const handleInputChange = (value, index) => {
    // Update the OTP array in the form state
    setValue(`otp.${index}`, value);

    if (value && index < otp.length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData("text");
    if (/^[0-9]{6}$/.test(pastedText)) {
      const digits = pastedText.split("");
      digits.forEach((digit, index) => setValue(`otp.${index}`, digit));
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "") {
      // If backspace is pressed and the current field is empty, move focus to the previous field
      if (index > 0) {
        document.getElementById(`otp-input-${index - 1}`).focus();
      }
    }
  };

  return (
    <section className="bg-gray-200 w-full min-h-[92vh] flex justify-center items-center">
      <div className="md:max-w-md  w-[75%] text-center bg-white px-4 sm:px-8 py-10 rounded-xl shadow">
        <header className="mb-8">
          <h1 className="text-2xl font-bold mb-1">Email Verification</h1>
          <p className="text-[15px] text-slate-500">
            Enter the 6-digit verification code that was sent to your Email ID.
          </p>
        </header>
        <form onSubmit={handleSubmit(onSubmit)} id="otp-form">
          <div className="flex flex-wrap md:flex-nowrap items-center justify-center gap-3">
            {otp.map((value, index) => (
              <Controller
                key={index}
                name={`otp.${index}`}
                control={control}
                render={({ field }) => (
                  <input
                    id={`otp-input-${index}`}
                    type="text"
                    value={field.value}
                    onChange={(e) => handleInputChange(e.target.value, index)}
                    onPaste={handlePaste}
                    onKeyDown={(e) => handleKeyDown(e, index)} // Handle backspace
                    maxLength="1"
                    pattern="\d*"
                    className="w-14 h-14 text-center text-2xl text-black bg-gray-200 border border-transparent hover:border-gray-100 appearance-none rounded p-4 outline-none focus:bg-white focus:border-[#892be2b9] focus:ring-1 focus:ring-[#892be2b9]"
                  />
                )}
              />
            ))}
          </div>
          <div className="max-w-[260px] mx-auto mt-5">
            <button
              type="submit"
              className="w-full py-3 bg-[#8A2BE2] font-semibold text-lg text-white rounded-md hover:bg-[#892be2e1] active:bg-[#892be2c4] active:outline-none active:ring-2 active:ring-[#8A2BE2]"
            >
              Verify
            </button>
          </div>
        </form>
        <div className="text-sm text-slate-500 mt-4">
          Didn't receive code?{" "}
          <button
            className="font-medium text-indigo-500 hover:text-indigo-600"
            onClick={rensendOTP}
          >
            Resend
          </button>
        </div>
      </div>
    </section>
  );
};

export default OTP;
