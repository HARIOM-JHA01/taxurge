import { Service } from "@/types/service";

export async function getIncomeTaxServices(): Promise<Service[]> {
    const response = await fetch("/api/services");
    const data = await response.json();
    return data.services.filter((service) => service.type === "income-tax");
}

const incomeTaxServicesData: Service[] = [
    {
        id: 4,
        title: "Individual Tax Filing",
        description:
            "Professional assistance in filing individual income tax returns",
        image: "/images/service/individual-tax.svg",
        href: "/services/individual-tax-filing",
    },
    {
        id: 5,
        title: "Business Tax Filing",
        description:
            "Comprehensive tax filing services for businesses and corporations",
        image: "/images/service/business-tax.svg",
        href: "/services/business-tax-filing",
    },
    {
        id: 6,
        title: "Tax Planning",
        description: "Strategic tax planning and consultation services",
        image: "/images/service/tax-planning.svg",
        href: "/services/tax-planning",
    },
];

export default incomeTaxServicesData;
