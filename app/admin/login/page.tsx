"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { motion } from "motion/react";
import { Lock, Mail, Key, ShieldCheck, AlertCircle, Eye, EyeOff } from "lucide-react";
import Image from "next/image";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pin, setPin] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPin, setShowPin] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Redirect if already logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Even if auth is good, we might want to check PIN session
        const pinVerified = sessionStorage.getItem("admin_pin_verified");
        if (pinVerified === "true") {
          router.push("/admin");
        }
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 1. Firebase Auth
      await signInWithEmailAndPassword(auth, email, password);

      // 2. PIN Verification (Example: 1234)
      // In a real app, this would be checked against a DB or secure Env
      const CORRECT_PIN = "1234"; 
      
      if (pin !== CORRECT_PIN) {
        setError("Invalid Admin PIN. Please check your credentials.");
        setLoading(false);
        return;
      }

      sessionStorage.setItem("admin_pin_verified", "true");
      router.push("/admin");
    } catch (err: any) {
      setError(err.message || "Authentication failed. Please check your email and password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-6">
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-zinc-200/50 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-zinc-200/50 rounded-full blur-3xl"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl border border-zinc-100 overflow-hidden relative z-10"
      >
        <div className="p-8 sm:p-12">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-black text-white mb-6 shadow-xl">
              <Lock size={28} />
            </div>
            <h1 className="text-3xl font-bold text-zinc-900 tracking-tight mb-2">Secure Access</h1>
            <p className="text-sm text-zinc-400 font-medium uppercase tracking-[0.2em]">Mac Bancy Atelier Admin</p>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-8 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600"
            >
              <AlertCircle size={20} className="shrink-0" />
              <p className="text-xs font-bold leading-tight">{error}</p>
            </motion.div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                <input 
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@macbancy.com"
                  className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl pl-12 pr-4 py-4 text-sm font-medium focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 ml-1">Password</label>
              <div className="relative">
                <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                <input 
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl pl-12 pr-12 py-4 text-sm font-medium focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-black transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 ml-1">Security PIN</label>
              <div className="relative">
                <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                <input 
                  type={showPin ? "text" : "password"}
                  maxLength={4}
                  required
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="4-Digit PIN"
                  className={`w-full bg-zinc-50 border border-zinc-100 rounded-2xl pl-12 pr-12 py-4 text-sm font-medium focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all ${!showPin ? 'tracking-[0.5em]' : ''}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPin(!showPin)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-black transition-colors"
                >
                  {showPin ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-5 rounded-2xl font-bold uppercase tracking-widest text-sm hover:bg-zinc-800 transition-all shadow-xl active:scale-[0.98] disabled:opacity-50 mt-4"
            >
              {loading ? "Authenticating..." : "Authorize Access"}
            </button>
          </form>

          <p className="mt-8 text-center text-[10px] text-zinc-300 font-bold uppercase tracking-widest leading-relaxed">
            Authorized Personnel Only <br />
            Session activity is monitored and recorded
          </p>
        </div>
      </motion.div>
    </div>
  );
}
