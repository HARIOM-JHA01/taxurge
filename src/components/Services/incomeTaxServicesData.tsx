import { Service } from "@/types/service";

const incomeTaxServicesData: Service[] = [
    {
        id: 1,
        title: "Income Tax Return (ITR Filing)",
        description:
          "ITR-1 and ITR-2 is for individuals and HUFs without business income. ITR-3 is for business income. ITR-4 is for presumptive income. ITR-5 is for firms and LLPs. ITR-6 is for companies. ITR-7 is for specific entities under certain sections. Tax audits are required if business turnover exceeds ₹ 1 crore or professional receipts exceed ₹ 50 lakh.",
        image: "/images/service/ITR.jpeg",
        href: "/services/income-tax-return",
    },
    {
        id: 2,
        title: "Tax Audit",
        description:
          "Tax Audit in the case where you run both a business and a profession, tax audit is not based on the total turnover from both. Instead, an audit is required for the business accounts if the turnover exceeds Rs. 1 crore, and for the professional accounts if the gross receipts exceed Rs. 50 lakh.",
        image: "/images/service/Tax_Audit.jpeg",
        href: "/services/tax-audit",
    },
    {
        id: 3,
        title: "Income Tax Assesment",
        description:
          "Income tax authorities may initiate assessments based on several factors, including identifying discrepancies or inconsistencies in Income tax returns filed by taxpayers, random selection for audit or scrutiny, and information obtained from third-party sources or through intelligence gathering mechanisms.",
        image: "/images/service/Income_Tax_Assesment.jpeg",
        href: "/services/income-tax-assesment",
    }
]
 

export default incomeTaxServicesData
