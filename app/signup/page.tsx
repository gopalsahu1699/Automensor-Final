import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/StructuredData";
import SignupClient from "@/components/Clients/SignupClient";

export const metadata: Metadata = {
  title: "Sign Up | Create Your autommensor Account",
  description: "Create your free autommensor account to access smart home automation solutions. Sign up today and get started with personalized recommendations.",
  keywords: [
    "signup",
    "create account",
    "register",
    "join autommensor",
    "free account",
    "smart home registration",
  ],
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Sign Up | autommensor",
    description: "Create your account and start your smart home journey",
    url: "https://autommensor.in/signup",
    type: "website",
  },
};

const breadcrumbs = [
  { name: "Home", url: "https://autommensor.in" },
  { name: "Sign Up", url: "https://autommensor.in/signup" },
];

export default function SignupPage() {
  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <SignupClient />
    </>
  );
}
