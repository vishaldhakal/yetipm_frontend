"use client";

import { StateForm } from "@/components/forms/state-form";
import { useRouter } from "next/navigation";

export default function NewStatePage() {
  const router = useRouter();

  const handleSuccess = () => {
    router.push("/admin/states");
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold tracking-tight">Create New Province</h2>
      <StateForm onSuccess={handleSuccess} />
    </div>
  );
}
