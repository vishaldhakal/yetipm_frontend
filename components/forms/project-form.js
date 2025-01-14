"use client";

import { useState, useEffect, useCallback } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/ui/image-upload";
import { FileUpload } from "@/components/ui/file-upload";
import { showSuccess, showError } from "@/lib/alerts";
import { Plus, Minus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CityForm } from "@/components/forms/city-form";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { Switch } from "@/components/ui/switch";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const quillModules = {
  toolbar: {
    container: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      ["link", "image"],
      ["clean"],
    ],
    handlers: {
      image: function () {}, // Will be set dynamically
    },
  },
};

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Project name must be at least 2 characters.",
  }),
  project_type: z.string().min(1, {
    message: "Please select a project type.",
  }),
  city: z.string().min(1, {
    message: "Please select a city.",
  }),
  project_address: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
  postal_code: z.string().optional(),
  price: z.string().optional(),
  price_breakdown: z.string().optional(),
  project_description: z.string().optional(),
  area_square_footage: z.string().optional(),
  garage_spaces: z.string().optional(),
  bedrooms: z.string().optional(),
  bathrooms: z.string().optional(),
  availability: z.boolean().optional(),
  avialable_date: z.string().optional(),
});

const PROJECT_TYPE_CHOICES = [
  { value: "Single Family", label: "Single Family" },
  { value: "Condominium", label: "Condominium" },
  { value: "Townhouse", label: "Townhouse" },
  { value: "Duplex", label: "Duplex" },
  { value: "Other", label: "Other" },
];

const INITIAL_CITY = {
  id: "",
  name: "",
  slug: "",
};

