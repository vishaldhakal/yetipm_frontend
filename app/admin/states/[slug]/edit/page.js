"use client";

import { useState, useEffect } from "react";
import { StateForm } from "@/components/forms/state-form";
import { useRouter } from "next/navigation";
import { showError } from "@/lib/alerts";

export default function EditStatePage({ params }) {
  const router = useRouter();
  const [state, setState] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchState();
  }, []);

  const fetchState = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/states/${params.slug}/`
      );
      const data = await response.json();
      setState(data);
    } catch (error) {
      showError("Failed to fetch state");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuccess = () => {
    router.push("/admin/states");
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold tracking-tight">Edit Province</h2>
      <StateForm initialData={state} onSuccess={handleSuccess} />
    </div>
  );
}
