"use client";
import React, { useRef, useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import gstServicesData from "@/components/Services/gstServicesData";
import incomeTaxServicesData from "@/components/Services/incomeTaxServicesData";
import { Service } from "@/types/service";
import DashboardSidebar from "@/components/Dashboard/DashboardSidebar";

const DashboardContent = () => {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const searchParams = useSearchParams();
  const [files, setFiles] = useState<File[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [fileList, setFileList] = useState<{ name: string, url: string }[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("services");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("name");
    if (!token) {
      router.push("/login");
    } else {
      setUserName(name);
      fetchFileList(token);
    }

    // Check if we should show documents view
    const view = searchParams.get('view');
    if (view === 'documents') {
      setActiveTab('documents');
    } else {
      setActiveTab('services');
    }
  }, [searchParams, router]);

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
    setActiveTab('services');
  };

  const fetchFileList = async (token: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/users/download', {
        headers: {
          'token': token,
        },
      });

      if (response.ok) {
        const data: string[] = await response.json();
        const files = data.map(url => ({
          name: url.split('/').pop() || 'File',
          url,
        }));
        setFileList(files);
      } else {
        toast.error("Failed to fetch file list.");
      }
    } catch (error) {
      toast.error("Error fetching file list.");
      console.error("Error fetching file list:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFiles = Array.from(event.target.files);
      setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    const token = localStorage.getItem("token");
    if (!token || !files.length) {
      toast.error("Please select files to upload");
      return;
    }

    setIsUploading(true);
    try {
      toast.info("Uploading...");
      const formData = new FormData();
      files.forEach((file) => {
        formData.append('uploadedDocuments', file);
      });

      const response = await fetch('/api/users/upload', {
        method: 'POST',
        headers: {
          'token': token,
        },
        body: formData,
      });

      if (response.ok) {
        toast.success("Files uploaded successfully");
        setFiles([]);
        fetchFileList(token); // Refresh file list after upload
      } else {
        const errorText = await response.text();
        toast.error(`Failed to upload files: ${errorText}`);
        console.error(`Failed to upload files: ${errorText}`);
      }
    } catch (error) {
      toast.error("Error uploading files.");
      console.error("Error uploading files:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDownloadFile = async (fileUrl: string, fileName: string) => {
    try {
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      toast.error("Error downloading file.");
      console.error("Error downloading file:", error);
    }
  };

  return (
    <div className="flex flex-col flex-1 w-full">
      <main className="flex-1 overflow-y-auto focus:outline-none">
        <div className="py-6 px-4 sm:px-6 lg:px-8">
            {/* Welcome Section */}
            <Card className="mb-8 border-none shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-3xl font-bold text-primary">
                  Welcome, {userName || 'User'}!
                </CardTitle>
                <p className="text-gray-600 dark:text-gray-400">
                  {activeTab === 'services' 
                    ? 'Select a service to get started with your document submission.' 
                    : 'View and manage your uploaded documents.'}
                </p>
              </CardHeader>
            </Card>

            {/* Tabs for mobile view */}
            <div className="md:hidden mb-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="services">Services</TabsTrigger>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Content based on active tab */}
            {activeTab === 'services' && (
              <div className="space-y-8">
                {!selectedService ? (
                  <Card className="border-none shadow-md">
                    <CardHeader className="pb-2 border-b">
                      <CardTitle>Please select a service</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <p className="text-gray-600 dark:text-gray-400">
                        Choose a service from the sidebar to view details and upload documents.
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  <>
                    {/* Service Details Section */}
                    <Card className="border-none shadow-md">
                      <CardHeader className="pb-2 border-b">
                        <CardTitle>{selectedService.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <div className="prose dark:prose-invert max-w-none">
                          <p className="text-gray-600 dark:text-gray-400">{selectedService.description}</p>
                          {selectedService?.features && (
                            <div className="mt-6">
                              <h3 className="text-lg font-semibold mb-4">Features & Requirements</h3>
                              <ul className="list-disc pl-5 space-y-2">
                                {selectedService.features.map((feature, index) => (
                                  <li key={index} className="text-gray-600 dark:text-gray-400">{feature}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Document Upload Section */}
                    <Card className="border-none shadow-md">
                      <CardHeader className="pb-2 border-b">
                        <CardTitle>Upload Documents for {selectedService.title}</CardTitle>
                        <p className="text-sm text-gray-500 mt-2">{selectedService.description}</p>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <div className="space-y-6">
                          <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Input
                              ref={fileInputRef}
                              type="file"
                              multiple
                              onChange={handleFileChange}
                              className="cursor-pointer"
                            />
                          </div>

                          {files.length > 0 && (
                            <div>
                              <h3 className="text-lg font-semibold mb-4">Selected Files:</h3>
                              <ul className="space-y-2">
                                {files.map((file, index) => (
                                  <li
                                    key={index}
                                    className="flex items-center justify-between rounded-lg bg-gray-100 p-3 dark:bg-gray-800"
                                  >
                                    <span className="truncate">{file.name}</span>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => handleRemoveFile(index)}
                                      className="ml-2 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                                    >
                                      Remove
                                    </Button>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          <Button
                            onClick={handleUpload}
                            disabled={isUploading || files.length === 0}
                            className="w-full sm:w-auto"
                          >
                            {isUploading ? (
                              <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Uploading...
                              </>
                            ) : (
                              'Upload Documents'
                            )}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </>
                )}
              </div>
            )}

            {/* Uploaded Documents Section */}
            {activeTab === 'documents' && (
              <Card className="border-none shadow-md">
                <CardHeader className="pb-2 border-b">
                  <CardTitle>Uploaded Documents</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                {isLoading ? (
                  <div className="flex justify-center items-center py-8">
                    <svg className="animate-spin h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </div>
                ) : fileList.length > 0 ? (
                  <ul className="space-y-2">
                    {fileList.map((file, index) => (
                      <li
                        key={index}
                        className="flex items-center justify-between rounded-lg bg-gray-100 p-3 dark:bg-gray-800"
                      >
                        <span className="truncate">{file.name}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownloadFile(file.url, file.name)}
                          className="ml-2"
                        >
                          Download
                        </Button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-600 dark:text-gray-400">No documents have been uploaded yet.</p>
                  </div>
                )}
              </CardContent>
            </Card>
            )}
        </div>
      </main>

      {/* Mobile sidebar toggle */}
      <div className="md:hidden fixed bottom-4 right-4 z-20">
        <Button
          className="p-3 rounded-full shadow-lg"
          aria-label="Toggle Sidebar"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
};

const Dashboard = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DashboardContent />
    </Suspense>
  );
};

export default Dashboard;