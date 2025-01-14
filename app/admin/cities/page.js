"use client";

import { useState, useEffect } from "react";
import { DataTable } from "@/components/ui/data-table";
import { CityForm } from "@/components/forms/city-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { showSuccess, showError, showConfirmation } from "@/lib/alerts";

const columns = [
  { key: "name", label: "City Name" },
  { key: "state_name", label: "State" },
];

export default function CitiesPage() {
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);

  useEffect(() => {
    fetchCities();
    fetchStates();
  }, []);

  const fetchCities = async () => {
    try {
      const response = await fetch(
        "https://yetipm.baliyoventures.com/api/cities/"
      );
      const data = await response.json();
      setCities(data.results);
    } catch (error) {
      showError("Failed to fetch cities");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchStates = async () => {
    try {
      const response = await fetch(
        "https://yetipm.baliyoventures.com/api/states/"
      );
      const data = await response.json();
      setStates(data.results);
    } catch (error) {
      showError("Failed to fetch states");
    }
  };

  const handleAdd = () => {
    setSelectedCity(null);
    setFormOpen(true);
  };

  const handleEdit = (city) => {
    setSelectedCity(city);
    setFormOpen(true);
  };

  const handleDelete = async (city) => {
    const confirmed = await showConfirmation(
      "This will permanently delete the city and all associated data."
    );

    if (confirmed) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/cities/${city.slug}/`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) throw new Error("Failed to delete city");

        showSuccess("City deleted successfully");
        fetchCities();
      } catch (error) {
        showError(error.message);
      }
    }
  };

  const handleFormSuccess = () => {
    setFormOpen(false);
    fetchCities();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold tracking-tight">Cities Management</h2>

      <DataTable
        data={cities}
        columns={columns}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        title="Cities"
      />

      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedCity ? "Edit City" : "Add New City"}
            </DialogTitle>
          </DialogHeader>
          <CityForm
            initialData={selectedCity}
            states={states}
            onSuccess={handleFormSuccess}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
