import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import gstServicesData from "@/components/Services/gstServicesData";
import incomeTaxServicesData from "@/components/Services/incomeTaxServicesData";

type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = [...gstServicesData, ...incomeTaxServicesData].find(
    (service) => service.id.toString() === params.id
  );

  return {
    title: service?.title || "Service Not Found",
    description: service?.description || "Service details not available",
  };
}

export default function ServiceDetails({ params }: Props) {
  const service = [...gstServicesData, ...incomeTaxServicesData].find(
    (service) => service.id.toString() === params.id
  );

  if (!service) {
    notFound();
  }

  return (
    <>
      <Breadcrumb
        pageName={service.title}
        description={service.description}
        innerPage="Our Services"
        innerPageLink="/services"
      />

      <section className="pt-[120px] pb-[120px]">
        <div className="container">
          <div className="flex flex-wrap justify-center -mx-4">
            <div className="w-full px-4">
              <div className="mb-12 lg:mb-20">
                <h2 className="font-bold text-3xl sm:text-4xl md:text-[42px] text-dark mb-4">
                  {service.title}
                </h2>
                <p className="text-lg text-body-color">{service.description}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap -mx-4">
            <div className="w-full px-4">
              <div className="w-full">{/* Add service specific content here */}</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}