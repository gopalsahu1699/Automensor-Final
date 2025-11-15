import type { Metadata } from "next";
import MyAccountClient from "@/components/MyAccountClient";

export const metadata: Metadata = {
  title: "My Account | AUTOMENSOR",
  description: "Manage your AUTOMENSOR account profile and settings.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function MyAccountPage() {
  return <MyAccountClient />;
}
