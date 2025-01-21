import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ClipboardList, FileText, Home } from "lucide-react"

export default function ApplyNow() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[300px] md:h-[400px] bg-[#0B2447]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url("/hero.png")',
            opacity: "0.3",
          }}
        />
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white">Apply Now</h1>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0B2447] mb-6">
              Application Process for Residential Listings
            </h2>
            <p className="text-lg text-gray-600">Our online application process is simple and straight-forward.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Terms & Conditions */}
            <Card className="border-none shadow-lg">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-[#B36B39] rounded-lg flex items-center justify-center mb-4">
                  <ClipboardList className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-[#0B2447]">Terms & Conditions</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Our terms and conditions and property guidelines describe what we are looking for with our residents.
                  Take the time to read this information so you are confident in accepting the terms.
                </p>
              </CardContent>
            </Card>

            {/* Submit Application */}
            <Card className="border-none shadow-lg">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-[#B36B39] rounded-lg flex items-center justify-center mb-4">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-[#0B2447]">Submit An Application</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Apply directly online, or contact your local Caras Property Management office if alternative
                  arrangements are needed for submitting your application.
                </p>
              </CardContent>
            </Card>

            {/* Property Showing */}
            <Card className="border-none shadow-lg">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-[#B36B39] rounded-lg flex items-center justify-center mb-4">
                  <Home className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-[#0B2447]">Set-up a Property Showing</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  When you find a property you are interested in, contact your local Caras Property Management office to
                  view the listing to determine if it will fit your needs.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

