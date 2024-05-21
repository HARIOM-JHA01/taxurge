import { incomeTaxReturn } from "@/types/income-tax-return";

const incomeTaxReturnData: incomeTaxReturn[] = [
    {
        id: 1,
        title: "ITR-1 (SAHAJ)",
        applicableDesc: "",
        description: "Applicable for Individual: This return is applicable for a Resident (other than Not Ordinarily Resident) Individual having Total Income from any of the following sources up to ₹ 50 lakh. Having income under: Salary / Pension, One House Property, Other sources (Interest, Family Pension, Dividend etc. and Agricultural Income up to ₹ 5,000)",
    },
    {
        id: 2,
        title: "ITR-2",
        applicableDesc: "",
        description: "Applicable for Individual and HUF: This return is applicable for Individual and Hindu Undivided Family (HUF) Not having Income under the head Profits and Gains of Business or Profession. Who is not eligible for filing ITR-1",
    },
    {
        id: 3,
        title: "ITR-3",
        applicableDesc: "",
        description: "Applicable for Individual & HUF: This return is applicable for Individual & Hindu Undivided Family (HUF); Having Income under the head Profits or Gains of Business or Profession (Who is not eligible for filing ITR-1, ITR-2 or ITR-4)",
    },
    {
        id: 4,
        title: "ITR-4 (SUGAM)",
        applicableDesc: "",
        description: "Applicable for Individual, HUF & Firm (Other than LLP): This return is applicable for an Individual or Hindu Undivided Family (HUF), who is Resident other than Not Ordinarily Resident or a Firm (other than LLP) which is a Resident having Total Income up to ₹ 50 lakh and having income from Business or Profession which is computed on a presumptive basis (u/s 44AD / 44ADA / 44AE) and income from any of the following sources: Having income under source : Salary / Pension, One House Property, Other sources (Interest, Family Pension, Dividend etc.), Agricultural Income up to ₹ 5,000.",
    },
    {
        id: 5,
        title: "ITR-5",
        applicableDesc: "",
        description: "Applicable to a person being a: Firm, Limited Liability Partnership (LLP), AOP, BOI, AJP, Cooperative Society.: This return is applicable to a person being a: Firm, Limited Liability Partnership (LLP), AOP, BOI, AJP, Cooperative Society.",
    },
    {
        id: 6,
        title: "ITR-6",
        applicableDesc: "",
        description: "Applicable for Companies other than those claiming exemption u/s 11.: Applicable for Companies other than those claiming exemption u/s 11. Company includes: Indian Company, Body corporate incorporated by or under the laws of country outside India. Any institution, association or body, whether incorporated or not and whether Indian or Non-Indian which is declared by general or special order of the Board, to be Company etc.",
    },
    {
        id: 7,
        title: "ITR-7",
        applicableDesc: "",
        description: "Applicable for Persons including Companies who are required to furnish return u/s 139(4A) or Section 139(4B) or Section 139(4C) or Section 139(4D): Applicable for Persons including Companies who are required to furnish return u/s 139(4A) or Section 139(4B) or Section 139(4C) or Section 139(4D)",
    },
];

export default incomeTaxReturnData;