import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="min-h-[90vh] bg-[#F8F9FA] px-4 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-start">
          <div className="max-w-[600px] pt-16">
            <h1 className="text-[64px] font-bold leading-[1.1] mb-4">
              Find Your Perfect Rental Home in Texas
            </h1>
            <h2 className="text-[40px] mb-4">Austin • Dallas • Houston</h2>
            <p className="text-gray-600 text-xl mb-8 max-w-[500px]">
              Professional property management, 24/7 maintenance, and a seamless
              rental experience across Texas's most desirable locations.
            </p>
            <div className="flex gap-4">
              <Button className="rounded-full bg-[#0B3B2C] hover:bg-[#0B3B2C]/90 text-white px-8 py-6 text-lg">
                Search Rentals
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button className="rounded-full bg-white hover:bg-gray-50 text-[#0B3B2C] px-8 py-6 text-lg border-2 border-[#0B3B2C]">
                Schedule a Tour
              </Button>
            </div>
          </div>

          <div className="relative flex-1 mt-16 lg:mt-0">
            <Image
              src="/texas-homes.png"
              alt="Texas Rental Properties"
              width={800}
              height={600}
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
