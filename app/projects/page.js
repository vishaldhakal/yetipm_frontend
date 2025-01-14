"use client";

import { useState, useEffect, useCallback, memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loading } from "@/components/ui/loading";
import {
  Search,
  SlidersHorizontal,
  X,
  Building2,
  BedDouble,
  Bath,
} from "lucide-react";

const PROJECT_TYPE_CHOICES = [
  "Single Family",
  "Condominium",
  "Townhouse",
  "Duplex",
  "Other",
];

const ProjectCard = ({ project }) => (
  <div className="relative group">
    <Link
      href={`/projects/${project.slug}`}
      className="block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl 
      transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className="relative h-[280px] overflow-hidden">
        <Image
          src={project.images[0]?.image || "/placeholder-development.jpg"}
          alt={project.name}
          fill
          className="object-cover transition-all duration-500 group-hover:scale-110"
        />
        {project.availability && (
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 text-xs font-semibold bg-green-500 text-white rounded-full">
              Available
            </span>
          </div>
        )}
        {project.avialable_date && (
          <div className="absolute bottom-4 right-4">
            <span className="px-3 py-1 text-xs font-semibold bg-black text-white rounded-full">
              Available: {new Date(project.avialable_date).toLocaleDateString()}
            </span>
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="text-sm font-semibold text-emerald-700 uppercase mb-1">
          {project.project_type}
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{project.name}</h3>
        {project.area_square_footage && (
          <div className="text-sm text-gray-600 mb-2">
            {project.area_square_footage} Sq. Ft.
          </div>
        )}
        <div className="flex items-center gap-6 text-sm text-gray-600 mb-3">
          {project.bedrooms && (
            <div className="flex items-center gap-1">
              <BedDouble className="h-4 w-4" />
              <span>{project.bedrooms} Bed</span>
            </div>
          )}
          {project.bathrooms && (
            <div className="flex items-center gap-1">
              <Bath className="h-4 w-4" />
              <span>{project.bathrooms} Bath</span>
            </div>
          )}
          {project.garage_spaces && (
            <div className="flex items-center gap-1">
              <Building2 className="h-4 w-4" />
              <span>{project.garage_spaces} Car Garage</span>
            </div>
          )}
        </div>
        <div className="text-lg font-bold text-gray-900">
          {project.price ? `${formatCurrency(project.price)}` : "Price TBD"}
        </div>
      </div>
    </Link>
    <div className="absolute right-4 top-4">
      <Link
        href={`/projects/${project.slug}/enquire`}
        className="px-4 py-2 text-xs bg-yellow-400 text-black rounded-full
        hover:bg-yellow-500 transition-all duration-300 
        transform hover:-translate-y-0.5 z-10 font-semibold"
        onClick={(e) => e.stopPropagation()}
      >
        Enquire Now
      </Link>
    </div>
  </div>
);

const SearchInput = memo(({ value, onChange }) => (
  <div className="relative">
    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
    <Input
      placeholder="Search projects..."
      className="pl-10"
      value={value}
      onChange={onChange}
      autoFocus
      onBlur={(e) => e.target.focus()}
    />
  </div>
));

SearchInput.displayName = "SearchInput";

export default function ProjectsSection() {
  const [projects, setProjects] = useState([]);
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    search: "",
    project_type: "",
    city: "",
    price_min: "",
    price_max: "",
    bedrooms: "",
    bathrooms: "",
    availability: "",
  });
  const [activeFilters, setActiveFilters] = useState([]);

  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  useEffect(() => {
    fetchCities();
    fetchProjects();
  }, []);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      setFilters((prev) => ({ ...prev, search: searchTerm }));
    }, 200);

    return () => clearTimeout(debounceTimeout);
  }, [searchTerm]);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      fetchProjects();
      updateActiveFilters();
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [filters]);

  const fetchCities = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/cities/`
      );
      if (!response.ok) throw new Error("Failed to fetch cities");
      const data = await response.json();
      setCities(data.results);
    } catch (error) {
      console.error("Failed to fetch cities:", error);
    }
  };

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      const queryParams = new URLSearchParams();

      Object.entries(filters).forEach(([key, value]) => {
        if (!value) return;
        queryParams.append(key, value);
      });

      const url = `${process.env.NEXT_PUBLIC_API_URL}/api/projects/?${queryParams}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch projects");
      const data = await response.json();
      setProjects(data.results);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateActiveFilters = () => {
    const newActiveFilters = Object.entries(filters)
      .filter(([_, value]) => value)
      .map(([key, value]) => {
        let label = "";
        switch (key) {
          case "project_type":
            label = `Type: ${value}`;
            break;
          case "status":
            const statusObj = STATUS_TYPES.find((s) => s.value === value);
            label = `Status: ${statusObj?.label || value}`;
            break;
          case "city":
            const cityName = cities.find(
              (c) => c.id.toString() === value
            )?.name;
            label = `City: ${cityName || value}`;
            break;
          case "price_starting_from":
            label = `Min: $${Number(value).toLocaleString()}`;
            break;
          case "price_ending_at":
            label = `Max: $${Number(value).toLocaleString()}`;
            break;
          case "search":
            label = `Search: ${value}`;
            break;
          default:
            label = value;
        }
        return { key, label };
      });

    setActiveFilters(newActiveFilters);
  };

  const removeFilter = (filterKey) => {
    setFilters((prev) => ({
      ...prev,
      [filterKey]: "",
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      search: "",
      project_type: "",
      status: "",
      city: "",
      price_starting_from: "",
      price_ending_at: "",
    });
  };

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Search and Filter Bar */}
          <div className="flex flex-wrap gap-4 items-center">
            <SearchInput value={searchTerm} onChange={handleSearchChange} />

            <Select
              value={filters.project_type}
              onValueChange={(value) =>
                setFilters((prev) => ({ ...prev, project_type: value }))
              }
            >
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Project Type" />
              </SelectTrigger>
              <SelectContent>
                {PROJECT_TYPE_CHOICES.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={filters.status}
              onValueChange={(value) =>
                setFilters((prev) => ({ ...prev, status: value }))
              }
            >
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {STATUS_TYPES.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={filters.city}
              onValueChange={(value) =>
                setFilters((prev) => ({ ...prev, city: value }))
              }
            >
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="City" />
              </SelectTrigger>
              <SelectContent>
                {cities.map((city) => (
                  <SelectItem key={city.id} value={city.id.toString()}>
                    {city.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="Min Price"
                className="w-[120px]"
                value={filters.price_starting_from}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    price_starting_from: e.target.value,
                  }))
                }
              />
              <Input
                type="number"
                placeholder="Max Price"
                className="w-[120px]"
                value={filters.price_ending_at}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    price_ending_at: e.target.value,
                  }))
                }
              />
            </div>

            {activeFilters.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearAllFilters}
                className="ml-auto"
              >
                Clear All
              </Button>
            )}
          </div>

          {/* Active Filters */}
          {activeFilters.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {activeFilters.map((filter) => (
                <div
                  key={filter.key}
                  className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full text-sm"
                >
                  {filter.label}
                  <button
                    onClick={() => removeFilter(filter.key)}
                    className="ml-1 text-gray-500 hover:text-gray-700"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {projects.length === 0 ? (
          <div className="text-center py-12">
            <Building2 className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-semibold text-gray-900">
              No projects found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your filters or search terms
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
