import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-black text-white pt-16 pb-8 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 mb-16">
          {/* Logo and Tagline */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="inline-block">
              <Image 
                src="/logo1.png" 
                alt="Mac Bancy" 
                width={120} 
                height={50} 
                className="object-contain brightness-110 h-auto" 
              />
            </Link>
            <p className="text-sm font-medium tracking-wide text-zinc-100">
              Bold African, Luxury Scent
            </p>
          </div>

          {/* About Column */}
          <div>
            <h3 className="text-lg font-bold mb-6 tracking-tight">About</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/shop" className="text-zinc-400 hover:text-white transition-colors text-sm font-medium">
                  Shop Now
                </Link>
              </li>
              <li>
                <Link href="/discover" className="text-zinc-400 hover:text-white transition-colors text-sm font-medium">
                  Discover
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-zinc-400 hover:text-white transition-colors text-sm font-medium">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-zinc-400/30 hover:text-white transition-colors text-[10px] font-medium tracking-widest uppercase">
                  System
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Us Column */}
          <div>
            <h3 className="text-lg font-bold mb-6 tracking-tight">Contact Us</h3>
            <div className="space-y-4">
              <p className="text-zinc-400 text-sm font-medium">
                macbancy123@gmail.com
              </p>
              <p className="text-zinc-400 text-sm font-medium">
                0242250574
              </p>
              <p className="text-zinc-400 text-sm font-medium">
                Ghana - West Africa
              </p>
            </div>
          </div>

          {/* Socials Column */}
          <div>
            <h3 className="text-lg font-bold mb-6 tracking-tight">Socials</h3>
            <ul className="space-y-4">
              {["Instagram", "Twitter", "Facebook", "Tiktok", "Snapchat"].map((social) => (
                <li key={social}>
                  <Link 
                    href={`#${social.toLowerCase()}`} 
                    className="text-zinc-400 hover:text-white transition-colors text-sm font-medium"
                  >
                    {social}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-white/10 mb-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium tracking-wide text-zinc-100">
          <p>
            2026 MacBancy. All rights reserved
          </p>
          <p className="text-zinc-400">
            @macbancy_perfumes
          </p>
        </div>
      </div>
    </footer>
  );
}
