import Breadcrumb from "@/components/Common/Breadcrumb";
import Gst_Registration_Table from "@/components/Services/Gst-Registration-Table";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "GST Registrstion",
  description: "This is Blog Page for Startup Nextjs Template",
  // other metadata
};

const Gst_resgistration = () => {
  return (
    <>
      <Breadcrumb
        pageName="GST Registration"
        innerPage="Our Services"
        innerPageLink="/services"
        description="Businesses in India can register for GST at any time, with mandatory criteria including turnover thresholds, interstate supply involvement, and e-commerce transactions, ensuring tax compliance and operational ease within the GST framework."
      />

      <section className="pb-[120px] pt-[120px]">
        <div className="container">
          <div className=" flex w-full items-center justify-center text-center mb-4">
            <h1 className=" text-2xl font-semibold">
              Documents Required for New Registration Application of a Normal
              Taxpayer
            </h1>
          </div>
          <Gst_Registration_Table />
          <div className=" mt-6 flex w-full items-end justify-center">
            <Link
              href="/signup"
              className=" ease-in-up inline-block rounded-sm bg-primary px-8 py-3 text-base font-medium text-white shadow-btn transition duration-300 hover:bg-opacity-90 hover:shadow-btn-hover md:px-9 lg:px-6 xl:px-9"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Gst_resgistration;
