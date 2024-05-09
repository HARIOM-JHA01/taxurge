import Card from "@/components/Card/Card";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "GST Page",
  description: "This is GST Page for Tax Urge",
};

const GstPage = () => {
  return (
    <>
    <Card description="Last weekend, we joined forces for a team meet-up, uniting our talents to pursue greatness! This gathering wasn’t just a moment in time; it's a step towards creating a culture of collaboration and creativity!" imageUrl="https://media.licdn.com/dms/image/D5622AQF1zSKkA0kSPw/feedshare-shrink_800/0/1714503649846?e=1718236800&v=beta&t=Sd-rCqwnT8ADulhn866X8LkLpTFovrZoAm00ULIyGyo" title="hello!!!!" link="http://www.google.com" />
    </>
  );
};

export default GstPage;
