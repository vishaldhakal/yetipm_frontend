"use client";

import { ArrowLeft, ArrowRight, ExternalLink, Heart } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function NearbySections() {
  return (
    <div className="max-w-7xl mx-auto p-4 space-y-12">
      {/* Nearby Schools Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Nearby Schools</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              name: "Blazier Elementary School",
              distance: "1.39",
              grades: "PK-6",
            },
            {
              name: "Akins High School",
              distance: "1.95",
              grades: "9-12",
            },
            {
              name: "Perez Elementary School",
              distance: "2.13",
              grades: "PK-6",
            },
          ].map((school) => (
            <Card key={school.name} className="group">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-sm text-gray-600 mb-2">
                      {school.distance} miles away
                    </div>
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-blue-600">
                      {school.name}
                    </h3>
                    <div className="text-sm text-gray-600">
                      Grades: {school.grades}
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Similar Homes Section */}
      <section>
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Similar Homes</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[
            {
              image: "/placeholder.svg",
              rent: "2,235",
              allInPrice: "2,294",
              beds: 4,
              baths: 2,
              sqft: "1,895",
              address: "10517 Steinbeck Dr",
              city: "Austin",
              state: "TX",
              zip: "78747",
              available: "Feb 08",
              imageCount: "Photos Coming Soon",
              hasVirtualTour: false,
            },
            {
              image: "",
              rent: "2,290",
              allInPrice: "2,434",
              beds: 4,
              baths: 2.5,
              sqft: "2,124",
              address: "10316 Cameo Lane",
              city: "Austin",
              state: "TX",
              zip: "78747",
              available: "Now",
              imageCount: "1 of 18",
              hasVirtualTour: true,
            },
            {
              image: "/placeholder.svg",
              rent: "1,660",
              allInPrice: "1,719",
              beds: 3,
              baths: 2.5,
              sqft: "1,350",
              address: "318 Shady Bluff Drive",
              city: "Wimberley",
              state: "TX",
              zip: "78676",
              available: "Now",
              imageCount: "1 of 10",
              hasVirtualTour: false,
            },
            {
              image: "/placeholder.svg",
              rent: "1,610",
              allInPrice: "1,719",
              beds: 3,
              baths: 2.5,
              sqft: "1,350",
              address: "11014 Oak Street",
              city: "Jonestown",
              state: "TX",
              zip: "78645",
              available: "Now",
              imageCount: "1 of 15",
              hasVirtualTour: true,
            },
          ].map((home) => (
            <Card key={home.address} className="group overflow-hidden">
              <div className="relative aspect-[4/3]">
                <Image
                  src={home.image}
                  alt={home.address}
                  fill
                  className="object-cover"
                />
                {home.hasVirtualTour && (
                  <div className="absolute top-2 left-2 bg-white rounded-full px-2 py-1 text-xs font-medium">
                    360° tour
                  </div>
                )}
                <div className="absolute top-2 right-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="bg-white/80 hover:bg-white"
                  >
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-sm px-2 py-1 rounded-full">
                  {home.imageCount}
                </div>
              </div>
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="flex items-baseline gap-2">
                    <span className="font-semibold">${home.rent}/mo rent</span>
                    <span className="text-green-600 font-medium">
                      ${home.allInPrice} all-in price
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {home.beds} beds • {home.baths} baths • {home.sqft} sqft
                  </div>
                  <div className="text-sm">
                    <div>{home.address}</div>
                    <div className="text-gray-600">
                      {home.city}, {home.state} {home.zip}
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <div className="text-xs uppercase text-gray-500">
                      Available
                    </div>
                    <div
                      className={`text-sm font-medium ${
                        home.available === "Now" ? "text-green-600" : ""
                      }`}
                    >
                      {home.available}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
