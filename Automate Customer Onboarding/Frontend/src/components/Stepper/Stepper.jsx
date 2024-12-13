import { useEffect, useRef, useState } from "react";

const Stepper = ({ step = 1, stepsConfig = [] }) => {
  const [currentStep, setCurrentStep] = useState(step); // Set the initial state based on the prop
  const [isComplete, setIsComplete] = useState(false);
  const [margins, setMargins] = useState({
    marginLeft: 0,
    marginRight: 0,
  });
  const stepRef = useRef([]);

  useEffect(() => {
    setCurrentStep(step); // Update currentStep whenever the parent `step` prop changes
    if (step === stepsConfig.length + 1) {
      setIsComplete(true);
    }
    if (
      stepsConfig.length > 0 &&
      stepRef.current.length === stepsConfig.length
    ) {
      // Ensure that refs are set before accessing the offsetWidth
      const firstStepWidth = stepRef.current[0]?.offsetWidth || 0;
      const lastStepWidth =
        stepRef.current[stepsConfig.length - 1]?.offsetWidth || 0;

      setMargins({
        marginLeft: firstStepWidth / 2,
        marginRight: lastStepWidth / 2,
      });
    }
  }, [stepsConfig.length + 1, step]); // Make sure this hook runs when `step` prop changes

  if (!stepsConfig.length) {
    return <></>;
  }

  const calculateProgressBarWidth = () => {
    return Math.min(((currentStep - 1) / (stepsConfig.length - 1)) * 100, 100);
  };

  return (
    <div className="relative flex justify-between items-center mb-5 md:mx-20 max-10">
      {stepsConfig.map((step, index) => {
        return (
          <div
            key={step.name}
            ref={(el) => (stepRef.current[index] = el)}
            className={`flex flex-col items-center ${
              currentStep > index + 1 || isComplete ? "text-green-500" : ""
            } ${currentStep === index + 1 ? "text-blue-500" : ""} z-30`}
          >
            <div
              className={`w-9 h-9 rounded-full flex justify-center items-center mb-1 ${
                currentStep === index + 1 && !isComplete
                  ? "bg-blue-600 text-white"
                  : currentStep > index + 1 || isComplete
                  ? "bg-green-500 text-white"
                  : "bg-gray-300"
              } `}
            >
              {currentStep > index + 1 || isComplete ? (
                <span>&#10003;</span>
              ) : (
                index + 1
              )}
            </div>
            <div className="text-sm">{step.name}</div>
          </div>
        );
      })}

      <div
        className="absolute top-1/4 left-0 h-1 bg-gray-300"
        style={{
          width: `calc(100% - ${margins.marginLeft + margins.marginRight}px)`,
          marginLeft: margins.marginLeft,
          marginRight: margins.marginRight,
        }}
      >
        <div
          className="h-full bg-green-500 transition-all duration-200"
          style={{ width: `${calculateProgressBarWidth()}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Stepper;
