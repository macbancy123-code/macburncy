"use client";

import { motion } from "motion/react";
import { Mail, Phone, MapPin, Send, ArrowRight } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Spacer for fixed navbar */}
      <div className="h-32 md:h-40"></div>

      <main className="w-full max-w-7xl mx-auto px-6 md:px-12 py-12 flex-grow">
        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* Left Column: Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-10"
          >
            <div>
              <div className="flex gap-2 mb-8">
                <div className="h-1 w-12 bg-zinc-900"></div>
                <div className="h-1 w-3 bg-zinc-200"></div>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-8 text-zinc-900">
                Contact <br />
                <span className="italic font-light text-zinc-400">The Atelier</span>
              </h1>
              <p className="text-lg text-zinc-500 font-light leading-relaxed max-w-md">
                Whether you&apos;re seeking a signature scent or have inquiries
                about our custom formulations, our consultants are here to guide
                you.
              </p>
            </div>

            <div className="space-y-10">
              {/* Contact Items */}
              {[
                { icon: Mail, label: 'Email Us', value: 'concierge@macbancy.com' },
                { icon: Phone, label: 'Inquiry Line', value: '+233 (0) 24 225 0574' },
                { icon: MapPin, label: 'Main Atelier', value: 'Ghana — West Africa' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-8 group">
                  <div className="w-14 h-14 rounded-full border border-zinc-100 flex items-center justify-center text-zinc-400 group-hover:border-amber-600 group-hover:text-amber-600 transition-all duration-500 bg-white shadow-sm">
                    <item.icon size={20} />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-amber-600 mb-1.5">
                      {item.label}
                    </h4>
                    <p className="text-zinc-900 font-medium text-lg">
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Modern Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-zinc-50/50 rounded-[2.5rem] p-10 md:p-16 border border-zinc-100 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)]"
          >
            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="block text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400 px-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    className="w-full bg-white border border-zinc-100 rounded-2xl px-6 py-5 text-sm outline-none focus:border-amber-600 transition-all shadow-sm"
                    placeholder="Enter name..."
                  />
                </div>
                <div className="space-y-3">
                  <label className="block text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400 px-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full bg-white border border-zinc-100 rounded-2xl px-6 py-5 text-sm outline-none focus:border-amber-600 transition-all shadow-sm"
                    placeholder="email@example.com"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400 px-1">
                  Nature of Inquiry
                </label>
                <div className="relative">
                  <select
                    className="w-full bg-white border border-zinc-100 rounded-2xl px-6 py-5 text-sm outline-none appearance-none cursor-pointer focus:border-amber-600 transition-all shadow-sm"
                  >
                    <option>General Collection</option>
                    <option>Custom Formulation</option>
                    <option>Wholesale & Distribution</option>
                    <option>Press & Media</option>
                  </select>
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400">
                    <ArrowRight size={16} className="rotate-90" />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400 px-1">
                  Your Message
                </label>
                <textarea
                  rows={6}
                  className="w-full bg-white border border-zinc-100 rounded-2xl px-6 py-5 text-sm outline-none resize-none focus:border-amber-600 transition-all shadow-sm"
                  placeholder="How can we assist you?"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-zinc-900 text-white rounded-full py-6 text-[10px] font-bold uppercase tracking-[0.4em] flex items-center justify-center gap-4 group hover:bg-amber-600 transition-all duration-500 shadow-xl"
              >
                Send Message
                <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
