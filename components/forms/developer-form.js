"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { showSuccess, showError } from "@/lib/alerts";

export function DeveloperForm({ initialData, onSuccess }) {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialData || {},
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      if (data[key] !== undefined && data[key] !== null) {
        formData.append(key, data[key]);
      }
    });

    if (data.logo && data.logo[0]) {
      formData.append("logo", data.logo[0]);
    }

    try {
      const url = initialData
        ? `${process.env.NEXT_PUBLIC_API_URL}/api/developers/${initialData.slug}/`
        : `${process.env.NEXT_PUBLIC_API_URL}/api/developers/`;

      const response = await fetch(url, {
        method: initialData ? "PATCH" : "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to save developer");

      const savedDeveloper = await response.json();
      showSuccess(
        `Developer ${initialData ? "updated" : "created"} successfully`
      );
      onSuccess(savedDeveloper);
    } catch (error) {
      /* showError(error.message); */
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Input
          {...register("name", { required: "Name is required" })}
          placeholder="Developer Name"
        />
        {errors.name && (
          <span className="text-red-500 text-sm">{errors.name.message}</span>
        )}
      </div>

      <div>
        <Input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
          placeholder="Email"
          type="email"
        />
        {errors.email && (
          <span className="text-red-500 text-sm">{errors.email.message}</span>
        )}
      </div>

      <div>
        <Input
          {...register("phone", { required: "Phone is required" })}
          placeholder="Phone"
        />
        {errors.phone && (
          <span className="text-red-500 text-sm">{errors.phone.message}</span>
        )}
      </div>

      <div>
        <Input {...register("website")} placeholder="Website" type="url" />
      </div>

      <div>
        <Textarea {...register("details")} placeholder="Details" />
      </div>

      <div>
        <Input type="file" {...register("logo")} accept="image/*" />
      </div>

      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Saving..." : "Save Developer"}
      </Button>
    </form>
  );
}
