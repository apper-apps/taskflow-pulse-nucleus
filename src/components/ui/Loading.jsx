import React from "react";

const Loading = () => {
  return (
    <div className="animate-pulse space-y-4">
      {/* Header skeleton */}
      <div className="flex items-center justify-between">
        <div className="h-8 bg-gray-200 rounded-lg w-48"></div>
        <div className="h-10 bg-gray-200 rounded-lg w-32"></div>
      </div>
      
      {/* Filter bar skeleton */}
      <div className="flex gap-3">
        <div className="h-10 bg-gray-200 rounded-full w-20"></div>
        <div className="h-10 bg-gray-200 rounded-full w-24"></div>
        <div className="h-10 bg-gray-200 rounded-full w-28"></div>
      </div>
      
      {/* Task cards skeleton */}
      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map((item) => (
          <div key={item} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-5 h-5 bg-gray-200 rounded-full flex-shrink-0 mt-1"></div>
              <div className="flex-1 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-2 flex-1">
                    <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <div className="h-6 bg-gray-200 rounded-full w-16"></div>
                    <div className="h-6 bg-gray-200 rounded-full w-12"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="h-6 bg-gray-200 rounded-full w-20"></div>
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loading;