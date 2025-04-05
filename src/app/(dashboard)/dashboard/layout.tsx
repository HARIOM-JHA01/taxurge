"use client";
import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import DashboardSidebar from "@/components/Dashboard/DashboardSidebar";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Service } from "@/types/service";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeService, setActiveService] = useState<Service | null>(null);
  const [activeTab, setActiveTab] = useState<string>("services");

  const handleServiceSelect = (service: Service) => {
    setActiveService(service);
    setSidebarOpen(false);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <ToastContainer />
      <div className="flex h-screen overflow-hidden">
        {/* Mobile sidebar */}
        <Transition show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-40 flex md:hidden"
            onClose={setSidebarOpen}
          >
            {/* Overlay */}
            <Transition.Child
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>

            {/* Sidebar */}
            <Transition.Child
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white dark:bg-gray-950">
                {/* Close button */}
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    type="button"
                    className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <svg
                      className="h-6 w-6 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                {/* Sidebar content */}
                <div className="flex-1 h-0 overflow-y-auto">
                  <DashboardSidebar 
                    activeService={activeService} 
                    onServiceSelect={handleServiceSelect}
                    activeTab={activeTab}
                    onTabChange={handleTabChange}
                  />
                </div>
              </div>
            </Transition.Child>
          </Dialog>
        </Transition>

        {/* Desktop sidebar */}
        <div className="hidden md:flex md:w-64 md:flex-col">
          <div className="flex flex-col flex-grow border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-sm overflow-y-auto">
            <DashboardSidebar 
              activeService={activeService} 
              onServiceSelect={handleServiceSelect}
              activeTab={activeTab}
              onTabChange={handleTabChange}
            />
          </div>
        </div>

        {/* Mobile sidebar toggle */}
        <div className="md:hidden fixed bottom-4 right-4 z-20">
          <button
            className="p-3 rounded-full bg-primary text-white shadow-lg"
            aria-label="Toggle Sidebar"
            onClick={() => setSidebarOpen(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Main content */}
        <div className="flex flex-col flex-1 overflow-y-auto">
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </div>
  );
}