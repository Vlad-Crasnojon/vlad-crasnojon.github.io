"use client";

import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { Star, GitFork, ArrowUpRight } from "lucide-react";
import { defaultViewport } from "@/utils/motion";

interface Repo {
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
  updated_at: string;
}

const FALLBACK_REPOS = [
  { name: "AILIN", description: "Legal-tech insolvency management platform (FastAPI + spaCy NER)", language: "Python" },
  { name: "ABC-MATE-Junior", description: "Educational e-commerce platform (Django + PostgreSQL)", language: "Python" },
  { name: "docchat-rag", description: "Legal RAG assistant (pgvector + Gemini + LangGraph)", language: "Python" },
  { name: "Fitterzz", description: "AI wardrobe engine (Fashion-CLIP + YOLOS)", language: "Python" },
  { name: "LISTIT", description: "Marketplace MVP (DRF + PostGIS + Celery)", language: "Python" },
  { name: "rusthelper", description: "Systems utilities written in Rust", language: "Rust" },
];

const languageColors: Record<string, string> = {
  Python: "#3572A5",
  TypeScript: "#3178C6",
  JavaScript: "#f1e05a",
  SQL: "#e38c00",
  Rust: "#DEA584",
  HTML: "#e34c26",
  CSS: "#563d7c",
};

const timeAgo = (dateStr: string) => {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days <= 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  return `${months}mo ago`;
};

export const GitHubActivity: React.FC = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    let cancelled = false;

    const fetchRepos = async () => {
      try {
        const res = await fetch(
          "https://api.github.com/users/Vlad-Crasnojon/repos?sort=updated&per_page=6",
          { headers: { Accept: "application/vnd.github+json" } }
        );
        if (!res.ok) throw new Error(`GitHub API ${res.status}`);
        const data: Repo[] = await res.json();
        if (!cancelled) {
          setRepos(data);
          setIsLive(true);
        }
      } catch {
        if (!cancelled) {
          setRepos(
            FALLBACK_REPOS.map((r) => ({
              ...r,
              stargazers_count: 0,
              forks_count: 0,
              html_url: `${PERSONAL_INFO.github}/${r.name}`,
              updated_at: new Date().toISOString(),
            }))
          );
          setIsLive(false);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchRepos();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="github" className="relative py-20 md:py-24 scroll-mt-16">
      <div className="section-divider max-w-[72rem] mx-auto px-5 sm:px-8" />

      <div className="max-w-[72rem] mx-auto px-5 sm:px-8 pt-14">
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={defaultViewport}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <p className="font-mono text-sm text-[#6366F1] mb-2">{"// git_telemetry"}</p>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl tracking-tight text-[#FAFAFA]">
              Live GitHub Verification
            </h2>
          </div>
        </motion.div>

        <div className="rounded-xl bg-[#18181B] border border-[#27272A] p-5">
          <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-xs text-[#A1A1AA]">
                {isLive ? "repos?sort=updated" : "repos?sort=updated (offline fallback)"}
              </span>
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-xs font-mono text-[#6366F1] hover:text-[#818CF8] transition-colors cursor-pointer"
              >
                View Profile <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>

            {loading ? (
              <div className="space-y-3">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="h-16 rounded-lg bg-[#0d0d10] border border-[#27272A] animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="space-y-2.5">
                {repos.map((repo) => (
                  <a
                    key={repo.name}
                    href={repo.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg bg-[#0d0d10] border border-[#27272A] hover:border-[#3F3F46] transition-colors group cursor-pointer"
                  >
                    <div
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{
                        backgroundColor:
                          languageColors[repo.language ?? ""] ?? "#818CF8",
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-semibold text-[#FAFAFA] group-hover:text-[#818CF8] transition-colors">
                          {repo.name}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#71717A] truncate mt-0.5">
                        {repo.description ?? "No description"}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0 font-mono text-[10px] text-[#71717A]">
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        {repo.stargazers_count}
                      </span>
                      <span className="flex items-center gap-1">
                        <GitFork className="w-3 h-3" />
                        {repo.forks_count}
                      </span>
                      <span className="hidden sm:inline">{timeAgo(repo.updated_at)}</span>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
  );
};