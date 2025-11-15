"use client";

import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Lock,
  UserPlus,
  Loader2,
  Chrome,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import { toast } from "react-toastify";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface SignupFormData {
  name: string;
  email: string;
  password: string;
}

interface SignupErrors {
  [key: string]: string;
}

interface SignupError {
  message: string;
  type: "validation" | "auth" | "general";
}

const benefits: string[] = [
  "Access to smart home products",
  "Personalized automation solutions",
  "24/7 customer support",
  "Exclusive member discounts",
];

export default function SignupClient() {
  const router = useRouter();
  const { signup, loginWithGoogle } = useAuth();

  const [formData, setFormData] = useState<SignupFormData>({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<SignupError | null>(null);
  const [validationErrors, setValidationErrors] = useState<SignupErrors>({});
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  // Validate email format
  const validateEmail = useCallback((email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }, []);

  // Validate form
  const validateForm = useCallback((): boolean => {
    const newErrors: SignupErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    } else if (formData.name.trim().length > 50) {
      newErrors.name = "Name must be less than 50 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    } else if (formData.password.length > 128) {
      newErrors.password = "Password is too long";
    }

    setValidationErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, validateEmail]);

  // Handle input change
  const handleInputChange = useCallback(
    (field: keyof SignupFormData, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      if (validationErrors[field]) {
        setValidationErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[field];
          return newErrors;
        });
      }
      setError(null);
    },
    [validationErrors]
  );

  // Handle signup
  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      await signup(formData.email, formData.password, formData.name);
      toast.success("✅ Account created successfully!");
      router.push("/");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to sign up";
      setError({
        message:
          errorMessage ||
          "Unable to create account. Please check your information and try again.",
        type: "auth",
      });
      toast.error("❌ Sign up failed: " + errorMessage);
      // Clear password on error for security
      setFormData((prev) => ({ ...prev, password: "" }));
    } finally {
      setLoading(false);
    }
  };

  // Handle Google signup
  const handleGoogleSignup = async () => {
    setError(null);
    setGoogleLoading(true);
    try {
      await loginWithGoogle();
      toast.success("✅ Account created successfully!");
      router.push("/");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Google sign up failed";
      setError({
        message: errorMessage,
        type: "general",
      });
      toast.error("❌ Google sign up failed");
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 px-4 py-12">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Card Container */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-700 px-8 py-10 text-white text-center">
              <motion.div
                className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm mb-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
              >
                <UserPlus className="w-8 h-8" />
              </motion.div>
              <h1 className="text-3xl font-extrabold mb-2">Create Account</h1>
              <p className="text-green-100">Join AUTOMENSOR today</p>
            </div>

            {/* Form Section */}
            <form
              onSubmit={handleSignup}
              className="p-8"
              noValidate
              aria-label="Signup Form"
            >
              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-start gap-3"
                  role="alert"
                >
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-red-700">Sign Up Error</p>
                    <p className="text-red-600 text-sm">{error.message}</p>
                  </div>
                </motion.div>
              )}

              {/* Name Input */}
              <div className="mb-6">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-semibold text-gray-700"
                >
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="name"
                    type="text"
                    className={`w-full border-2 pl-11 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 transition-all ${
                      validationErrors.name
                        ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                        : "border-gray-200 focus:border-green-500 focus:ring-green-200"
                    }`}
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    required
                    disabled={loading || googleLoading}
                    autoComplete="name"
                    aria-describedby={
                      validationErrors.name ? "name-error" : undefined
                    }
                  />
                  {validationErrors.name && (
                    <p id="name-error" className="text-red-500 text-sm mt-1">
                      {validationErrors.name}
                    </p>
                  )}
                </div>
              </div>

              {/* Email Input */}
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-semibold text-gray-700"
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="email"
                    type="email"
                    className={`w-full border-2 pl-11 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 transition-all ${
                      validationErrors.email
                        ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                        : "border-gray-200 focus:border-green-500 focus:ring-green-200"
                    }`}
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                    disabled={loading || googleLoading}
                    autoComplete="email"
                    aria-describedby={
                      validationErrors.email ? "email-error" : undefined
                    }
                  />
                  {validationErrors.email && (
                    <p id="email-error" className="text-red-500 text-sm mt-1">
                      {validationErrors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Password Input */}
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-semibold text-gray-700"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className={`w-full border-2 pl-11 pr-12 py-3 rounded-xl focus:outline-none focus:ring-2 transition-all ${
                      validationErrors.password
                        ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                        : "border-gray-200 focus:border-green-500 focus:ring-green-200"
                    }`}
                    placeholder="Min. 6 characters"
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                    required
                    disabled={loading || googleLoading}
                    minLength={6}
                    maxLength={128}
                    autoComplete="new-password"
                    aria-describedby={
                      validationErrors.password ? "password-error" : "password-hint"
                    }
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 rounded px-1"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                  {validationErrors.password && (
                    <p id="password-error" className="text-red-500 text-sm mt-1">
                      {validationErrors.password}
                    </p>
                  )}
                  {!validationErrors.password && (
                    <p
                      id="password-hint"
                      className="text-xs text-gray-500 mt-2"
                    >
                      Password must be at least 6 characters
                    </p>
                  )}
                </div>
              </div>

              {/* Sign Up Button */}
              <motion.button
                type="submit"
                disabled={loading || googleLoading}
                whileHover={{ scale: loading || googleLoading ? 1 : 1.02 }}
                whileTap={{ scale: loading || googleLoading ? 1 : 0.98 }}
                className={`w-full py-3.5 rounded-xl text-white font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                  loading || googleLoading
                    ? "bg-gray-400 cursor-not-allowed opacity-70"
                    : "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl"
                }`}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="w-5 h-5" />
                    <span>Sign Up</span>
                  </>
                )}
              </motion.button>

              {/* Divider */}
              <div className="flex items-center my-6">
                <div className="flex-grow border-t border-gray-300" />
                <span className="mx-4 text-gray-500 text-sm font-medium">
                  OR
                </span>
                <div className="flex-grow border-t border-gray-300" />
              </div>

              {/* Google Sign Up Button */}
              <motion.button
                type="button"
                onClick={handleGoogleSignup}
                disabled={loading || googleLoading}
                whileHover={{
                  scale: loading || googleLoading ? 1 : 1.02,
                }}
                whileTap={{ scale: loading || googleLoading ? 1 : 0.98 }}
                className={`w-full bg-white border-2 border-gray-300 text-gray-700 py-3.5 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-3 ${
                  googleLoading || loading
                    ? "opacity-70 cursor-not-allowed"
                    : "hover:bg-gray-50 hover:border-gray-400 hover:shadow-lg"
                }`}
              >
                {googleLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Chrome className="w-5 h-5 text-red-500" />
                    <span>Continue with Google</span>
                  </>
                )}
              </motion.button>

              {/* Login Link */}
              <p className="text-sm mt-6 text-center text-gray-600">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => router.push("/login")}
                  className="text-green-600 font-semibold hover:underline transition-all focus:outline-none focus:ring-2 focus:ring-green-500 rounded px-1"
                >
                  Login
                </button>
              </p>
            </form>
          </div>

          {/* Benefits Section */}
          <motion.div
            className="mt-8 bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="font-bold text-gray-900 mb-4 text-center">
              What you&apos;ll get:
            </h3>
            <div className="space-y-3">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 text-sm text-gray-700"
                >
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            className="mt-6 flex items-center justify-center gap-8 text-sm text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span>Secure Signup</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full" />
              <span>No Credit Card</span>
            </div>
          </motion.div>
        </motion.div>
      </main>
      <Footer />
    </>
  );
}
