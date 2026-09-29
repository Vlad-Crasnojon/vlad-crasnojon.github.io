"use client";

import React from "react";
import { PersonalBrandingLogo } from "@/components/PersonalBrandingLogo";

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[#27272A] py-12">
      <div className="max-w-[72rem] mx-auto px-5 sm:px-8 flex flex-col items-center gap-3">
        <PersonalBrandingLogo showText={false} />
        <p className="font-mono text-xs text-[#71717A]">
          © 2026 Vlad Crasnojon — built with Next.js &amp; Tailwind
        </p>
      </div>
    </footer>
  );
};