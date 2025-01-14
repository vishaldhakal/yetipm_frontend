"use client";

import { useState, useEffect, useCallback, memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Loading } from "@/components/ui/loading";
import {
  Search,
  SlidersHorizontal,
  X,
  Building2,
  BedDouble,
  Bath,
  Maximize2,
} from "lucide-react";

const PROJECT_TYPES = [
  "Single Family",
  "Multi Family",
  "Condominium",
  "Townhouse",
  "Move in Ready",
  "Other",
];

const STATUS_TYPES = [
  { value: "Planning", label: "Planning Phase" },
  { value: "Approval", label: "Approval Process" },
  { value: "Sales", label: "Sales Phase" },
  { value: "Construction", label: "Construction Phase" },
  { value: "Completed", label: "Completed" },
  { value: "On Hold", label: "On Hold" },
];

const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case "approval":
      return "bg-green-600";
    case "pending":
      return "bg-yellow-600";
    case "sold out":
      return "bg-red-600";
    case "coming soon":
      return "bg-purple-600";
    default:
      return "bg-blue-600";
  }
};

const ProjectCard = ({ project }) => {
  return (
    <div className="relative group">
      <Link
        href={`/rentals/${project.slug}`}
        className="block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl 
        transition-all duration-300 transform hover:-translate-y-1"
      >
        <div className="relative h-[280px] overflow-hidden">
          <img
            src={project.images[0]?.image || "/placeholder-rental.jpg"}
            alt={project.name}
            className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
          />
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 text-xs font-medium bg-white/90 text-navy-900 rounded-full">
              {project.availability ? "Available Now" : "Coming Soon"}
            </span>
          </div>
        </div>

        <div className="p-4">
          <div className="text-blue-600 text-[28px] font-bold mb-3">
            ${Number(project.price).toLocaleString()}/month
          </div>
          <div className="flex items-center text-gray-700 mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-4 w-4 mr-2 flex-shrink-0"
            >
              <path
                fill="currentColor"
                d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
              />
            </svg>
            <span className="text-sm">{project.project_address}</span>
          </div>

          <div className="flex items-center w-full text-[11px] text-gray-600 gap-4">
            <div className="flex items-center flex-1 justify-start">
              <BedDouble className="h-4 w-4 mr-1.5 text-blue-600" />
              <span className="font-semibold whitespace-nowrap">
                {project.bedrooms} BEDS
              </span>
            </div>
            <div className="flex items-center flex-1 justify-center">
              <Bath className="h-4 w-4 mr-1.5 text-blue-600" />
              <span className="font-semibold whitespace-nowrap">
                {project.bathrooms} BATHS
              </span>
            </div>
            <div className="flex items-center flex-1 justify-end">
              <Maximize2 className="h-4 w-4 mr-1.5 text-blue-600" />
              <span className="font-semibold whitespace-nowrap">
                {project.area_square_footage} SQFT
              </span>
            </div>
          </div>

          <Button className="w-full mt-4 bg-blue-600 text-white hover:bg-blue-700">
            Apply Now
          </Button>
        </div>
      </Link>
    </div>
  );
};

const SearchInput = memo(({ value, onChange }) => (
  <div className="relative">
    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
    <Input
      placeholder="Search projects..."
      className="pl-10"
      value={value}
      onChange={onChange}
    />
  </div>
));

SearchInput.displayName = "SearchInput";

const ProjectSkeleton = () => (
  <div className="bg-white rounded-lg overflow-hidden shadow-sm animate-pulse">
    <div className="h-[280px] bg-gray-200" />
    <div className="p-4">
      <div className="h-4 w-24 bg-gray-200 rounded mb-2" />
      <div className="h-6 w-48 bg-gray-200 rounded mb-4" />
      <div className="h-4 w-32 bg-gray-200 rounded mb-2" />
      <div className="flex gap-4 mb-4">
        <div className="h-4 w-16 bg-gray-200 rounded" />
        <div className="h-4 w-16 bg-gray-200 rounded" />
        <div className="h-4 w-16 bg-gray-200 rounded" />
      </div>
      <div className="h-6 w-32 bg-gray-200 rounded" />
    </div>
  </div>
);

