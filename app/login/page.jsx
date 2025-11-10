"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, LogIn, Loader2, Chrome, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import { createAuth0Client } from "@auth0/auth0-spa-js";
import { toast } from "react-toastify";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const LoginPage = () => {
  const router = useRouter();
  const { login, loginWithGoogle } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [auth0Client, setAuth0Client] = useState(null);
  const [auth0Loading, setAuth0Loading] = useState(true);
  const [googleLoginLoading, setGoogleLoginLoading] = useState(false);

  useEffect(() => {
    const initAuth0 = async () => {
      try {
        const auth0 = await createAuth0Client({
          domain: process.env.NEXT_PUBLIC_AUTH0_DOMAIN,
          client_id: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID,
          redirect_uri: window.location.origin,
        });
        setAuth0Client(auth0);

        if (
          window.location.search.includes("code=") &&
          window.location.search.includes("state=")
        ) {
          await auth0.handleRedirectCallback();
          const user = await auth0.getUser();
          if (user) router.push("/");
        }
      } catch (err) {
        setError("Failed to initialize Auth0");
      } finally {
        setAuth0Loading(false);
      }
    };
    initAuth0();
  }, [router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      toast.success("✅ Login successful!");
      router.push("/");
    } catch (err) {
      setError(err.message || "Failed to login");
      toast.error("❌ Incorrect credentials");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setGoogleLoginLoading(true);
    try {
      await loginWithGoogle();
    } catch (err) {
      setError(err.message || "Google login failed");
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
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600 text-lg font-medium">Loading authentication...</p>
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
              <p className="text-blue-100">Sign in to your Automensor account</p>
            </div>

            {/* Form Section */}
            <form onSubmit={handleLogin} className="p-8" aria-label="Login Form">
              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 text-sm"
                  role="alert"
                >
                  {error}
                </motion.div>
              )}

              {/* Email Input */}
              <div className="mb-6">
                <label htmlFor="email" className="block mb-2 text-sm font-semibold text-gray-700">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="email"
                    type="email"
                    className="w-full border-2 border-gray-200 pl-11 pr-4 py-3 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading || googleLoginLoading}
                    autoComplete="email"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="mb-6">
                <label htmlFor="password" className="block mb-2 text-sm font-semibold text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className="w-full border-2 border-gray-200 pl-11 pr-12 py-3 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading || googleLoginLoading}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading || googleLoginLoading}
                className={`w-full py-3.5 rounded-xl text-white font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                }`}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  <>
                    <LogIn className="w-5 h-5" />
                    Login
                  </>
                )}
              </button>

              {/* Divider */}
              <div className="flex items-center my-6">
                <div className="flex-grow border-t border-gray-300" />
                <span className="mx-4 text-gray-500 text-sm font-medium">OR</span>
                <div className="flex-grow border-t border-gray-300" />
              </div>

              {/* Google Login Button */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={loading || googleLoginLoading}
                className={`w-full bg-white border-2 border-gray-300 text-gray-700 py-3.5 rounded-xl font-bold hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 flex items-center justify-center gap-3 ${
                  googleLoginLoading ? "opacity-70 cursor-not-allowed" : "hover:shadow-lg"
                }`}
              >
                {googleLoginLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Chrome className="w-5 h-5 text-red-500" />
                    Continue with Google
                  </>
                )}
              </button>

              {/* Sign Up Link */}
              <p className="text-sm mt-6 text-center text-gray-600">
                Don't have an account?{" "}
                <span
                  onClick={() => router.push("/signup")}
                  className="text-blue-600 font-semibold cursor-pointer hover:underline transition-all"
                >
                  Sign Up
                </span>
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
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Secure Login</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>SSL Encrypted</span>
            </div>
          </motion.div>
        </motion.div>
      </main>
      <Footer />
    </>
  );
};

export default LoginPage;
