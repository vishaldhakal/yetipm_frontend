"use client";

import { useState, useEffect } from "react";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { showSuccess, showError, showConfirmation } from "@/lib/alerts";

const columns = [
  { key: "name", label: "Province Name" },
  { key: "abbreviation", label: "Abbreviation" },
];

export default function StatesPage() {
  const router = useRouter();
  const [states, setStates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStates();
  }, []);

  const fetchStates = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/states/");
      const data = await response.json();
      setStates(data.results);
    } catch (error) {
      showError("Failed to fetch states");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdd = () => {
    router.push("/admin/states/new");
  };

  const handleEdit = (state) => {
    router.push(`/admin/states/${state.slug}/edit`);
  };

  const handleDelete = async (state) => {
    const confirmed = await showConfirmation(
      "This will permanently delete the province and all associated data."
    );

    if (confirmed) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/states/${state.slug}/`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) throw new Error("Failed to delete state");

        showSuccess("Province deleted successfully");
        fetchStates();
      } catch (error) {
        showError(error.message);
      }
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold tracking-tight">Province Management</h2>
      <DataTable
        data={states}
        columns={columns}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        title="States"
      />
    </div>
  );
}
