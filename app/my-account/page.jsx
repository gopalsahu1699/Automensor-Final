"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { account, databases } from "@/lib/appwrite";
import { ID } from "appwrite";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const MyAccountPage = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_USER_DATABASE_ID;
  const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID;

  const [name, setName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [loadingAddresses, setLoadingAddresses] = useState(true);
  const [editProfile, setEditProfile] = useState(false);
  const [updatingProfile, setUpdatingProfile] = useState(false);

  useEffect(() => {
    if (!user) return;

    setName(user.name || "");
    setAvatarUrl(user.prefs?.avatar || user.imageUrl || "/default-avatar.png");

    const fetchAddresses = async () => {
      setLoadingAddresses(true);
      try {
        const res = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
        const userAddresses = res.documents.filter((doc) => doc.userId === user.$id);
        setAddresses(userAddresses);
      } catch (err) {
        console.error("Error fetching addresses:", err);
      } finally {
        setLoadingAddresses(false);
      }
    };

    fetchAddresses();
  }, [user, DATABASE_ID, COLLECTION_ID]);

  const handleProfileUpdate = async () => {
    setUpdatingProfile(true);
    try {
      await account.updateName(name);
      setEditProfile(false);
      alert("Profile updated successfully!");
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Failed to update profile.");
    } finally {
      setUpdatingProfile(false);
    }
  };

  const handleDeleteAddress = async (id) => {
    if (!confirm("Are you sure you want to delete this address?")) return;
    try {
      await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, id);
      setAddresses((prev) => prev.filter((a) => a.$id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete address.");
    }
  };

  if (loading)
    return <p className="text-center mt-20 text-gray-700 font-semibold">Loading user info...</p>;
  if (!user)
    return (
      <p className="text-center mt-20 text-gray-700 font-semibold">
        Please login to view your account.
      </p>
    );

  return (
    <>
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-8 min-h-screen bg-white rounded-lg shadow-md mt-10">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">My Account</h1>

        {/* Profile Section */}
        <section className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8 bg-gray-50 p-6 rounded-lg shadow-sm mb-12">
          <img
            src={avatarUrl?.trim() || "/default-avatar.png"}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
          />
          <div className="flex-1 w-full max-w-md">
            {editProfile ? (
              <>
                <input
                  type="text"
                  className="w-full border px-3 py-2 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-green-600 transition"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={updatingProfile}
                />
                <div className="flex space-x-3">
                  <button
                    onClick={handleProfileUpdate}
                    disabled={updatingProfile}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                  >
                    {updatingProfile ? "Updating..." : "Save"}
                  </button>
                  <button
                    onClick={() => setEditProfile(false)}
                    disabled={updatingProfile}
                    className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-xl font-semibold text-gray-900">{user.name}</h2>
                <p className="text-gray-600">{user.email}</p>
                <button
                  onClick={() => setEditProfile(true)}
                  className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Edit Profile
                </button>
              </>
            )}
          </div>
        </section>

        {/* Addresses Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 text-gray-900">Saved Addresses</h2>

          {loadingAddresses ? (
            <p className="text-center text-gray-600">Loading addresses...</p>
          ) : (
            <>
              {addresses.length === 0 ? (
                <p className="text-center text-gray-500">No saved addresses found.</p>
              ) : (
                addresses.map((addr) => (
                  <div
                    key={addr.$id}
                    className="bg-gray-50 p-5 rounded-lg shadow-sm border border-gray-200 mb-5"
                  >
                    <p className="font-medium text-gray-800">{addr.fullName}</p>
                    <p className="text-gray-700">{addr.phoneNumber}</p>
                    <p className="text-gray-700">
                      {addr.area}, {addr.city}, {addr.state} - {addr.pincode}
                    </p>
                    <div className="mt-3 flex gap-3">
                      <button
                        onClick={() => router.push(`/add-address?id=${addr.$id}`)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteAddress(addr.$id)}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}

              <button
                onClick={() => router.push("/add-address")}
                className="mt-4 bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700 transition block mx-auto"
              >
                Add New Address
              </button>
            </>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
};

export default MyAccountPage;
