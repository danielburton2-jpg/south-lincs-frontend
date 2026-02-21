"use client";

import VersionFooter from "@/app/components/VersionFooter";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

const SAVED_EMAILS_KEY = "sls_saved_emails";
const LAST_EMAIL_KEY = "sls_last_email";

function readSavedEmails(): string[] {
  try {
    const raw = localStorage.getItem(SAVED_EMAILS_KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    if (!Array.isArray(arr)) return [];
    return arr.filter((x) => typeof x === "string");
  } catch {
    return [];
  }
}

function writeSavedEmails(emails: string[]) {
  localStorage.setItem(SAVED_EMAILS_KEY, JSON.stringify(emails));
}

function saveSuccessfulEmail(email: string) {
  const normalized = email.trim().toLowerCase();
  if (!normalized) return;

  const existing = readSavedEmails();

  // move to top, remove duplicates
  const next = [normalized, ...existing.filter((e) => e !== normalized)].slice(0, 10);

  writeSavedEmails(next);
  localStorage.setItem(LAST_EMAIL_KEY, normalized);
}

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [savedEmails, setSavedEmails] = useState<string[]>([]);
  const [showSaved, setShowSaved] = useState(false);

  const [password, setPassword] = useState("");
  const [environment, setEnvironment] = useState("dev");
  const [error, setError] = useState("");

  // load saved emails + last email once
  useEffect(() => {
    const emails = readSavedEmails();
    setSavedEmails(emails);

    const last = localStorage.getItem(LAST_EMAIL_KEY);
    if (last && typeof last === "string") {
      setEmail(last);
    }
  }, []);

  const filteredSaved = useMemo(() => {
    const q = email.trim().toLowerCase();
    if (!q) return savedEmails;
    return savedEmails.filter((e) => e.includes(q));
  }, [email, savedEmails]);

  const handleLogin = () => {
    setError("");

    if (email === "danielburton2@sky.com" && password === "LucyMaeJack1520.") {
      // save successful email(s)
      saveSuccessfulEmail(email);

      // refresh saved list in UI immediately
      const updated = readSavedEmails();
      setSavedEmails(updated);

      localStorage.setItem("sls_user", email);
      localStorage.setItem("sls_env", environment);
      router.push(`/${environment}`);
    } else {
      setError("Invalid login details");
    }
  };

  const pickEmail = (e: string) => {
    setEmail(e);
    setShowSaved(false);
  };

  const clearSavedEmails = () => {
    localStorage.removeItem(SAVED_EMAILS_KEY);
    localStorage.removeItem(LAST_EMAIL_KEY);
    setSavedEmails([]);
    setShowSaved(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8 text-white border border-white/10">
        <h1 className="text-3xl font-bold text-center mb-2">TEST LOGIN FILE</h1>
        <p className="text-center text-slate-400 mb-6">Secure Environment Access</p>

        <div className="space-y-4">
          {/* Email + saved dropdown */}
          <div className="relative">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 rounded-lg bg-slate-800 border border-slate-600 focus:outline-none focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setShowSaved(true)}
              onBlur={() => {
                // small delay so click works
                setTimeout(() => setShowSaved(false), 150);
              }}
            />

            {showSaved && savedEmails.length > 0 && (
              <div className="absolute z-50 mt-2 w-full rounded-lg border border-slate-700 bg-slate-900 shadow-xl overflow-hidden">
                <div className="flex items-center justify-between px-3 py-2 border-b border-slate-800">
                  <span className="text-xs text-slate-400">Saved emails</span>
                  <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={clearSavedEmails}
                    className="text-xs text-red-400 hover:text-red-300"
                  >
                    Clear
                  </button>
                </div>

                {filteredSaved.length === 0 ? (
                  <div className="px-3 py-2 text-sm text-slate-400">No matches</div>
                ) : (
                  <div className="max-h-44 overflow-auto">
                    {filteredSaved.map((e) => (
                      <button
                        key={e}
                        type="button"
                        onMouseDown={(ev) => ev.preventDefault()}
                        onClick={() => pickEmail(e)}
                        className="w-full text-left px-3 py-2 text-sm hover:bg-slate-800"
                      >
                        {e}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

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

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

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