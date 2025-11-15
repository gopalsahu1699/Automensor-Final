import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/StructuredData";
import SignupClient from "@/components/Clients/SignupClient";

export const metadata: Metadata = {
  title: "Sign Up | Create Your AUTOMENSOR Account",
  description: "Create your free AUTOMENSOR account to access smart home automation solutions. Sign up today and get started with personalized recommendations.",
  keywords: [
    "signup",
    "create account",
    "register",
    "join automensor",
    "free account",
    "smart home registration",
  ],
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Sign Up | AUTOMENSOR",
    description: "Create your account and start your smart home journey",
    url: "https://automensor.com/signup",
    type: "website",
  },
};

const breadcrumbs = [
  { name: "Home", url: "https://automensor.com" },
  { name: "Sign Up", url: "https://automensor.com/signup" },
];

export default function SignupPage() {
  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <SignupClient />
    </>
  );
}
