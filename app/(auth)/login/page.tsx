"use client";
import VersionFooter from "@/app/components/VersionFooter";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [environment, setEnvironment] = useState("dev");
  const [error, setError] = useState("");

const handleLogin = () => {
  if (
    email === "danielburton2@sky.com" &&
    password === "LucyMaeJack1520."
  ) {
    localStorage.setItem("sls_user", email);
    localStorage.setItem("sls_env", environment);
    router.push(`/${environment}`);
  } else {
    setError("Invalid login details");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8 text-white border border-white/10">
        <h1 className="text-3xl font-bold text-center mb-2">
          South Lincs Systems
        </h1>
        <p className="text-center text-slate-400 mb-6">
          Secure Environment Access
        </p>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-lg bg-slate-800 border border-slate-600 focus:outline-none focus:border-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-lg bg-slate-800 border border-slate-600 focus:outline-none focus:border-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <select
            value={environment}
            onChange={(e) => setEnvironment(e.target.value)}
            className="w-full p-3 rounded-lg bg-slate-800 border border-slate-600"
          >
            <option value="dev">Development</option>
            <option value="testing">Testing</option>
            <option value="live">Live</option>
          </select>

          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}

          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 transition rounded-lg p-3 font-semibold"
          >
            Login
          </button>
          <VersionFooter />
        </div>
      </div>
    </div>
  );
}