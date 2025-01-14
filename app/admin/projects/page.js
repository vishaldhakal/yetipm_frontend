"use client";

import { useState, useEffect } from "react";
import { DataTable } from "@/components/ui/data-table";
import { SearchInput } from "@/components/ui/search-input";
import { Loading } from "@/components/ui/loading";
import { showSuccess, showError, showConfirmation } from "@/lib/alerts";
import { useRouter } from "next/navigation";

const columns = [
  {
    key: "name",
    label: "Project Name",
    sortable: true,
    render: (value, row) => (
      <div className="flex items-center gap-2">
        {row.images?.[0]?.image && (
          <img
            src={row.images[0].image}
            alt={value}
            className="w-10 h-10 rounded-md object-cover"
          />
        )}
        <span>{value || "N/A"}</span>
      </div>
    ),
  },
  {
    key: "city",
    label: "City",
    sortable: true,
    render: (value) => value?.name || "N/A",
  },
  {
    key: "project_type",
    label: "Project Type",
    sortable: true,
    render: (value) => String(value || "N/A"),
  },
  {
    key: "price",
    label: "Price",
    sortable: true,
    render: (value) => (value ? `$${Number(value).toLocaleString()}` : "N/A"),
  },
  {
    key: "availability",
    label: "Availability",
    sortable: true,
    render: (value) => (
      <span
        className={`px-2 py-1 rounded-full text-sm ${
          value ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
        }`}
      >
        {value ? "Available" : "Not Available"}
      </span>
    ),
  },
  {
    key: "bedrooms",
    label: "Beds",
    sortable: true,
    render: (value) => value || "N/A",
  },
  {
    key: "bathrooms",
    label: "Baths",
    sortable: true,
    render: (value) => value || "N/A",
  },
  {
    key: "actions",
    label: "Actions",
    render: (_, row) => (
      <div className="flex items-center gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/admin/projects/${row.slug}/edit`);
          }}
          className="p-2 text-blue-600 hover:text-blue-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
          </svg>
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(row.slug);
          }}
          className="p-2 text-red-600 hover:text-red-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </button>
      </div>
    ),
  },
];

export default function ProjectsPage() {
  const router = useRouter();
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      fetchProjects(searchQuery);
    }
  }, [searchQuery]);

  const fetchProjects = async (search = "") => {
    try {
      const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/api/projects/`);
      if (search) {
        url.searchParams.append("search", search);
      }
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch projects");
      const data = await response.json();
      setProjects(data.results);
    } catch (error) {
      showError("Failed to fetch projects");
      console.error("Error fetching projects:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdd = () => {
    router.push("/admin/projects/new");
  };

  const handleDelete = async (slug) => {
    const confirmed = await showConfirmation(
      "Delete Project",
      "Are you sure you want to delete this project?"
    );

    if (confirmed) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/projects/${slug}/`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) throw new Error("Failed to delete project");

        showSuccess("Project deleted successfully");
        fetchProjects(); // Refresh the list
      } catch (error) {
        showError("Failed to delete project");
        console.error("Error deleting project:", error);
      }
    }
  };

  const handleRowClick = (row) => {
    router.push(`/admin/projects/${row.slug}/edit`);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold tracking-tight">Projects Management</h2>

      <div className="flex justify-between items-center">
        <div className="w-1/3">
          <SearchInput
            onSearch={setSearchQuery}
            placeholder="Search projects..."
          />
        </div>
      </div>

      <DataTable
        data={projects}
        columns={columns}
        onAdd={handleAdd}
        onRowClick={handleRowClick}
        title="Projects"
      />
    </div>
  );
}
