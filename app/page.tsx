import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
    title: "Autommensor - Home Automation Bilaspur Raipur | 10-Year Warranty",
    description:
        "Upgrade to a Smart Home in Raipur & Bilaspur with Autommensor. Trusted by 200+ families. Control lights, security & AC with Alexa. #1 Automation Company in Chhattisgarh.",
    keywords: [
        "Home Automation Bilaspur",
        "Smart Home Automation Raipur",
        "Home Automation Company in Chhattisgarh",
        "Smart Home Installation Services",
        "Best Home Automation System Raipur",
        "Security System Dealers Bilaspur",
        "Automatic Lighting Control Chhattisgarh",
        "Smart Door Lock Dealers Raipur",
        "Home Theatre Installation Bilaspur",
        "Wireless Home Automation Chhattisgarh",
        "10-Year Warranty Home Automation",
        "Autommensor Bilaspur",
    ],
    alternates: {
        canonical: "https://autommensor.in",
    },
};

import { getActiveProducts } from "@/lib/products";

export const dynamic = 'force-dynamic';

export default async function Home() {
    const products = await getActiveProducts();
    return <HomeClient initialProducts={products} />;
}
