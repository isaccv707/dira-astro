import React from 'react'

const ReviewCardSkeleton = () => {
    return (
        <figure className="max-w-screen-md animate-pulse">
            <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-5 h-5 bg-grey/40 rounded-full"></div>
                ))}
            </div>

            <div className="space-y-3">
                <div className="h-6 bg-grey/40 rounded-md w-full"></div>
                <div className="h-6 bg-grey/40 rounded-md w-3/4"></div>
            </div>

            <figcaption className="flex items-center mt-6 space-x-3">
                <div className="w-8 h-8 rounded-full bg-grey/40"></div>
                <div className="flex items-center divide-x divide-grey/40">
                    <div className="h-4 bg-grey/40 rounded w-24 pe-3"></div>
                    <div className="h-4 bg-grey/40 rounded w-16 ps-3"></div>
                </div>
            </figcaption>
        </figure>
    )
}

export default ReviewCardSkeleton
