import React, { useState, useEffect } from "react";
import { Receipt, Stepper } from "../../components";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCarQuoteMutation } from "../../Redux/api/quoteMail";
import { showLoader, hideLoader } from "../../Redux/features/loader";
function Quotecar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sendMail] = useCarQuoteMutation();
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      plantype: "Third Party",
    },
  });
  const stepsConfig = [{ name: "Car Info" }, { name: "Payment" }];
  const [step, setStep] = useState(1);
  const [idvValue, setIdvValue] = useState(171360);
  const [yearsValue, setYearsValue] = useState(1);
  const [price, setPrice] = useState(0);
  const [plan, setPlan] = useState("Third Party");
  const selectedPlan = watch("plantype");
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

  const submit = async (data) => {
    data.premiumAmount = price.toFixed(2);
    data.gst = (price * 0.18).toFixed(2);
    data.totalAmount = (price + price * 0.18).toFixed(2);
    console.log(data);
    try {
      dispatch(showLoader());
      await sendMail(data).unwrap();
      toast.success("Your details have been sent to your email.", {
        autoClose: 1000,
      });
      dispatch(hideLoader());
      navigate("/");
    } catch (err) {
      dispatch(hideLoader());
      toast.error(err?.data?.message || err.error, {
        autoClose: 1000,
      });
    }
  };

  useEffect(() => {
    let calculatedPrice = idvValue * 0.015 * yearsValue;
    if (plan === "Comprehensive") {
      calculatedPrice += 500;
    }
    setPrice(calculatedPrice);
  }, [idvValue, yearsValue, step, plan]);

  return (
    <section className="w-full min-h-[92vh] md:text-xl text-xs  bg-gray-100 justify-center py-6 px-4">
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

            {/* Email*/}

            <div className="flex flex-wrap items-center gap-4 mb-4">
              <label
                className="w-1/4 font-semibold text-gray-700"
                htmlFor="manufacturingDate"
              >
                Email<span className="text-red-500">*</span> :
              </label>
              <input
                type="email"
                {...register("email")}
                placeholder="Enter Your Email"
                className="w-2/3 h-10 p-3 border border-gray-300 rounded-md"
                id="chassisNumber"
              />
            </div>
            {/* Full Name*/}
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <label
                className="w-1/4 font-semibold text-gray-700"
                htmlFor="manufacturingDate"
              >
                Full Name<span className="text-red-500">*</span> :
              </label>
              <input
                type="text"
                {...register("name")}
                placeholder="Enter Your Email"
                className="w-2/3 h-10 p-3 border border-gray-300 rounded-md"
                id="chassisNumber"
              />
            </div>
            {/* Car Number */}
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <label
                className="w-1/4 font-semibold text-gray-700"
                htmlFor="carNumber"
              >
                Car Number<span className="text-red-500">*</span>:
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
                Variant<span className="text-red-500">*</span> :
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
                Fuel<span className="text-red-500">*</span> :
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
          </div>
        )}

        {step === 2 && (
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
                  <span className="text-xm font-medium text-gray-900 mx-1">
                    Third Party
                  </span>
                  <div class="relative md:w-11 w-10 h-6 bg-blue-600 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-4 md:after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  <span className="text-xs font-medium text-gray-900 mx-1">
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
        <div
          className={`w-full flex ${
            step === 1 ? "justify-end" : "justify-between"
          } items-center py-4`}
        >
          {step > 1 && step < 3 && (
            <div
              className="bg-gray-500 p-3 rounded-md text-white font-semibold cursor-pointer hover:bg-gray-600"
              onClick={() => toggle(step - 1)}
            >
              Previous
            </div>
          )}
          {step < 2 ? (
            <div
              className="bg-green-500 p-3 rounded-md text-white font-semibold cursor-pointer hover:bg-green-600"
              onClick={() => toggle(step + 1)}
            >
              Next
            </div>
          ) : step == 2 ? (
            <button
              type="submit"
              className="bg-green-500 p-3 rounded-md text-white font-semibold cursor-pointer hover:bg-green-600"
            >
              Get Info
            </button>
          ) : (
            <div></div>
          )}
        </div>
      </form>
    </section>
  );
}

export default Quotecar;
