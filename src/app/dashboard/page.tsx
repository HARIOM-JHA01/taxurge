"use client";
import React, { useRef, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import clsx from "clsx";
import Image from "next/image";
import { Service } from "../../types/service";

const Dashboard = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [files, setFiles] = useState<File[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [fileList, setFileList] = useState<{ name: string, url: string }[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'services' | 'documents'>('services');

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
      setViewMode('documents');
    } else {
      setViewMode('services');
    }
  }, [searchParams, router]);

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
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
    <section className="py-6 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <Card className="mb-8 border-none shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-3xl font-bold text-primary">
                Welcome, {userName || 'User'}!
              </CardTitle>
              <p className="text-gray-600 dark:text-gray-400">
                {viewMode === 'services' 
                  ? 'Select a service to get started with your document submission.' 
                  : 'View and manage your uploaded documents.'}
              </p>
            </CardHeader>
          </Card>

          {viewMode === 'services' && !selectedService && (
            <Card className="mb-8 border-none shadow-md">
              <CardHeader className="pb-2 border-b">
                <CardTitle>Please select a service from the sidebar</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-gray-600 dark:text-gray-400">
                  Choose a service from the sidebar to view details and upload documents.
                </p>
              </CardContent>
            </Card>
          )}

          {/* Document Upload Section */}
          {viewMode === 'services' && selectedService && (
            <Card className="mb-8 border-none shadow-md">
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
          )}

          {/* Uploaded Documents Section */}
          {viewMode === 'documents' && (
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
      </section>
  );
};

export default Dashboard;
