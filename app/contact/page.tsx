"use client";

import { motion } from "motion/react";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="w-full max-w-7xl mx-auto px-6 md:px-12 pt-24 pb-24">
        <div className="grid lg:grid-cols-2 gap-20">

          {/* Left Column: Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col"
          >
            <div className="flex gap-2 mb-8">
              <div className="h-1 w-12 bg-black"></div>
              <div className="h-1 w-3 bg-zinc-200"></div>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-zinc-900 leading-tight mb-8">
              Contact <br />
              <span className="font-serif italic font-light text-zinc-400 text-4xl md:text-5xl">
                The Atelier
              </span>
            </h1>

            <p className="text-xl text-zinc-500 font-light leading-relaxed mb-12 max-w-md">
              Whether you&apos;re seeking a signature scent or have inquiries
              about our custom formulations, our consultants are here to guide
              you.
            </p>

            <div className="space-y-8">
              {/* Email */}
              <div className="flex items-start gap-6 group">
                <div
                  className="group-hover:border-black group-hover:text-black transition-all"
                  style={{
                    width: "48px",
                    height: "48px",
                    minWidth: "48px",
                    borderRadius: "50%",
                    border: "1px solid #f4f4f5",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#a1a1aa",
                  }}
                >
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 mb-1">
                    Email Us
                  </h4>
                  <p className="text-zinc-900 font-medium">
                    concierge@nioba-heritage.com
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-6 group">
                <div
                  className="group-hover:border-black group-hover:text-black transition-all"
                  style={{
                    width: "48px",
                    height: "48px",
                    minWidth: "48px",
                    borderRadius: "50%",
                    border: "1px solid #f4f4f5",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#a1a1aa",
                  }}
                >
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 mb-1">
                    Inquiry Line
                  </h4>
                  <p className="text-zinc-900 font-medium">
                    +33 (0) 1 45 67 89 00
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-6 group">
                <div
                  className="group-hover:border-black group-hover:text-black transition-all"
                  style={{
                    width: "48px",
                    height: "48px",
                    minWidth: "48px",
                    borderRadius: "50%",
                    border: "1px solid #f4f4f5",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#a1a1aa",
                  }}
                >
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 mb-1">
                    Main Atelier
                  </h4>
                  <p className="text-zinc-900 font-medium leading-relaxed">
                    12 Rue de l&apos;Héritage, Paris, France <br />
                    Vicente Way, Lagos, Nigeria
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              background: "#fafafa",
              borderRadius: "32px",
              padding: "48px",
              border: "1px solid #f0f0f0",
              boxShadow:
                "0 20px 60px -10px rgba(0,0,0,0.08), 0 4px 20px -4px rgba(0,0,0,0.04)",
            }}
          >
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 px-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    style={{
                      width: "100%",
                      background: "white",
                      border: "1px solid #f4f4f5",
                      borderRadius: "16px",
                      padding: "16px 24px",
                      fontSize: "14px",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#000")}
                    onBlur={(e) => (e.target.style.borderColor = "#f4f4f5")}
                    placeholder="Enter name..."
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 px-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    style={{
                      width: "100%",
                      background: "white",
                      border: "1px solid #f4f4f5",
                      borderRadius: "16px",
                      padding: "16px 24px",
                      fontSize: "14px",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#000")}
                    onBlur={(e) => (e.target.style.borderColor = "#f4f4f5")}
                    placeholder="email@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 px-1">
                  Nature of Inquiry
                </label>
                <div style={{ position: "relative" }}>
                  <select
                    style={{
                      width: "100%",
                      background: "white",
                      border: "1px solid #f4f4f5",
                      borderRadius: "16px",
                      padding: "16px 24px",
                      fontSize: "14px",
                      outline: "none",
                      appearance: "none",
                      boxSizing: "border-box",
                      cursor: "pointer",
                    }}
                  >
                    <option>Collection Inquiry</option>
                    <option>Custom Formulation</option>
                    <option>Press &amp; Media</option>
                    <option>Wholesale Partnerships</option>
                  </select>
                  <div
                    style={{
                      position: "absolute",
                      right: "20px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      pointerEvents: "none",
                      color: "#a1a1aa",
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M2 4l4 4 4-4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 px-1">
                  Your Message
                </label>
                <textarea
                  rows={6}
                  style={{
                    width: "100%",
                    background: "white",
                    border: "1px solid #f4f4f5",
                    borderRadius: "16px",
                    padding: "16px 24px",
                    fontSize: "14px",
                    outline: "none",
                    resize: "none",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#000")}
                  onBlur={(e) => (e.target.style.borderColor = "#f4f4f5")}
                  placeholder="How can we assist you?"
                />
              </div>

              <button
                type="submit"
                style={{
                  width: "100%",
                  background: "#000",
                  color: "#fff",
                  borderRadius: "9999px",
                  padding: "20px",
                  fontSize: "11px",
                  fontWeight: "700",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "12px",
                  border: "none",
                  cursor: "pointer",
                  transition: "background 0.3s",
                }}
                onMouseEnter={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.background =
                  "#27272a")
                }
                onMouseLeave={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.background =
                  "#000")
                }
              >
                Send Message
                <Send size={14} />
              </button>
            </form>
          </motion.div>
        </div>
      </main>
    </div>
  );
}