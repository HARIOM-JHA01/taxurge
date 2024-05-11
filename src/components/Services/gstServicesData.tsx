import { Service } from "@/types/service";

const gstServicesData: Service[] = [
    {
        id: 1,
        title: "GST Registration",
        decription:
          "Businesses in India can opt for GST registration at any time, regardless of turnover. However, certain criteria mandate registration: annual turnover exceeding Rs. 40 lakhs for goods and Rs. 20 lakhs for services, involvement in interstate supply, and e-commerce transactions. These regulations ensure tax compliance and facilitate smooth operations within the GST framework.",
        image: "/images/service/GST_Registration.jpeg",
        href: "/services/gst-registration"
    },
    {
        id: 2,
        title: "GST Return",
        decription:
          "GST law requires filing various returns for compliance. Notable ones include GSTR-1 for outward supplies, GSTR-3B summarizing both inward and outward supplies, and GSTR-4 for Composition Scheme taxpayers quarterly. Regular taxpayers submit GSTR-9 annually, with GSTR-9C for specific taxpayers, providing reconciliation and audit. These ensure tax accuracy and compliance.",
        image: "/images/service/GST_Return.jpeg",
        href: "/services/gst-return"
    },
    {
        id: 3,
        title: "GST Assessment/compiance",
        decription:
          "GST tax authorities may initiate assessments based on several factors, including identifying discrepancies or inconsistencies in GST returns filed by taxpayers, random selection for audit or scrutiny, and information obtained from third-party sources or through intelligence gathering mechanisms.",
        image: "/images/service/GST_Assesment.jpeg",
        href: "/"
    }
]
 

export default gstServicesData
