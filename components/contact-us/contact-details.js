import { MapPin, Phone, Mail } from "lucide-react";

export default function ContactDetails() {
  return (
    <div className="container mx-auto px-4 lg:py-12">
      <div className="max-w-4xl mx-auto p-6 lg:p-8 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {/* Address Section */}
          <div className="flex flex-col items-center text-center">
            <MapPin className="text-blue-500 w-10 h-10 mb-4" />
            <div>
              <h3 className="font-semibold text-lg mb-2">Address</h3>
              <p>Naxal-19, Kathmandu, Nepal</p>
              <p>Lorem Ipsum Street 85486</p>
            </div>
          </div>

          {/* Phone Section */}
          <div className="flex flex-col items-center text-center">
            <Phone className="text-blue-500 w-10 h-10 mb-4" />
            <h3 className="font-semibold text-lg mb-2">Contact Number</h3>
            <p>+01-123456, 561657</p>
            <p>+977 9800000001</p>
          </div>

          {/* Email Section */}
          <div className="flex flex-col items-center text-center">
            <Mail className="text-blue-500 w-10 h-10 mb-4" />
            <div>
              <h3 className="font-semibold text-lg mb-2">Email</h3>
              <p>syangdenholidays@gmail.com</p>
              <p>syangden@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 