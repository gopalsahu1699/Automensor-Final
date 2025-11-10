"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { User, Mail, Phone, MapPin, Edit2, Save, X, Loader2, CheckCircle, Settings } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import { account } from "@/lib/appwrite";
import { toast } from "react-toastify";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const MyAccountPage = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  
  const [editProfile, setEditProfile] = useState(false);
  const [updatingProfile, setUpdatingProfile] = useState(false);

  useEffect(() => {
    if (!user) return;
    setFormData({
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
      address: user.address || "",
    });
  }, [user]);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleProfileUpdate = async () => {
    setUpdatingProfile(true);
    try {
      await account.updateName(formData.name);
      // Add additional API calls for phone and address if your backend supports it
      // await account.updatePhone(formData.phone);
      // await account.updatePrefs({ address: formData.address });
      
      setEditProfile(false);
      toast.success("✅ Profile updated successfully!");
      router.refresh();
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to update profile");
    } finally {
      setUpdatingProfile(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
          <p className="text-gray-700 font-semibold text-lg">Loading your account...</p>
        </div>
        <Footer />
      </>
    );
  }

  if (!user) return null;

  const profileFields = [
    { icon: User, label: "Full Name", field: "name", type: "text", editable: true },
    { icon: Mail, label: "Email Address", field: "email", type: "email", editable: false },
    { icon: Phone, label: "Phone Number", field: "phone", type: "tel", editable: true },
    { icon: MapPin, label: "Address", field: "address", type: "text", editable: true },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <motion.div
            className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 md:p-12 text-white mb-8 shadow-2xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm border-4 border-white/30 flex items-center justify-center shadow-xl">
                  <User className="w-12 h-12 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-extrabold mb-2">My Account</h1>
                  <p className="text-blue-100 text-lg">Manage your profile information</p>
                </div>
              </div>
              {!editProfile && (
                <button
                  onClick={() => setEditProfile(true)}
                  className="hidden md:flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-6 py-3 rounded-full transition-all border border-white/30"
                >
                  <Edit2 className="w-5 h-5" />
                  Edit Profile
                </button>
              )}
            </div>
          </motion.div>

          {/* Main Content Card */}
          <motion.div
            className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Profile Information */}
            <div className="p-8 md:p-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <Settings className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Profile Information</h2>
              </div>

              <div className="space-y-6">
                {profileFields.map((field, index) => {
                  const IconComponent = field.icon;
                  const isEditable = field.editable && editProfile;
                  
                  return (
                    <motion.div
                      key={field.field}
                      className="border-b border-gray-100 pb-6 last:border-0"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      <label className="block text-sm font-semibold text-gray-600 mb-3">
                        <div className="flex items-center gap-2">
                          <IconComponent className="w-4 h-4" />
                          {field.label}
                        </div>
                      </label>
                      
                      {isEditable ? (
                        <input
                          type={field.type}
                          className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-gray-900 font-medium"
                          value={formData[field.field]}
                          onChange={(e) => handleInputChange(field.field, e.target.value)}
                          disabled={updatingProfile}
                          placeholder={`Enter your ${field.label.toLowerCase()}`}
                        />
                      ) : (
                        <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl">
                          <p className="text-gray-900 font-medium text-lg">
                            {formData[field.field] || `No ${field.label.toLowerCase()} provided`}
                          </p>
                          {!field.editable && (
                            <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                              Read-only
                            </span>
                          )}
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {/* Action Buttons */}
              {editProfile ? (
                <div className="flex gap-4 mt-8">
                  <button
                    onClick={handleProfileUpdate}
                    disabled={updatingProfile}
                    className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl text-white font-bold transition-all ${
                      updatingProfile
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl"
                    }`}
                  >
                    {updatingProfile ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      <>
                        <Save className="w-5 h-5" />
                        Save Changes
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setEditProfile(false);
                      setFormData({
                        name: user.name || "",
                        email: user.email || "",
                        phone: user.phone || "",
                        address: user.address || "",
                      });
                    }}
                    disabled={updatingProfile}
                    className="flex-1 flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3.5 rounded-xl font-bold transition-all"
                  >
                    <X className="w-5 h-5" />
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setEditProfile(true)}
                  className="md:hidden w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3.5 rounded-xl font-bold transition-all mt-8 shadow-lg"
                >
                  <Edit2 className="w-5 h-5" />
                  Edit Profile
                </button>
              )}
            </div>

            {/* Account Stats */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-8 md:px-10 py-6 border-t border-gray-100">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    <CheckCircle className="w-6 h-6 mx-auto" />
                  </div>
                  <p className="text-sm text-gray-600">Verified</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600 mb-1">0</div>
                  <p className="text-sm text-gray-600">Orders</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600 mb-1">
                    {new Date(user.$createdAt).getFullYear()}
                  </div>
                  <p className="text-sm text-gray-600">Member Since</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyAccountPage;
