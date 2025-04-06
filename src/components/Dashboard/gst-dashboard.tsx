"use client"

import { useState } from "react"
import {
  ArrowUpFromLine,
  CheckCircle2,
  Eye,
  FileText,
  Home,
  LogOut,
  QrCode,
  Upload
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronDownIcon, ComponentPlaceholderIcon, MoonIcon, GearIcon, SunIcon, PersonIcon } from "@radix-ui/react-icons"
import Image from "next/image"

export default function GSTDashboard() {
  const [theme, setTheme] = useState<"dark" | "light">("dark")
  const [progress, setProgress] = useState(60)

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-10 w-64 border-r bg-card hidden lg:block">
        <div className="flex h-16 items-center justify-center border-b">
          <h1 className="text-xl font-bold text-primary">GST Portal</h1>
        </div>
        <div className="p-4">
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Home className="h-4 w-4" />
              Dashboard
            </Button>
            <Button variant="secondary" className="w-full justify-start gap-2">
              <FileText className="h-4 w-4" />
              GST Registration
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <ComponentPlaceholderIcon className="h-4 w-4" />
              Payments
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <GearIcon className="h-4 w-4" />
              Settings
            </Button>
          </div>
          <Separator className="my-4" />
          <div className="rounded-lg bg-muted p-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-medium">Registration Progress</span>
              <span className="text-xs font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
            <p className="mt-2 text-xs text-muted-foreground">Complete your GST registration to unlock all features.</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background px-4 lg:px-6">
          <Button variant="outline" size="icon" className="lg:hidden">
            <FileText className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-2 lg:hidden">
            <h1 className="text-lg font-bold">GST Portal</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === "dark" ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-user.jpg" alt="Hariom Jha" />
                    <AvatarFallback>HJ</AvatarFallback>
                  </Avatar>
                  <span className="hidden md:inline-block">Hariom Jha</span>
                  <ChevronDownIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <PersonIcon className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <GearIcon className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <Separator className="my-1" />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-4 md:p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold tracking-tight">GST Registration</h1>
            <p className="text-muted-foreground">Complete your GST registration process</p>
          </div>

          <Tabs defaultValue="registration">
            <TabsList className="mb-4">
              <TabsTrigger value="registration">Registration</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="payment">Payment</TabsTrigger>
            </TabsList>

            <TabsContent value="registration" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>GST Registration Information</CardTitle>
                  <CardDescription>Learn about GST registration requirements and eligibility</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    <p>
                      Businesses in India can opt for GST registration at any time, regardless of turnover. However,
                      certain criteria mandate registration: annual turnover exceeding Rs. 40 lakhs for goods and Rs. 20
                      lakhs for services, involvement in interstate supply, and e-commerce transactions.
                    </p>
                    <p>
                      These regulations ensure tax compliance and facilitate smooth operations within the GST framework.
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full sm:w-auto">Start Registration Process</Button>
                </CardFooter>
              </Card>

              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Required Documents</CardTitle>
                    <CardDescription>Prepare these documents for your GST registration</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span>PAN Card</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span>Aadhaar Card</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span>Business Registration Proof</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span>Bank Account Details</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span>Address Proof</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Registration Timeline</CardTitle>
                    <CardDescription>Expected timeline for GST registration process</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                          1
                        </div>
                        <div>
                          <p className="font-medium">Document Submission</p>
                          <p className="text-sm text-muted-foreground">1-2 days</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                          2
                        </div>
                        <div>
                          <p className="font-medium">Verification Process</p>
                          <p className="text-sm text-muted-foreground">3-5 days</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                          3
                        </div>
                        <div>
                          <p className="font-medium">GSTIN Issuance</p>
                          <p className="text-sm text-muted-foreground">1-2 days</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="documents" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Upload Documents</CardTitle>
                  <CardDescription>Upload all required documents for GST registration</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6 rounded-lg border-2 border-dashed border-muted-foreground/25 p-6 text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                      <ArrowUpFromLine className="h-6 w-6" />
                    </div>
                    <h3 className="mb-1 text-lg font-medium">Drag and drop files here</h3>
                    <p className="mb-4 text-sm text-muted-foreground">or click to browse files from your computer</p>
                    <Button>
                      <Upload className="mr-2 h-4 w-4" />
                      Choose Files
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Uploaded Documents</h3>
                    <div className="rounded-lg border bg-card p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">r9s4ih5ukvbyjipp3bn2.jpg</p>
                            <p className="text-xs text-muted-foreground">Uploaded on April 6, 2025</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                          <span className="ml-1">View</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col items-start gap-2 sm:flex-row sm:justify-between">
                  <p className="text-sm text-muted-foreground">Supported formats: JPG, PNG, PDF (max 5MB each)</p>
                  <Button>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload More Documents
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="payment" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Information</CardTitle>
                  <CardDescription>Complete your payment for GST registration</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <div className="mb-4 rounded-lg bg-white p-4">
                    <div className="mb-2 flex items-center justify-center gap-2">
                      <QrCode className="h-5 w-5 text-black" />
                      <span className="text-sm font-medium text-black">Sharda Jha</span>
                    </div>
                    <div className="h-64 w-64">
                      <Image
                        src="/placeholder.svg?height=256&width=256"
                        alt="QR Code for payment"
                        className="h-full w-full"
                      />
                    </div>
                    <p className="mt-2 text-center text-xs text-black">Scan to pay with any UPI app</p>
                  </div>
                  <p className="text-center text-sm">Scan the QR code to make payment for your GST registration</p>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <div className="flex gap-4">
                    <Button variant="outline">Download QR Code</Button>
                    <Button>I&apos;ve Made the Payment</Button>
                  </div>
                </CardFooter>
              </Card>

              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Registration Fee</span>
                        <span className="font-medium">₹1,000.00</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Processing Fee</span>
                        <span className="font-medium">₹200.00</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">GST (18%)</span>
                        <span className="font-medium">₹216.00</span>
                      </div>
                      <Separator className="my-2" />
                      <div className="flex justify-between">
                        <span className="font-medium">Total Amount</span>
                        <span className="font-bold">₹1,416.00</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Payment Methods</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 rounded-lg border p-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                          <QrCode className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium">UPI Payment</p>
                          <p className="text-sm text-muted-foreground">Pay using any UPI app</p>
                        </div>
                        <Badge className="ml-auto">Recommended</Badge>
                      </div>
                      <div className="flex items-center gap-3 rounded-lg border p-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                          <ComponentPlaceholderIcon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium">Card Payment</p>
                          <p className="text-sm text-muted-foreground">Pay using credit/debit card</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

