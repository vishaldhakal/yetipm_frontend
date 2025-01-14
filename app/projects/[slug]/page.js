"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { showError } from "@/lib/alerts";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Building2,
  MapPin,
  BedDouble,
  Bath,
  Car,
  ChevronLeft,
  ChevronRight,
  Calendar,
  DollarSign,
} from "lucide-react";

const formatCurrency = (amount) => {
  if (!amount) return "";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const formatDate = (date) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const placeholderImage = "/placeholder-development.jpg";

const inquiryFormSchema = z.object({
  inquiry_type: z.enum(["Specific Property", "General Inquiry"]),
  first_name: z.string().min(2, "First name is required"),
  last_name: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone_number: z.string().min(10, "Valid phone number is required"),
  message: z.string().min(10, "Message is too short"),
});

const InquiryForm = ({ project }) => {
  const form = useForm({
    resolver: zodResolver(inquiryFormSchema),
    defaultValues: {
      inquiry_type: "Specific Property",
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      message: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/inquiries/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...data,
            property: project.id,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to submit inquiry");
      toast.success("Inquiry submitted successfully!");
      form.reset();
    } catch (error) {
      console.error("Error submitting inquiry:", error);
      toast.error("Failed to submit inquiry. Please try again.");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="inquiry_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Inquiry Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select inquiry type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Specific Property">
                    Specific Property
                  </SelectItem>
                  <SelectItem value="General Inquiry">
                    General Inquiry
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="First name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Last name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email address" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="Phone number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write your message here..."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full bg-yellow-400 text-black hover:bg-yellow-500"
        >
          Submit Inquiry
        </Button>
      </form>
    </Form>
  );
};

const ProjectDetails = ({ project }) => (
  <div className="grid lg:grid-cols-3 gap-4 sm:gap-8">
    <div className="lg:col-span-2 space-y-8">
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <h2 className="text-xl font-bold mb-4">Overview</h2>
        <div
          dangerouslySetInnerHTML={{ __html: project.project_description }}
        />
      </div>

      {project.features?.length > 0 && (
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h2 className="text-xl font-bold mb-4">Features</h2>
          <div className="grid grid-cols-2 gap-4">
            {project.features.map((feature) => (
              <div key={feature.id} className="flex items-center gap-2">
                {feature.image && (
                  <Image
                    src={feature.image}
                    alt={feature.name}
                    width={24}
                    height={24}
                  />
                )}
                <span>{feature.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {project.price_breakdown && (
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h2 className="text-xl font-bold mb-4">Price Breakdown</h2>
          <div dangerouslySetInnerHTML={{ __html: project.price_breakdown }} />
        </div>
      )}
    </div>

    <div className="lg:col-span-1">
      <div className="sticky top-20 space-y-4">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="mb-4">
            <h3 className="text-xl font-bold mb-2">Price</h3>
            <p className="text-2xl font-bold text-yellow-600">
              {project.price ? formatCurrency(project.price) : "Price TBD"}
            </p>
            {project.availability && (
              <div className="flex items-center gap-2 text-green-600 mt-2">
                <span className="inline-block w-2 h-2 rounded-full bg-green-600"></span>
                <span>Available</span>
              </div>
            )}
            {project.avialable_date && (
              <div className="flex items-center gap-2 text-gray-600 mt-2">
                <Calendar className="w-4 h-4" />
                <span>Available from {formatDate(project.avialable_date)}</span>
              </div>
            )}
          </div>
          <InquiryForm project={project} />
        </div>
      </div>
    </div>
  </div>
);

export default function ProjectDetailPage() {
  const params = useParams();
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  useEffect(() => {
    fetchProject();
  }, []);

  const fetchProject = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/projects/${params.slug}/`
      );
      if (!response.ok) throw new Error("Failed to fetch project");
      const data = await response.json();
      setProject(data);
    } catch (error) {
      showError("Failed to fetch project");
      console.error("Error fetching project:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading || !project) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Image Gallery */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
            <div className="lg:col-span-2 relative rounded-lg overflow-hidden shadow-lg">
              <img
                src={
                  project.images[currentImageIndex]?.image || placeholderImage
                }
                alt={project.name}
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute bottom-4 right-4 flex gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() =>
                    setCurrentImageIndex((prev) =>
                      prev === 0 ? project.images.length - 1 : prev - 1
                    )
                  }
                  className="bg-white/90 hover:bg-white"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() =>
                    setCurrentImageIndex((prev) =>
                      prev === project.images.length - 1 ? 0 : prev + 1
                    )
                  }
                  className="bg-white/90 hover:bg-white"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
              {project.images.slice(1, 3).map((image, index) => (
                <div
                  key={index}
                  className="relative rounded-lg overflow-hidden shadow-lg h-[240px] cursor-pointer"
                  onClick={() => setShowAllPhotos(true)}
                >
                  <img
                    src={image.image || placeholderImage}
                    alt={`${project.name} - View ${index + 2}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Project Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">{project.name}</h1>
            <div className="flex items-center gap-4 text-gray-600">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {project.project_address}
              </div>
              {project.city && (
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  {project.city.name}, {project.city.state.name}
                </div>
              )}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <Building2 className="h-5 w-5" />
                <span>Type</span>
              </div>
              <p className="text-lg font-semibold">{project.project_type}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <BedDouble className="h-5 w-5" />
                <span>Bedrooms</span>
              </div>
              <p className="text-lg font-semibold">{project.bedrooms}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <Bath className="h-5 w-5" />
                <span>Bathrooms</span>
              </div>
              <p className="text-lg font-semibold">{project.bathrooms}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <Car className="h-5 w-5" />
                <span>Garage</span>
              </div>
              <p className="text-lg font-semibold">
                {project.garage_spaces} spaces
              </p>
            </div>
          </div>

          {/* Main Content */}
          <ProjectDetails project={project} />
        </div>
      </div>

      {/* Image Gallery Dialog */}
      <Dialog open={showAllPhotos} onOpenChange={setShowAllPhotos}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>All Photos</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {project.images.map((image, index) => (
              <div
                key={index}
                className="relative aspect-square rounded-lg overflow-hidden"
              >
                <img
                  src={image.image || placeholderImage}
                  alt={`${project.name} - View ${index + 1}`}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
