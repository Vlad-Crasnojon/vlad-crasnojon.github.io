"use client";

import React, { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  AnimatePresence,
  type MotionValue,
} from "motion/react";
import { PROJECTS, PERSONAL_INFO } from "@/data/portfolioData";
import { ProjectItem } from "@/types/portfolio";
import { TiltCard } from "@/components/TiltCard";
import { defaultViewport } from "@/utils/motion";
import {
  ArrowUpRight,
  Layers,
  CheckCircle2,
  Cpu,
  ChevronLeft,
  ChevronRight,
  X,
  Code2,
} from "lucide-react";
import { GithubIcon } from "@/components/BrandIcons";

export const Projects: React.FC = () => {
  const featured = PROJECTS.filter((p) => p.isFeatured);
  const grid = PROJECTS.filter((p) => !p.isFeatured);
  const [caseStudy, setCaseStudy] = useState<ProjectItem | null>(null);

  return (
    <section id="projects" className="relative py-20 md:py-24 scroll-mt-16">
      <div className="section-divider max-w-[72rem] mx-auto px-5 sm:px-8" />

      <div className="max-w-[72rem] mx-auto px-5 sm:px-8 pt-14">
        <div className="mb-12">
          <p className="font-mono text-sm text-[#6366F1] mb-3">03 — Work</p>
          <ScrollWord text="Featured Platforms & Open Systems" />
        </div>

        <div className="space-y-8">
          {featured.map((project) => (
            <FeaturedTiltCard
              key={project.id}
              project={project}
              onOpenCaseStudy={() => setCaseStudy(project)}
            />
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {grid.map((project) => (
            <GridTiltCard
              key={project.id}
              project={project}
              onOpenCaseStudy={() => setCaseStudy(project)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {caseStudy && (
          <CaseStudyModal project={caseStudy} onClose={() => setCaseStudy(null)} />
        )}
      </AnimatePresence>
    </section>
  );
};

const ScrollWord: React.FC<{ text: string }> = ({ text }) => {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.6"],
  });

  const words = text.split(" ");

  return (
    <div ref={ref} className="font-heading font-bold text-3xl sm:text-4xl tracking-tight">
      {shouldReduceMotion ? (
        <span className="text-[#FAFAFA]">{text}</span>
      ) : (
        words.map((word, i) => (
          <ScrollWordSpan key={i} word={word} index={i} progress={scrollYProgress} />
        ))
      )}
    </div>
  );
};

const ScrollWordSpan: React.FC<{
  word: string;
  index: number;
  progress: MotionValue<number>;
}> = ({ word, index, progress }) => {
  const start = index * 0.15;
  const end = start + 0.15;
  const y = useTransform(progress, [start, end], [40, 0]);
  const opacity = useTransform(progress, [start, end], [0, 1]);
  const rotateX = useTransform(progress, [start, end], [25, 0]);
  return (
    <motion.span
      style={{ y, opacity, rotateX }}
      className="inline-block mr-2.5 text-[#FAFAFA]"
    >
      {word}
    </motion.span>
  );
};

const BrowserChrome: React.FC<{ url: string; children: React.ReactNode; className?: string }> = ({
  url,
  children,
  className = "",
}) => {
  return (
    <div className={`rounded-xl border border-[#27272A] bg-[#0d0d10] overflow-hidden ${className}`}>
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[#27272A]">
        <span className="w-2.5 h-2.5 rounded-full bg-[#27272A]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#27272A]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#27272A]" />
        <div className="ml-3 flex-1 truncate rounded-md bg-[#09090B] border border-[#27272A] px-3 py-1 text-[10px] font-mono text-[#71717A]">
          {url}
        </div>
      </div>
      {children}
    </div>
  );
};

const ProductFrame: React.FC<{ project: ProjectItem }> = ({ project }) => {
  return (
    <div className="relative w-full aspect-[16/10] bg-gradient-to-br from-[#111114] to-[#0a0a0c] flex flex-col items-center justify-center gap-4 p-8">
      <div className="w-16 h-16 rounded-2xl bg-[#18181B] border border-[#27272A] flex items-center justify-center relative">
        <span className="absolute -top-[1px] -left-[1px] w-2 h-2 border-t-2 border-l-2 border-[#6366F1] rounded-tl-sm" />
        <span className="font-mono text-lg font-semibold text-[#FAFAFA]">VC</span>
      </div>
      <div className="font-mono text-[10px] uppercase tracking-widest text-[#71717A]">
        {project.category}
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        {project.techStack.slice(0, 4).map((t) => (
          <span
            key={t}
            className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-[#6366F1]/10 text-[#818CF8] border border-[#6366F1]/20"
          >
            {t}
          </span>
        ))}
      </div>
      <div className="font-mono text-[10px] text-[#52525B] flex items-center gap-1.5">
        <span className="w-1 h-1 rounded-full bg-[#10B981]" />
        Real UI screenshots coming soon
      </div>
    </div>
  );
};

const ProjectVisual: React.FC<{ project: ProjectItem; isHovered: boolean; reduceMotion: boolean | null }> = ({
  project,
  isHovered,
  reduceMotion,
}) => {
  const clipWipe = !reduceMotion && isHovered;

  return (
    <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#09090B]">
      {project.image ? (
        <img
          src={project.image}
          alt={`${project.title} screenshot`}
          className="w-full h-full object-cover grayscale contrast-105 group-hover:grayscale-0 group-hover:opacity-100 opacity-95 transition-all duration-500"
        />
      ) : (
        <ProductFrame project={project} />
      )}

      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundColor: "rgba(99,102,241,0.15)" }}
        initial={false}
        animate={{
          clipPath: clipWipe
            ? "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
            : "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
        }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      />

      <motion.div
        className="absolute bottom-3 left-3 font-mono text-[10px] text-[#818CF8] uppercase tracking-widest"
        animate={{
          y: clipWipe || reduceMotion ? 0 : 36,
          opacity: clipWipe || reduceMotion ? 1 : 0,
        }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        Explore Case Study →
      </motion.div>
    </div>
  );
};

const FeaturedTiltCard: React.FC<{
  project: ProjectItem;
  onOpenCaseStudy: () => void;
}> = ({ project, onOpenCaseStudy }) => {
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={defaultViewport}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {!shouldReduceMotion && (
        <motion.div
          className="absolute -inset-[1px] rounded-xl pointer-events-none z-0 bg-gradient-to-r from-[#6366F1]/20 via-transparent to-transparent opacity-0"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      )}

      <TiltCard maxTilt={6} className="relative z-10">
        <div className="rounded-xl border border-[#27272A] bg-[#18181B] p-5 sm:p-6 hover:border-[#3F3F46] transition-colors duration-250">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7">
              <BrowserChrome url={`${PERSONAL_INFO.github.replace("https://", "")}/${project.id}`}>
                <ProjectVisual project={project} isHovered={isHovered} reduceMotion={shouldReduceMotion} />
              </BrowserChrome>
            </div>

            <div className="lg:col-span-5 flex flex-col">
              <div className="flex items-start justify-between gap-3">
                <motion.span
                  whileHover={shouldReduceMotion ? undefined : { scale: 1.05 }}
                  transition={{ duration: 0.15 }}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#6366F1]/10 border border-[#6366F1]/30 text-[#818CF8] font-mono text-[10px] uppercase tracking-wider"
                >
                  <Code2 className="w-3 h-3" />
                  Source on GitHub
                </motion.span>
                <span className="font-mono text-[10px] text-[#71717A] uppercase tracking-wider">
                  {project.category}
                </span>
              </div>

              <h3 className="font-heading font-bold text-xl text-[#FAFAFA] mt-3 tracking-tight">
                {project.title}
              </h3>
              <p className="text-sm text-[#A1A1AA] leading-relaxed mt-2">
                {project.description}
              </p>

              {project.metrics && (
                <div className="grid grid-cols-3 gap-3 my-4 py-4 border-y border-[#27272A]">
                  {project.metrics.map((m) => (
                    <div key={m.label}>
                      <div className="font-mono text-sm font-bold text-[#818CF8]">{m.value}</div>
                      <div className="font-mono text-[10px] text-[#71717A] uppercase tracking-wider mt-0.5">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap gap-1.5">
                {project.techStack.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-[#09090B] border border-[#27272A] text-[#A1A1AA]"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4 mt-auto pt-5">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-[#6366F1] hover:text-[#818CF8] transition-colors cursor-pointer"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  GitHub Repository
                  <ArrowUpRight className="w-3 h-3" />
                </a>
                <button
                  onClick={onOpenCaseStudy}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#27272A]/70 border border-[#3F3F46] text-xs font-mono text-[#FAFAFA] hover:border-[#6366F1] hover:text-white transition-colors cursor-pointer"
                >
                  Case Study
                  <ArrowUpRight className="w-3 h-3 text-[#6366F1]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
};

const GridTiltCard: React.FC<{
  project: ProjectItem;
  onOpenCaseStudy: () => void;
}> = ({ project, onOpenCaseStudy }) => {
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={defaultViewport}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <TiltCard maxTilt={5} className="h-full">
        <div className="h-full rounded-xl border border-[#27272A] bg-[#18181B] p-4 flex flex-col gap-3 hover:border-[#3F3F46] transition-colors duration-250">
          <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-md bg-[#0d0d10] border border-[#27272A]">
            <span className="w-2 h-2 rounded-full bg-[#27272A]" />
            <span className="w-2 h-2 rounded-full bg-[#27272A]" />
            <span className="w-2 h-2 rounded-full bg-[#27272A]" />
            <span className="ml-2 flex-1 truncate text-[9px] font-mono text-[#52525B]">
              {project.id}
            </span>
          </div>

          <ProjectVisual project={project} isHovered={isHovered} reduceMotion={shouldReduceMotion} />

          <div className="flex flex-col flex-1">
            <h4 className="font-heading font-semibold text-sm text-[#FAFAFA] leading-snug">
              {project.title}
            </h4>
            <p className="text-xs text-[#A1A1AA] mt-1 leading-relaxed line-clamp-2">
              {project.tagline}
            </p>

            <div className="flex flex-wrap gap-1.5 mt-3">
              {project.techStack.slice(0, 3).map((t) => (
                <span
                  key={t}
                  className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-[#09090B] border border-[#27272A] text-[#A1A1AA]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 mt-auto border-t border-[#27272A]">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-[10px] font-mono text-[#6366F1] hover:text-[#818CF8] transition-colors cursor-pointer"
            >
              <GithubIcon className="w-3 h-3" />
              Repo
            </a>
            <button
              onClick={onOpenCaseStudy}
              className="text-[10px] font-mono text-[#71717A] hover:text-[#FAFAFA] transition-colors cursor-pointer"
            >
              details →
            </button>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
};

const CaseStudyModal: React.FC<{ project: ProjectItem; onClose: () => void }> = ({
  project,
  onClose,
}) => {
  const [imgIndex, setImgIndex] = useState(0);

  React.useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);
  const images = project.galleryImages?.length
    ? project.galleryImages
    : project.image
      ? [project.image]
      : [];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm overflow-y-auto p-4 sm:p-8 flex items-start justify-center"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.96, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.96, y: 20, opacity: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="relative w-full max-w-3xl rounded-xl bg-[#18181B] border border-[#27272A] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#27272A]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#6366F1]/10 border border-[#6366F1]/30 flex items-center justify-center">
              <Layers className="w-4 h-4 text-[#818CF8]" />
            </div>
            <div>
              <div className="font-mono text-[10px] text-[#71717A] uppercase tracking-wider">
                Case Study & Architecture · {project.category}
              </div>
              <h3 className="font-heading font-bold text-lg text-[#FAFAFA]">{project.title}</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md text-[#A1A1AA] hover:text-white hover:bg-[#27272A] transition-colors cursor-pointer"
            aria-label="Close case study"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-6 max-h-[70vh] overflow-y-auto">
          <div className="relative rounded-xl overflow-hidden border border-[#27272A]">
            <div className="aspect-[16/9] bg-[#0d0d10]">
              {images.length > 0 ? (
                <img
                  src={images[imgIndex]}
                  alt={`${project.title} screenshot ${imgIndex + 1}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <ProductFrame project={project} />
              )}
            </div>
            {images.length > 1 && (
              <>
                <button
                  onClick={() => setImgIndex((imgIndex - 1 + images.length) % images.length)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-black/60 text-white hover:bg-black/80 cursor-pointer"
                  aria-label="Previous screenshot"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setImgIndex((imgIndex + 1) % images.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-black/60 text-white hover:bg-black/80 cursor-pointer"
                  aria-label="Next screenshot"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setImgIndex(i)}
                      className={`w-1.5 h-1.5 rounded-full cursor-pointer transition-colors ${
                        i === imgIndex ? "bg-[#6366F1]" : "bg-white/30"
                      }`}
                      aria-label={`Go to screenshot ${i + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {project.problemSolved && (
            <div className="rounded-lg bg-[#09090B] border border-[#27272A] p-4">
              <div className="flex items-center gap-2 font-mono text-xs text-[#818CF8] mb-2">
                <CheckCircle2 className="w-3.5 h-3.5" />
                The Problem & Commercial Value
              </div>
              <p className="text-sm text-[#A1A1AA] leading-relaxed">{project.problemSolved}</p>
            </div>
          )}

          {project.metrics && (
            <div className="grid grid-cols-3 gap-4">
              {project.metrics.map((m) => (
                <div key={m.label} className="rounded-lg bg-[#09090B] border border-[#27272A] p-3 text-center">
                  <div className="font-mono text-sm font-bold text-[#10B981]">{m.value}</div>
                  <div className="font-mono text-[9px] text-[#71717A] uppercase tracking-wider mt-1">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          {project.highlights && (
            <div>
              <div className="flex items-center gap-2 font-mono text-xs text-[#818CF8] mb-3">
                <Cpu className="w-3.5 h-3.5" />
                Implementation Highlights
              </div>
              <ul className="space-y-2">
                {project.highlights.map((h) => (
                  <li key={h} className="flex gap-2 text-sm text-[#FAFAFA] leading-relaxed">
                    <span className="text-[#6366F1] shrink-0">›</span>
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <div className="font-mono text-xs text-[#818CF8] mb-3">Complete Toolchain</div>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 rounded-md text-xs font-mono bg-[#09090B] border border-[#27272A] text-[#A1A1AA]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between px-5 py-4 border-t border-[#27272A]">
          <span className="font-mono text-[10px] text-[#52525B]">{project.id} · {project.category}</span>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#6366F1] hover:bg-[#818CF8] text-white text-xs font-mono font-medium transition-colors cursor-pointer"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            Open Repository on GitHub
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
};