"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion, useScroll, useTransform } from "motion/react";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { ArrowDown, Download } from "lucide-react";
import { MagneticWrapper } from "@/components/MagneticWrapper";

export const Hero: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 45]);

  const rolePhrases = ["AI / Full-Stack Engineer", "ships LLM-powered products", "FastAPI → React"];
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % rolePhrases.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [rolePhrases.length]);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-[90vh] flex items-center py-16 md:py-24 overflow-hidden"
    >
      <motion.div
        className="absolute -top-24 right-0 w-[520px] h-[520px] rounded-full bg-[#6366F1] opacity-10 blur-[130px] pointer-events-none"
        aria-hidden="true"
        animate={
          !shouldReduceMotion
            ? {
                x: [0, 10, -5, 0],
                y: [0, -10, 8, 0],
              }
            : undefined
        }
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative max-w-[72rem] mx-auto px-5 sm:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-[#18181B] border border-[#27272A] text-xs font-mono text-[#FAFAFA]"
            >
              <span className="relative flex h-2 w-2">
                <motion.span
                  className="absolute inline-flex h-full w-full rounded-full bg-[#10B981]"
                  animate={
                    !shouldReduceMotion
                      ? {
                          opacity: [0.4, 1, 0.4],
                          scale: [1, 1.4, 1],
                        }
                      : { opacity: 1 }
                  }
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]" />
              </span>
              <span className="text-[#A1A1AA]">
                Available for work <span className="text-[#27272A]">·</span> Ploiești, Romania
                (remote-friendly)
              </span>
            </motion.div>

            <div>
              <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[#FAFAFA] leading-[1.08] flex flex-wrap gap-x-3.5">
                {["Vlad", "Crasnojon"].map((word, i) => (
                  <span key={word} className="inline-block overflow-hidden pb-1">
                    <motion.span
                      initial={{ y: shouldReduceMotion ? 0 : 45, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        duration: 0.6,
                        delay: i * 0.08,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="inline-block"
                    >
                      {word}
                    </motion.span>
                  </span>
                ))}
              </h1>

              <div className="h-8 mt-2 relative flex items-center">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={roleIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="font-mono text-base sm:text-lg text-[#6366F1] font-medium absolute left-0"
                  >
                    {rolePhrases[roleIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>

            <motion.p
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
              className="font-body text-base sm:text-lg text-[#A1A1AA] leading-relaxed max-w-xl"
            >
              {PERSONAL_INFO.bio}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.22, ease: "easeOut" }}
              className="flex flex-wrap items-center gap-3.5 pt-2"
            >
              <MagneticWrapper strength={0.3}>
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#6366F1] hover:bg-[#818CF8] text-white font-mono text-xs font-semibold tracking-wide transition-colors duration-200"
                >
                  <span>View Platforms</span>
                  <ArrowDown className="w-3.5 h-3.5" />
                </a>
              </MagneticWrapper>

              <MagneticWrapper strength={0.3}>
                <a
                  href={PERSONAL_INFO.resumeFile}
                  download="Vlad_Crasnojon_CV.pdf"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#18181B] hover:bg-[#27272A] border border-[#27272A] hover:border-zinc-300 text-[#FAFAFA] hover:text-white font-mono text-xs font-medium tracking-wide transition-all duration-200"
                >
                  <Download className="w-3.5 h-3.5 text-[#6366F1]" />
                  <span>Get Resume</span>
                </a>
              </MagneticWrapper>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
              className="pt-4 border-t border-[#27272A] w-full"
            >
              <div className="font-mono text-xs text-[#71717A] flex flex-wrap items-center gap-x-2.5 gap-y-1">
                <span>BSc CS &apos;26</span>
                <span className="text-[#27272A]">·</span>
                <span>Python / TypeScript</span>
                <span className="text-[#27272A]">·</span>
                <span className="text-[#6366F1]">FastAPI & PostgreSQL</span>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
              style={!shouldReduceMotion ? { y: portraitY } : undefined}
              className="max-w-sm w-full"
            >
              <div className="relative group w-full">
                <div className="relative rounded-xl border border-[#27272A] bg-[#18181B] p-2.5 overflow-hidden transition-colors hover:border-[#3F3F46]">
                  <span className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#6366F1] rounded-tl-xl pointer-events-none z-10" />

                  <div className="relative w-full aspect-[4/5] rounded-lg overflow-hidden bg-[#09090B]">
                    <img
                      src="/assets/portrait.jpg"
                      alt="Vlad Crasnojon portrait"
                      className="w-full h-full object-cover grayscale contrast-105 opacity-95 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-transparent to-transparent opacity-50" />
                  </div>

                  <div className="mt-2.5 px-3 py-2 rounded-lg bg-[#09090B] border border-[#27272A] flex items-center justify-between text-xs font-mono text-[#A1A1AA]">
                    <span className="text-[#FAFAFA]">Vlad Crasnojon</span>
                    <span className="text-[#6366F1]">Ploiești, RO</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};