interface StepIndicatorProps {
    currentStep: number;
    steps: string[]
}

const StepIndicator = ({ currentStep, steps }: StepIndicatorProps) => {
  return (
    <div className="flex items-center justify-center gap-4 my-6">
      {steps.map((label, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === currentStep;
        const isCompleted = stepNumber < currentStep;

        return (
          <div key={index} className="flex items-center">
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full border-2 text-sm font-bold transition-all duration-300 ${
                isCompleted
                  ? "bg-green-primary border-green-primary text-white"
                  : isActive
                  ? "bg-white border-green-primary text-green-primary"
                  : "bg-gray-200 border-gray-300 text-gray-500"
              }`}
            >
              {isCompleted ? "✓" : stepNumber}
            </div>

            
            <span
              className={`ml-2 text-sm font-medium ${
                isActive ? "text-green-primary" : "text-gray-500"
              }`}
            >
              {label}
            </span>

            
            {index < steps.length - 1 && (
              <div
                className={`w-10 h-0.5 mx-2 transition-all duration-300 ${
                  isCompleted ? "bg-green-primary" : "bg-gray-300"
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
