"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { databases } from "@/lib/appwrite";
import { ID } from "appwrite";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_USER_DATABASE_ID;
const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID;

const AddAddress = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();

  const id = searchParams.get("id"); // Get address ID from query param if editing

  const [address, setAddress] = useState({
    fullName: "",
    phoneNumber: "",
    pincode: "",
    area: "",
    city: "",
    state: "",
  });

  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    if (id && user) {
      // Fetch address to edit
      databases
        .getDocument(DATABASE_ID, COLLECTION_ID, id)
        .then((doc) => {
          if (doc.userId === user.$id) {
            setAddress({
              fullName: doc.fullName || "",
              phoneNumber: doc.phoneNumber || "",
              pincode: doc.pincode || "",
              area: doc.area || "",
              city: doc.city || "",
              state: doc.state || "",
            });
          } else {
            alert("You are not authorized to edit this address");
            router.push("/my-account");
          }
        })
        .catch((err) => {
          console.error("Failed to fetch address:", err);
          alert("Failed to load address for edit");
          router.push("/my-account");
        });
    }
  }, [id, user, router]);

  const handleChange = (e) => {
    setErrorMsg("");
    setSuccessMsg("");
    setAddress((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setSaving(true);

    try {
      if (!user) throw new Error("You must be logged in to save an address");
      if (!address.fullName.trim()) throw new Error("Full name is required");
      if (!address.phoneNumber.trim()) throw new Error("Phone number is required");
      if (!address.pincode.trim()) throw new Error("Pin code is required");
      if (!address.area.trim()) throw new Error("Address area is required");
      if (!address.city.trim()) throw new Error("City is required");
      if (!address.state.trim()) throw new Error("State is required");

      const payload = { ...address, userId: user.$id };

      if (id) {
        // Update existing address
        await databases.updateDocument(DATABASE_ID, COLLECTION_ID, id, payload);
        setSuccessMsg("Address updated successfully!");
       
      } else {
        // Create new address
        await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), payload);
        setSuccessMsg("Address saved successfully!");
        setAddress({
          fullName: "",
          phoneNumber: "",
          pincode: "",
          area: "",
          city: "",
          state: "",
        });
        
      }

      setTimeout(() => {
        router.push("/my-account"); // Redirect after save
      }, 1500);
    } catch (error) {
      setErrorMsg(error.message || "Failed to save address");
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="max-w-lg mx-auto px-6 py-16">
        <h2 className="text-3xl font-semibold mb-6 text-gray-700">
          {id ? "Edit" : "Add"} Shipping <span className="text-orange-600">Address</span>
        </h2>

        {(errorMsg || successMsg) && (
          <p
            className={`mb-4 font-medium ${errorMsg ? "text-red-600" : "text-green-600"}`}
            role="alert"
            aria-live="polite"
          >
            {errorMsg || successMsg}
          </p>
        )}

        <form onSubmit={onSubmitHandler} noValidate className="space-y-5">
          {[
            { name: "fullName", type: "text", placeholder: "Full name" },
            {
              name: "phoneNumber",
              type: "tel",
              placeholder: "Phone number",
              pattern: "[0-9+ -]{7,15}",
              title: "Enter a valid phone number",
            },
            {
              name: "pincode",
              type: "text",
              placeholder: "Pin code",
              pattern: "[0-9]{4,10}",
              title: "Enter a valid pin code",
            },
            { name: "area", type: "textarea", placeholder: "Address (Area and Street)" },
            { name: "city", type: "text", placeholder: "City/District/Town" },
            { name: "state", type: "text", placeholder: "State" },
          ].map(({ name, type, placeholder, pattern, title }) =>
            type === "textarea" ? (
              <textarea
                key={name}
                name={name}
                placeholder={placeholder}
                value={address[name]}
                onChange={handleChange}
                required
                disabled={saving}
                rows={4}
                className="input-style w-full resize-none"
              />
            ) : (
              <input
                key={name}
                name={name}
                type={type}
                placeholder={placeholder}
                value={address[name]}
                onChange={handleChange}
                required
                disabled={saving}
                pattern={pattern}
                title={title}
                className="input-style w-full"
              />
            )
          )}

          <button
            type="submit"
            disabled={saving}
            className={`w-full py-3 mt-6 rounded text-white ${
              saving ? "bg-gray-400 cursor-not-allowed" : "bg-orange-600 hover:bg-orange-700"
            } transition`}
          >
            {saving ? "Saving..." : id ? "Update Address" : "Save Address"}
          </button>
        </form>
      </main>
      <Footer />
    </>
  );
};

export default AddAddress;
