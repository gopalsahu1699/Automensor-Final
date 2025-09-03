"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { account, databases } from "@/lib/appwrite";
import { ID } from "appwrite";

const MyAccountPage = () => {
  const { user, loading } = useAuth();
  const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_USER_DATABASE_ID;
  const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID;

  const [name, setName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [loadingAddresses, setLoadingAddresses] = useState(true);
  const [editProfile, setEditProfile] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [addingAddress, setAddingAddress] = useState(false);
  const [addressForm, setAddressForm] = useState({
    fullName: "",
    phoneNumber: "",
    area: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [updatingProfile, setUpdatingProfile] = useState(false);
  const [updatingAddress, setUpdatingAddress] = useState(false);

  // Fetch user info and addresses
  useEffect(() => {
    if (!user) return;

    setName(user.name || "");
    setAvatarUrl(user.prefs?.avatar || user.imageUrl || "/default-avatar.png");

    const fetchAddresses = async () => {
      setLoadingAddresses(true);
      try {
        const res = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
        setAddresses(res.documents);
      } catch (err) {
        console.error("Error fetching addresses:", err);
      } finally {
        setLoadingAddresses(false);
      }
    };

    fetchAddresses();
  }, [user]);

  // Update profile name
  const handleProfileUpdate = async () => {
    setUpdatingProfile(true);
    try {
      await account.updateName(name);
      setEditProfile(false);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile.");
    } finally {
      setUpdatingProfile(false);
    }
  };

  // Add or edit address
  const handleSaveAddress = async () => {
    const phone = addressForm.phoneNumber?.trim();
    if (!phone || phone.length < 10 || phone.length > 20) {
      alert("Phone number must be 10-20 characters.");
      return;
    }

    const payload = { ...addressForm };

    setUpdatingAddress(true);

    try {
      if (editingAddressId) {
        await databases.updateDocument(DATABASE_ID, COLLECTION_ID, editingAddressId, payload);
        setAddresses((prev) =>
          prev.map((a) => (a.$id === editingAddressId ? { ...a, ...payload } : a))
        );
        setEditingAddressId(null);
      } else {
        const res = await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), payload);
        setAddresses((prev) => [...prev, res]);
        setAddingAddress(false);
      }

      setAddressForm({
        fullName: "",
        phoneNumber: "",
        area: "",
        city: "",
        state: "",
        pincode: "",
      });
    } catch (err) {
      console.error(err);
      alert("Failed to save address.");
    } finally {
      setUpdatingAddress(false);
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
                {editingAddressId === addr.$id ? (
                  <>
                    {["fullName", "phoneNumber", "area", "city", "state", "pincode"].map((field) => (
                      <input
                        key={field}
                        type="text"
                        placeholder={field.replace(/([A-Z])/g, " $1")}
                        value={addressForm[field] || ""}
                        onChange={(e) =>
                          setAddressForm({ ...addressForm, [field]: e.target.value })
                        }
                        className="border px-3 py-2 rounded-lg mb-2 w-full"
                        disabled={updatingAddress}
                      />
                    ))}
                    <button
                      onClick={handleSaveAddress}
                      disabled={updatingAddress}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 mr-2"
                    >
                      {updatingAddress ? "Saving..." : "Save"}
                    </button>
                    <button
                      onClick={() => setEditingAddressId(null)}
                      disabled={updatingAddress}
                      className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <p className="font-medium">{addr.fullName}</p>
                    <p>{addr.phoneNumber}</p>
                    <p>
                      {addr.area}, {addr.city}, {addr.state} - {addr.pincode}
                    </p>
                    <div className="mt-2 flex gap-2">
                      <button
                        onClick={() => {
                          setEditingAddressId(addr.$id);
                          setAddressForm(addr);
                        }}
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
                  </>
                )}
              </div>
            ))}

            {!addingAddress && (
              <button
                onClick={() => setAddingAddress(true)}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                Add New Address
              </button>
            )}

            {addingAddress && (
              <div className="bg-white p-6 rounded-lg shadow-md mt-4">
                <h3 className="text-xl font-semibold mb-4">Add New Address</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {["fullName", "phoneNumber", "area", "city", "state", "pincode"].map((field) => (
                    <input
                      key={field}
                      type="text"
                      placeholder={field.replace(/([A-Z])/g, " $1")}
                      value={addressForm[field] || ""}
                      onChange={(e) => setAddressForm({ ...addressForm, [field]: e.target.value })}
                      className="border px-3 py-2 rounded-lg mb-2 w-full"
                      disabled={updatingAddress}
                    />
                  ))}
                </div>
                <button
                  onClick={handleSaveAddress}
                  disabled={updatingAddress}
                  className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                >
                  {updatingAddress ? "Saving..." : "Save Address"}
                </button>
                <button
                  onClick={() => {
                    setAddingAddress(false);
                    setAddressForm({
                      fullName: "",
                      phoneNumber: "",
                      area: "",
                      city: "",
                      state: "",
                      pincode: "",
                    });
                  }}
                  disabled={updatingAddress}
                  className="ml-2 mt-4 bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
};

export default MyAccountPage;
