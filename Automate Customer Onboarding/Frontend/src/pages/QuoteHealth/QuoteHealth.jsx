import React, { useState, useEffect } from "react";
import { Receipt, Stepper } from "../../components";
import { useForm, Controller } from "react-hook-form";
import { useHealthQuoteMutation } from "../../Redux/api/quoteMail";
import { toast } from "react-toastify";
import { showLoader, hideLoader } from "../../Redux/features/loader";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
function QuoteHealth() {
  const [step, setStep] = useState(1);
  const [sendMail] = useHealthQuoteMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Setting default values for idv and years
  const { register, handleSubmit, watch, control, setValue } = useForm({
    defaultValues: {
      idv: "200000", // default IDV value
      years: "1", // default years value
    },
  });

  const idv = watch("idv");
  const years = watch("years");

  const [premium, setPremium] = useState(0);
  const [gst, setGST] = useState(0);
  const [total, setTotal] = useState(0);

  const toggle = (num) => {
    setStep(num);
  };

  const stepsConfig = [{ name: "Medical History" }, { name: "Payment" }];

  // Calculate base premium
  const calculatePremium = (idv, years) => {
    let basePremium = 0;
    if (idv === "200000") basePremium = 5000; // ₹2,00,000 IDV
    if (idv === "700000") basePremium = 10000; // ₹7,00,000 IDV
    if (idv === "1000000") basePremium = 25000; // ₹10,00,000 IDV
    return basePremium * years; // Multiply by years
  };

  // Calculate GST (18%)
  const calculateGST = (idv, years) => {
    const premium = calculatePremium(idv, years);
    return (premium * 0.18).toFixed(2); // 18% GST
  };

  // Calculate Total Payment (Premium + GST)
  const calculateTotal = (idv, years) => {
    const premium = calculatePremium(idv, years);
    const gst = calculateGST(idv, years);
    return (premium + parseFloat(gst)).toFixed(2);
  };

  const submit = async (data) => {
    const disease = Object.keys(data.medicalHistory).filter(
      (disease) => data.medicalHistory[disease] === true
    );
    delete data.medicalHistory;
    data.disease = disease;
    data.premiumAmount = String(premium);
    data.totalAmount = total;
    data.gst = gst;
    try {
      dispatch(showLoader());
      await sendMail(data).unwrap();
      toast.success("Your details have been sent to your email.", {
        autoClose: 1000,
      });
      navigate("/");
      dispatch(hideLoader());
    } catch (err) {
      dispatch(hideLoader());
      toast.error(err?.data?.message || err.error, {
        autoClose: 1000,
      });
    }
  };

  // Update the premium, GST, and total when form data changes
  useEffect(() => {
    if (idv && years) {
      setPremium(calculatePremium(idv, years));
      setGST(calculateGST(idv, years));
      setTotal(calculateTotal(idv, years));
    }
  }, [idv, years]); // Dependency on IDV and years
  return (
    <section className="w-full min-h-[92vh] bg-gray-100 justify-center py-6 px-4">
      <Stepper step={step} stepsConfig={stepsConfig} />
      <form
        onSubmit={handleSubmit(submit)}
        className="bg-white w-full max-w-3xl mx-auto p-6 rounded-lg shadow-lg hover:shadow-xl"
      >
        {step === 1 && (
          <div>
            <h2 className="text-2xl text-[#563A9C] font-semibold mb-6 text-center">
              Medical History
            </h2>
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <label
                className="w-1/4 font-semibold text-gray-700"
                htmlFor="carNumber"
              >
                Full Name<span className="text-red-500">*</span>:
              </label>
              <input
                type="text"
                {...register("name")}
                className="w-2/3 h-10 p-3 border border-gray-300 rounded-md"
                id="carNumber"
                placeholder="Enter Your Full Name"
              />
            </div>
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <label
                className="w-1/4 font-semibold text-gray-700"
                htmlFor="carNumber"
              >
                Email<span className="text-red-500">*</span>:
              </label>
              <input
                type="email"
                {...register("email")}
                className="w-2/3 h-10 p-3 border border-gray-300 rounded-md"
                id="carNumber"
                placeholder="Enter Your Eamil"
              />
            </div>
            <p className="w-full text-center font-bold">
              Does the insurer have any existing illnesses for which they take
              regular medication?
            </p>
            <div className="w-full flex justify-center pt-2">
              <div className="w-1/2 grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Diabetes",
                  "Blood Pressure",
                  "Heart disease",
                  "Any Surgery",
                  "Thyroid",
                  "Asthma",
                  "Other disease",
                  "None of these",
                ].map((disease, index) => (
                  <div
                    key={index}
                    className={`flex items-center border-2 p-2 rounded-md ${
                      // Move field.value check here to ensure it reflects checkbox state
                      control._formValues?.medicalHistory?.[disease]
                        ? "border-purple-500"
                        : "border-gray-300"
                    }`}
                  >
                    <Controller
                      name={`medicalHistory.${disease}`}
                      control={control}
                      render={({ field }) => (
                        <label
                          className={`flex items-center space-x-2 cursor-pointer justify-center rounded-md  ${
                            field.value ? " text-purple-500" : " text-gray-500"
                          }`}
                        >
                          <input
                            type="checkbox"
                            {...field}
                            className="w-4 h-4 border-gray-500 rounded "
                          />
                          <span>{disease}</span>
                        </label>
                      )}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {step === 2 && (
          <div>
            <h2 className="text-2xl text-[#563A9C] font-semibold mb-6 text-center">
              Select Plan and Payment Summary
            </h2>

            {/* Select IDV (Insured Declared Value) */}
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <label className="w-1/4 font-semibold text-gray-700">
                Select IDV:
              </label>
              <select
                {...register("idv")}
                className="w-2/3 h-10 p-1 border border-gray-300 rounded-md"
              >
                <option value={200000}>₹2,00,000</option>
                <option value={700000}>₹7,00,000</option>
                <option value={1000000}>₹10,00,000</option>
              </select>
            </div>

            {/* Select Year Plan */}
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <label className="w-1/4 font-semibold text-gray-700">
                Select Year Plan:
              </label>
              <select
                {...register("years")}
                className="w-2/3 h-10 p-1 border border-gray-300 rounded-md"
              >
                <option value={1}>1 Year</option>
                <option value={2}>2 Years</option>
                <option value={3}>3 Years</option>
              </select>
            </div>

            {/* Calculate and Display Premium along with GST */}
            <div className="w-full p-4 rounded-md bg-purple-700 text-white flex flex-col space-y-4">
              <div className="flex justify-between items-center">
                <label className="font-semibold text-lg">Selected Plan:</label>
                <p className="text-lg">{`₹${idv}`}</p>
              </div>
              <div className="flex justify-between items-center">
                <label className="font-semibold text-lg">
                  Premium (for {years} year(s)):
                </label>
                <p className="text-lg">{`₹${premium}`}</p>
              </div>
              <div className="flex justify-between items-center">
                <label className="font-semibold text-lg">GST (18%):</label>
                <p className="text-lg">{`₹${gst}`}</p>
              </div>
              <div className="flex justify-between items-center border-t pt-4">
                <label className="font-semibold text-lg">Total Payment:</label>
                <p className="text-lg">{`₹${total}`}</p>
              </div>
            </div>
          </div>
        )}

        <div
          className={`w-full flex ${
            step === 1 ? "justify-end" : "justify-between"
          } items-center py-4`}
        >
          {step > 1 && step <= 2 && (
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

export default QuoteHealth;
