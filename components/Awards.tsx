"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";

interface Award {
  title: string;
  org: string;
  year: string;
  description: string;
  icon: string;
  iconBg: string;
  iconBorder: string;
  iconColor: string;
}

const featuredAward: Award = {
  title: "Top 100 Most Inspiring MBA Leaders — MBA World Summit 2026",
  org: "MBA World Summit · IPAI, Heilbronn, Germany",
  year: "2026",
  description:
    "Selected as one of 100 most inspiring MBA leaders globally for the 10th edition of the MBA World Summit at IPAI, Europe's largest AI innovation hub. Invited to lead a Summit Laboratory Session: \"The Unseen Truth About Beautiful Lies — How Agentic AI can make truth harder to fake than fiction.\"",
  icon: "◉",
  iconBg: "rgba(201,133,106,0.15)",
  iconBorder: "rgba(201,133,106,0.3)",
  iconColor: "#C9856A",
};

const standardAwards: Award[] = [
  {
    title: "1st Place — Mazda Brand Strategy Challenge",
    org: "Nanyang Business School, NTU",
    year: "2025",
    description:
      "Won the competitive Mazda Brand Strategy Challenge among MBA cohorts, presenting a go-to-market and product strategy under real business constraints and executive evaluation.",
    icon: "◆",
    iconBg: "rgba(212,169,106,0.15)",
    iconBorder: "rgba(212,169,106,0.3)",
    iconColor: "#D4A96A",
  },
  {
    title: "Delphix India Hackathon Winner",
    org: "Delphix",
    year: "2023",
    description:
      "Built a POC to horizontally scale Delphix's hyperscale compliance services — previously limited to a single node per tightly coupled service. Designed a multi-pod architecture with an orchestrating controller to enable true horizontal scaling, directly addressing a performance ceiling in the product's core compliance engine.",
    icon: "⬡",
    iconBg: "rgba(201,133,106,0.12)",
    iconBorder: "rgba(201,133,106,0.25)",
    iconColor: "#C9856A",
  },
  {
    title: "Apex Ascent Award",
    org: "Delphix",
    year: "2022",
    description:
      "Top performer recognition, awarded to individuals who demonstrated exceptional impact and leadership beyond their scope. One of the highest internal honours at Delphix.",
    icon: "▲",
    iconBg: "rgba(201,133,106,0.12)",
    iconBorder: "rgba(201,133,106,0.25)",
    iconColor: "#C9856A",
  },
];

const peerAwards = [
  { title: "You Amaze Award", org: "Cisco", year: "2017–2019" },
  { title: "You Inspire Award", org: "Cisco", year: "2017–2019" },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

function FeaturedAwardCard({ award }: { award: Award }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="card-hover col-span-full rounded-2xl overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #2A1728 0%, #1C0F1A 60%, #251020 100%)",
        borderLeft: "2px solid #C9856A",
        border: "0.5px solid rgba(201,133,106,0.12)",
        borderLeftWidth: "2px",
        borderLeftColor: "#C9856A",
        boxShadow: "0 0 40px rgba(201,133,106,0.08), inset 0 0 0 0.5px rgba(201,133,106,0.12)",
      }}
    >
      <div className="px-10 py-8">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div
            className="icon-box w-[52px] h-[52px] rounded-xl flex items-center justify-center text-xl font-bold shrink-0"
            style={{
              background: award.iconBg,
              border: `0.5px solid ${award.iconBorder}`,
              color: award.iconColor,
            }}
          >
            {award.icon}
          </div>
          <span className="text-xs font-mono" style={{ color: "#D4A96A" }}>{award.year}</span>
        </div>
        <h3 className="text-xl font-semibold mb-1" style={{ color: "#C9856A" }}>
          {award.title}
        </h3>
        <div className="text-xs text-[#90788E] mb-3 font-mono">{award.org}</div>
        <p className="text-sm text-[#90788E] leading-relaxed">{award.description}</p>
      </div>
    </motion.div>
  );
}

function StandardAwardCard({ award, index }: { award: Award; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.08 }}
      className="gradient-border card-hover rounded-2xl p-6 cursor-default"
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className="icon-box w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold"
          style={{
            background: award.iconBg,
            border: `0.5px solid ${award.iconBorder}`,
            color: award.iconColor,
          }}
        >
          {award.icon}
        </div>
        <span className="text-xs font-mono" style={{ color: "#D4A96A" }}>{award.year}</span>
      </div>
      <h3
        className="text-base font-semibold mb-1"
        style={{ color: award.iconColor }}
      >
        {award.title}
      </h3>
      <div className="text-xs text-[#90788E] mb-3 font-mono">{award.org}</div>
      <p className="text-sm text-[#90788E] leading-relaxed">{award.description}</p>
    </motion.div>
  );
}

export default function Awards() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });
  const stripRef = useRef(null);
  const stripInView = useInView(stripRef, { once: true, margin: "-60px" });

  return (
    <section id="awards" className="py-24 px-6 bg-[#150D14] border-t border-[rgba(201,133,106,0.07)]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          ref={headerRef}
          variants={fadeUp}
          initial="hidden"
          animate={headerInView ? "show" : "hidden"}
          className="mb-16"
        >
          <span className="text-sm font-mono tracking-wider uppercase block mb-4" style={{ color: "#D4A96A" }}>
            05. Awards
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#EDE5F0] mb-4">
            The work, acknowledged
          </h2>
          <p className="text-[#90788E] max-w-xl">
            Recognition from peers and organisations for impact that went beyond the expected.
          </p>
        </motion.div>

        {/* Featured card — full width */}
        <div className="mb-6">
          <FeaturedAwardCard award={featuredAward} />
        </div>

        {/* Standard 3-column grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {standardAwards.map((award, i) => (
            <StandardAwardCard key={award.title} award={award} index={i} />
          ))}
        </div>

        {/* Compact peer recognition strip */}
        <motion.div
          ref={stripRef}
          initial={{ opacity: 0, y: 16 }}
          animate={stripInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="border-t border-[rgba(201,133,106,0.07)] pt-6"
        >
          <span
            className="block mb-2 text-[10px] font-mono tracking-widest uppercase"
            style={{ color: "#D4A96A" }}
          >
            Peer Recognition
          </span>
          <p className="text-[13px] text-[#90788E]">
            {peerAwards.map((a, i) => (
              <span key={a.title}>
                {i > 0 && <span className="mx-2 opacity-40">·</span>}
                {a.title}
                <span className="mx-1.5 opacity-40">·</span>
                {a.org}
                <span className="mx-1.5 opacity-40">·</span>
                {a.year}
              </span>
            ))}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
