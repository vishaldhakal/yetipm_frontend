"use client";

import { Heart, Share2, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useState } from "react";

export default function PropertyListingHeroSection({ rentalDetail }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === rentalDetail.images.length - 1 ? 0 : prev + 1
    );
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? rentalDetail.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Search</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{rentalDetail.project_address}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex gap-3">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Share2 className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Heart className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Image carousel */}
      <div className="relative aspect-[16/9] mb-6">
        <Image
          src={rentalDetail.images[currentImageIndex].image}
          alt={`Property image ${currentImageIndex + 1}`}
          fill
          className="rounded-lg object-cover"
        />
        <button
          onClick={previousImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full shadow-lg"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full shadow-lg"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
        <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/70 text-white rounded-full text-sm">
          {currentImageIndex + 1} of {rentalDetail.images.length}
        </div>
      </div>

      {/* Property details */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6">
        <div className="space-y-2">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-semibold">
              ${rentalDetail.price}
            </span>
            <span className="text-gray-600">/mo rent</span>
          </div>
          <div className="flex items-center gap-4 text-gray-600">
            <div className="flex items-center gap-1">
              <span className="font-semibold">{rentalDetail.bedrooms}</span> bed
            </div>
            <div className="flex items-center gap-1">
              <span className="font-semibold">{rentalDetail.bathrooms}</span>{" "}
              bath
            </div>
            <div className="flex items-center gap-1">
              <span className="font-semibold">
                {rentalDetail.area_square_footage}
              </span>{" "}
              sqft
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-right">
            <div>Available</div>
            <div className="font-semibold">
              {new Date(rentalDetail.avialable_date).toLocaleDateString(
                "en-US",
                {
                  month: "long",
                  day: "numeric",
                }
              )}
            </div>
          </div>
          <Button className="bg-green-700 hover:bg-green-800 text-white px-8">
            Apply now
          </Button>
        </div>
      </div>
    </div>
  );
}