const FilterBar = ({
  filters,
  setFilters,
  onFilterChange,
  communities = [],
  propertyTypes = PROJECT_TYPES,
}) => {
  const formatPrice = (value) => {
    if (!value) return "0";
    return value >= 1000000
      ? `$${(value / 1000000).toFixed(1)}M`
      : `$${(value / 1000).toFixed(0)}K`;
  };

  // Ensure communities is always an array
  const communityOptions = Array.isArray(communities) ? communities : [];

  const buttonStyles =
    "h-10 w-[200px] px-4 flex items-center text-left text-sm font-medium";
  const iconStyles = "h-4 w-4 mr-2 flex-shrink-0";
  const clearButtonStyles = "h-10 px-6 text-sm font-medium";

  const getFilterStyle = (value) => {
    return value ? "bg-gray-800 text-white hover:bg-gray-700" : "";
  };

  const bedOptions = ["1", "2", "3", "4", "5"];
  const bathOptions = ["1", "1.5", "2", "2.5", "3"];

  return (
    <div className="flex flex-wrap gap-3 mb-6">
      <Select
        value={filters.community}
        onValueChange={(value) => onFilterChange("community", value)}
      >
        <SelectTrigger
          className={`${buttonStyles} ${getFilterStyle(filters.community)}`}
        >
          <Building2 className={iconStyles} />
          <SelectValue placeholder="Communities">Communities</SelectValue>
        </SelectTrigger>
        <SelectContent>
          {communityOptions.map((community) => (
            <SelectItem
              key={community.id || community.value || community}
              value={community.id || community.value || community}
            >
              {community.name || community.label || community}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={`${buttonStyles} ${getFilterStyle(
              filters.beds || filters.baths
            )}`}
          >
            <BedDouble className={iconStyles} />
            Beds & Baths
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-4">
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-3">Bedrooms</h4>
              <div className="grid grid-cols-3 gap-2">
                {bedOptions.map((bed) => (
                  <label
                    key={`bed-${bed}`}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      checked={filters.beds === bed}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          onFilterChange("beds", bed);
                        } else {
                          onFilterChange("beds", "");
                        }
                      }}
                    />
                    <span className="text-sm">{bed}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-3">Bathrooms</h4>
              <div className="grid grid-cols-2 gap-2">
                {bathOptions.map((bath) => (
                  <label
                    key={`bath-${bath}`}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      checked={filters.baths === bath}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          onFilterChange("baths", bath);
                        } else {
                          onFilterChange("baths", "");
                        }
                      }}
                    />
                    <span className="text-sm">{bath}</span>
                  </label>
                ))}
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="w-full mt-2"
              onClick={() => {
                onFilterChange("beds", "");
                onFilterChange("baths", "");
              }}
            >
              Clear
            </Button>
          </div>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={`${buttonStyles} ${getFilterStyle(
              filters.priceRange?.[0] !== 0 ||
                filters.priceRange?.[1] !== 5000000
            )}`}
          >
            <span className={iconStyles}>$</span>
            Price range
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">
                  {formatPrice(filters.priceRange?.[0] || 0)}
                </span>
                <span className="text-sm font-medium">
                  {formatPrice(filters.priceRange?.[1] || 5000000)}
                </span>
              </div>
              <Slider
                defaultValue={[0, 5000000]}
                value={filters.priceRange || [0, 5000000]}
                min={0}
                max={5000000}
                step={100000}
                onValueChange={(value) => onFilterChange("priceRange", value)}
                className="w-full"
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <Button
                variant="outline"
                size="sm"
                className="h-8"
                onClick={() => onFilterChange("priceRange", [0, 1000000])}
              >
                Under $1M
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-8"
                onClick={() => onFilterChange("priceRange", [1000000, 2000000])}
              >
                $1M - $2M
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-8"
                onClick={() => onFilterChange("priceRange", [2000000, 5000000])}
              >
                $2M+
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      <Select
        value={filters.propertyType}
        onValueChange={(value) => onFilterChange("propertyType", value)}
      >
        <SelectTrigger
          className={`${buttonStyles} ${getFilterStyle(filters.propertyType)}`}
        >
          <Building2 className={iconStyles} />
          <SelectValue placeholder="Property type">Property type</SelectValue>
        </SelectTrigger>
        <SelectContent>
          {propertyTypes.map((type) => (
            <SelectItem key={type} value={type}>
              {type}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.possessionDate}
        onValueChange={(value) => onFilterChange("possessionDate", value)}
      >
        <SelectTrigger
          className={`${buttonStyles} ${getFilterStyle(
            filters.possessionDate
          )}`}
        >
          <SelectValue placeholder="Possession date">
            Possession date
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="immediate">Immediate</SelectItem>
          <SelectItem value="3months">Within 3 months</SelectItem>
          <SelectItem value="6months">Within 6 months</SelectItem>
          <SelectItem value="1year">Within 1 year</SelectItem>
        </SelectContent>
      </Select>

      <Button
        variant="primary"
        className={`${clearButtonStyles} justify-center bg-blue-600 text-white hover:bg-blue-700`}
        onClick={() => {
          setFilters({
            community: "",
            priceRange: [0, 5000000],
            beds: "",
            baths: "",
            propertyType: "",
            possessionDate: "",
          });
        }}
      >
        Clear all
      </Button>
    </div>
  );
};

export default function ProjectsSection() {
  const [projects, setProjects] = useState([]);
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    community: "",
    priceRange: [0, 5000000],
    beds: "",
    baths: "",
    propertyType: "",
    possessionDate: "",
  });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/projects/");
        const data = await response.json();
        setProjects(data.results);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <div className="flex flex-col gap-4">
            <div className="w-full max-w-xs">
              <SearchInput
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <FilterBar
              filters={filters}
              setFilters={setFilters}
              onFilterChange={(key, value) =>
                setFilters((prev) => ({ ...prev, [key]: value }))
              }
              communities={cities}
              propertyTypes={PROJECT_TYPES}
            />
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
              {[...Array(6)].map((_, index) => (
                <ProjectSkeleton key={index} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
