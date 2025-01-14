import RentalCardSkeleton from "@/components/cards/RentalCardSkeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Skeleton */}
        <div className="mb-8">
          <div className="h-10 w-1/3 bg-gray-200 rounded animate-pulse mb-4" />
          <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
        </div>

        {/* Filters Skeleton */}
        <div className="h-16 bg-white rounded-lg shadow-sm animate-pulse mb-8" />

        {/* Results Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <RentalCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
