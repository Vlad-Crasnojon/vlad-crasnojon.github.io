"use client";

import React from "react";
import { motion } from "motion/react";
import { InteractiveTerminal } from "@/components/InteractiveTerminal";
import { defaultViewport } from "@/utils/motion";

export const About: React.FC = () => {
  return (
    <section id="about" className="relative py-20 md:py-24 scroll-mt-16">
      <motion.div
        className="section-divider max-w-[72rem] mx-auto px-5 sm:px-8"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={defaultViewport}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{ width: "calc(100% - 2.5rem)" }}
      />

      <div className="max-w-[72rem] mx-auto px-5 sm:px-8 pt-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-6 space-y-8">
            <div>
              <p className="font-mono text-sm text-[#6366F1] mb-3">01 — About</p>
              <h2 className="font-heading font-bold text-3xl sm:text-4xl tracking-tight text-[#FAFAFA] leading-tight">
                Engineering Approach
                <br />
                <span className="text-[#A1A1AA]">& Systems Rigor</span>
              </h2>
            </div>

            <div className="space-y-4 text-base sm:text-lg leading-relaxed">
              <p className="text-[#FAFAFA]">
                Final-year Computer Science student at Ovidius University shipping production-grade
                software — two platforms deployed and operated for real users, not just demos.
              </p>
              <p className="text-[#A1A1AA]">
                My focus is applied AI engineering: RAG pipelines with pgvector, entity extraction
                with spaCy, and hybrid retrieval systems — paired with the backend discipline to
                put them in production (FastAPI, async SQLAlchemy, PostgreSQL, Docker). I&apos;m
                currently open to Junior AI and Full-Stack roles.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6">
            <InteractiveTerminal />
          </div>
        </div>
      </div>
    </section>
  );
};