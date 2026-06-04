const StudyCardSkeleton = () => {
  return (
    <div className="w-full bg-white border border-gray-100 rounded-4xl p-6 flex flex-col items-center animate-pulse shadow-sm">
      <div className="w-full h-48 bg-gray-50 rounded-2xl mb-6"></div>
      <div className="h-6 w-3/4 bg-gray-200 rounded-full mb-4"></div>
      <div className="h-4 w-1/2 bg-gray-100 rounded-full mb-6"></div>
      <div className="space-y-3 w-full mb-8">
        <div className="h-3 w-full bg-gray-50 rounded-full"></div>
        <div className="h-3 w-5/6 bg-gray-50 rounded-full"></div>
      </div>
      <div className="mt-auto w-full h-12 bg-gray-100 rounded-2xl"></div>
    </div>
  );
};

export default StudyCardSkeleton;
