"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { checkAccess } from "../lib/authGuard";

export default function DevHome() {
  const router = useRouter();

  useEffect(() => {
    checkAccess(router, "dev");
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("sls_user");
    localStorage.removeItem("sls_env");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      
      {/* Top Bar */}
      <div className="flex justify-between items-center px-6 py-4 bg-slate-800 border-b border-slate-700">
        <h1 className="text-lg font-semibold text-blue-400">
          Development Environment
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm font-semibold transition"
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center h-[80vh]">
        <h2 className="text-3xl font-bold">
          Welcome Daniel
        </h2>
      </div>
    </div>
  );
}