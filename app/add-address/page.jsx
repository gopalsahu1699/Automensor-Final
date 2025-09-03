'use client';

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
  const [successMsg, setSuccessMsg] = useState("");

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
      // Validation
      if (!address.fullName.trim()) throw new Error("Full name is required");
      if (!address.phoneNumber.trim()) throw new Error("Phone number is required");
      if (!address.pincode.trim()) throw new Error("Pin code is required");
      if (!address.area.trim()) throw new Error("Address area is required");
      if (!address.city.trim()) throw new Error("City is required");
      if (!address.state.trim()) throw new Error("State is required");
      if (!user) throw new Error("You must be logged in to save an address");

      const payload = { ...address, userId: user.$id };

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

      setTimeout(() => {
        router.push("/my-account");
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
      <main className="px-6 md:px-16 lg:px-32 py-16 flex flex-col md:flex-row justify-between">
        <form onSubmit={onSubmitHandler} className="w-full max-w-lg space-y-5" noValidate>
          <h2 className="text-2xl md:text-3xl text-gray-700 mb-6">
            Add Shipping <span className="font-semibold text-orange-600">Address</span>
          </h2>

          {(errorMsg || successMsg) && (
            <p
              className={`font-medium ${
                errorMsg ? "text-red-600" : "text-green-600"
              }`}
              role="alert"
              aria-live="polite"
            >
              {errorMsg || successMsg}
            </p>
          )}

          <label htmlFor="fullName" className="block">
            <span className="sr-only">Full name</span>
            <input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="Full name"
              value={address.fullName}
              onChange={handleChange}
              className="input-style w-full"
              required
              disabled={saving}
            />
          </label>

          <label htmlFor="phoneNumber" className="block">
            <span className="sr-only">Phone number</span>
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              placeholder="Phone number"
              value={address.phoneNumber}
              onChange={handleChange}
              className="input-style w-full"
              required
              disabled={saving}
              pattern="[0-9+ -]{7,15}"
              title="Enter a valid phone number"
            />
          </label>

          <label htmlFor="pincode" className="block">
            <span className="sr-only">Pin code</span>
            <input
              id="pincode"
              name="pincode"
              type="text"
              placeholder="Pin code"
              value={address.pincode}
              onChange={handleChange}
              className="input-style w-full"
              required
              disabled={saving}
              pattern="[0-9]{4,10}"
              title="Enter a valid pin code"
            />
          </label>

          <label htmlFor="area" className="block">
            <span className="sr-only">Address (Area and Street)</span>
            <textarea
              id="area"
              name="area"
              rows={4}
              placeholder="Address (Area and Street)"
              value={address.area}
              onChange={handleChange}
              className="input-style w-full resize-none"
              required
              disabled={saving}
            />
          </label>

          <div className="flex space-x-3">
            <label htmlFor="city" className="flex-1">
              <span className="sr-only">City/District/Town</span>
              <input
                id="city"
                name="city"
                type="text"
                placeholder="City/District/Town"
                value={address.city}
                onChange={handleChange}
                className="input-style w-full"
                required
                disabled={saving}
              />
            </label>

            <label htmlFor="state" className="flex-1">
              <span className="sr-only">State</span>
              <input
                id="state"
                name="state"
                type="text"
                placeholder="State"
                value={address.state}
                onChange={handleChange}
                className="input-style w-full"
                required
                disabled={saving}
              />
            </label>
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
          alt="My location illustration"
          width={400}
          height={400}
          priority
        />
      </main>
      <Footer />
    </>
  );
};

export default AddAddress;
