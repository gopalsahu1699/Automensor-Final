"use client";

import React, { Suspense } from "react";
import AddAddressForm from "@/components/AddAddressForm";

export default function AddAddressPage() {
  return (
    <Suspense fallback={<div className="p-6 text-gray-600">Loading...</div>}>
      <AddAddressForm />
    </Suspense>
  );
}
