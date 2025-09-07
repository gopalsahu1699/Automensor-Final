'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { account } from "@/lib/appwrite";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { User } from "lucide-react";

const MyAccountPage = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [name, setName] = useState("");
  const [editProfile, setEditProfile] = useState(false);
  const [updatingProfile, setUpdatingProfile] = useState(false);

  useEffect(() => {
    if (!user) return;
    setName(user.name || "");
  }, [user]);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

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

  if (loading)
    return (
      <p className="text-center mt-20 text-gray-700 font-semibold">
        Loading user info...
      </p>
    );

  if (!user) return null; // Render nothing while redirecting

  return (
    <>
      <Navbar />
      <main className="max-w-2xl mx-auto px-4 py-10 min-h-screen bg-white rounded-lg shadow-md mt-10">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">My Account</h1>

        {/* Profile Section */}
        <section className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8 bg-gray-50 p-6 rounded-lg shadow-sm mb-12">
          <div className="flex items-center justify-center w-24 h-24 rounded-full bg-gray-200 border-2 border-gray-300">
            <User className="w-16 h-16 text-gray-400" />
          </div>
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
                <h2 className="text-xl font-semibold text-gray-900">
                  {user.name}
                </h2>
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
      </main>
      <Footer />
    </>
  );
};

export default MyAccountPage;
