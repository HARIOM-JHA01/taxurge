import SingleBlog from "@/components/Blog/SingleBlog";
import blogData from "@/components/Blog/blogData";
import Breadcrumb from "@/components/Common/Breadcrumb";
import gstServicesData from "@/components/Services/gstServicesData";
import incomeTaxServicesData from "@/components/Services/incomeTaxServicesData";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services",
  description: "This is Blog Page for Startup Nextjs Template",
  // other metadata
};

const Services = () => {
  return (
    <>
      <Breadcrumb
        pageName="Our Services"
        description="GST compliance, income tax planning, tax audits, or accounting
        services, clients can rely on Goutam Kumar Jha and Sharda Kumari for comprehensive solutions tailored
        to their specific needs."
      />

      <section className="pb-[120px] pt-[120px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap justify-center gap-4">
            {gstServicesData.map((service) => (
              <div key={service.id} className="card w-96 bg-base-100 shadow-xl">
                <figure>
                  <Image
                    src={service.image}
                    alt={service.title}
                    width={384}
                    height={224}
                    className="h-56 w-full object-cover"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{service.title}</h2>
                  <p>{service.description}</p>
                  <div className="card-actions justify-end">
                    <Link href={service.href}>
                      <button className="btn btn-primary">Learn More</button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className=" -mx-4 my-4 flex flex-wrap justify-center gap-4">
            {incomeTaxServicesData.map((service) => (
              <div key={service.id} className="card w-96 bg-base-100 shadow-xl">
                <figure>
                  <Image
                    src={service.image}
                    alt={service.title}
                    width={384}
                    height={224}
                    className="h-56 w-full object-cover"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{service.title}</h2>
                  <p>{service.description}</p>
                  <div className="card-actions justify-end">
                    <Link href={service.href}>
                      <button className="btn btn-primary">Learn More</button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;