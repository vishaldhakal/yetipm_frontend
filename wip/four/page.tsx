import Link from "next/link";
import { Shield, Home, PawPrint, Building } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function Ending() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-2xl md:text-3xl text-gray-800">
              Invitation Homes difference
            </h2>
            <Link
              href="/about"
              className="text-[#447B11] hover:text-[#346008] flex items-center gap-2"
            >
              Learn more about us
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-gray-50">
              <CardContent className="p-6">
                <Shield className="w-8 h-8 text-[#447B11] mb-4" />
                <h3 className="text-xl font-semibold mb-3">
                  Lease Easy bundle
                </h3>
                <p className="text-gray-600 mb-4">
                  Our bundle of services is part of the worry-free leasing
                  lifestyle. You get Air filter delivery, Utility Management and
                  Smart Home technology built into your lease for a small fee.
                </p>
                <Link
                  href="/lease-easy"
                  className="text-[#447B11] hover:text-[#346008]"
                >
                  Learn more
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-gray-50">
              <CardContent className="p-6">
                <Home className="w-8 h-8 text-[#447B11] mb-4" />
                <h3 className="text-xl font-semibold mb-3">ProCare service</h3>
                <p className="text-gray-600 mb-4">
                  Our local team of maintenance pros ensures a hassle-free
                  move-in and conducts proactive visits. Easily request service
                  on the app and always 24/7 emergency services.
                </p>
                <Link
                  href="/procare"
                  className="text-[#447B11] hover:text-[#346008]"
                >
                  Learn more
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-gray-50">
              <CardContent className="p-6">
                <PawPrint className="w-8 h-8 text-[#447B11] mb-4" />
                <h3 className="text-xl font-semibold mb-3">
                  Pet-friendly homes
                </h3>
                <p className="text-gray-600 mb-4">
                  Your pets are going to love living in a house with spaces you
                  can shape to fit their lifestyle. Up to 3 pets are welcome in
                  our homes and yards. Pet rent and other fees apply.
                </p>
                <Link
                  href="/pet-friendly"
                  className="text-[#447B11] hover:text-[#346008]"
                >
                  Learn more
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-gray-50">
              <CardContent className="p-6">
                <Building className="w-8 h-8 text-[#447B11] mb-4" />
                <h3 className="text-xl font-semibold mb-3">
                  The Invitation Homes difference
                </h3>
                <p className="text-gray-600 mb-4">
                  Live freer in an updated house and an awesome neighborhood
                  with Smart Home technology. all supported by our local team of
                  leasing pros.
                </p>
                <Link
                  href="/difference"
                  className="text-[#447B11] hover:text-[#346008]"
                >
                  Learn more
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-white py-8 px-4">
        <div className="container mx-auto">
          <p className="text-sm text-gray-600 mb-4">
            Brokerage License Number: 9008298
          </p>
          <p className="text-sm text-gray-600 mb-4">
            Lease your Invitation Home through{" "}
            <Link href="https://InvitationHomes.com" className="text-[#447B11]">
              InvitationHomes.com
            </Link>{" "}
            or with the help of a licensed leasing agent. All leasing
            information is believed to be accurate, but changes may have
            occurred since photographs were taken and square footage is
            estimated. Furthermore, prices and dates may change without notice.
            Invitation Homes does not lease homes through Craigslist or other
            classified advertising services. Please note this home may be
            governed by a HOA and could require additional applications and/or
            fees. An account set-up fee will be charged on all new leases. To
            better serve our residents, Invitation Homes is pet-friendly with
            some breed restrictions and allows up to three pets with a monthly
            fee. If your home has a pool, a monthly fee is applied. Broker
            participation welcome, so please refer to MLS. Please contact your
            leasing agent for more information.
          </p>
          <div className="space-y-2">
            <Link
              href="/consumer-protection"
              className="block text-sm text-[#447B11] hover:text-[#346008]"
            >
              TREC Consumer Protection Notice
            </Link>
            <Link
              href="/brokerage-service"
              className="block text-sm text-[#447B11] hover:text-[#346008]"
            >
              TREC Information About Brokerage Service
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
