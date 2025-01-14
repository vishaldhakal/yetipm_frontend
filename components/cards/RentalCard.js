import Link from "next/link";
import Image from "next/image";
import { BedDouble, Bath, Maximize2, MapPin } from "lucide-react";

export default function RentalCard({ rental }) {
  return (
    <div className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
      <Link href={`/rentals/${rental.slug}`}>
        <div className="relative">
          {/* Featured Tag */}
          <div className="absolute top-4 left-4 z-10 flex gap-2">
            <span className="px-3 py-1 text-xs font-medium bg-[#0B3B2C] text-white rounded-full">
              FOR RENT
            </span>
            {rental.featured && (
              <span className="px-3 py-1 text-xs font-medium bg-[#F3C577] text-[#0B3B2C] rounded-full">
                FEATURED
              </span>
            )}
          </div>

          {/* Main Image */}
          <div className="relative h-[240px] overflow-hidden">
            <Image
              src={rental.images[0]?.image || "/placeholder-rental.jpg"}
              alt={rental.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>

          {/* Content */}
          <div className="p-4">
            {/* Price */}
            <div className="text-2xl font-bold text-[#0B3B2C] mb-2">
              ${Number(rental.price).toLocaleString()}/month
            </div>

            {/* Location */}
            <div className="flex items-center text-gray-600 mb-3">
              <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
              <span className="text-sm truncate">{rental.project_address}</span>
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              {rental.name}
            </h3>

            {/* Features */}
            <div className="flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center">
                <BedDouble className="h-4 w-4 mr-1" />
                <span>{rental.bedrooms} Beds</span>
              </div>
              <div className="flex items-center">
                <Bath className="h-4 w-4 mr-1" />
                <span>{rental.bathrooms} Baths</span>
              </div>
              <div className="flex items-center">
                <Maximize2 className="h-4 w-4 mr-1" />
                <span>{rental.area_square_footage} sqft</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
