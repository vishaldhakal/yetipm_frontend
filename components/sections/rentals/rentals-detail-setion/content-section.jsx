"use client";

import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import Image from "next/image";

export default function PropertyDetails({ rentalDetail }) {
  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="grid md:grid-cols-[1fr,400px] gap-8">
        {/* Left Column */}
        <div className="space-y-8">
          {/* Monthly Rent Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Total monthly rent</h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-baseline border-b border-dotted border-gray-300 pb-2">
                  <span className="text-lg font-semibold text-green-700">
                    Total
                  </span>
                  <span className="text-2xl font-bold text-green-700">
                    ${rentalDetail.price}
                    <span className="text-sm font-normal">/mo</span>
                  </span>
                </div>

                <div
                  dangerouslySetInnerHTML={{
                    __html: rentalDetail.price_breakdown,
                  }}
                />

                <div className="text-sm text-gray-500 mt-4 space-y-2">
                  <p>
                    Estimated total monthly rent does not include utilities or
                    optional and conditional fees including, but not limited to,
                    pet fees and renters' or similar insurance.{" "}
                    <a href="#" className="text-green-700 hover:underline">
                      Learn more about leasing fees
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Home Features Section */}
          {rentalDetail.features.length > 0 && (
            <section>
              <h2 className="text-2xl font-semibold mb-4">Home features</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {rentalDetail.features.map((feature) => (
                  <div key={feature.id} className="flex items-center gap-2">
                    <span className="text-2xl">🏠</span>
                    <span className="text-gray-700">{feature.name}</span>
                    {feature.name.toLowerCase().includes("pet") && (
                      <Info className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Home Description Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Home description</h2>
            <div className="space-y-4">
              <div
                className="text-gray-700"
                dangerouslySetInnerHTML={{
                  __html: rentalDetail.project_description,
                }}
              />
            </div>
          </section>
        </div>

        {/* Right Column */}
        <div className="bg-[#2F4F4F] text-white rounded-lg overflow-hidden">
          <Image
            src="/image.png"
            alt="People looking at something together"
            width={400}
            height={300}
            className="w-full object-cover"
          />
          <div className="p-6 space-y-6">
            <h2 className="text-2xl font-semibold">Before you apply</h2>
            <p>
              Please read the Qualification Requirements and Leasing Fees Guide
              before applying for a lease.
            </p>
            <div className="space-y-4">
              <Button variant="outline" className="text-black">
                View Qualification Requirements
              </Button>
              <Button variant="outline" className="text-black">
                Review the Leasing Guide
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
