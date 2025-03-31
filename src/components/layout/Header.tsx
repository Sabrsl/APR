"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = [
    { name: "Accueil", path: "/" },
    { name: "À propos", path: "/about" },
    { name: "Actualités", path: "/news" },
    { name: "Programmes", path: "/programmes" },
    { name: "Adhésion", path: "/join" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <div className="flex flex-col">
            <span className={`text-xl font-serif font-bold ${isScrolled ? 'text-primary' : 'text-white'}`}>
              APR Sénégal
            </span>
            <span className={`text-xs uppercase tracking-wider ${isScrolled ? 'text-gray-500' : 'text-gray-200'}`}>
              Alliance Pour la République
            </span>
          </div>
        </Link>

        {/* Desktop menu */}
        <nav className="hidden md:flex items-center space-x-1">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className={`px-3 py-2 text-sm uppercase tracking-wider font-medium transition-colors ${
                isScrolled 
                  ? "text-gray-800 hover:text-primary" 
                  : "text-white hover:text-gray-200"
              }`}
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="/join"
            className={`ml-2 px-4 py-2 text-sm uppercase tracking-wider font-medium transition-colors ${
              isScrolled
                ? "bg-primary text-white hover:bg-primary-dark"
                : "bg-white text-primary hover:bg-gray-100"
            }`}
          >
            Adhérer
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={toggleMenu}
          className={`md:hidden focus:outline-none ${
            isScrolled ? "text-gray-800" : "text-white"
          }`}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <FiX className="h-6 w-6" />
          ) : (
            <FiMenu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t shadow-lg"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-4">
                {menuItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.path}
                    className="text-gray-700 hover:text-primary transition-colors font-medium py-2 border-b border-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <Link
                  href="/join"
                  className="bg-primary text-white px-4 py-3 text-center font-medium hover:bg-primary-dark transition-colors mt-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Adhérer
                </Link>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}; 