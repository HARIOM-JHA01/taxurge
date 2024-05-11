import SingleBlog from "@/components/Blog/SingleBlog";
import blogData from "@/components/Blog/blogData";
import Breadcrumb from "@/components/Common/Breadcrumb";
import gstServicesData from "@/components/Services/gstServicesData";
import incomeTaxServicesData from "@/components/Services/incomeTaxServicesData";
import { Metadata } from "next";
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
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In varius eros eget sapien consectetur ultrices. Ut quis dapibus libero."
      />

      <section className="pb-[120px] pt-[120px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap justify-center gap-4">
            {gstServicesData.map((service) => (
              <div key={service.id} className="card w-96 bg-base-100 shadow-xl">
                <figure>
                  <img
                    src={service.image}
                    alt={service.title}
                    className=" h-56 w-full object-cover"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{service.title}</h2>
                  <p>{service.decription}</p>
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
                  <img
                    src={service.image}
                    alt={service.title}
                    className=" h-56 w-full object-cover"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{service.title}</h2>
                  <p>{service.decription}</p>
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
