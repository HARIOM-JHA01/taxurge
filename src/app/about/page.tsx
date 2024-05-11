import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import Breadcrumb from "@/components/Common/Breadcrumb";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Page",
  description: "This is About Page for Tax Urge",
  // other metadata
};

const AboutPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="About Page"
        description="Goutam Kumar Jha and Sharda Kumari have more than a decade of experience in the fields of GST
        consulting, income tax advisory, tax audits, and accounting."
      />
      {/* <AboutSectionOne /> */}
      <AboutSectionTwo />
    </>
  );
};

export default AboutPage;
