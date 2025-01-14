"use client";

import { ProjectForm } from "@/components/forms/project-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function NewProjectPage() {
  const router = useRouter();

  const handleSuccess = () => {
    router.refresh(); // Refresh the current route
    router.push("/admin/projects");
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-start items-center max-w-5xl mx-auto gap-2 sticky top-0 bg-gray-100 z-10 p-3 shadow-sm">
        <Link href="/admin/projects">
          <Button variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </Link>
        <h2 className="text-2xl font-bold tracking-tight">
          Create New Project
        </h2>
      </div>
      <ProjectForm onSuccess={handleSuccess} />
    </div>
  );
}
