import Breadcrumb from "@/components/Common/Breadcrumb";
import Contact from "@/components/Contact";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Page",
  description: "This is Contact Page for Tax Urge",
  // other metadata
};

const ContactPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Contact Page"
        description="This is Contact Page for Tax Urge website. You can contact us for any query or feedback. We are always here to help you."
      />

      <Contact />
    </>
  );
};

export default ContactPage;
