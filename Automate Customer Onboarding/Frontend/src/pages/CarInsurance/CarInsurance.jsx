import React, { useState, useEffect } from "react";
import { Receipt, Stepper } from "../../components";
import { useForm } from "react-hook-form";
import { FaRegCircleCheck } from "react-icons/fa6";
import { useApplyCarInsMutation } from "../../Redux/api/carApiSlice";
import { useAddNotifMutation } from "../../Redux/api/userApiSlice";
import { toast } from "react-toastify";
import { login } from "../../Redux/features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { showLoader, hideLoader } from "../../Redux/features/loader";
import { addYears } from "date-fns";
function CarInsurance() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [apply] = useApplyCarInsMutation();
  const [addNotifcation] = useAddNotifMutation();
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      plantype: "Third Party", // Default value for plantype
      email: userInfo.email,
      phone: userInfo.phone || "",
    },
  });
  const stepsConfig = [
    { name: "Car Info" },
    { name: "Contact info" },
    { name: "Nominee Details" },
    { name: "Payment" },
  ];
  const [step, setStep] = useState(1);
  const [idvValue, setIdvValue] = useState(171360);
  const [yearsValue, setYearsValue] = useState(1);
  const [price, setPrice] = useState(0);
  const [plan, setPlan] = useState("Third Party");
  const selectedPlan = watch("plantype");

  const submit = async (data) => {
    dispatch(showLoader());
    const currentDate = new Date();
    const expirationDate = addYears(currentDate, yearsValue);
    const expirationTimestamp = expirationDate.getTime();
    data.payment = (price + price * 0.18).toFixed(2);
    data.expire = expirationTimestamp;
    data.planType = plan;
    data.paid = true;
    console.log(data);

    try {
      console.log("data sending");

      const res = await apply(data).unwrap();
      console.log(res);

      const data1 = {
        email: `${userInfo.email}`,
        notification: {
          subject: "Payment Successful",
          content:
            "Your payment for car insurance has been successfully completed.",
        },
      };
      await addNotifcation(data1).unwrap();
      console.log("addnotif");
      dispatch(
        login({
          ...userInfo,
          notifications: [...userInfo.notifications, data1.notification],
        })
      );
      console.log("addnotif");
      dispatch(hideLoader());
      setStep(step + 1);
      // console.log("moving");
      toast.success("Payment done");
    } catch (err) {
      dispatch(hideLoader());
      toast.error(err?.data?.message || err.error, {
        autoClose: 1000,
      });
    }
  };
  const toggle = async (num) => {
    setStep(num);
  };

  const handleRangeChange = (e) => {
    setIdvValue(e.target.value);
  };

  const handleYearChange = (e) => {
    setYearsValue(e.target.value);
  };

  const handleToggleChange = (e) => {
    const plantype = e.target.checked ? "Comprehensive" : "Third Party";
    setPlan(plantype);
    setValue("plantype", plantype);
  };
  useEffect(() => {
    let calculatedPrice = idvValue * 0.015 * yearsValue;
    if (plan === "Comprehensive") {
      calculatedPrice += 500;
    }
    setPrice(calculatedPrice);
  }, [idvValue, yearsValue, step, plan]);

  return (
    <section className="w-full min-h-[92vh]  bg-gray-100 justify-center py-6 px-4">
      <Stepper step={step} stepsConfig={stepsConfig} />

      <form
        onSubmit={handleSubmit(submit)}
        className="bg-white w-full max-w-3xl mx-auto p-6 rounded-lg shadow-lg hover:shadow-xl"
      >
        {step === 1 && (
          <div>
            <h2 className="text-2xl text-[#563A9C] font-semibold  mb-6 text-center">
              Car Information
            </h2>
            <p className="w-full text-left text-gray-400 py-2">
              All information as per the RC book.
            </p>

            {/* Car Number */}
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <label
                className="w-1/4 font-semibold text-gray-700"
                htmlFor="carNumber"
              >
                Car Number:
              </label>
              <input
                type="text"
                {...register("carNumber")}
                className="w-2/3 h-10 p-3 border border-gray-300 rounded-md"
                id="carNumber"
                placeholder="Enter your car number"
              />
            </div>

            {/* Variant */}
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <label
                className="w-1/4 font-semibold text-gray-700"
                htmlFor="carVariant"
              >
                Variant:
              </label>
              <input
                type="text"
                {...register("carVariant")}
                className="w-2/3 h-10 p-3 border border-gray-300 rounded-md"
                id="carVariant"
                placeholder="Enter car variant"
              />
            </div>

            {/* Fuel */}
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <label
                className="w-1/4 font-semibold text-gray-700"
                htmlFor="fuel"
              >
                Fuel:
              </label>
              <select
                id="fuel"
                {...register("fuel")}
                className="w-2/3 h-10 p-1 border border-gray-300 rounded-md"
              >
                <option value="">Select</option>
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
              </select>
            </div>

            {/* Registration Date */}
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <label
                className="w-1/4 font-semibold text-gray-700"
                htmlFor="registrationDate"
              >
                Registration Date:
              </label>
              <input
                type="date"
                {...register("registrationDate")}
                className="w-2/3 h-10 p-3 border border-gray-300 rounded-md"
                id="registrationDate"
              />
            </div>

            {/* Manufacturing Date */}
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <label
                className="w-1/4 font-semibold text-gray-700"
                htmlFor="manufacturingDate"
              >
                Manufacturing Date:
              </label>
              <input
                type="date"
                {...register("manufacturingDate")}
                className="w-2/3 h-10 p-3 border border-gray-300 rounded-md"
                id="manufacturingDate"
              />
            </div>

            <div className="flex flex-wrap items-center gap-4 mb-4">
              <label
                className="w-1/4 font-semibold text-gray-700"
                htmlFor="manufacturingDate"
              >
                Engine Number:
              </label>
              <input
                type="text"
                {...register("engineNumber")}
                className="w-2/3 h-10 p-3 border border-gray-300 rounded-md"
                id="engineNumber"
              />
            </div>
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <label
                className="w-1/4 font-semibold text-gray-700"
                htmlFor="manufacturingDate"
              >
                Chassis Number:
              </label>
              <input
                type="text"
                {...register("chassisNumber")}
                className="w-2/3 h-10 p-3 border border-gray-300 rounded-md"
                id="chassisNumber"
              />
            </div>
          </div>
        )}
        {step === 2 && (
          <div>
            <h2 className="text-2xl text-[#563A9C] font-semibold mb-6 text-center">
              Contact Information
            </h2>

            {/* Full Name */}
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <label
                className="w-1/4 font-semibold text-gray-700"
                htmlFor="ownerName"
              >
                Full Name:
              </label>
              <input
                type="text"
                {...register("ownerName")}
                className="w-2/3 h-10 p-3 border border-gray-300 rounded-md"
                id="ownerName"
                placeholder="Enter your full name"
              />
            </div>

            {/* Gender Selection */}
            <div className="flex justify-start gap-4 mb-4">
              <h3 className="w-1/4 text-left font-semibold text-gray-700">
                Select Gender:
              </h3>
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

            {/* Phone Number */}
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <label
                className="w-1/4 font-semibold text-gray-700"
                htmlFor="Phone"
              >
                Phone Number:
              </label>
              <input
                type="text"
                {...register("phone")}
                className="w-2/3 h-10 p-3 border border-gray-300 rounded-md"
                id="Phone"
                placeholder="Enter your phone number"
              />
            </div>

            {/* Email Address */}
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <label
                className="w-1/4 font-semibold text-gray-700"
                htmlFor="email"
              >
                Email:
              </label>
              <input
                type="email"
                {...register("email")}
                className="w-2/3 h-10 p-3 border border-gray-300 rounded-md"
                id="email"
                placeholder="Enter your email address"
              />
            </div>
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <label
                className="w-1/4 font-semibold text-gray-700"
                htmlFor="ownerName"
              >
                PAN number:
              </label>
              <input
                type="text"
                {...register("pan")}
                className="w-2/3 h-10 p-3 border border-gray-300 rounded-md"
                id="ownerName"
                placeholder="Enter your full name"
              />
            </div>

            {/* Phone Number */}
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <label
                className="w-1/4 font-semibold text-gray-700"
                htmlFor="Phone"
              >
                DOB:
              </label>
              <input
                type="Date"
                {...register("DOB")}
                className="w-2/3 h-10 p-3 border border-gray-300 rounded-md"
                id="Phone"
                placeholder="Enter your phone number"
              />
            </div>
          </div>
        )}
        {step === 3 && (
          <div>
            <h2 className="text-2xl text-[#563A9C] font-semibold mb-6 text-center">
              Nominee Details
            </h2>
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <label
                className="w-1/4 font-semibold text-gray-700"
                htmlFor="nomineName"
              >
                Nominee Name:
              </label>
              <input
                type="text"
                {...register("nomineName")}
                className="w-2/3 h-10 p-3 border border-gray-300 rounded-md"
                id="nomineName"
              />
            </div>
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <label
                className="w-1/4 font-semibold text-gray-700"
                htmlFor="years"
              >
                Relation with Owner:
              </label>
              <select
                id="relation"
                {...register("relation")}
                className="w-2/3 h-10 p-1 border border-gray-300 rounded-md"
              >
                <option value="">Select</option>
                <option value="Father">Father</option>
                <option value="Mother">Mother</option>
                <option value="Brother">Brother</option>
                <option value="Wife">Wife</option>
                <option value="Sister">Sister</option>
              </select>
            </div>
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <label
                className="w-1/4 font-semibold text-gray-700"
                htmlFor="age"
              >
                Age:
              </label>
              <input
                type="Number"
                {...register("age")}
                className="w-2/3 h-10 p-3 border border-gray-300 rounded-md"
                id="age"
              />
            </div>
          </div>
        )}
        {step === 4 && (
          <div>
            <h2 className="text-2xl text-[#563A9C] font-semibold mb-6 text-center">
              Payment Details
            </h2>

            <div className="flex flex-wrap items-center gap-4 mb-4">
              {/* Label for Plan Type */}
              <label
                className="w-1/4 font-semibold text-gray-700"
                htmlFor="planType"
              >
                Plan Type:
              </label>

              {/* Toggle Switch for Plan Type */}
              <div className="flex items-center w-2/3">
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    value=""
                    className="sr-only peer"
                    onChange={handleToggleChange} // Handle toggle change
                    defaultChecked={selectedPlan === "Comprehensive"} // Set default state based on the plantype value
                    id="planType"
                  />
                  <span className="text-sm font-medium text-gray-900 mx-1">
                    Third Party
                  </span>
                  <div class="relative w-11 h-6 bg-blue-600 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  <span className="text-sm font-medium text-gray-900 mx-1">
                    Comprehensive
                  </span>
                </label>
              </div>
            </div>

            {/* IDV Range */}
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <label
                className="w-1/4 font-semibold text-gray-700"
                htmlFor="idv"
              >
                IDV <span className="text-xs">(Insured Declared Value):</span>
              </label>
              <div className="flex flex-wrap items-center w-2/3">
                <input
                  type="range"
                  {...register("idv")}
                  min={171360}
                  max={407138}
                  value={idvValue}
                  onChange={handleRangeChange}
                  className="w-3/4 h-2 bg-gray-300 rounded-lg"
                  id="idv"
                />
                <span className="ml-4 text-gray-600">{idvValue}</span>
              </div>
            </div>

            {/* Select Plan */}
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <label
                className="w-1/4 font-semibold text-gray-700"
                htmlFor="years"
              >
                Select Plan:
              </label>
              <select
                id="years"
                {...register("years")}
                value={yearsValue}
                onChange={handleYearChange}
                className="w-2/3 h-10 p-1 border border-gray-300 rounded-md"
              >
                <option value="1">1 Year</option>
                <option value="2">2 Years</option>
                <option value="3">3 Years</option>
              </select>
            </div>

            {/* Premium Amount */}
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <label
                className="w-1/4 font-semibold text-gray-700"
                htmlFor="payment"
              >
                Premium Amount:
              </label>
              <input
                type="Number"
                value={price.toFixed(2)}
                className="w-2/3 h-10 p-3 border border-gray-300 rounded-md"
                id="payment"
                readOnly
              />
            </div>

            {/* Payment Summary */}
            <div className="w-full p-4 rounded-md bg-purple-700 text-white flex flex-col space-y-4">
              <div className="flex justify-between items-center">
                <label className="font-semibold text-lg">Plan Type:</label>
                <p className="text-lg">{plan}</p>
              </div>
              <div className="flex justify-between items-center">
                <label className="font-semibold text-lg">IDV Cover:</label>
                <p className="text-lg">{idvValue}</p>
              </div>
              <div className="flex justify-between items-center">
                <label className="font-semibold text-lg">Premium Amount:</label>
                <p className="text-lg">{price.toFixed(2)}</p>
              </div>
              <div className="flex justify-between items-center">
                <label className="font-semibold text-lg">GST @18%:</label>
                <p className="text-lg">{(price * 0.18).toFixed(2)}</p>
              </div>

              <hr className="border-t border-gray-400" />
              <div className="flex justify-between items-center font-semibold text-xl">
                <label>You'll Pay:</label>
                <p>{(price + price * 0.18).toFixed(2)}</p>
              </div>
              <hr className="border-t border-gray-400" />
            </div>
          </div>
        )}
        {step >= 5 && (
          <div>
            <div className="w-full p-2 bg-purple-600 flex flex-col gap-3 justify-center items-center rounded-md">
              <FaRegCircleCheck size={100} className="text-green-500" />
              <p className="font-semibold text-xl text-white">
                Payment Successful
              </p>
            </div>

            <Receipt
              plan={plan}
              idv={idvValue}
              premiumAmount={price.toFixed(2)}
              totalAmount={(price + price * 0.18).toFixed(2)}
              gstAmount={(price * 0.18).toFixed(2)}
            />
          </div>
        )}

        <div
          className={`w-full flex ${
            step === 1 ? "justify-end" : "justify-between"
          } items-center py-4`}
        >
          {step > 1 && step < 5 && (
            <div
              className="bg-gray-500 p-3 rounded-md text-white font-semibold cursor-pointer hover:bg-gray-600"
              onClick={() => toggle(step - 1)}
            >
              Previous
            </div>
          )}
          {step === 4 ? (
            <button
              type="submit"
              className="bg-gradient-to-r from-[#8A2BE2] to-[#A100D6] p-3 rounded-md text-xl text-white font-semibold hover:bg-[#892be2e1] cursor-pointer"
            >
              Pay Securely
            </button>
          ) : step < 5 ? (
            <div
              className="bg-green-500 p-3 rounded-md text-white font-semibold cursor-pointer hover:bg-green-600"
              onClick={() => toggle(step + 1)}
            >
              Next
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </form>
    </section>
  );
}

export default CarInsurance;
