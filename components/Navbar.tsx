import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#features', label: 'Vantagens' },
    { href: '#funnel', label: 'A Matemática' },
    { href: '#portfolio', label: 'Portfolio' },
    { href: '#how-it-works', label: 'Como funciona' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center py-4 px-4 font-sans">
      {/* Light Mode Pill Container */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`
          relative flex items-center justify-between gap-2 
          px-3 py-2 rounded-full
          transition-all duration-500 ease-out
          ${isScrolled
            ? 'bg-white/90 backdrop-blur-xl border border-slate-200 shadow-xl shadow-slate-200/40' // Scrolled: White & Shadowy
            : 'bg-white/50 backdrop-blur-md border border-white/40 shadow-lg shadow-slate-200/20'   // Top: Semi-transparent white
          }
        `}
      >
        {/* Logo - Invert filter for light mode if logo is white */}
        <motion.div
          className="flex items-center gap-2 pl-2"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <img
            src="https://files.catbox.moe/67wq66.png"
            alt="ClinicFlow Logo"
            className="h-8 w-auto object-contain drop-shadow-sm filter invert brightness-0" // Inverted to black
          />
        </motion.div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center">
          <div className="flex items-center bg-slate-100/50 rounded-full p-1">
            {navLinks.map((link) => (
              <motion.a
                key={link.href}
                href={link.href}
                className={`
                  relative px-4 py-2 text-sm font-bold rounded-full
                  transition-all duration-300 ease-out
                  ${activeLink === link.href
                    ? 'text-slate-900'
                    : 'text-slate-500 hover:text-slate-900'
                  }
                `}
                onMouseEnter={() => setActiveLink(link.href)}
                onMouseLeave={() => setActiveLink('')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Active/Hover Background */}
                {activeLink === link.href && (
                  <motion.div
                    layoutId="navHover"
                    className="absolute inset-0 bg-white rounded-full shadow-sm border border-slate-100"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                <span className="relative z-10 tracking-tight">{link.label}</span>
              </motion.a>
            ))}

            {/* Login Link */}
            <a
              href="/login"
              className="px-4 py-2 text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors relative z-10 tracking-tight"
            >
              Entrar
            </a>
          </div>
        </div>

        {/* CTA Button - Chunky Style */}
        <motion.a
          href="https://wa.me/5512996170618?text=Ol%C3%A1!%20Quero%20saber%20mais%20sobre%20o%20ClinicFlow"
          target="_blank"
          rel="noopener noreferrer"
          className="
            hidden md:flex items-center gap-2
            bg-indigo-600 text-white px-6 py-3 rounded-full
            font-black text-sm uppercase tracking-wide
            shadow-[0_4px_0_rgb(55,48,163)]          
            hover:shadow-[0_2px_0_rgb(55,48,163)] hover:translate-y-[2px]
            active:shadow-none active:translate-y-[4px]
            transition-all duration-200
          "
        >
          <Sparkles className="w-4 h-4 fill-white/20" />
          <span>Começar Agora</span>
        </motion.a>

        {/* Mobile Menu Button */}
        <motion.button
          className="
            md:hidden flex items-center justify-center
            w-10 h-10 rounded-full
            bg-slate-100
            border border-slate-200
            text-slate-600
            transition-colors duration-300
            hover:bg-slate-200
          "
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </motion.button>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Mobile Menu Panel */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="
                fixed top-24 left-4 right-4 z-50
                bg-white
                border border-slate-100
                rounded-[2rem]
                shadow-2xl shadow-slate-200/50
                overflow-hidden
              "
            >
              <div className="flex flex-col p-6 gap-2">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setMobileMenuOpen(false)}
                    className="
                      text-slate-800 text-lg font-bold
                      py-4 px-6 rounded-2xl
                      hover:bg-slate-50
                      transition-all duration-300
                      tracking-tight
                    "
                  >
                    {link.label}
                  </motion.a>
                ))}

                <motion.a
                  href="/login"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="
                      text-slate-500 text-lg font-bold
                      py-4 px-6 rounded-2xl
                      hover:bg-slate-50
                      transition-all duration-300
                      tracking-tight
                    "
                >
                  Entrar
                </motion.a>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-4 pt-4 border-t border-slate-100"
                >
                  <a
                    href="https://wa.me/5512996170618?text=Ol%C3%A1!%20Quero%20saber%20mais%20sobre%20o%20ClinicFlow"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="
                      flex items-center justify-center gap-2
                      bg-indigo-600 text-white rounded-xl
                      text-base font-black uppercase tracking-wide
                      py-4
                      shadow-[0_4px_0_rgb(55,48,163)]          
                      active:shadow-none active:translate-y-[4px]
                      transition-all
                    "
                  >
                    <Sparkles className="w-5 h-5" />
                    <span>Começar Agora</span>
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};