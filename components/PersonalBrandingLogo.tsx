"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "motion/react";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export const PersonalBrandingLogo: React.FC<LogoProps> = ({
  className = "",
  showText = true,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className={`inline-flex items-center gap-3 select-none cursor-pointer ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-8 h-8 rounded-lg bg-[#18181B] border border-[#27272A] flex items-center justify-center transition-colors duration-200">
        <motion.span
          className="absolute -top-[1px] -left-[1px] w-2 h-2 border-t-2 border-l-2 border-[#6366F1] rounded-tl-sm pointer-events-none origin-top-left"
          animate={{
            rotate: !shouldReduceMotion && isHovered ? 90 : 0,
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        />

        <span className="font-mono text-xs font-semibold tracking-tighter text-[#FAFAFA] transition-colors duration-200">
          VC
        </span>
      </div>

      {showText && (
        <div className="flex flex-col text-left">
          <span className="font-heading font-semibold text-sm tracking-tight text-[#FAFAFA] transition-colors duration-200">
            Vlad Crasnojon
          </span>
          <span className="text-[11px] font-mono text-[#A1A1AA] -mt-0.5">
            AI / Full-Stack
          </span>
        </div>
      )}
    </div>
  );
};