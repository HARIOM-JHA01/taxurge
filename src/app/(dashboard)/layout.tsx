"use client";
import React from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <ToastContainer />
      <div className="flex h-screen overflow-hidden">
        {/* Main content */}
        <div className="flex flex-col flex-1 overflow-y-auto">
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </div>
  );
}