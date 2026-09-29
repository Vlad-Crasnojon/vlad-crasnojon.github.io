"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check } from "lucide-react";

interface ToastProps {
  message: string | null;
  onDismiss: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onDismiss }) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(onDismiss, 2500);
    return () => clearTimeout(timer);
  }, [message, onDismiss]);

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 15, scale: 0.95 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="fixed bottom-20 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl bg-[#18181B] border border-[#6366F1]/50 text-[#FAFAFA] shadow-2xl font-mono text-xs"
        >
          <div className="w-6 h-6 rounded-full bg-[#10B981]/20 text-[#10B981] flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5" />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-semibold text-white">Copied to Clipboard</span>
            <span className="text-[#A1A1AA] text-[11px]">{message}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};