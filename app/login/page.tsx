import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/StructuredData";
import LoginClient from "@/components/Clients/LoginClient";

export const metadata: Metadata = {
  title: "Login | AUTOMENSOR - Smart Home Control",
  description: "Sign in to your AUTOMENSOR account to control your smart home automation system. Secure login with email and password.",
  keywords: [
    "login",
    "sign in",
    "account",
    "smart home login",
    "automensor login",
    "user login",
  ],
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Login | AUTOMENSOR",
    description: "Sign in to your smart home control account",
    url: "https://automensor.com/login",
    type: "website",
  },
};

const breadcrumbs = [
  { name: "Home", url: "https://automensor.com" },
  { name: "Login", url: "https://automensor.com/login" },
];

export default function LoginPage() {
  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <LoginClient />
    </>
  );
}