export function ProjectForm({ initialData = null, onSuccess }) {
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState(initialData?.images || []);
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);
  const [cityFormOpen, setCityFormOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState(
    initialData?.city
      ? {
          id:
            typeof initialData.city === "object"
              ? initialData.city.id
              : initialData.city,
          name: initialData?.city_name || "",
        }
      : INITIAL_CITY
  );
  const [quillRef, setQuillRef] = useState(null);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || "",
      project_type: initialData?.project_type || "",
      project_address: initialData?.project_address || "",
      postal_code: initialData?.postal_code || "",
      price: initialData?.price?.toString() || "",
      price_breakdown: initialData?.price_breakdown || "",
      project_description: initialData?.project_description || "",
      area_square_footage: initialData?.area_square_footage?.toString() || "",
      garage_spaces: initialData?.garage_spaces?.toString() || "",
      bedrooms: initialData?.bedrooms?.toString() || "",
      bathrooms: initialData?.bathrooms?.toString() || "",
      city: initialData?.city
        ? typeof initialData.city === "object"
          ? initialData.city.id.toString()
          : initialData.city.toString()
        : "",
      availability: initialData?.availability || false,
      avialable_date: initialData?.avialable_date || "",
    },
  });

  const { setValue } = form;

  const handleImageDelete = async (imageToDelete) => {
    try {
      if (initialData && imageToDelete.id) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/projects/${initialData.slug}/images/${imageToDelete.id}/`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) throw new Error("Failed to delete image");
      }
      setImages(images.filter((img) => img.id !== imageToDelete.id));
      showSuccess("Image deleted successfully");
    } catch (error) {
      showError("Failed to delete image");
      console.error("Error deleting image:", error);
    }
  };

  const handlePlanDelete = async (planToDelete) => {
    try {
      if (initialData && planToDelete.id) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/plans/${planToDelete.id}/`,
          {
            method: "DELETE",
          }
        );
        if (!response.ok) throw new Error("Failed to delete plan");
      }
      setPlans(plans.filter((plan) => plan.id !== planToDelete.id));
    } catch (error) {
      showError("Failed to delete plan");
    }
  };

  const handleDocumentDelete = async (documentToDelete) => {
    try {
      if (initialData && documentToDelete.id) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/documents/${documentToDelete.id}/`,
          {
            method: "DELETE",
          }
        );
        if (!response.ok) throw new Error("Failed to delete document");
      }
      setDocuments(documents.filter((doc) => doc.id !== documentToDelete.id));
    } catch (error) {
      showError("Failed to delete document");
    }
  };

  const onSubmit = async (values) => {
    try {
      setIsLoading(true);
      const formData = new FormData();

      // Append form fields
      Object.keys(values).forEach((key) => {
        if (values[key] !== undefined && values[key] !== null) {
          formData.append(key, values[key]);
        }
      });

      // Handle images
      const existingImages = images.filter((img) => !img.file && img.url);
      const newImages = images.filter((img) => img.file);

      if (existingImages.length > 0) {
        formData.append(
          "existing_images",
          JSON.stringify(existingImages.map((img) => img.id))
        );
      }

      if (newImages.length > 0) {
        newImages.forEach((image) => {
          formData.append("uploaded_images", image.file);
        });
      }

      const url = initialData
        ? `${process.env.NEXT_PUBLIC_API_URL}/api/projects/${initialData.slug}/`
        : `${process.env.NEXT_PUBLIC_API_URL}/api/projects/`;

      const response = await fetch(url, {
        method: initialData ? "PUT" : "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to save project");
      }

      showSuccess(
        `Project ${initialData ? "updated" : "created"} successfully`
      );
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      showError(error.message);
      console.error("Error saving project:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchStates = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/states/`
      );
      const data = await response.json();
      setStates(data.results);
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  useEffect(() => {
    Promise.all([fetchCities(), fetchStates()]);
  }, []);

  const fetchCities = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/cities/`
      );
      const data = await response.json();
      setCities(data.results);

      if (initialData?.city) {
        const cityId =
          typeof initialData.city === "object"
            ? initialData.city.id
            : initialData.city;

        const initialCity = data.results.find((c) => c.id === cityId);
        if (initialCity) {
          setSelectedCity({
            id: initialCity.id,
            name: initialData.city_name || initialCity.name,
          });
        }
      }
    } catch (error) {
      showError("Failed to fetch cities");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-5xl mx-auto"
      >
        {/* Basic Details Section */}
        <div className="space-y-6 bg-gray-50 p-6 rounded-lg shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">Project Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter project name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* City field */}

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel className="text-xs">City</FormLabel>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-6 text-xs"
                      onClick={() => setCityFormOpen(true)}
                    >
                      + Add New
                    </Button>
                  </div>
                  <Select
                    onValueChange={(value) => {
                      const selectedCity = cities.find(
                        (c) => c.id === parseInt(value)
                      );
                      if (selectedCity) {
                        setSelectedCity({
                          id: selectedCity.id,
                          name: selectedCity.name,
                        });
                      }
                      field.onChange(value);
                    }}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue>
                          {selectedCity?.name || "Select city"}
                        </SelectValue>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {cities.map((city) => (
                        <SelectItem key={city.id} value={city.id.toString()}>
                          {city.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="project_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">Project Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select project type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {PROJECT_TYPE_CHOICES.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="postal_code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">Postal Code</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter postal code" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">Price</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Enter price" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="availability"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">Availability</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="avialable_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">Available Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="project_address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter project address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="area_square_footage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">Area (sq ft)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Enter area" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="garage_spaces"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">Garage Spaces</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter garage spaces"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bedrooms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">Bedrooms</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter number of bedrooms"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bathrooms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">Bathrooms</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter number of bathrooms"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 gap-8">
            <FormField
              control={form.control}
              name="price_breakdown"
              render={({ field }) => (
                <FormItem className="col-span-full">
                  <FormLabel className="text-base">Price Breakdown</FormLabel>
                  <FormControl>
                    <div className="bg-white">
                      <ReactQuill
                        theme="snow"
                        value={field.value}
                        style={{ height: "250px", marginBottom: "40px" }}
                        modules={quillModules}
                        formats={[
                          "header",
                          "bold",
                          "italic",
                          "underline",
                          "strike",
                          "blockquote",
                          "list",
                          "bullet",
                          "link",
                          "image",
                          "video",
                        ]}
                        onChange={(newText) => field.onChange(newText)}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="project_description"
              render={({ field }) => (
                <FormItem className="col-span-full">
                  <FormLabel className="text-base">Description</FormLabel>
                  <FormControl>
                    <div className="bg-white">
                      <ReactQuill
                        theme="snow"
                        value={field.value}
                        style={{ height: "550px", marginBottom: "80px" }}
                        modules={{
                          toolbar: [
                            [{ header: "1" }, { header: "2" }, { font: [] }],
                            [{ size: [] }],
                            [
                              "bold",
                              "italic",
                              "underline",
                              "strike",
                              "blockquote",
                            ],
                            [
                              { list: "ordered" },
                              { list: "bullet" },
                              { indent: "-1" },
                              { indent: "+1" },
                            ],
                            ["link", "image", "video"],
                            ["clean"],
                          ],
                          clipboard: {
                            // toggle to add extra line breaks when pasting HTML:
                            matchVisual: false,
                          },
                        }}
                        formats={[
                          "header",
                          "bold",
                          "italic",
                          "underline",
                          "strike",
                          "blockquote",
                          "list",
                          "bullet",
                          "link",
                          "image",
                          "video",
                        ]}
                        onChange={(newText) => field.onChange(newText)}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="project_video_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">Video URL</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter video URL" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Images Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
          <h3 className="text-xl font-semibold text-gray-900">
            Project Images
          </h3>
          <ImageUpload
            value={images.map((img) => ({ ...img }))}
            onChange={(newImages) => setImages(newImages)}
            onDelete={handleImageDelete}
            maxFiles={5}
          />
        </div>

        {/* Submit Button */}
        <div
          className="fixed bottom-0 right-0 p-4 bg-white border-t shadow-lg"
          style={{ width: "300px" }}
        >
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 text-lg"
          >
            {isLoading
              ? "Saving..."
              : initialData
              ? "Update Project"
              : "Create Project"}
          </Button>
        </div>

        <div className="h-20" />
      </form>

      <Dialog open={cityFormOpen} onOpenChange={setCityFormOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New City</DialogTitle>
          </DialogHeader>
          <CityForm
            states={states}
            onSuccess={async (newCity) => {
              try {
                const response = await fetch(
                  `${process.env.NEXT_PUBLIC_API_URL}/api/cities/`
                );
                const data = await response.json();
                setCities(data.results);

                const createdCity = data.results.find(
                  (c) => c.id === newCity.id
                );
                if (createdCity) {
                  setSelectedCity(createdCity);
                  form.setValue("city", createdCity.id.toString(), {
                    shouldValidate: true,
                    shouldDirty: true,
                    shouldTouch: true,
                  });
                }
                setCityFormOpen(false);
              } catch (error) {
                showError("Failed to update cities list");
              }
            }}
          />
        </DialogContent>
      </Dialog>
    </Form>
  );
}
