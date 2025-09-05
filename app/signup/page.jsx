"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";

const SignupPage = () => {
  const router = useRouter();
  const { signup, loginWithGoogle } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signup(email, password, name);
      router.push("/"); // redirect after successful signup
    } catch (err) {
      setError(err.message || "Failed to sign up");
      setPassword(""); // clear password input on error for security
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setError("");
    setLoading(true);
    try {
      await loginWithGoogle();
      // redirect handled by auth flow
    } catch (err) {
      setError(err.message || "Google sign up failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <form
        onSubmit={handleSignup}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
        aria-label="Signup Form"
      >
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-900">Sign Up</h1>

        {error && (
          <p className="text-red-600 text-sm mb-4" role="alert" aria-live="polite">
            {error}
          </p>
        )}

        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-800">
          Name
        </label>
        <input
          id="name"
          type="text"
          className="w-full border px-3 py-2 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={loading}
          autoComplete="name"
        />

        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-800">
          Email
        </label>
        <input
          id="email"
          type="email"
          className="w-full border px-3 py-2 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
          autoComplete="email"
        />

        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-800">
          Password
        </label>
        <input
          id="password"
          type="password"
          className="w-full border px-3 py-2 mb-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
          minLength={6}
          autoComplete="new-password"
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-lg text-white ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-gray-800 hover:bg-gray-900"
          } transition`}
          aria-busy={loading}
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>

        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300" />
          <span className="mx-2 text-gray-400 text-sm">or</span>
          <div className="flex-grow border-t border-gray-300" />
        </div>

        <button
          type="button"
          onClick={handleGoogleSignup}
          disabled={loading}
          className={`w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Processing..." : "Continue with Google"}
        </button>

        <p className="text-sm mt-4 text-center text-gray-700">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/login")}
            className="text-blue-600 cursor-pointer hover:underline"
            role="link"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter") router.push("/login");
            }}
          >
            Login
          </span>
        </p>
      </form>
    </main>
  );
};

export default SignupPage;
