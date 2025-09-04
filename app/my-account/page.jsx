"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { account, databases } from "@/lib/appwrite";
import { ID } from "appwrite";

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
  // Remove local editing/adding state here as navigation will handle it
  // const [editingAddressId, setEditingAddressId] = useState(null);
  // const [addingAddress, setAddingAddress] = useState(false);
  // const [addressForm, setAddressForm] = useState({ ... });

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
        console.log("Fetched user addresses:", userAddresses);
      } catch (err) {
        console.error("Error fetching addresses:", err);
      } finally {
        setLoadingAddresses(false);
      }
    };

    fetchAddresses();
  }, [user, DATABASE_ID, COLLECTION_ID]);

  // Update profile name
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

  // Delete address
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

  if (loading) return <p className="text-center mt-20">Loading user info...</p>;
  if (!user) return <p className="text-center mt-20">Please login to view your account.</p>;

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Account</h1>

      {/* Profile Section */}
      <section className="flex items-center space-x-6 bg-white p-6 rounded-lg shadow-md mb-8">
        <img
          src={avatarUrl?.trim() || "/default-avatar.png"}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
        />
        <div className="flex-1">
          {editProfile ? (
            <>
              <input
                type="text"
                className="w-full border px-3 py-2 rounded-lg mb-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={updatingProfile}
              />
              <button
                onClick={handleProfileUpdate}
                disabled={updatingProfile}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                {updatingProfile ? "Updating..." : "Save"}
              </button>
              <button
                onClick={() => setEditProfile(false)}
                disabled={updatingProfile}
                className="ml-2 bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p className="text-gray-600">{user.email}</p>
              <button
                onClick={() => setEditProfile(true)}
                className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Edit Profile
              </button>
            </>
          )}
        </div>
      </section>

      {/* Addresses Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Saved Addresses</h2>

        {loadingAddresses ? (
          <p className="text-center text-gray-600">Loading addresses...</p>
        ) : (
          <>
            {addresses.map((addr) => (
              <div
                key={addr.$id}
                className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-4"
              >
                {/* Instead of inline edit, clicking edit redirects to /add-address with address id */}
                <p className="font-medium">{addr.fullName}</p>
                <p>{addr.phoneNumber}</p>
                <p>
                  {addr.area}, {addr.city}, {addr.state} - {addr.pincode}
                </p>
                <div className="mt-2 flex gap-2">
                  <button
                    onClick={() => router.push(`/add-address?id=${addr.$id}`)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteAddress(addr.$id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}

            <button
              onClick={() => router.push("/add-address")}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              Add New Address
            </button>
          </>
        )}
      </section>
    </main>
  );
};

export default MyAccountPage;
