import incomeTaxReturnData from "@/components/Services/incomeTaxRetrunData";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Income Tax Return Filing | Tax Urge",
  description: "Professional Income Tax Return Filing Services",
};

const IncomeTaxReturn = () => {
  return (
    <>
      <Breadcrumb
        pageName="Income Tax Return Filing"
        description="File your income tax returns with expert assistance"
        innerPage="Our Services"
        innerPageLink="/services"
      />

      <section className="pt-[120px] pb-[120px]">
        <div className="container">
          <div className="flex flex-wrap justify-center -mx-4">
            <div className="w-full px-4">
              <div className="mb-12 lg:mb-20">
                <h2 className="font-bold text-3xl sm:text-4xl md:text-[42px] text-dark mb-4 text-center">
                  Income Tax Return Filing Process
                </h2>
                <p className="text-lg text-body-color text-center">
                  Understand the complete process of income tax return filing and required documents
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center -mx-4">
            <div className="w-full px-4">
              <div className="w-full">
                <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 md:gap-x-6 lg:gap-x-8">
                  {incomeTaxReturnData.map((item, index) => (
                    <div key={index} className="w-full">
                      <div className="wow fadeInUp" data-wow-delay=".15s">
                        <h3 className="font-bold text-xl text-dark dark:text-white mb-4">
                          {item.title}
                        </h3>
                        <p className="text-base text-body-color">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default IncomeTaxReturn;