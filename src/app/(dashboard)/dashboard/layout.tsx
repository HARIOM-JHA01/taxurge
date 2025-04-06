"use client";
import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import CustomSidebar from "@/components/Dashboard/CustomSidebar";
import DashboardHeader from "@/components/Dashboard/DashboardHeader";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Service } from "@/types/service";
import { useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeService, setActiveService] = useState<Service | null>(null);
  const [activeTab, setActiveTab] = useState<string>("services");
  const [userName, setUserName] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const name = localStorage.getItem("name");
    setUserName(name);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    router.push("/login");
  };

  const handleServiceSelect = (service: Service) => {
    setActiveService(service);
    setSidebarOpen(false);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setSidebarOpen(false);
  };

  // Clone children with additional props
  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child as React.ReactElement<any>, { selectedService: activeService });
    }
    return child;
  });

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-gray-900 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
      <ToastContainer />
      <div className="flex flex-col h-screen overflow-hidden">
        <DashboardHeader 
          userName={userName}
          onLogout={handleLogout}
        />
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
            {childrenWithProps}
          </div>
        </div>
      </div>
    </div>
  );
}