"use client";
import Breadcrumb from "@/components/Common/Breadcrumb";
import React from "react";
import { useParams } from "next/navigation";

const Common_Service = () => {
  const params = useParams();
  const originalString: string = params.id as string;
  const modifiedString = originalString
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <>
      <Breadcrumb
        pageName={modifiedString}
        innerPage="Our Services"
        innerPageLink="/services"
        description="Businesses in India can register for GST at any time, with mandatory criteria including turnover thresholds, interstate supply involvement, and e-commerce transactions, ensuring tax compliance and operational ease within the GST framework."
      />

      <section className="pb-[120px] pt-[120px]">
        <div className="container flex justify-center items-start">
          <div className="card w-96 bg-[#002a7e] text-neutral-content">
            <div className="card-body items-center text-center">
              <h2 className="card-title">Please Contact on the below provided phone number</h2>
              <p>+91 98305 55575</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Common_Service;
