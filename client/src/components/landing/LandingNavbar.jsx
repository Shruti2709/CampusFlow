import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, Menu, X, ArrowRight, User } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { roleHome } from "../../utils/roleHome";

export default function LandingNavbar() {
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Core Modules", href: "#modules" },
    { name: "How It Works", href: "#process" },
    { name: "Portal Features", href: "#features" },
    { name: "FAQ", href: "#faq" },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 px-4 pt-3.5 transition-all duration-300">
      <motion.div
        initial={{ y: -15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className={`max-w-6xl mx-auto flex items-center justify-between rounded-2xl transition-all duration-200 px-5 py-3 ${
          scrolled
            ? "border border-[#e2d8c9] bg-[#fbf8f2]/95 backdrop-blur-md shadow-sm"
            : "border border-[#e9e1d4] bg-[#fbf8f2]/85 backdrop-blur-sm"
        }`}
      >
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-xl bg-[#e8f3fc] border border-[#c9e3f8] text-[#1d4ed8] flex items-center justify-center font-bold">
            <GraduationCap size={18} />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-display font-black text-lg text-[#232733] tracking-tight">
              Campus<span className="text-[#4f46e5]">Flow</span>
            </span>
            <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold bg-[#edf6ef] text-[#15803d] border border-[#cde6d3]">
              Campus Portal
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-[#4b5563]">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="hover:text-[#111827] transition py-1"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          {user ? (
            <Link
              to={roleHome(user.role)}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1e1b4b] px-4 py-2 rounded-xl bg-[#f4ecfb] border border-[#e4d1f7] hover:bg-[#ede0f9] transition"
            >
              <User size={14} />
              Open Dashboard
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="text-xs font-bold text-[#374151] hover:text-[#111827] transition px-3.5 py-2 rounded-xl hover:bg-[#ede5d8]/60"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-white px-4 py-2 rounded-xl bg-[#4338ca] hover:bg-[#3730a3] transition active:scale-[0.98] shadow-xs"
              >
                Register
                <ArrowRight size={13} />
              </Link>
            </>
          )}

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-[#4b5563] hover:text-[#111827] hover:bg-[#ede5d8] transition"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </motion.div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="md:hidden mt-2 max-w-6xl mx-auto rounded-2xl border border-[#e2d8c9] bg-[#fbf8f2] p-4 shadow-lg"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs font-semibold text-[#4b5563] hover:text-[#111827] py-2 border-b border-[#eee6d8]"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-2 flex flex-col gap-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2 rounded-xl border border-[#d9cebe] text-[#374151] font-bold text-xs"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2 rounded-xl bg-[#4338ca] text-white font-bold text-xs"
                >
                  Register Account
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
