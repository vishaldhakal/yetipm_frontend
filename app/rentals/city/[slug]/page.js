"use client";

import { useState, useEffect } from "react";
import RentalCard from "@/components/cards/RentalCard";
import RentalFilters from "@/components/filters/RentalFilters";
import RentalCardSkeleton from "@/components/cards/RentalCardSkeleton";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

export default function CityRentalsPage() {
  const params = useParams();
  const citySlug = params.slug;

  const [rentals, setRentals] = useState([]);
  const [cityInfo, setCityInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    min_price: "",
    max_price: "",
    beds: "",
    baths: "",
    property_type: "",
    availability: "true",
  });

  useEffect(() => {
    fetchCityInfo();
  }, [citySlug]);

  useEffect(() => {
    fetchRentals();
  }, [filters, citySlug]);

  const fetchCityInfo = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/cities/${citySlug}/`
      );
      if (!response.ok) throw new Error("Failed to fetch city information");
      const data = await response.json();
      setCityInfo(data);
    } catch (error) {
      console.error("Error fetching city info:", error);
    }
  };

  const fetchRentals = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const queryParams = new URLSearchParams();

      Object.entries(filters).forEach(([key, value]) => {
        if (value !== "" && value !== null && value !== undefined) {
          queryParams.append(key, value);
        }
      });

      const apiUrl = `${
        process.env.NEXT_PUBLIC_API_URL
      }/api/projects/city/${citySlug}/?${queryParams.toString()}`;

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
        throw new Error(
          errorData?.error || `HTTP error! status: ${response.status}`
        );
      }

      const data = await response.json();
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
            Rentals in {cityInfo?.name || "Loading..."}
          </h1>
          {cityInfo && (
            <p className="text-gray-600 mb-4">{cityInfo.description}</p>
          )}
          <div className="flex items-center text-gray-600">
            <MapPin className="h-5 w-5 mr-2" />
            <span>
              {cityInfo?.name}, {cityInfo?.state?.abbreviation}
            </span>
          </div>
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
                No rentals found in {cityInfo?.name} matching your criteria.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
