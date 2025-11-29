import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/StructuredData";
import LoginClient from "@/components/Clients/LoginClient";

export const metadata: Metadata = {
  title: "Login | autommensor - Smart Home Control",
  description: "Sign in to your autommensor account to control your smart home automation system. Secure login with email and password.",
  keywords: [
    "login",
    "sign in",
    "account",
    "smart home login",
    "autommensor login",
    "user login",
  ],
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Login | autommensor",
    description: "Sign in to your smart home control account",
    url: "https://autommensor.in/login",
    type: "website",
  },
};

const breadcrumbs = [
  { name: "Home", url: "https://autommensor.in" },
  { name: "Login", url: "https://autommensor.in/login" },
];

export default function LoginPage() {
  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <LoginClient />
    </>
  );
}
