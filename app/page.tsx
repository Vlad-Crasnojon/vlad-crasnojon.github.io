"use client";

import React, { useCallback, useState } from "react";

import { Preloader } from "@/components/Preloader";
import { CustomCursor } from "@/components/CustomCursor";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { TechMarquee } from "@/components/TechMarquee";
import { Projects } from "@/components/Projects";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Experience } from "@/components/Experience";
import { GitHubActivity } from "@/components/GitHubActivity";
import { CredibilityBoosters } from "@/components/CredibilityBoosters";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Toast } from "@/components/Toast";

export default function Home() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handlePreloaderComplete = useCallback(() => {
    setShowPreloader(false);
  }, []);

  const handleCopyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText("vcrasnojon73@gmail.com");
      setToastMessage("vcrasnojon73@gmail.com");
    } catch {
      setToastMessage("copy failed — email in footer");
    }
  }, []);

  return (
    <main className="min-h-screen bg-[#09090B] text-[#FAFAFA] overflow-x-hidden">
      {showPreloader && <Preloader onComplete={handlePreloaderComplete} />}
      <CustomCursor />
      <Navbar />
      <Hero />
      <TechMarquee />
      <Projects />
      <About />
      <Skills />
      <Experience />
      <GitHubActivity />
      <CredibilityBoosters />
      <Contact onCopyEmail={handleCopyEmail} />
      <Footer />

      <Toast message={toastMessage} onDismiss={() => setToastMessage(null)} />
    </main>
  );
}