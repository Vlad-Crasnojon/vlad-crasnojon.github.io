"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [isDone, setIsDone] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("vcz_preloader_seen")) {
      onComplete();
      return;
    }

    if (shouldReduceMotion) {
      onComplete();
      return;
    }

    const timer = setTimeout(() => {
      setIsDone(true);
      setTimeout(onComplete, 500);
    }, 1600);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === " ") {
        setIsDone(true);
        onComplete();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [shouldReduceMotion, onComplete]);

  const handleSkip = () => {
    setIsDone(true);
    onComplete();
    if (typeof window !== "undefined") sessionStorage.setItem("vcz_preloader_seen", "1");
  };

  useEffect(() => {
    if (isDone && typeof window !== "undefined") {
      sessionStorage.setItem("vcz_preloader_seen", "1");
    }
  }, [isDone]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{
            y: "-100%",
            clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
            transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] },
          }}
          onClick={handleSkip}
          className="fixed inset-0 z-50 bg-[#09090B] flex flex-col items-center justify-center cursor-pointer select-none"
          title="Click to skip"
        >
          <div className="flex flex-col items-center gap-6">
            <div className="relative w-20 h-20 rounded-2xl bg-[#18181B] border border-[#27272A] flex items-center justify-center p-3 shadow-2xl">
              <svg
                className="absolute -top-[1px] -left-[1px] w-5 h-5 pointer-events-none"
                viewBox="0 0 20 20"
                fill="none"
              >
                <motion.path
                  d="M 1 18 L 1 1 L 18 1"
                  stroke="#6366F1"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                />
              </svg>

              <svg
                className="w-12 h-12"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <motion.path
                  d="M 15 25 L 35 75 L 55 25"
                  stroke="#FAFAFA"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: 0.1, ease: "easeInOut" }}
                />
                <motion.path
                  d="M 85 35 C 80 22, 60 22, 50 35 C 40 48, 40 60, 50 72 C 60 85, 80 85, 85 72"
                  stroke="#818CF8"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.9, delay: 0.25, ease: "easeInOut" }}
                />
              </svg>
            </div>

            <div className="flex items-center gap-2 overflow-hidden font-heading text-xl sm:text-2xl font-bold tracking-tight">
              <motion.span
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
                className="text-[#FAFAFA]"
              >
                Vlad
              </motion.span>
              <motion.span
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.55, ease: "easeOut" }}
                className="text-[#6366F1]"
              >
                Crasnojon
              </motion.span>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.3 }}
              className="font-mono text-[11px] text-[#71717A] tracking-wider uppercase mt-1"
            >
              Junior AI / Full-Stack Engineer
            </motion.div>
          </div>

          <div className="absolute bottom-6 font-mono text-[10px] text-[#52525B] tracking-widest uppercase">
            Click anywhere or press Esc to enter
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};