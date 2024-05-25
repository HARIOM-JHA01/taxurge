"use client";

import Breadcrumb from "@/components/Common/Breadcrumb";
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import clsx from "clsx";

const Dashboard = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [activeTab, setActiveTab] = useState<string>("upload");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFiles = Array.from(event.target.files);
      setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);

      // Clear the input field after selecting files
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleSaveChanges = () => {
    console.log("Uploaded files:", files);
  };

  return (
    <>
      <Breadcrumb
        pageName="Dashboard"
        description="Welcome to TaxUrge Dashboard"
      />

      <section className="pb-[190px] pt-[10px]">
        <div className="container">
          <div className="flex w-full items-center justify-center">
            <Tabs
              defaultValue="upload"
              className="w-[500px]"
              onValueChange={(value) => setActiveTab(value)}
            >
              <TabsList className="grid w-full grid-cols-2 border border-solid h-10">
                <TabsTrigger
                  value="upload"
                  className={clsx(
                    activeTab === "upload" && "bg-[#002a7e] text-white",
                  )}
                >
                  Upload
                </TabsTrigger>
                <TabsTrigger
                  value="download"
                  className={clsx(
                    activeTab === "download" && "bg-[#002a7e] text-white",
                  )}
                >
                  Download
                </TabsTrigger>
              </TabsList>
              <TabsContent value="upload">
                <Card>
                  <CardHeader>
                    <CardTitle>Upload Files</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {files.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between border border-solid bg-[#002a7e] p-[0.3rem] text-white rounded-md"
                      >
                        <span>{file.name}</span>
                        <Button
                          variant={"link"}
                          className=" text-white"
                          size="sm"
                          onClick={() => handleRemoveFile(index)}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                    <Input
                      type="file"
                      onChange={handleFileChange}
                      ref={fileInputRef}
                      className=" pt-[6px]"
                    />
                  </CardContent>
                  <CardFooter>
                    <Button onClick={handleSaveChanges} className="text-white">
                      Save changes
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="download">
                <Card>
                  <CardHeader>
                    <CardTitle>Download Files</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    Download Your Files Here
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
