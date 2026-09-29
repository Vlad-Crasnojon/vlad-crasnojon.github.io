"use client";

import React from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { SKILL_CATEGORIES } from "@/data/portfolioData";
import { defaultViewport } from "@/utils/motion";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const chipVariants: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export const Skills: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="skills" className="relative py-20 md:py-24 scroll-mt-16 overflow-hidden">
      {!shouldReduceMotion && (
        <motion.div
          className="absolute top-[-40px] bottom-0 left-0 w-48 bg-gradient-to-r from-transparent via-[#6366F1]/15 to-transparent blur-md pointer-events-none z-0"
          initial={{ x: "-100%", opacity: 0 }}
          whileInView={{ x: "250%", opacity: [0, 0.6, 0.8, 0] }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.4, ease: [0.25, 1, 0.5, 1] }}
          aria-hidden="true"
        />
      )}

      <div className="section-divider max-w-[72rem] mx-auto px-5 sm:px-8" />

      <div className="max-w-[72rem] mx-auto px-5 sm:px-8 pt-14">
        <div className="mb-10">
          <p className="font-mono text-sm text-[#6366F1] mb-3">02 — Skills</p>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl tracking-tight text-[#FAFAFA]">
            Technical Toolchain
            <br />
            <span className="text-[#A1A1AA]">& Grouped Areas</span>
          </h2>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 relative z-10"
          variants={containerVariants}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={defaultViewport}
        >
          {SKILL_CATEGORIES.map((cat) => (
            <motion.div
              key={cat.name}
              variants={chipVariants}
              className="rounded-xl p-5 border border-[#27272A] hover:border-[#3F3F46] bg-[#18181B] transition-colors duration-200"
            >
              <h3 className="font-mono text-xs uppercase tracking-widest text-[#FAFAFA] mb-4">
                {cat.name}
              </h3>

              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 rounded-md text-xs font-mono border bg-[#09090B] text-[#A1A1AA] hover:text-[#FAFAFA] border-[#27272A] hover:border-[#3F3F46] transition-colors duration-150"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};