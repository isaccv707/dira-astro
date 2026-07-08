const StudyCardSkeleton = () => {
  return (
    <div className="w-full bg-white border border-ui-border rounded-clinical-lg p-6 flex flex-col items-center animate-pulse shadow-xs">
      <div className="w-full h-48 bg-ui-bg rounded-clinical-md mb-6"></div>
      <div className="h-6 w-3/4 bg-ui-border rounded-full mb-4"></div>
      <div className="h-4 w-1/2 bg-ui-border rounded-full mb-6"></div>
      <div className="space-y-3 w-full mb-8">
        <div className="h-3 w-full bg-ui-bg rounded-full"></div>
        <div className="h-3 w-5/6 bg-ui-bg rounded-full"></div>
      </div>
      <div className="mt-auto w-full h-12 bg-ui-border rounded-clinical-md"></div>
    </div>
  );
};

export default StudyCardSkeleton;
