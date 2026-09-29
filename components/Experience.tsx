"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { EXPERIENCE_ITEMS, EDUCATION_ITEMS } from "@/data/portfolioData";
import { defaultViewport } from "@/utils/motion";

export const Experience: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const timelineRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 0.8", "end 0.6"],
  });

  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const exp = EXPERIENCE_ITEMS[0];

  return (
    <section id="experience" className="relative py-20 md:py-24 scroll-mt-16">
      <div className="section-divider max-w-[72rem] mx-auto px-5 sm:px-8" />

      <div className="max-w-[72rem] mx-auto px-5 sm:px-8 pt-14">
        <div className="mb-10">
          <p className="font-mono text-sm text-[#6366F1] mb-3">04 — Background</p>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl tracking-tight text-[#FAFAFA]">
            Experience
            <br />
            <span className="text-[#A1A1AA]">& Education</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7" ref={timelineRef}>
            <div className="font-mono text-xs text-[#818CF8] mb-6">{"// production_experience"}</div>

            <div className="relative pl-8">
              <motion.div
                className="absolute left-0 top-1 bottom-1 w-[1px] origin-top bg-gradient-to-b from-[#6366F1] via-[#818CF8] to-[#27272A]"
                style={{ scaleY: shouldReduceMotion ? 1 : lineScale }}
              />

              <div className="relative">
                <div className="absolute -left-8 top-1.5">
                  <motion.span
                    className="absolute w-3.5 h-3.5 rounded-full bg-[#6366F1]/40"
                    animate={shouldReduceMotion ? undefined : { scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
                  />
                  <span className="relative block w-2 h-2 rounded-full bg-[#09090B] border-2 border-[#6366F1] group-hover:bg-[#6366F1]" />
                </div>

                <motion.div
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={defaultViewport}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs">
                    <span className="text-[#818CF8]">{exp.period}</span>
                    <span className="text-[#27272A]">·</span>
                    <span className="text-[#71717A]">{exp.companyOrContext}</span>
                    <span className="text-[#27272A]">·</span>
                    <span className="text-[#71717A]">{exp.location}</span>
                  </div>

                  <h3 className="font-heading font-bold text-xl text-[#FAFAFA] mt-2 tracking-tight">
                    {exp.role}
                  </h3>

                  <p className="text-sm text-[#A1A1AA] leading-relaxed mt-3">{exp.description}</p>

                  <ul className="mt-4 space-y-2">
                    {exp.keyAchievements.map((a) => (
                      <li key={a} className="flex gap-2 text-sm text-[#FAFAFA] leading-relaxed">
                        <span className="text-[#6366F1] shrink-0">›</span>
                        {a}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 flex flex-wrap items-center gap-2 font-mono text-[11px]">
                    <span className="text-[#71717A]">Stack:</span>
                    {exp.technologies.map((t) => (
                      <span key={t} className="text-[#A1A1AA]">
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            {EDUCATION_ITEMS.map((edu, idx) => (
              <motion.div
                key={edu.institution}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={defaultViewport}
                transition={{ duration: 0.5, delay: 0.1 + idx * 0.1, ease: "easeOut" }}
                className="rounded-xl bg-[#18181B] border border-[#27272A] p-6"
              >
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-[#818CF8]">{edu.period}</span>
                  <span className="text-[#71717A]">{edu.location}</span>
                </div>

                <h3 className="font-heading font-bold text-lg text-[#FAFAFA] mt-3 tracking-tight">
                  {edu.institution}
                </h3>
                <p className="font-mono text-sm text-[#A1A1AA] mt-1">{edu.degree}</p>

                <div className="mt-5 rounded-lg bg-[#09090B] border border-[#27272A] p-4">
                  <div className="font-mono text-[10px] text-[#818CF8] uppercase tracking-wider mb-2">
                    Academic Focus
                  </div>
                  <p className="text-sm text-[#A1A1AA] leading-relaxed">{edu.focus}</p>
                </div>

                {edu.honorsOrHighlights.length > 0 && (
                  <ul className="mt-4 space-y-2">
                    {edu.honorsOrHighlights.map((h) => (
                      <li key={h} className="flex gap-2 text-sm text-[#FAFAFA] leading-relaxed">
                        <span className="text-[#6366F1] shrink-0">›</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-6 pt-4 border-t border-[#27272A] font-mono text-xs flex items-center justify-between">
                  <span className="text-[#71717A]">Degree candidate</span>
                  <span className="text-[#818CF8]">Expected {edu.period.split(" — ")[1]}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};