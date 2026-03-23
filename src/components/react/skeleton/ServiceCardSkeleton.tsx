const ServiceCardSkeleton = () => (
    <div className="max-w-sm w-full bg-white border border-gray-200 rounded-2xl shadow-md p-6 flex flex-col items-center text-center animate-pulse">
        <div className="w-16 h-16 rounded-full bg-gray-200 mb-4" />

        <div className="h-6 bg-gray-200 rounded-md w-3/4 mb-4" />

        {/* Description placeholder */}
        <div className="w-full space-y-2 mb-8">
            <div className="h-3 bg-gray-200 rounded-md w-full" />
            <div className="h-3 bg-gray-200 rounded-md w-11/12 mx-auto" />
            <div className="h-3 bg-gray-200 rounded-md w-4/5 mx-auto" />
        </div>

        <div className="mt-auto w-full flex gap-3 items-center justify-center">
            <div className="h-9 bg-gray-200 rounded-lg w-28" />
            <div className="h-9 bg-gray-200 rounded-lg w-28" />
        </div>
    </div>
);

export default ServiceCardSkeleton;