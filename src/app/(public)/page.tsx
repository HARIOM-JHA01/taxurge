import dotenv from "dotenv";
dotenv.config();
import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import Blog from "@/components/Blog";
import Brands from "@/components/Brands";
import ScrollUp from "@/components/Common/ScrollUp";
import Contact from "@/components/Contact";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import Video from "@/components/Video";
import { Metadata } from "next";
import AuthRedirect from "../auth-redirect";

export const metadata: Metadata = {
  title: "Tax Urge",
  description: "This website is for tax urge",
};

export default function Home() {
  return (
    <>
      <AuthRedirect />
      <ScrollUp />
      <Hero />
      <Features />
      {/* <Video /> */}
      {/* <Brands /> */}
      {/* <AboutSectionOne /> */}
      <AboutSectionTwo />
      {/* <Testimonials /> */}
      {/* <Pricing /> */}
      {/* <Blog /> */}
      <Contact />
    </>
  );
}