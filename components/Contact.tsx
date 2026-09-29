"use client";

import React, { useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { Copy, Check, Phone } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/BrandIcons";

interface ContactProps {
  onCopyEmail: (value: string) => void;
}

const SCRAMBLE_CHARS = "!<>-_\\/[]{}—=+*^?#________";

export const Contact: React.FC<ContactProps> = ({ onCopyEmail }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PERSONAL_INFO.email);
      setCopiedEmail(true);
      onCopyEmail(PERSONAL_INFO.email);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
    }
  };

  return (
    <section id="contact" className="relative py-20 md:py-24 scroll-mt-16">
      <div className="section-divider max-w-[72rem] mx-auto px-5 sm:px-8" />

      <div className="max-w-xl mx-auto px-5 sm:px-8 pt-14">
        <div className="text-center mb-10">
          <p className="font-mono text-sm text-[#6366F1] mb-3">05 — Contact</p>
          <ScrambleHeading text="Let's build something." />
          <p className="font-mono text-xs text-[#A1A1AA] mt-4 leading-relaxed">
            I&apos;m currently open for Junior AI and Full-Stack roles, freelance
            <br className="hidden sm:block" />
            work, and interesting open-source collaborations.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#18181B] border border-[#27272A] hover:border-[#3F3F46] font-mono text-xs text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors"
          >
            <GithubIcon className="w-3.5 h-3.5 text-[#6366F1]" />
            GitHub
          </a>
          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#18181B] border border-[#27272A] hover:border-[#3F3F46] font-mono text-xs text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors"
          >
            <LinkedinIcon className="w-3.5 h-3.5 text-[#6366F1]" />
            LinkedIn
          </a>
          <a
            href="tel:+40722246156"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#18181B] border border-[#27272A] hover:border-[#3F3F46] font-mono text-xs text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-[#6366F1]" />
            +40 722 246 156
          </a>
          <button
            onClick={handleCopyEmail}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#18181B] border border-[#27272A] hover:border-[#3F3F46] font-mono text-xs text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors cursor-pointer"
          >
            {copiedEmail ? (
              <Check className="w-3.5 h-3.5 text-[#10B981]" />
            ) : (
              <Copy className="w-3.5 h-3.5 text-[#6366F1]" />
            )}
            {copiedEmail ? "Copied!" : "Copy Email"}
          </button>
        </div>
      </div>
    </section>
  );
};

const ScrambleHeading: React.FC<{ text: string }> = ({ text }) => {
  const shouldReduceMotion = useReducedMotion();
  const [displayText, setDisplayText] = useState(text);
  const isScrambling = useRef(false);

  const handleHover = () => {
    if (shouldReduceMotion || isScrambling.current) return;

    let iteration = 0;
    isScrambling.current = true;

    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, idx) => {
            if (char === " ") return " ";
            if (idx < iteration) return text[idx];
            return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          })
          .join("")
      );

      iteration += 1 / 2;

      if (iteration >= text.length) {
        clearInterval(interval);
        setDisplayText(text);
        isScrambling.current = false;
      }
    }, 28);
  };

  return (
    <h2
      onMouseEnter={handleHover}
      className="font-heading font-bold text-3xl sm:text-4xl tracking-tight text-[#FAFAFA] inline-block"
    >
      {displayText}
    </h2>
  );
};