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
          background: "radial-gradient(circle, rgba(201,133,106,0.08) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(201,133,106,0.05) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(201,133,106,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(201,133,106,0.06) 1px, transparent 1px)",
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
          <span className="inline-flex items-center gap-2 text-sm text-[#90788E] border border-[rgba(201,133,106,0.2)] rounded-full px-4 py-1.5 bg-[#20121E]/50">
            <span className="w-2 h-2 rounded-full bg-[#C9856A] animate-pulse" />
            Technical Product Leader · AI Systems · NTU MBA
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={item}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-[#EDE5F0] tracking-tight mb-4"
        >
          Mohini Asthana
        </motion.h1>

        {/* Animated tagline */}
        <motion.div
          variants={item}
          className="text-2xl md:text-4xl font-semibold text-[#90788E] mb-8 h-12 flex items-center justify-center gap-3"
        >
          <AnimatedWord />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          variants={item}
          className="text-base md:text-lg text-[#90788E] max-w-2xl mx-auto leading-relaxed mb-10"
        >
          I build at the intersection of technology and human systems —
          making complex things feel effortless.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 18px rgba(201,133,106,0.28), 0 2px 8px rgba(0,0,0,0.4)" }}
            whileTap={{ scale: 0.97 }}
            onClick={() => document.querySelector("#experience")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-3.5 rounded-full text-sm font-semibold text-[#150D14] cursor-pointer"
            style={{ background: "linear-gradient(135deg, #D4926F 0%, #C9856A 50%, #B8705A 100%)", boxShadow: "0 0 18px rgba(201,133,106,0.28), 0 2px 8px rgba(0,0,0,0.4)" }}
          >
            View My Work
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-3.5 rounded-full text-sm font-semibold text-[#C9856A] border border-[rgba(201,133,106,0.4)] hover:bg-[rgba(201,133,106,0.08)] transition-colors duration-200 cursor-pointer"
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
        <span className="text-xs text-[#90788E] tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-[rgba(201,133,106,0.5)] to-transparent"
        />
      </motion.div>
    </section>
  );
}
