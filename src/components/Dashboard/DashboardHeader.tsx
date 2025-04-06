"use client";
import React from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

type DashboardHeaderProps = {
  userName: string | null;
  onLogout: () => void;
};

const DashboardHeader = ({ userName, onLogout }: DashboardHeaderProps) => {
  const { theme, setTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4">
      <div className="flex justify-between items-center">
        <div className="text-lg font-semibold text-gray-900 dark:text-white">
          Welcome, {userName || 'User'}
        </div>
        <div className="text-2xl font-bold text-primary">
          TaxUrge
        </div>
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
          <Button
            variant="destructive"
            onClick={onLogout}
            className="transition-all duration-200 hover:scale-105 active:scale-95 hover:opacity-90"
          >
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;