"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-[#1e2d45]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-sm text-[#475569]"
        >
          © {new Date().getFullYear()} Mohini Asthana. Built with intention.
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-xs text-[#475569] font-mono"
        >
          Next.js · Tailwind · Framer Motion
        </motion.div>
      </div>
    </footer>
  );
}
