"use client";

import { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { showSuccess, showError } from "@/lib/alerts";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "State name must be at least 2 characters.",
  }),
  abbreviation: z.string().length(2, {
    message: "Abbreviation must be exactly 2 characters.",
  }),
  description: z.string().optional(),
});

export function StateForm({ initialData = null, onSuccess }) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || "",
      abbreviation: initialData?.abbreviation || "",
      description: initialData?.description || "",
    },
  });

  const onSubmit = async (values) => {
    try {
      setIsLoading(true);
      const url = initialData
        ? `${process.env.NEXT_PUBLIC_API_URL}/api/states/${initialData.slug}/`
        : `${process.env.NEXT_PUBLIC_API_URL}/api/states/`;

      const response = await fetch(url, {
        method: initialData ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error("Failed to save state");

      showSuccess(`State ${initialData ? "updated" : "created"} successfully`);
      if (onSuccess) onSuccess();
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
              <FormLabel>State Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter state name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="abbreviation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Abbreviation</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g., CA"
                  {...field}
                  maxLength={2}
                  style={{ textTransform: "uppercase" }}
                  onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Enter state description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading
            ? "Saving..."
            : initialData
            ? "Update Province"
            : "Create Province"}
        </Button>
      </form>
    </Form>
  );
}
