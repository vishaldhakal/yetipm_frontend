"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { User, LayoutDashboard, MapPin, Home, Globe } from "lucide-react";

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/admin",
    color: "text-blue-600",
  },
  {
    label: "Provinces",
    icon: Globe,
    href: "/admin/states",
    color: "text-blue-600",
  },
  {
    label: "Cities",
    icon: MapPin,
    href: "/admin/cities",
    color: "text-blue-600",
  },
  {
    label: "Projects",
    icon: Home,
    href: "/admin/projects",
    color: "text-blue-600",
  },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-white border-r shadow-sm">
      <div className="px-3 py-2 flex-1">
        <Link
          href="/admin"
          className="flex items-center pl-3 mb-14 transition-transform hover:scale-[0.98]"
        >
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Admin
          </h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer rounded-lg transition-all duration-300 ease-in-out",
                pathname === route.href
                  ? "bg-blue-50 text-blue-700 shadow-sm"
                  : "text-gray-600 hover:bg-gray-50 hover:text-blue-600",
                "relative overflow-hidden"
              )}
            >
              <div className="flex items-center flex-1 relative z-10">
                <route.icon
                  className={cn(
                    "h-5 w-5 mr-3 transition-colors duration-300",
                    pathname === route.href
                      ? "text-blue-600"
                      : "text-gray-400 group-hover:text-blue-600"
                  )}
                />
                {route.label}
              </div>
              {pathname === route.href && (
                <div className="absolute left-0 top-0 h-full w-1 bg-blue-600" />
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
