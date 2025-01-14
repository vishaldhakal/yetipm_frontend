import Link from "next/link";
import Image from "next/image";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        {/* Top Section - Popular Cities */}
        <div className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">
            <span className="text-primary">Popular Rental Locations</span>
            <span className="block text-base font-normal text-gray-600 mt-2">
              Find your next home in these popular Texas cities
            </span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              "Austin",
              "Dallas",
              "Houston",
              "San Antonio",
              "Fort Worth",
              "El Paso",
              "Arlington",
              "Plano",
              "Frisco",
              "Irving",
              "McKinney",
              "Round Rock",
            ].map((city) => (
              <Link
                key={city}
                href={`/${city.toLowerCase()}/rentals`}
                className="text-gray-600 hover:text-primary transition-colors duration-200 text-sm py-2 px-4 rounded-lg hover:bg-gray-50"
              >
                {city}
              </Link>
            ))}
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 border-t border-gray-200 pt-12">
          {/* Company Info */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="block">
              <Image
                src="/logo.svg"
                alt="Texas Rentals Logo"
                width={150}
                height={50}
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-gray-600 max-w-md">
              Your trusted partner in finding the perfect rental home across
              Texas. Professional property management and exceptional service,
              available 24/7.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: FaFacebook, href: "#", label: "Facebook" },
                { icon: FaInstagram, href: "#", label: "Instagram" },
                { icon: FaTwitter, href: "#", label: "Twitter" },
                { icon: FaLinkedin, href: "#", label: "LinkedIn" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="text-gray-400 hover:text-primary transition-colors duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              For Renters
            </h3>
            <ul className="space-y-3">
              {[
                { label: "Search Rentals", href: "/rentals" },
                { label: "Apply Now", href: "/apply" },
                { label: "Rental Guide", href: "/guide" },
                { label: "Resident Portal", href: "/portal" },
                { label: "Maintenance Request", href: "/maintenance" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-primary transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Property Types */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Property Types
            </h3>
            <ul className="space-y-3">
              {[
                { label: "Apartments", href: "/apartments" },
                { label: "Single Family Homes", href: "/houses" },
                { label: "Townhomes", href: "/townhomes" },
                { label: "Luxury Rentals", href: "/luxury" },
                { label: "Pet-Friendly", href: "/pet-friendly" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-primary transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-600">
                <span className="mr-3">📍</span>
                <span>123 Main Street, Austin, TX 78701</span>
              </li>
              <li>
                <a
                  href="tel:888-123-4567"
                  className="flex items-center text-gray-600 hover:text-primary transition-colors duration-200"
                >
                  <span className="mr-3">📞</span>
                  <span>(888) 123-4567</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@texasrentals.com"
                  className="flex items-center text-gray-600 hover:text-primary transition-colors duration-200"
                >
                  <span className="mr-3">📧</span>
                  <span>info@texasrentals.com</span>
                </a>
              </li>
              <li className="flex items-center text-gray-600">
                <span className="mr-3">⏰</span>
                <span>Mon-Fri: 9AM-6PM CST</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <p className="text-sm text-gray-600 text-center md:text-left">
              © {new Date().getFullYear()} Texas Rentals. All rights reserved.
              Licensed Real Estate Broker in Texas.
            </p>
            <div className="flex flex-wrap justify-center md:justify-end gap-4 text-sm text-gray-600">
              <Link
                href="/privacy"
                className="hover:text-primary transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="hover:text-primary transition-colors duration-200"
              >
                Terms of Service
              </Link>
              <Link
                href="/accessibility"
                className="hover:text-primary transition-colors duration-200"
              >
                Accessibility
              </Link>
              <Link
                href="/fair-housing"
                className="hover:text-primary transition-colors duration-200"
              >
                Fair Housing
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
