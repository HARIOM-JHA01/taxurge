"use client";
import React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import gstServicesData from "@/components/Services/gstServicesData";
import incomeTaxServicesData from "@/components/Services/incomeTaxServicesData";
import { Service } from "@/types/service";

type SidebarProps = {
  activeService: Service | null;
  onServiceSelect: (service: Service) => void;
};

const Sidebar = ({ activeService, onServiceSelect }: SidebarProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isDocumentsView = searchParams.get('view') === 'documents';

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    router.push("/login");
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold text-primary">Dashboard</h2>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-6">
        {/* Services Section */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Services</h3>
          
          {/* GST Services */}
          <div className="mb-4">
            <h4 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-2">GST Services</h4>
            <ul className="space-y-1">
              {gstServicesData.map((service) => (
                <li key={service.id}>
                  <button
                    onClick={() => onServiceSelect(service)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm ${activeService?.id === service.id
                      ? "bg-primary/10 text-primary font-medium"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                  >
                    {service.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Income Tax Services */}
          <div>
            <h4 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-2">Income Tax Services</h4>
            <ul className="space-y-1">
              {incomeTaxServicesData.map((service) => (
                <li key={service.id}>
                  <button
                    onClick={() => onServiceSelect(service)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm ${activeService?.id === service.id
                      ? "bg-primary/10 text-primary font-medium"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                  >
                    {service.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Documents Section */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Documents</h3>
          <ul className="space-y-1">
            <li>
              <Link
                href="/dashboard?view=documents"
                className={`block px-3 py-2 rounded-md text-sm ${isDocumentsView ? "bg-primary/10 text-primary font-medium" : "hover:bg-gray-100 dark:hover:bg-gray-800"}`}
              >
                Uploaded Documents
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Logout Button */}
      <div className="p-4 border-t mt-auto">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;