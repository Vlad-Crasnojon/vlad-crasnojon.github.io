"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { CERTIFICATIONS } from "@/data/portfolioData";
import { Award } from "lucide-react";
import { defaultViewport } from "@/utils/motion";

export const CredibilityBoosters: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="credibility" className="relative py-20 md:py-24 scroll-mt-16">
      <div className="section-divider max-w-[72rem] mx-auto px-5 sm:px-8" />

      <div className="max-w-[72rem] mx-auto px-5 sm:px-8 pt-14">
        <div>
          <p className="font-mono text-sm text-[#6366F1] mb-6">{"// credentials"}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CERTIFICATIONS.map((cert, idx) => (
              <motion.div
                key={cert.code ?? cert.title}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={defaultViewport}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: "easeOut" }}
                className="rounded-xl bg-[#18181B] border border-[#27272A] p-5 hover:border-[#3F3F46] transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#6366F1]/10 border border-[#6366F1]/30 flex items-center justify-center shrink-0">
                    <Award className="w-4 h-4 text-[#818CF8]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-[10px] text-[#818CF8]">{cert.issuer}</span>
                      <span className="font-mono text-[10px] text-[#71717A]">{cert.year}</span>
                    </div>
                    <h3 className="font-heading text-xs text-[#FAFAFA] font-medium mt-1 leading-snug">
                      {cert.title}
                    </h3>
                    {cert.code && (
                      <div className="font-mono text-[9px] text-[#52525B] mt-1.5">
                        ID: {cert.code}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};