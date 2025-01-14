"use client";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { showSuccess, showError } from "@/lib/alerts";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "City name must be at least 2 characters.",
  }),
  state: z.string().min(1, {
    message: "State is required.",
  }),
});

export function CityForm({ initialData = null, states = [], onSuccess }) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedState, setSelectedState] = useState(
    states.find((s) => s.id === initialData?.state)
  );

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || "",
      state: initialData?.state?.id?.toString() || "",
    },
  });

  const handleStateChange = (value) => {
    const state = states.find((s) => s.id.toString() === value);
    setSelectedState(state);
    form.setValue("state", value);
  };

  // Update selectedState when form value changes
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "state") {
        const state = states.find((s) => s.id.toString() === value.state);
        setSelectedState(state);
      }
    });
    return () => subscription.unsubscribe();
  }, [form, states]);

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const formData = new FormData();

      Object.keys(data).forEach((key) => {
        if (data[key] !== undefined && data[key] !== null) {
          formData.append(key, data[key]);
        }
      });

      const url = initialData
        ? `${process.env.NEXT_PUBLIC_API_URL}/api/cities/${initialData.slug}/`
        : `${process.env.NEXT_PUBLIC_API_URL}/api/cities/`;

      const response = await fetch(url, {
        method: initialData ? "PATCH" : "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to save city");

      const savedCity = await response.json();
      showSuccess(`City ${initialData ? "updated" : "created"} successfully`);
      onSuccess(savedCity);
    } catch (error) {
      showError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter city name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormLabel>State</FormLabel>
              <Select onValueChange={handleStateChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a state">
                      {selectedState
                        ? `${selectedState.name}`
                        : "Select a state"}
                    </SelectValue>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {states.map((state) => (
                    <SelectItem key={state.id} value={state.id.toString()}>
                      {state.name} ({state.abbreviation})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading
            ? "Saving..."
            : initialData
            ? "Update City"
            : "Create City"}
        </Button>
      </form>
    </Form>
  );
}
