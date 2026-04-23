"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import { ShoppingCart, Menu, X } from 'lucide-react';
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const { totalItems } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20 || pathname === "/shop");
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  const isProductPage = pathname.startsWith("/product/");
  const isSolid = scrolled || pathname === "/shop" || isProductPage;

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Discover", href: "/discover" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="fixed top-0 z-50 flex w-full justify-center transition-all duration-500 pt-6">
      <div className="relative w-[95%] max-w-7xl">
        {/* Main bar */}
        <div
          className={`flex items-center justify-between px-6 rounded-2xl transition-all duration-300 ${
            isSolid
              ? "bg-black/90 backdrop-blur-lg border border-white/10 py-3 shadow-2xl"
              : "bg-black/20 backdrop-blur-sm border border-white/5 py-5"
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo1.png"
              alt="Logo"
              width={100}
              height={40}
              className="object-contain"
            />
          </Link>

          {isDesktop ? (
            /* Desktop Navigation */
            <div className="flex items-center gap-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                      isActive
                        ? "bg-white/20 text-white shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                        : "text-white/70 hover:text-white"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}

              {/* Cart Icon */}
              <div className="flex items-center ml-4">
                <Link
                  href="/checkout"
                  className="relative text-white hover:text-white/80 transition-colors"
                >
                  <ShoppingCart size={20} />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[10px] font-bold text-black border border-black/10">
                      {totalItems}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          ) : (
            /* Mobile: Cart + Hamburger */
            <div className="flex items-center gap-4">
              <Link
                href="/checkout"
                className="relative text-white hover:text-white/80 transition-colors"
              >
                <ShoppingCart size={20} />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[10px] font-bold text-black border border-black/10">
                    {totalItems}
                  </span>
                )}
              </Link>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-white hover:text-white/80 transition-colors"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          )}
        </div>

        {/* Mobile Dropdown Menu */}
        {!isDesktop && mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-black/90 backdrop-blur-lg border border-white/10 rounded-2xl shadow-2xl">
            <div className="flex flex-col p-4 gap-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-3 rounded-full text-sm font-medium transition-all ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "text-white/70 hover:text-white"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}