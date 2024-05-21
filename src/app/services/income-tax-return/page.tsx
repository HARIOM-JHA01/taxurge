import Breadcrumb from "@/components/Common/Breadcrumb";
import incomeTaxReturnData from "@/components/Services/incomeTaxRetrunData";
import React from "react";

const Income_TAX_Return = () => {
  return (
    <>
      <Breadcrumb
        pageName="Income Tax Return"
        innerPage="Our Services"
        innerPageLink="/services"
        description="GST returns include GSTR-1 for outward supplies (Sales), GSTR-3B summarizing outward and inward supplies and tax liability, GSTR-4 quarterly for Composition Scheme taxpayers, GSTR-9 annually for regular taxpayers, and GSTR-9C for reconciliation and audit reports for specific taxpayers."
      />

      <section className="pb-[120px] pt-[120px]">
        <div className="container justify-center">
          <h2 className="mb-4 text-2xl font-semibold">
            Income Tax Return Types
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {incomeTaxReturnData.map((returnData) => (
              <div
                key={returnData.id}
                className="card w-96 bg-[#002a7e] shadow-xl transition duration-300 ease-in-out hover:bg-[#003da5] hover:shadow-lg"
              >
                <div className="card-body">
                  <h2 className="card-title">{returnData.title}</h2>
                  <p>{returnData.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Income_TAX_Return;
