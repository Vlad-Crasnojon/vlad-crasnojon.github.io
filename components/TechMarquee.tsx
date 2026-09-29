"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "motion/react";

export const TechMarquee: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const technologies = [
    "Python",
    "TypeScript",
    "FastAPI",
    "Next.js",
    "React",
    "Angular",
    "Django",
    "PostgreSQL",
    "pgvector",
    "RAG Architecture",
    "Redis",
    "Docker",
    "PyTorch",
    "spaCy NER",
    "Tailwind CSS",
    "SQLAlchemy",
    "Git",
    "Linux",
    "LangGraph",
    "HuggingFace",
  ];

  const marqueeItems = [...technologies, ...technologies];

  return (
    <div className="relative w-full py-8 overflow-hidden border-y border-[#27272A] bg-[#09090B]">
      <div className="absolute top-0 bottom-0 left-0 w-24 sm:w-36 bg-gradient-to-r from-[#09090B] to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-24 sm:w-36 bg-gradient-to-l from-[#09090B] to-transparent z-10 pointer-events-none" />

      <div
        className="flex overflow-hidden select-none"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          className="flex shrink-0 items-center gap-8 py-1"
          animate={
            !shouldReduceMotion
              ? {
                  x: isHovered ? undefined : ["0%", "-50%"],
                }
              : undefined
          }
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 25,
              ease: "linear",
            },
          }}
        >
          {marqueeItems.map((tech, i) => (
            <div
              key={`${tech}-${i}`}
              className="flex items-center gap-8 shrink-0 font-mono text-xs text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors"
            >
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#6366F1]/60" />
                <span className="tracking-wider uppercase font-medium">{tech}</span>
              </span>
              <span className="text-[#27272A]">/</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};