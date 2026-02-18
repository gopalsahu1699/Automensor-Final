import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
    title: "Autommensor - Smart Home Automation Bilaspur Raipur | #1 Automation Company",
    description:
        "Transform your home with Autommensor's smart home solutions in Bilaspur and Raipur. Control lights, curtains, and security with Alexa/Google. Visit us for a free demo in Chhattisgarh.",
    keywords: [
        "home automation Bilaspur",
        "smart home Raipur",
        "best home automation company Chhattisgarh",
        "Alexa home automation Bilaspur",
        "smart switches price Raipur",
        "home theater installation Bilaspur",
        "automatic gate opener Raipur",
        "smart door lock dealers Bilaspur",
        "Autommensor home automation",
        "IoT home solutions Bilaspur",
    ],
    alternates: {
        canonical: "https://autommensor.in",
    },
};

export default function Home() {
    return <HomeClient />;
}
