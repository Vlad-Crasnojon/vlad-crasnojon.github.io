"use client";

import React, { useState, useEffect } from "react";
import { motion, useReducedMotion, AnimatePresence, useScroll } from "motion/react";
import { PersonalBrandingLogo } from "@/components/PersonalBrandingLogo";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { Menu, X, FileText } from "lucide-react";
import { GithubIcon } from "@/components/BrandIcons";

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("projects");
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = [
        { id: "contact", num: "05" },
        { id: "experience", num: "04" },
        { id: "projects", num: "03" },
        { id: "skills", num: "02" },
        { id: "about", num: "01" },
      ];

      const scrollPos = window.scrollY + 200;
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(s.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "PLATFORMS", href: "#projects", id: "projects", num: "03" },
    { label: "SKILLS", href: "#skills", id: "skills", num: "02" },
    { label: "EXPERIENCE", href: "#experience", id: "experience", num: "04" },
    { label: "CONTACT", href: "#contact", id: "contact", num: "05" },
  ];

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#6366F1] via-[#818CF8] to-[#6366F1] origin-left z-50 pointer-events-none"
        style={{ scaleX: scrollYProgress }}
      />

      <motion.header
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`sticky top-0 z-40 w-full transition-colors duration-200 ${
          scrolled
            ? "bg-[#09090B]/85 backdrop-blur-md border-b border-[#27272A]"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-[72rem] mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <a href="#hero" className="flex items-center group">
              <PersonalBrandingLogo />
            </a>

            <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#18181B] border border-[#27272A] text-[11px] font-mono text-[#A1A1AA]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
              <span className="text-[#FAFAFA] font-medium">Open to work</span>
              <span className="text-[#71717A]">· Junior AI/FS roles</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 font-mono text-xs tracking-wider uppercase text-[#A1A1AA]">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <NavLinkItem
                  key={link.href}
                  label={link.label}
                  href={link.href}
                  num={link.num}
                  isActive={isActive}
                />
              );
            })}

            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noreferrer"
              className="p-1.5 rounded-lg text-[#A1A1AA] hover:text-[#818CF8] hover:bg-[#18181B] transition-colors duration-150"
              title="GitHub Profile (Vlad-Crasnojon)"
              aria-label="GitHub Profile"
            >
              <GithubIcon className="w-4 h-4" />
            </a>

            <motion.a
              href={PERSONAL_INFO.resumeFile}
              download="Vlad_Crasnojon_Resume.pdf"
              whileHover={!shouldReduceMotion ? { y: -1 } : undefined}
              transition={{ duration: 0.2 }}
              className="px-3 py-1.5 text-xs font-mono rounded-lg border border-[#27272A] hover:border-zinc-300 bg-[#18181B] text-[#FAFAFA] hover:text-white transition-all duration-200 flex items-center gap-1.5 cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-[#6366F1]" />
              <span>Resume</span>
            </motion.a>
          </nav>

          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden p-2 rounded-lg border border-[#27272A] bg-[#18181B] text-[#A1A1AA] hover:text-white transition-colors"
            aria-label="Open navigation menu"
          >
            <Menu className="w-4 h-4" />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex flex-col justify-end md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="bg-[#18181B] border-t border-[#27272A] rounded-t-2xl p-6 space-y-4 text-left"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#27272A]">
                <PersonalBrandingLogo />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 text-[#A1A1AA] hover:text-white"
                  aria-label="Close menu"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-1 font-mono text-xs uppercase tracking-wider">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between px-3 py-2.5 rounded-lg text-[#A1A1AA] hover:text-[#FAFAFA] hover:bg-[#27272A]/50 transition-colors"
                  >
                    <span>{link.label}</span>
                    <span className="text-[10px] text-[#6366F1]">{link.num}</span>
                  </a>
                ))}
              </div>

              <div className="pt-3 border-t border-[#27272A] flex flex-col gap-2">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-[#27272A] bg-[#09090B] text-xs font-mono text-[#FAFAFA]"
                >
                  <GithubIcon className="w-4 h-4 text-[#6366F1]" />
                  <span>github.com/Vlad-Crasnojon</span>
                </a>

                <a
                  href={PERSONAL_INFO.resumeFile}
                  download="Vlad_Crasnojon_Resume.pdf"
                  className="w-full text-center py-2.5 rounded-lg bg-[#6366F1] hover:bg-[#818CF8] text-white text-xs font-mono font-medium transition-colors"
                >
                  Download Resume
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const NavLinkItem: React.FC<{
  label: string;
  href: string;
  num: string;
  isActive: boolean;
}> = ({ label, href, num, isActive }) => {
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <a
      href={href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative py-1 flex items-center gap-1.5 transition-colors duration-150 ${
        isActive ? "text-[#FAFAFA] font-medium" : "text-[#A1A1AA] hover:text-[#FAFAFA]"
      }`}
    >
      <span className={`text-[10px] ${isActive ? "text-[#818CF8]" : "text-[#71717A]"}`}>{num}</span>
      <span>{label}</span>
      <motion.span
        className="absolute bottom-0 left-0 h-[1px] bg-[#818CF8] w-full origin-left pointer-events-none"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isActive || isHovered ? 1 : 0 }}
        transition={{ duration: shouldReduceMotion ? 0.1 : 0.2, ease: "easeOut" }}
      />
    </a>
  );
};