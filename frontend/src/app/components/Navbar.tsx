"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import WalletConnectButton from "./WalletConnectButton";
import WalletLogin from "./WalletLogin";
import LogoutButton from "./LogoutButton";
import { Menu, X } from "lucide-react"; // optional: npm i lucide-react

const navItems = [
  { name: "Feed", href: "/" },
  { name: "Create Post", href: "/composer" },
  { name: "Profile", href: "/profile" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
    const onStorage = () => setIsLoggedIn(!!localStorage.getItem("token"));
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <nav className="sticky top-0 z-30 bg-white/90 shadow backdrop-blur supports-[backdrop-filter]:bg-white/70">
      <div className="max-w-xl mx-auto flex items-center px-4 py-2 sm:py-3">
        <span className="text-lg font-bold text-indigo-700 whitespace-nowrap">
          Decentralized Social
        </span>
        <div className="flex-1" />
        {/* Desktop nav */}
        <div className="hidden sm:flex gap-2 items-center">
          {isLoggedIn &&
            navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-1 rounded-lg transition font-medium focus-visible:outline focus-visible:ring-2 ${
                  pathname === item.href
                    ? "bg-indigo-50 text-indigo-700 shadow font-semibold"
                    : "text-gray-700 hover:bg-indigo-100"
                }`}
              >
                {item.name}
              </Link>
            ))}
          {isLoggedIn ? <LogoutButton /> : <>
            <WalletConnectButton />
            <WalletLogin />
          </>}
        </div>
        {/* Mobile menu button */}
        <button
          className="sm:hidden p-2 ml-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-300"
          aria-label="Menu"
          onClick={() => setMobileOpen((o) => !o)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {/* Mobile nav drawer */}
      {mobileOpen && (
        <div className="sm:hidden px-4 pb-3 bg-white shadow-lg animate-fadeInDown">
          {isLoggedIn &&
            navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-3 py-2 rounded-lg transition font-medium ${
                  pathname === item.href
                    ? "bg-indigo-50 text-indigo-700 font-semibold"
                    : "text-gray-700 hover:bg-indigo-100"
                }`}
              >
                {item.name}
              </Link>
            ))}
          <div className="mt-2 flex flex-col gap-2">
            {isLoggedIn ? <LogoutButton /> : <>
              <WalletConnectButton />
              <WalletLogin />
            </>}
          </div>
        </div>
      )}
    </nav>
  );
}
