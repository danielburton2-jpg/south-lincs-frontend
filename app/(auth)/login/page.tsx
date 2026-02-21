"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const EMAIL_HISTORY_KEY = "sls_email_history_v1";

function VersionFooter() {
  const [version, setVersion] = useState("Loading...");

  useEffect(() => {
    async function loadVersion() {
      try {
        // ✅ Electron version
        if (typeof window !== "undefined" && (window as any).electronAPI) {
          const v = await (window as any).electronAPI.getVersion();
          setVersion(v);
          return;
        }

        // ✅ Vercel fallback
        const envVersion = process.env.NEXT_PUBLIC_APP_VERSION;
        if (envVersion) {
          setVersion(envVersion);
          return;
        }

        setVersion("web");
      } catch {
        setVersion("unknown");
      }
    }

    loadVersion();
  }, []);

  return (
    <div className="pt-4 text-center text-xs text-slate-400">
      Version: <span className="text-slate-300">{version}</span>
    </div>
  );
}

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [environment, setEnvironment] = useState("dev");
  const [error, setError] = useState("");
  const [emailHistory, setEmailHistory] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(EMAIL_HISTORY_KEY);
    if (saved) {
      setEmailHistory(JSON.parse(saved));
    }
  }, []);

  function saveEmail(email: string) {
    const updated = [email, ...emailHistory.filter((e) => e !== email)].slice(0, 5);
    setEmailHistory(updated);
    localStorage.setItem(EMAIL_HISTORY_KEY, JSON.stringify(updated));
  }

  function handleLogin() {
    if (
      email === "danielburton2@sky.com" &&
      password === "LucyMaeJack1520."
    ) {
      localStorage.setItem("sls_user", email);
      localStorage.setItem("sls_env", environment);

      saveEmail(email);

      router.push(`/${environment}`);
    } else {
      setError("Invalid login details");
    }
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    handleLogin();
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8 text-white border border-white/10">
        <h1 className="text-3xl font-bold text-center mb-2">
          South Lincs Systems
        </h1>
        <p className="text-center text-slate-400 mb-6">
          Secure Environment Access
        </p>

        <form onSubmit={onSubmit} className="space-y-4">

          {emailHistory.length > 0 && (
            <select
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg bg-slate-800 border border-slate-600"
            >
              <option value="">Select saved email...</option>
              {emailHistory.map((e) => (
                <option key={e} value={e}>{e}</option>
              ))}
            </select>
          )}

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-lg bg-slate-800 border border-slate-600"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-lg bg-slate-800 border border-slate-600"
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
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition rounded-lg p-3 font-semibold"
          >
            Login
          </button>

          <VersionFooter />
        </form>
      </div>
    </div>
  );
}