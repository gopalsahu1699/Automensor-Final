"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [auth0Client, setAuth0Client] = useState(null);
  const [auth0Loading, setAuth0Loading] = useState(true);
  const [auth0LoginLoading, setAuth0LoginLoading] = useState(false);
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

        if (window.location.search.includes("code=") && window.location.search.includes("state=")) {
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
      <main className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
        <p className="text-gray-500 text-lg">Loading authentication...</p>
      </main>
    );
  }

  return (
   <> 
   <Navbar />
    <main className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
        aria-label="Login Form"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

        {error && <p className="text-red-600 text-sm mb-4" role="alert">{error}</p>}

        <label htmlFor="email" className="block mb-2 text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          type="email"
          className="w-full border px-3 py-2 mb-4 rounded-lg focus:outline-orange-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading || googleLoginLoading || auth0LoginLoading}
          autoComplete="email"
        />

        <label htmlFor="password" className="block mb-2 text-sm font-medium">
          Password
        </label>
        <input
          id="password"
          type="password"
          className="w-full border px-3 py-2 mb-6 rounded-lg focus:outline-orange-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading || googleLoginLoading || auth0LoginLoading}
          autoComplete="current-password"
        />

        <button
          type="submit"
          disabled={loading || googleLoginLoading || auth0LoginLoading}
          className={`w-full py-2 rounded-lg text-white ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-gray-800 hover:bg-gray-900"
          }`}
          aria-disabled={loading || googleLoginLoading || auth0LoginLoading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300" />
          <span className="mx-2 text-gray-400 text-sm">or</span>
          <div className="flex-grow border-t border-gray-300" />
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading || googleLoginLoading || auth0LoginLoading}
          className={`w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 mb-4 ${
            googleLoginLoading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {googleLoginLoading ? "Processing..." : "Continue with Google"}
        </button>

        <p className="text-sm mt-4 text-center">
          Don’t have an account?{" "}
          <span
            onClick={() => router.push("/signup")}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Sign Up
          </span>
        </p>
      </form>
    </main>
   <Footer />
   </>
  );
};

export default LoginPage;
