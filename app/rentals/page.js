"use client";

import { useState, useEffect } from "react";
import RentalCard from "@/components/cards/RentalCard";
import RentalFilters from "@/components/filters/RentalFilters";
import RentalCardSkeleton from "@/components/cards/RentalCardSkeleton";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function RentalsPage() {
  const [rentals, setRentals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    min_price: "",
    max_price: "",
    beds: "",
    baths: "",
    project_type: "",
    city: "",
    availability: "true",
  });

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    fetchRentals();
  }, [filters]);

  const fetchRentals = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const queryParams = new URLSearchParams();

      // Only add non-empty filter values to query
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== "" && value !== null && value !== undefined) {
          queryParams.append(key, value);
        }
      });

      const apiUrl = `${
        process.env.NEXT_PUBLIC_API_URL
      }/api/projects/?${queryParams.toString()}`;
      console.log("Fetching from:", apiUrl);

      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        mode: "cors",
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error("Response error:", {
          status: response.status,
          statusText: response.statusText,
          error: errorData,
        });
        throw new Error(
          errorData?.error || `HTTP error! status: ${response.status}`
        );
      }

      const data = await response.json();
      console.log("API Response:", data);

      if (!data || !Array.isArray(data.results)) {
        throw new Error("Invalid data format received from API");
      }

      setRentals(data.results);
    } catch (error) {
      console.error("Error fetching rentals:", error);
      setError(
        error.message || "Failed to load rentals. Please try again later."
      );
      setRentals([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Available Rentals
          </h1>
          <p className="text-gray-600">
            Find your perfect rental home in Texas
          </p>
        </div>

        {/* Filters Section */}
        <RentalFilters filters={filters} setFilters={setFilters} />

        {/* Results Section */}
        <div className="mt-8">
          {error ? (
            <div className="text-center py-12">
              <p className="text-red-600">{error}</p>
              <Button onClick={fetchRentals} className="mt-4" variant="outline">
                Try Again
              </Button>
            </div>
          ) : isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <RentalCardSkeleton key={index} />
              ))}
            </div>
          ) : rentals.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rentals.map((rental) => (
                <RentalCard key={rental.id} rental={rental} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">
                No rentals found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
