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

interface DashboardContentProps {
  selectedService?: Service | null;
}

const DashboardContent = ({ selectedService: initialSelectedService }: DashboardContentProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [files, setFiles] = useState<File[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(initialSelectedService || null);
  const [services] = useState([
    ...gstServicesData,
    ...incomeTaxServicesData
  ]);

  useEffect(() => {
    if (initialSelectedService) {
      setSelectedService(initialSelectedService);
      setActiveTab('services');
    }
  }, [initialSelectedService]);
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
    if (service.id !== selectedService?.id) {
      setSelectedService(service);
      setActiveTab('services');
    }
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
          <Tabs defaultValue="services" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="services">Services</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="payment">Payment</TabsTrigger>
            </TabsList>

            <TabsContent value="services">
              <Card className="border-none shadow-md text-black">
                <CardHeader>
                  <CardTitle className="text-black dark:text-white">Available Services</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="w-full max-w-md mb-6">
                    <select
                      className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 text-black dark:text-white"
                      value={selectedService?.id?.toString() || ''}
                      onChange={(e) => {
                        const service = services.find(s => s.id === Number(e.target.value));
                        if (service) handleServiceSelect(service);
                      }}
                    >
                      <option value="">Select a service</option>
                      <optgroup label="GST Services">
                        {gstServicesData.map(service => (
                          <option key={service.id} value={service.id}>{service.title}</option>
                        ))}
                      </optgroup>
                      <optgroup label="Income Tax Services">
                        {incomeTaxServicesData.map(service => (
                          <option key={service.id} value={service.id}>{service.title}</option>
                        ))}
                      </optgroup>
                    </select>
                  </div>
                  {selectedService && (
                    <div className="space-y-4 text-black dark:text-white">
                      <h3 className="text-lg font-semibold text-black dark:text-white">{selectedService.title}</h3>
                      <p className="text-black dark:text-white">{selectedService.description}</p>
                      {selectedService.features && (
                        <div className="mt-4">
                          <h4 className="font-medium mb-2 text-black dark:text-white">Features & Requirements:</h4>
                          <ul className="list-disc pl-5 space-y-1 text-black dark:text-white">
                            {selectedService.features.map((feature, index) => (
                              <li key={index}>{feature}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents">
              <Card className="border-none shadow-md">
                <CardHeader>
                  <CardTitle className="text-black dark:text-white">Your Documents</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Input
                      type="file"
                      multiple
                      onChange={handleFileChange}
                      ref={fileInputRef}
                      className="cursor-pointer text-black"
                    />
                    {files.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {files.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                            <span className="text-black truncate">{file.name}</span>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleRemoveFile(index)}
                              className="ml-2"
                            >
                              Remove
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                    <Button
                      onClick={handleUpload}
                      disabled={isUploading || files.length === 0}
                      className={`mt-4 ${isUploading ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}
                    >
                      {isUploading ? "Uploading..." : "Upload Documents"}
                    </Button>
                  </div>
                  {isLoading ? (
                    <div className="flex justify-center items-center py-8 text-black dark:text-white">
                      <p>Loading documents...</p>
                    </div>
                  ) : fileList.length > 0 ? (
                    <ul className="mt-6 space-y-2">
                      {fileList.map((file, index) => (
                        <li
                          key={index}
                          className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-black"
                        >
                          <span className="truncate text-black dark:text-white">{file.name}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-black dark:text-white"
                            onClick={() => handleDownloadFile(file.url, file.name)}
                          >
                            Download
                          </Button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-center py-8 text-black dark:text-white">No documents uploaded yet.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="payment">
              <Card className="border-none shadow-md">
                <CardHeader>
                  <CardTitle>Payment QR Code</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center py-8">
                    <img
                      src="/images/payment/default_qrcode.png"
                      alt="Payment QR Code"
                      className="w-64 h-64 object-contain mb-4"
                    />
                    <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                      Scan the QR code to make payment
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

const Dashboard = ({ selectedService }: { selectedService?: Service | null }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DashboardContent selectedService={selectedService} />
    </Suspense>
  );
};

export default Dashboard;