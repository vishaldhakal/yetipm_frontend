"use client";

import { useState, useEffect } from "react";
import { ProjectForm } from "@/components/forms/project-form";
import { Loading } from "@/components/ui/loading";
import { showError } from "@/lib/alerts";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function EditProjectPage({ params }) {
  const router = useRouter();
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProject();
  }, [params.slug]);

  const fetchProject = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/projects/${params.slug}/`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch project");
      }
      const data = await response.json();
      setProject(data);
    } catch (error) {
      showError("Failed to fetch project");
      console.error("Error fetching project:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuccess = () => {
    router.refresh(); // Refresh the current route
    router.push("/admin/projects");
  };

  if (isLoading) {
    return <Loading />;
  }

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-start items-center max-w-5xl mx-auto gap-2 sticky top-0 bg-gray-100 z-10 p-3 shadow-sm">
        <Link href="/admin/projects">
          <Button variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </Link>
        <h2 className="text-2xl font-bold tracking-tight">Edit Project</h2>
      </div>
      <ProjectForm initialData={project} onSuccess={handleSuccess} />
    </div>
  );
}
