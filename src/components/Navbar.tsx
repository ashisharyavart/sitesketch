"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Avoid Hydration mismatch
  const currentTheme = mounted ? resolvedTheme : "dark";

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-500 ${
          scrolled
            ? "border-b border-zinc-200/50 bg-white/80 backdrop-blur-md dark:border-zinc-800/50 dark:bg-zinc-950/80"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            className="flex items-center gap-2 group focus:outline-none"
            aria-label="Sitesketch.ai Home"
          >
            <span className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-white flex items-center gap-1.5">
              <span>sitesketch</span>
              <span className="h-2 w-2 rounded-full bg-brand-accent animate-pulse" />
              <span className="text-xs font-mono font-normal opacity-50">.ai</span>
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="relative text-sm font-medium tracking-wide text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors duration-200 py-1 focus:outline-none focus-visible:text-brand-accent"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Controls: Theme toggle & CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Theme Toggle Button */}
            <button
              onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
              className="p-2.5 rounded-full border border-zinc-200 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900 text-zinc-600 dark:text-zinc-400 transition-colors focus:outline-none"
              aria-label="Toggle Theme"
            >
              {currentTheme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </button>

            {/* CTA */}
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-zinc-100 dark:text-zinc-950 text-sm font-medium transition-all duration-300 shadow-sm focus:outline-none"
            >
              Book discovery call
            </a>
          </div>

          {/* Mobile navigation actions */}
          <div className="flex items-center gap-3 lg:hidden">
            {/* Mobile Theme Toggle */}
            <button
              onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
              className="p-2.5 rounded-full border border-zinc-200/80 dark:border-zinc-800/80 text-zinc-600 dark:text-zinc-400 focus:outline-none"
              aria-label="Toggle Theme"
            >
              {currentTheme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </button>

            {/* Hamburger Button */}
            <button
              onClick={toggleMenu}
              className="p-2.5 rounded-full border border-zinc-200/80 dark:border-zinc-800/80 text-zinc-800 dark:text-white focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-40 lg:hidden bg-white dark:bg-zinc-950 pt-24 px-6 flex flex-col justify-between pb-8"
          >
            <nav className="flex flex-col space-y-5">
              {NAV_LINKS.map((link, idx) => (
                <motion.a
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-2xl font-serif text-zinc-800 dark:text-zinc-200 hover:text-brand-accent dark:hover:text-brand-accent transition-colors duration-200"
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col gap-4"
            >
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="w-full text-center py-4 rounded-full bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 font-medium text-sm transition-all"
              >
                Book discovery call
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
