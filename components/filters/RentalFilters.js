import { useState, useEffect } from "react";
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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

export default function RentalFilters({ filters, setFilters }) {
  const [isOpen, setIsOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState(filters);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const projectTypes = [
    "Single Family",
    "Multi Family",
    "Apartment",
    "Townhouse",
    "Condo",
  ];

  // Update filters immediately on desktop, but only on apply for mobile
  useEffect(() => {
    if (isDesktop) {
      setFilters(localFilters);
    }
  }, [localFilters, isDesktop]);

  const handleReset = () => {
    const emptyFilters = {
      min_price: "",
      max_price: "",
      beds: "",
      baths: "",
      property_type: "",
      city: "",
      availability: "true",
    };
    setLocalFilters(emptyFilters);
    setFilters(emptyFilters);
    setIsOpen(false);
  };

  const handleApplyFilters = () => {
    setFilters(localFilters);
    setIsOpen(false);
  };

  const removeFilter = (key) => {
    setLocalFilters((prev) => ({ ...prev, [key]: "" }));
    if (isDesktop) {
      setFilters((prev) => ({ ...prev, [key]: "" }));
    }
  };

  const FilterContent = () => (
    <div
      className={cn(
        "flex gap-4",
        // Stack on mobile, row on desktop
        "flex-col md:flex-row md:items-end"
      )}
    >
      {/* Price Range */}
      <div className="space-y-2 min-w-[280px]">
        <label className="text-sm font-medium">Price Range</label>
        <div className="flex gap-2 items-center">
          <Input
            type="number"
            placeholder="Min Price"
            value={localFilters.min_price}
            onChange={(e) =>
              setLocalFilters({ ...localFilters, min_price: e.target.value })
            }
            className="w-full"
          />
          <span>-</span>
          <Input
            type="number"
            placeholder="Max Price"
            value={localFilters.max_price}
            onChange={(e) =>
              setLocalFilters({ ...localFilters, max_price: e.target.value })
            }
            className="w-full"
          />
        </div>
      </div>

      {/* Beds & Baths as separate items */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Bedrooms</label>
        <Select
          value={localFilters.beds}
          onValueChange={(value) =>
            setLocalFilters({ ...localFilters, beds: value })
          }
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
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Bathrooms</label>
        <Select
          value={localFilters.baths}
          onValueChange={(value) =>
            setLocalFilters({ ...localFilters, baths: value })
          }
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
      </div>

      {/* Property Type */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Property Type</label>
        <Select
          value={localFilters.project_type}
          onValueChange={(value) =>
            setLocalFilters({ ...localFilters, project_type: value })
          }
        >
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Property Type" />
          </SelectTrigger>
          <SelectContent>
            {projectTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Reset Button aligned with inputs */}
      <Button
        variant="outline"
        onClick={handleReset}
        className="md:self-end h-10 gap-2"
      >
        <X className="h-4 w-4" />
        Reset
      </Button>
    </div>
  );

  // Generate active filter badges
  const getActiveFilters = () => {
    const active = [];
    if (filters.min_price)
      active.push({ key: "min_price", label: `Min $${filters.min_price}` });
    if (filters.max_price)
      active.push({ key: "max_price", label: `Max $${filters.max_price}` });
    if (filters.beds)
      active.push({ key: "beds", label: `${filters.beds}+ Beds` });
    if (filters.baths)
      active.push({ key: "baths", label: `${filters.baths}+ Baths` });
    if (filters.project_type)
      active.push({ key: "project_type", label: filters.project_type });
    return active;
  };

  return (
    <div className="space-y-4">
      {/* Desktop Filters */}
      <div className="hidden md:block bg-white p-4 rounded-lg shadow-sm">
        <FilterContent />
      </div>

      {/* Mobile Filter Button & Sheet */}
      <div className="md:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent className="w-full sm:max-w-md">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <div className="mt-4">
              <FilterContent />
              <div className="flex gap-2 mt-6">
                <Button
                  variant="outline"
                  onClick={handleReset}
                  className="flex-1"
                >
                  Reset
                </Button>
                <Button onClick={handleApplyFilters} className="flex-1">
                  Apply Filters
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Active Filters */}
      <div className="flex flex-wrap gap-2">
        {getActiveFilters().map((filter) => (
          <Badge
            key={filter.key}
            variant="secondary"
            className="gap-1 px-3 py-1"
          >
            {filter.label}
            <X
              className="h-3 w-3 cursor-pointer hover:text-red-500 transition-colors"
              onClick={() => removeFilter(filter.key)}
            />
          </Badge>
        ))}
        {getActiveFilters().length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="h-7 px-3 text-sm"
          >
            Clear all
          </Button>
        )}
      </div>
    </div>
  );
}
