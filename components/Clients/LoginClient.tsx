"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, LogIn, Loader2, Chrome, Eye, EyeOff, AlertCircle } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import { toast } from "react-toastify";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginError {
  message: string;
  type: "email" | "password" | "general";
}

export default function LoginClient() {
  const router = useRouter();
  const { login, loginWithGoogle } = useAuth();

  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<LoginError | null>(null);
  const [loading, setLoading] = useState(false);
  const [auth0Loading, setAuth0Loading] = useState(true);
  const [googleLoginLoading, setGoogleLoginLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  // Initialize Auth0
  useEffect(() => {
    const initAuth0 = async () => {
      try {
        if (
          typeof window !== "undefined" &&
          window.location.search.includes("code=") &&
          window.location.search.includes("state=")
        ) {
          // Handle Auth0 redirect callback
          toast.info("Completing authentication...");
        }
      } catch (err) {
        console.error("Auth0 initialization error:", err);
        setError({
          message: "Authentication service unavailable. Please try again.",
          type: "general",
        });
      } finally {
        setAuth0Loading(false);
      }
    };

    initAuth0();
  }, [router]);

  // Validate email
  const validateEmail = useCallback((email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }, []);

  // Validate form
  const validateForm = useCallback((): boolean => {
    const newErrors: typeof validationErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setValidationErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, validateEmail]);

  // Handle form input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear validation error for this field
    if (validationErrors[name as keyof typeof validationErrors]) {
      setValidationErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    setError(null);
  };

  // Handle login
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      await login(formData.email, formData.password);
      toast.success("✅ Login successful!");
      router.push("/");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to login";
      setError({
        message: errorMessage || "Invalid email or password. Please try again.",
        type: "general",
      });
      toast.error("❌ Login failed: " + errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Handle Google login
  const handleGoogleLogin = async () => {
    setError(null);
    setGoogleLoginLoading(true);
    try {
      await loginWithGoogle();
      toast.success("✅ Google login successful!");
      router.push("/");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Google login failed";
      setError({
        message: errorMessage,
        type: "general",
      });
      toast.error("❌ Google login failed");
    } finally {
      setGoogleLoginLoading(false);
    }
  };

  if (auth0Loading) {
    return (
      <>
        <Navbar />
        <main className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4" />
          <p className="text-gray-600 text-lg font-medium">
            Loading authentication...
          </p>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-4 py-12">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Card Container */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-10 text-white text-center">
              <motion.div
                className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm mb-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
              >
                <LogIn className="w-8 h-8" />
              </motion.div>
              <h1 className="text-3xl font-extrabold mb-2">Welcome Back!</h1>
              <p className="text-blue-100">
                Sign in to your AUTOMENSOR account
              </p>
            </div>

            {/* Form Section */}
            <form
              onSubmit={handleLogin}
              className="p-8"
              noValidate
              aria-label="Login Form"
            >
              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 text-sm flex items-start gap-3"
                  role="alert"
                >
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Login Error</p>
                    <p>{error.message}</p>
                  </div>
                </motion.div>
              )}

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
                    name="email"
                    className={`w-full border-2 pl-11 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 transition-all ${
                      validationErrors.email
                        ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                        : "border-gray-200 focus:border-blue-500 focus:ring-blue-200"
                    }`}
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={loading || googleLoginLoading}
                    autoComplete="email"
                    required
                    aria-describedby={validationErrors.email ? "email-error" : undefined}
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
                    name="password"
                    className={`w-full border-2 pl-11 pr-12 py-3 rounded-xl focus:outline-none focus:ring-2 transition-all ${
                      validationErrors.password
                        ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                        : "border-gray-200 focus:border-blue-500 focus:ring-blue-200"
                    }`}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    disabled={loading || googleLoginLoading}
                    autoComplete="current-password"
                    required
                    aria-describedby={validationErrors.password ? "password-error" : undefined}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
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
                </div>
              </div>

              {/* Login Button */}
              <motion.button
                type="submit"
                disabled={loading || googleLoginLoading}
                whileHover={{ scale: loading || googleLoginLoading ? 1 : 1.02 }}
                whileTap={{ scale: loading || googleLoginLoading ? 1 : 0.98 }}
                className={`w-full py-3.5 rounded-xl text-white font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                  loading || googleLoginLoading
                    ? "bg-gray-400 cursor-not-allowed opacity-70"
                    : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl"
                }`}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Logging in...</span>
                  </>
                ) : (
                  <>
                    <LogIn className="w-5 h-5" />
                    <span>Login</span>
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

              {/* Google Login Button */}
              <motion.button
                type="button"
                onClick={handleGoogleLogin}
                disabled={loading || googleLoginLoading}
                whileHover={{
                  scale: loading || googleLoginLoading ? 1 : 1.02,
                }}
                whileTap={{ scale: loading || googleLoginLoading ? 1 : 0.98 }}
                className={`w-full bg-white border-2 border-gray-300 text-gray-700 py-3.5 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-3 ${
                  googleLoginLoading || loading
                    ? "opacity-70 cursor-not-allowed"
                    : "hover:bg-gray-50 hover:border-gray-400 hover:shadow-lg"
                }`}
              >
                {googleLoginLoading ? (
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

              {/* Sign Up Link */}
              <p className="text-sm mt-6 text-center text-gray-600">
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  onClick={() => router.push("/signup")}
                  className="text-blue-600 font-semibold hover:underline transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-1"
                >
                  Sign Up
                </button>
              </p>
            </form>
          </div>

          {/* Trust Indicators */}
          <motion.div
            className="mt-8 flex items-center justify-center gap-8 text-sm text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span>Secure Login</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full" />
              <span>SSL Encrypted</span>
            </div>
          </motion.div>
        </motion.div>
      </main>
      <Footer />
    </>
  );
}
