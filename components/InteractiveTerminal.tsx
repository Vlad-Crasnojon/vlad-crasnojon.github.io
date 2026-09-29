"use client";

import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Terminal, Copy, Check } from "lucide-react";

interface TerminalCommand {
  cmd: string;
  lines: { type: "info" | "success" | "text"; text: string }[];
}

const COMMANDS: TerminalCommand[] = [
  {
    cmd: "whoami",
    lines: [
      { type: "text", text: "user: Vlad Crasnojon" },
      { type: "text", text: "role: Junior AI / Full-Stack Engineer" },
      { type: "text", text: "location: Ploiești, Romania" },
      { type: "text", text: "degree: BSc Computer Science '26" },
      { type: "success", text: "status: READY_FOR_HIRE" },
    ],
  },
  {
    cmd: "cat stack.txt",
    lines: [
      { type: "text", text: "backend: [FastAPI, Django, DRF, SQLAlchemy, PostgreSQL]" },
      { type: "text", text: "frontend: [Next.js, React, Angular, TailwindCSS]" },
      { type: "text", text: "ai-ml: [RAG, pgvector, spaCy NER, PyTorch, Gemini API]" },
      { type: "text", text: "devops: [Docker, Git, Gunicorn, Caddy, GitHub Actions]" },
    ],
  },
  {
    cmd: "deploy --prod",
    lines: [
      { type: "info", text: "[info] Building container image..." },
      { type: "info", text: "[info] Running migrations (alembic up head)..." },
      { type: "info", text: "[info] Rolling out 3 replicas behind Caddy..." },
      { type: "success", text: "✓ SUCCESS: Deployed to production in 1.4s" },
    ],
  },
  {
    cmd: "cat current_focus.json",
    lines: [
      { type: "text", text: '{ "building": "docchat-rag v2 — hybrid RAG" }' },
      { type: "text", text: '{ "learning": "Rust systems programming" }' },
      { type: "success", text: '{ "status": "open_for_roles" }' },
    ],
  },
];

export const InteractiveTerminal: React.FC = () => {
  const [activeCmd, setActiveCmd] = useState(0);
  const [copied, setCopied] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const command = COMMANDS[activeCmd];

  const handleCopy = async () => {
    const output = [`$ ${command.cmd}`, ...command.lines.map((l) => l.text)].join("\n");
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="rounded-xl bg-[#18181B] border border-[#27272A] overflow-hidden"
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#27272A] bg-[#0d0d10]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#27272A]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#27272A]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#27272A]" />
          <span className="ml-3 font-mono text-[11px] text-[#A1A1AA]">vlad@dev-box:~</span>
        </div>
        <button
          onClick={handleCopy}
          className="p-1.5 rounded-md text-[#71717A] hover:text-[#FAFAFA] hover:bg-[#27272A] transition-colors cursor-pointer"
          aria-label="Copy command output"
          title="Copy output"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-[#10B981]" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
      </div>

      <div className="flex flex-wrap gap-1.5 px-4 pt-3">
        {COMMANDS.map((c, i) => (
          <button
            key={c.cmd}
            onClick={() => setActiveCmd(i)}
            className={`px-2.5 py-1 rounded-md font-mono text-[11px] transition-colors cursor-pointer ${
              activeCmd === i
                ? "bg-[#6366F1]/20 border border-[#6366F1]/40 text-[#818CF8]"
                : "bg-transparent border border-[#27272A] text-[#71717A] hover:text-[#FAFAFA] hover:border-[#3F3F46]"
            }`}
          >
            <span className="text-[#6366F1]">$</span> {c.cmd}
          </button>
        ))}
      </div>

      <div className="px-4 py-4 font-mono text-xs min-h-[220px]">
        <div className="flex items-center gap-2 text-[#A1A1AA]">
          <Terminal className="w-3.5 h-3.5 text-[#6366F1]" />
          <span>$ {command.cmd}</span>
        </div>
        <TerminalOutput key={command.cmd} command={command} shouldReduceMotion={shouldReduceMotion} />
      </div>

      <div className="flex items-center justify-between px-4 py-3 border-t border-[#27272A] bg-[#0d0d10]">
        <span className="font-mono text-[10px] text-[#52525B]">
          Interactive Shell · Click any command above
        </span>
        <span className="flex items-center gap-1.5 font-mono text-[10px] text-[#10B981]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
          ONLINE · 0 errors
        </span>
      </div>
    </motion.div>
  );
};

const TerminalOutput: React.FC<{
  command: TerminalCommand;
  shouldReduceMotion: boolean | null;
}> = ({ command, shouldReduceMotion }) => {
  const [typedLines, setTypedLines] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (shouldReduceMotion) return;

    let cancelled = false;
    let lineIdx = 0;
    let charIdx = 0;
    const currentLine = () => command.lines[lineIdx]?.text ?? "";

    const finish = () => {
      if (cancelled) return;
      setTypedLines(command.lines.map((l) => l.text));
      setIsTyping(false);
    };

    const tick = () => {
      if (cancelled) return;
      if (lineIdx >= command.lines.length) {
        finish();
        return;
      }
      charIdx += 1;
      const lines = command.lines.slice(0, lineIdx).map((l) => l.text);
      const partial = currentLine().slice(0, charIdx);
      setTypedLines([...lines, ...(partial ? [partial] : [])]);
      if (charIdx >= currentLine().length) {
        lineIdx += 1;
        charIdx = 0;
      }
      setTimeout(tick, 45);
    };

    const start = setTimeout(() => {
      setIsTyping(true);
      tick();
    }, 120);

    return () => {
      cancelled = true;
      clearTimeout(start);
    };
  }, [command, shouldReduceMotion]);

  const displayLines = shouldReduceMotion ? command.lines.map((l) => l.text) : typedLines;

  return (
    <div className="mt-3 space-y-1.5">
      {displayLines.map((line, i) => {
        const type = command.lines[Math.min(i, command.lines.length - 1)].type;
        return (
          <div
            key={i}
            className={
              type === "success"
                ? "text-[#10B981]"
                : type === "info"
                  ? "text-[#818CF8]"
                  : "text-[#FAFAFA]"
            }
          >
            {line}
            {i === displayLines.length - 1 && isTyping && !shouldReduceMotion && (
              <motion.span
                className="inline-block w-2 h-3.5 bg-[#6366F1] ml-0.5 align-middle"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};