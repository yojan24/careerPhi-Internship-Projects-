import React, { useState, useEffect } from "react";
import { Receipt, Stepper } from "../../components";
import { useForm, Controller } from "react-hook-form";
import { FaRegCircleCheck } from "react-icons/fa6";
import { useAddNotifMutation } from "../../Redux/api/userApiSlice";
import { useApplyHealthInsMutation } from "../../Redux/api/healthApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../Redux/features/authSlice";
import { toast } from "react-toastify";
import { showLoader, hideLoader } from "../../Redux/features/loader";
import { addYears } from "date-fns";

function HealthInsurance() {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [addnotification] = useAddNotifMutation();
  const [apply] = useApplyHealthInsMutation();
  const [step, setStep] = useState(1);

  // Setting default values for idv and years
  const { register, handleSubmit, watch, control, setValue } = useForm({
    defaultValues: {
      idv: "200000", // default IDV value
      years: "1", // default years value
      email: userInfo.email,
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

  const submit = async (data) => {
    dispatch(showLoader());
    const currentDate = new Date();
    const expirationDate = addYears(currentDate, data.years); // Adds years safely
    const expirationTimestamp = expirationDate.getTime();
    const disease = Object.keys(data.medicalHistory).filter(
      (disease) => data.medicalHistory[disease] === true
    );
    delete data.medicalHistory;
    data.expire = expirationTimestamp;
    data.disease = disease;
    data.paid = true;
    data.payment = total;

    try {
      const res = await apply(data).unwrap();
      console.log("data store");
      const data1 = {
        email: `${userInfo.email}`,
        notification: {
          subject: "Payment Successful",
          content:
            "Your payment for Health insurance has been successfully completed.",
        },
      };
      await addnotification(data1).unwrap();
      console.log("addnotif");
      dispatch(
        login({
          ...userInfo,
          notifications: [...userInfo.notifications, data1.notification],
        })
      );
      dispatch(hideLoader());
      setStep(step + 1);

      toast.success("payment done");
    } catch (err) {
      dispatch(hideLoader());
      toast.error(err?.data?.message || err.error, {
        autoClose: 1000,
      });
    }
  };

  const stepsConfig = [
    { name: "Person Info" },
    { name: "Medical History" },
    { name: "Payment" },
  ];

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
              Insure Information
            </h2>
            <div className="flex flex-wrap items-center gap-4 py-2">
              <label className="w-1/4 font-semibold text-gray-700">
                Select Insured:
              </label>
              <select
                {...register("insurer")}
                className="w-2/3 h-10 p-1 border border-gray-300 rounded-md"
              >
                <option value="">Select</option>
                <option value="Self">Self</option>
                <option value="Son">Son</option>
                <option value="Daughter">Daughter</option>
                <option value="Wife">Wife</option>
                <option value="Father">Father</option>
                <option value="Mother">Mother</option>
              </select>
            </div>
            <div className="flex justify-start gap-4 py-2">
              <h3 className="w-1/4 text-left font-semibold text-gray-700">
                Select Gender:
              </h3>
              <div className="flex items-center space-x-2 py-2">
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
            <div className="flex flex-wrap items-center gap-4 mb-2 py-2">
              <label className="w-1/4 font-semibold text-gray-700">
                Insurer Age:
              </label>
              <select
                {...register("age")}
                className="w-2/3 h-10 p-1 border border-gray-300 rounded-md "
              >
                {Array.from({ length: 100 - 18 + 1 }, (_, i) => i + 18).map(
                  (age) => (
                    <option key={age} value={age}>
                      {age}
                    </option>
                  )
                )}
              </select>
            </div>
            <div className="flex flex-wrap items-center gap-4 mb-2 py-2">
              <label className="w-1/4 font-semibold text-gray-700">City:</label>
              <select
                {...register("city")}
                className="w-2/3 h-10 p-1 border border-gray-300 rounded-md "
              >
                <option value="mumbai">Mumbai</option>
                <option value="hyderabad">Hyderabad</option>
                <option value="delhi">Delhi</option>
                <option value="pune">Pune</option>
                <option value="bengaluru">Bengaluru</option>
              </select>
            </div>
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <label
                className="w-1/4 font-semibold text-gray-700"
                htmlFor="ownerName"
              >
                Full Name:
              </label>
              <input
                type="text"
                {...register("insurerName")}
                className="w-2/3 h-10 p-3 border border-gray-300 rounded-md"
                id="ownerName"
                placeholder="Enter Insurer name"
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-2xl text-[#563A9C] font-semibold mb-6 text-center">
              Medical History
            </h2>
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
        {step === 3 && (
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
        {step >= 4 && (
          <div>
            {" "}
            <div className="w-full p-2 bg-purple-600 flex flex-col gap-3 justify-center items-center rounded-md">
              <FaRegCircleCheck size={100} className="text-green-500" />
              <p className="font-semibold text-xl text-white">
                Payment Successful
              </p>
            </div>
            <Receipt
              idv={idv}
              premiumAmount={premium}
              gstAmount={gst}
              totalAmount={total}
            />
          </div>
        )}
        {step === 3 && <div></div>}
        <div
          className={`w-full flex ${
            step === 1 ? "justify-end" : "justify-between"
          } items-center py-4`}
        >
          {step > 1 && step < 4 && (
            <div
              className="bg-gray-500 p-3 rounded-md text-white font-semibold cursor-pointer hover:bg-gray-600"
              onClick={() => toggle(step - 1)}
            >
              Previous
            </div>
          )}
          {step === 3 ? (
            <button
              type="submit"
              className="bg-gradient-to-r from-[#8A2BE2] to-[#A100D6] p-3 rounded-md text-xl text-white font-semibold hover:bg-[#892be2e1] cursor-pointer"
            >
              Pay Securely
            </button>
          ) : step < 3 ? (
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

export default HealthInsurance;
