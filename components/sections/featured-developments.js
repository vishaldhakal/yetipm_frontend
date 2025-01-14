"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { HomeIcon, BathIcon, CarIcon } from "lucide-react";

const ProjectImage = ({ project }) => (
  <div className="relative h-[280px] overflow-hidden">
    <img
      src={project.images[0]?.image || "/placeholder-development.jpg"}
      alt={project.name}
      className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
    />
    <div className="absolute top-4 left-4">
      <span className="px-3 py-1 text-xs font-medium bg-white/90 text-navy-900 rounded-full">
        {project.status}
      </span>
    </div>
  </div>
);

const ProjectQuickInfo = ({ project }) => (
  <div className="flex items-center justify-start gap-5 px-3 mb-4 mt-2">
    <div className="flex items-center text-sm space-x-2">
      <HomeIcon className="w-4 h-4 text-navy-600" />
      <span className="text-sm">{Math.round(project.bedrooms)}</span>
    </div>
    <div className="flex items-center text-sm space-x-2">
      <BathIcon className="w-4 h-4 text-navy-600" />
      <span className="text-sm">{Math.round(project.bathrooms)}</span>
    </div>
    <div className="flex items-center text-sm space-x-2">
      <CarIcon className="w-4 h-4 text-navy-600" />
      <span className="text-sm">{Math.round(project.garage_spaces)}</span>
    </div>
    <div className="flex items-center text-sm space-x-2">
      <span className="text-sm">{Math.round(project.area_square_footage)}</span>
      <span className="text-sm">SQ.FT.</span>
    </div>
  </div>
);

const ProjectDetails = ({ project }) => (
  <div className="px-3">
    <div className="space-y-4">
      <div>
        <h3 className="text-xl font-extrabold text-navy-900 mt-3">
          {project.name}
        </h3>
        <p className="text-md text-gray-900 my-1 font-normal">
          From ${Number(project.price_starting_from).toLocaleString()} to $
          {Number(project.price_ending_at).toLocaleString()}
        </p>
        <p className="text-sm text-gray-500">{project.project_address}</p>
      </div>
      <hr />
    </div>
  </div>
);

export const ProjectCard = ({ project }) => {
  return (
    <div className="relative group">
      <Link
        href={`/projects/${project.slug}`}
        className="block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl 
        transition-all duration-300 transform hover:-translate-y-1"
      >
        <ProjectImage project={project} />
        <div className="absolute right-4 top-4">
          <Link
            href={`/projects/${project.slug}/enquire`}
            className="px-4 py-2 text-xs bg-yellow-200 text-black rounded-full
            hover:bg-yellow-300 transition-all duration-300 
            transform hover:-translate-y-0.5 z-10 font-medium"
            onClick={(e) => e.stopPropagation()}
          >
            Enquire Now
          </Link>
        </div>
        <ProjectDetails project={project} />
        <ProjectQuickInfo project={project} />
      </Link>
    </div>
  );
};

export default function FeaturedDevelopments() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProjects();
  }, []);

  const fetchFeaturedProjects = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/projects/`
      );
      const data = await response.json();
      setProjects(data.results);
    } catch (error) {
      console.error("Failed to fetch featured projects:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gray-50">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">
            Featured Developments
          </h2>
          <p className="text-lg text-gray-600">
            Discover our latest and most prestigious development projects
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
