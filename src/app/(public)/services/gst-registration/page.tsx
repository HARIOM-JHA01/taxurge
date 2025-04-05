import Gst_Registration_Table from "@/components/Services/Gst-Registration-Table";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "GST Registration | Tax Urge",
  description: "This is Blog Page for Startup Nextjs Template",
};

const GstRegistration = () => {
  return (
    <>
      <Breadcrumb
        pageName="GST Registration"
        description="Register for GST with our expert guidance"
        innerPage="Our Services"
        innerPageLink="/services"
      />

      <section className="pt-[120px] pb-[120px]">
        <div className="container">
          <div className="flex flex-wrap justify-center -mx-4">
            <div className="w-full px-4">
              <div className="mb-12 lg:mb-20">
                <h2 className="font-bold text-3xl sm:text-4xl md:text-[42px] text-dark mb-4 text-center">
                  GST Registration Process
                </h2>
                <p className="text-lg text-body-color text-center">
                  Understand the complete process of GST registration and required documents
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center -mx-4">
            <div className="w-full px-4">
              <div className="w-full">
                <Gst_Registration_Table />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default GstRegistration;