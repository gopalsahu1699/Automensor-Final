"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { assets } from "@/assets/assets";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { databases } from "@/lib/appwrite";
import { ID } from "appwrite";

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_ADDRESS_COLLECTION_ID;

const AddAddress = () => {
  const router = useRouter();
  const { user } = useAuth();

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

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSaving(true);

    try {
      // Validation
      if (!address.fullName.trim()) throw new Error("Full name is required");
      if (!address.phoneNumber.trim()) throw new Error("Phone number is required");
      if (!address.pincode.trim()) throw new Error("Pin code is required");
      if (!address.area.trim()) throw new Error("Address area is required");
      if (!address.city.trim()) throw new Error("City is required");
      if (!address.state.trim()) throw new Error("State is required");
      if (!user) throw new Error("You must be logged in to save an address");

      const payload = {
        ...address,
        userId: user.$id,
      };

      await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), payload);

      alert("Address saved successfully!");
      router.push("/my-account");
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
      <div className="px-6 md:px-16 lg:px-32 py-16 flex flex-col md:flex-row justify-between">
        <form onSubmit={onSubmitHandler} className="w-full max-w-lg space-y-5">
          <h2 className="text-2xl md:text-3xl text-gray-700 mb-6">
            Add Shipping <span className="font-semibold text-orange-600">Address</span>
          </h2>

          {errorMsg && <p className="text-red-600 font-medium">{errorMsg}</p>}

          <input
            type="text"
            placeholder="Full name"
            value={address.fullName}
            onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
            className="input-style w-full"
            required
          />
          <input
            type="text"
            placeholder="Phone number"
            value={address.phoneNumber}
            onChange={(e) => setAddress({ ...address, phoneNumber: e.target.value })}
            className="input-style w-full"
            required
          />
          <input
            type="text"
            placeholder="Pin code"
            value={address.pincode}
            onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
            className="input-style w-full"
            required
          />
          <textarea
            rows={4}
            placeholder="Address (Area and Street)"
            value={address.area}
            onChange={(e) => setAddress({ ...address, area: e.target.value })}
            className="input-style w-full resize-none"
            required
          />
          <div className="flex space-x-3">
            <input
              type="text"
              placeholder="City/District/Town"
              value={address.city}
              onChange={(e) => setAddress({ ...address, city: e.target.value })}
              className="input-style flex-1"
              required
            />
            <input
              type="text"
              placeholder="State"
              value={address.state}
              onChange={(e) => setAddress({ ...address, state: e.target.value })}
              className="input-style flex-1"
              required
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className={`mt-6 max-w-sm w-full py-3 rounded text-white transition ${
              saving ? "bg-gray-400 cursor-not-allowed" : "bg-orange-600 hover:bg-orange-700"
            }`}
          >
            {saving ? "Saving..." : "Save address"}
          </button>
        </form>

        <Image
          className="md:ml-16 mt-16 md:mt-0"
          src={assets.my_location_image}
          alt="My location"
          width={400}
          height={400}
          priority
        />
      </div>
      <Footer />
    </>
  );
};

export default AddAddress;
