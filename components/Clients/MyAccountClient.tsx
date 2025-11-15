"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Edit2,
  Save,
  X,
  Loader2,
  CheckCircle,
  Settings,
  AlertCircle,
} from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import { account } from "@/lib/appwrite";
import { toast } from "react-toastify";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface ProfileField {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  field: keyof FormData;
  type: string;
  editable: boolean;
  required?: boolean;
}

interface ValidationError {
  [key: string]: string;
}

interface UserPreferences {
  phone?: string;
  address?: string;
  [key: string]: any;
}

const profileFields: ProfileField[] = [
  {
    icon: User,
    label: "Full Name",
    field: "name",
    type: "text",
    editable: true,
    required: true,
  },
  {
    icon: Mail,
    label: "Email Address",
    field: "email",
    type: "email",
    editable: false,
  },
  {
    icon: Phone,
    label: "Phone Number",
    field: "phone",
    type: "tel",
    editable: true,
  },
  {
    icon: MapPin,
    label: "Address",
    field: "address",
    type: "text",
    editable: true,
  },
];

export default function MyAccountClient() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [editProfile, setEditProfile] = useState(false);
  const [updatingProfile, setUpdatingProfile] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationError>({});
  const [updateError, setUpdateError] = useState<string | null>(null);

  // Initialize form with user data
  useEffect(() => {
    if (!user) return;

    // Get preferences (phone and address stored in preferences)
    const preferences = (user.prefs || {}) as UserPreferences;

    setFormData({
      name: user.name || "",
      email: user.email || "",
      phone: preferences.phone || "",
      address: preferences.address || "",
    });
  }, [user]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  // Validate form data
  const validateForm = useCallback((): boolean => {
    const errors: ValidationError = {};

    if (!formData.name.trim()) {
      errors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters";
    }

    if (
      formData.phone &&
      !/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/.test(
        formData.phone
      )
    ) {
      errors.phone = "Invalid phone number format";
    }

    if (formData.address && formData.address.length > 200) {
      errors.address = "Address must be less than 200 characters";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  }, [formData]);

  // Handle input change
  const handleInputChange = useCallback(
    (field: keyof FormData, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      if (validationErrors[field]) {
        setValidationErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[field];
          return newErrors;
        });
      }
      setUpdateError(null);
    },
    [validationErrors]
  );

  // Handle profile update
  const handleProfileUpdate = async () => {
    if (!validateForm()) {
      return;
    }

    setUpdatingProfile(true);
    setUpdateError(null);

    try {
      // Update name
      if (formData.name !== user?.name) {
        await account.updateName(formData.name);
      }

      // Update preferences for phone and address
      const preferences = (user?.prefs || {}) as UserPreferences;

      if (
        formData.phone !== preferences.phone ||
        formData.address !== preferences.address
      ) {
        await account.updatePrefs({
          ...preferences,
          phone: formData.phone,
          address: formData.address,
        });
      }

      setEditProfile(false);
      toast.success("✅ Profile updated successfully!");
      router.refresh();
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to update profile";
      setUpdateError(errorMessage);
      console.error("Profile update error:", err);
      toast.error("❌ Failed to update profile");
    } finally {
      setUpdatingProfile(false);
    }
  };

  // Handle cancel edit
  const handleCancelEdit = useCallback(() => {
    setEditProfile(false);
    setValidationErrors({});
    setUpdateError(null);
    if (user) {
      const preferences = (user.prefs || {}) as UserPreferences;
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: preferences.phone || "",
        address: preferences.address || "",
      });
    }
  }, [user]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4" />
          <p className="text-gray-700 font-semibold text-lg">
            Loading your account...
          </p>
        </div>
        <Footer />
      </>
    );
  }

  if (!user) return null;

  const preferences = (user.prefs || {}) as UserPreferences;

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
                  <h1 className="text-3xl md:text-4xl font-extrabold mb-2">
                    My Account
                  </h1>
                  <p className="text-blue-100 text-lg">
                    Manage your profile information
                  </p>
                </div>
              </div>
              {!editProfile && (
                <motion.button
                  onClick={() => setEditProfile(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="hidden md:flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-6 py-3 rounded-full transition-all border border-white/30"
                >
                  <Edit2 className="w-5 h-5" />
                  Edit Profile
                </motion.button>
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
                <h2 className="text-2xl font-bold text-gray-900">
                  Profile Information
                </h2>
              </div>

              {/* Error Alert */}
              {updateError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-start gap-3"
                  role="alert"
                >
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-red-700">Update Error</p>
                    <p className="text-red-600 text-sm">{updateError}</p>
                  </div>
                </motion.div>
              )}

              {/* Form Fields */}
              <div className="space-y-6">
                {profileFields.map((field, index) => {
                  const IconComponent = field.icon;
                  const hasError = validationErrors[field.field];

                  return (
                    <motion.div
                      key={field.field}
                      className="border-b border-gray-100 pb-6 last:border-0"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <label
                        htmlFor={field.field}
                        className="block text-sm font-semibold text-gray-600 mb-3"
                      >
                        <div className="flex items-center gap-2">
                          <IconComponent className="w-4 h-4" />
                          {field.label}
                          {field.required && (
                            <span className="text-red-500">*</span>
                          )}
                        </div>
                      </label>

                      {field.editable && editProfile ? (
                        <div>
                          <input
                            id={field.field}
                            type={field.type}
                            className={`w-full border-2 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 transition-all text-gray-900 font-medium ${
                              hasError
                                ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                                : "border-gray-200 focus:border-blue-500 focus:ring-blue-200"
                            }`}
                            value={formData[field.field]}
                            onChange={(e) =>
                              handleInputChange(field.field, e.target.value)
                            }
                            disabled={updatingProfile}
                            placeholder={`Enter your ${field.label.toLowerCase()}`}
                            aria-describedby={
                              hasError ? `${field.field}-error` : undefined
                            }
                          />
                          {hasError && (
                            <p
                              id={`${field.field}-error`}
                              className="text-red-500 text-sm mt-1"
                            >
                              {hasError}
                            </p>
                          )}
                        </div>
                      ) : (
                        <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl">
                          <p className="text-gray-900 font-medium text-lg">
                            {formData[field.field] ||
                              `No ${field.label.toLowerCase()} provided`}
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
                  <motion.button
                    onClick={handleProfileUpdate}
                    disabled={updatingProfile}
                    whileHover={{ scale: updatingProfile ? 1 : 1.02 }}
                    whileTap={{ scale: updatingProfile ? 1 : 0.98 }}
                    className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl text-white font-bold transition-all ${
                      updatingProfile
                        ? "bg-gray-400 cursor-not-allowed opacity-70"
                        : "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl"
                    }`}
                  >
                    {updatingProfile ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Updating...</span>
                      </>
                    ) : (
                      <>
                        <Save className="w-5 h-5" />
                        <span>Save Changes</span>
                      </>
                    )}
                  </motion.button>
                  <motion.button
                    onClick={handleCancelEdit}
                    disabled={updatingProfile}
                    whileHover={{ scale: updatingProfile ? 1 : 1.02 }}
                    whileTap={{ scale: updatingProfile ? 1 : 0.98 }}
                    className="flex-1 flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3.5 rounded-xl font-bold transition-all disabled:opacity-70"
                  >
                    <X className="w-5 h-5" />
                    <span>Cancel</span>
                  </motion.button>
                </div>
              ) : (
                <motion.button
                  onClick={() => setEditProfile(true)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="md:hidden w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3.5 rounded-xl font-bold transition-all mt-8 shadow-lg"
                >
                  <Edit2 className="w-5 h-5" />
                  <span>Edit Profile</span>
                </motion.button>
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
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    0
                  </div>
                  <p className="text-sm text-gray-600">Orders</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600 mb-1">
                    {user && user.$createdAt
                      ? new Date(user.$createdAt).getFullYear()
                      : "—"}
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
}
