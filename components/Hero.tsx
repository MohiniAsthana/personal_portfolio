"use client";

import { useEffect, useRef } from "react";
import { motion, type Variants } from "framer-motion";

const words = ["Simplifier.", "Researcher.", "Builder.", "Leader."];

function AnimatedWord() {
  const containerRef = useRef<HTMLSpanElement>(null);
  const indexRef = useRef(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const cycle = () => {
      const word = words[indexRef.current % words.length];
      indexRef.current++;

      // Fade out
      el.style.transition = "opacity 0.3s ease, transform 0.3s ease";
      el.style.opacity = "0";
      el.style.transform = "translateY(-8px)";

      setTimeout(() => {
        el.textContent = word;
        el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, 350);
    };

    el.textContent = words[0];
    el.style.opacity = "1";
    const interval = setInterval(cycle, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <span
      ref={containerRef}
      className="gradient-text inline-block"
      style={{ opacity: 0 }}
    />
  );
}

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
    >
      {/* Ambient background blobs */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(20,184,166,0.08) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(30,45,69,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(30,45,69,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
        }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-4xl mx-auto text-center"
      >
        {/* Eyebrow */}
        <motion.div variants={item} className="mb-6">
          <span className="inline-flex items-center gap-2 text-sm text-[#94a3b8] border border-[#1e2d45] rounded-full px-4 py-1.5 bg-[#111827]/50">
            <span className="w-2 h-2 rounded-full bg-[#14b8a6] animate-pulse" />
            Technical Product Leader · Researcher · NTU MBA
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={item}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-[#f1f5f9] tracking-tight mb-4"
        >
          Mohini Asthana
        </motion.h1>

        {/* Animated tagline */}
        <motion.div
          variants={item}
          className="text-2xl md:text-4xl font-semibold text-[#94a3b8] mb-8 h-12 flex items-center justify-center gap-3"
        >
          <AnimatedWord />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          variants={item}
          className="text-base md:text-lg text-[#94a3b8] max-w-2xl mx-auto leading-relaxed mb-10"
        >
          I build at the intersection of technology and human systems —
          making complex things feel effortless.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(20,184,166,0.3)" }}
            whileTap={{ scale: 0.97 }}
            onClick={() => document.querySelector("#experience")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-3.5 rounded-full text-sm font-semibold text-[#0a0e1a] cursor-pointer"
            style={{ background: "linear-gradient(135deg, #14b8a6, #8b5cf6)" }}
          >
            View My Work
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-3.5 rounded-full text-sm font-semibold text-[#f1f5f9] border border-[#1e2d45] hover:border-[#14b8a6] transition-colors duration-200 cursor-pointer"
          >
            Get in Touch
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-[#475569] tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-[#14b8a6] to-transparent"
        />
      </motion.div>
    </section>
  );
}
