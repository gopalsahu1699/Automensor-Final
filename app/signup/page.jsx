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
      router.push("/"); // redirect after signup
    } catch (err) {
      setError(err.message || "Failed to sign up");
      setPassword(""); // optional: clear password on error
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setError("");
    setLoading(true);
    try {
      await loginWithGoogle();
      // Appwrite handles redirect after Google login
    } catch (err) {
      setError(err.message || "Google sign up failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex justify-center items-center h-screen bg-gray-50">
      <form onSubmit={handleSignup} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>

        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        <label htmlFor="name" className="block mb-2 text-sm font-medium">
          Name
        </label>
        <input
          id="name"
          type="text"
          className="w-full border px-3 py-2 mb-4 rounded-lg"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={loading}
        />

        <label htmlFor="email" className="block mb-2 text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          type="email"
          className="w-full border px-3 py-2 mb-4 rounded-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
        />

        <label htmlFor="password" className="block mb-2 text-sm font-medium">
          Password
        </label>
        <input
          id="password"
          type="password"
          className="w-full border px-3 py-2 mb-6 rounded-lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
          minLength={6} // example constraint
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-gray-800 hover:bg-gray-900"} text-white py-2 rounded-lg transition`}
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>

        <div className="flex items-center my-6">
          <div className="flex-grow border-t"></div>
          <span className="mx-2 text-gray-400 text-sm">or</span>
          <div className="flex-grow border-t"></div>
        </div>

        <button
          type="button"
          onClick={handleGoogleSignup}
          disabled={loading}
          className={`w-full bg-red-500 ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-red-600"} text-white py-2 rounded-lg transition`}
        >
          Continue with Google
        </button>

        <p className="text-sm mt-4 text-center">
          Already have an account?{" "}
          <span onClick={() => router.push("/login")} className="text-blue-600 cursor-pointer hover:underline">
            Login
          </span>
        </p>
      </form>
    </main>
  );
};

export default SignupPage;
