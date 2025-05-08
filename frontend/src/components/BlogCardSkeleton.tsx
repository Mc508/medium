export const BlogCardSkeleton = () => {
  return (
    <div className="flex flex-col justify-center mt-2 p-2 border-b-2 border-gray-200 animate-pulse">
      <div className="flex gap-4 items-center">
        <div className="w-6 h-6 bg-gray-300 rounded-full" />
        <div className="w-24 h-4 bg-gray-300 rounded" />
        <div className="w-16 h-4 bg-gray-200 rounded" />
      </div>
      <div className="mt-4 mb-2">
        <div className="w-3/4 h-6 bg-gray-300 rounded mb-2" />
        <div className="w-full h-4 bg-gray-200 rounded mb-1" />
        <div className="w-5/6 h-4 bg-gray-200 rounded" />
      </div>
      <div className="w-16 h-3 bg-gray-200 rounded" />
    </div>
  );
};
