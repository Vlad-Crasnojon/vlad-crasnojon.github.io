"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";

export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const ringX = useSpring(mouseX, { stiffness: 150, damping: 20, mass: 0.4 });
  const ringY = useSpring(mouseY, { stiffness: 150, damping: 20, mass: 0.4 });

  useEffect(() => {
    const checkFinePointer = () => {
      const match = window.matchMedia("(pointer: fine)").matches;
      setIsDesktop(match);
    };

    checkFinePointer();
    window.addEventListener("resize", checkFinePointer);

    if (shouldReduceMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest(
          "a, button, input, textarea, select, [data-cursor='pointer'], [role='button']"
        );
        setIsPointer(!!interactive);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("resize", checkFinePointer);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY, shouldReduceMotion]);

  if (!isDesktop || shouldReduceMotion || !isVisible) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-[#6366F1] shadow-[0_0_8px_rgba(99,102,241,0.8)]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      <motion.div
        className="fixed top-0 left-0 w-7 h-7 rounded-full border border-[#818CF8]/60 bg-[#6366F1]/5"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isPointer ? 1.9 : 1,
          borderColor: isPointer ? "#818CF8" : "rgba(129, 140, 248, 0.4)",
          backgroundColor: isPointer ? "rgba(99, 102, 241, 0.15)" : "rgba(99, 102, 241, 0.04)",
        }}
        transition={{ duration: 0.15, ease: "easeOut" }}
      />
    </div>
  );
};