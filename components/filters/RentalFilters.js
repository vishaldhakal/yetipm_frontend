import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, X } from "lucide-react";

export default function RentalFilters({ filters, setFilters }) {
  const [isOpen, setIsOpen] = useState(false);

  const propertyTypes = [
    "Single Family",
    "Multi Family",
    "Apartment",
    "Townhouse",
    "Condo",
  ];

  const handleReset = () => {
    setFilters({
      min_price: "",
      max_price: "",
      beds: "",
      baths: "",
      property_type: "",
      city: "",
      availability: "true",
    });
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => {
      const newFilters = { ...prev };

      if (key === "availability") {
        newFilters[key] = String(value);
      } else {
        newFilters[key] = value;
      }

      return newFilters;
    });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="flex flex-wrap gap-4">
        {/* Price Range */}
        <div className="flex gap-2 items-center">
          <Input
            type="number"
            placeholder="Min Price"
            value={filters.min_price}
            onChange={(e) =>
              setFilters({ ...filters, min_price: e.target.value })
            }
            className="w-28"
          />
          <span>-</span>
          <Input
            type="number"
            placeholder="Max Price"
            value={filters.max_price}
            onChange={(e) =>
              setFilters({ ...filters, max_price: e.target.value })
            }
            className="w-28"
          />
        </div>

        {/* Beds */}
        <Select
          value={filters.beds}
          onValueChange={(value) => setFilters({ ...filters, beds: value })}
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Beds" />
          </SelectTrigger>
          <SelectContent>
            {[1, 2, 3, 4, 5].map((num) => (
              <SelectItem key={num} value={num.toString()}>
                {num}+ Beds
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Baths */}
        <Select
          value={filters.baths}
          onValueChange={(value) => setFilters({ ...filters, baths: value })}
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Baths" />
          </SelectTrigger>
          <SelectContent>
            {[1, 2, 3, 4].map((num) => (
              <SelectItem key={num} value={num.toString()}>
                {num}+ Baths
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Property Type */}
        <Select
          value={filters.property_type}
          onValueChange={(value) =>
            setFilters({ ...filters, property_type: value })
          }
        >
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Property Type" />
          </SelectTrigger>
          <SelectContent>
            {propertyTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Reset Button */}
        <Button variant="outline" onClick={handleReset} className="gap-2">
          <X className="h-4 w-4" />
          Reset
        </Button>
      </div>
    </div>
  );
}
