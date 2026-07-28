interface StepIndicatorProps {
    currentStep: number;
    steps: string[]
}

const StepIndicator = ({ currentStep, steps }: StepIndicatorProps) => {
  return (
    <div className="flex items-center justify-center gap-2 my-4 sm:gap-4 sm:my-6">
      {steps.map((label, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === currentStep;
        const isCompleted = stepNumber < currentStep;

        return (
          <div key={index} className="flex items-center">
            <div
              className={`flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 text-xs sm:text-sm font-bold transition-all duration-300 ${
                isCompleted
                  ? "bg-green-primary border-green-primary text-white"
                  : isActive
                  ? "bg-white border-green-secondary text-green-primary"
                  : "bg-ui-bg border-ui-border text-grey-custom"
              }`}
            >
              {isCompleted ? "✓" : stepNumber}
            </div>

            <span
              className={`ml-2 text-xs sm:text-sm font-medium ${
                isActive ? "text-green-primary" : "text-grey-custom"
              }`}
            >
              {label}
            </span>

            {index < steps.length - 1 && (
              <div
                className={`w-6 sm:w-10 h-0.5 mx-2 transition-all duration-300 ${
                  isCompleted ? "bg-green-primary" : "bg-ui-border"
                }`}
              ></div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StepIndicator;
