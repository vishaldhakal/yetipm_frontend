export default function RentalCardSkeleton() {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm">
      <div className="animate-pulse">
        <div className="h-[240px] bg-gray-200" />
        <div className="p-4">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-2" />
          <div className="h-4 bg-gray-200 rounded w-2/3 mb-3" />
          <div className="h-5 bg-gray-200 rounded w-3/4 mb-3" />
          <div className="flex justify-between">
            <div className="h-4 bg-gray-200 rounded w-16" />
            <div className="h-4 bg-gray-200 rounded w-16" />
            <div className="h-4 bg-gray-200 rounded w-16" />
          </div>
        </div>
      </div>
    </div>
  );
}
