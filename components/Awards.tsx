"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";

interface Award {
  title: string;
  org: string;
  year: string;
  description: string;
  icon: string;
  color: string;
}

const awards: Award[] = [
  {
    title: "1st Place — Mazda Brand Strategy Challenge",
    org: "Nanyang Business School, NTU",
    year: "2024",
    description:
      "Won the competitive Mazda Brand Strategy Challenge among MBA cohorts, presenting a go-to-market and product strategy under real business constraints and executive evaluation.",
    icon: "◆",
    color: "#8b5cf6",
  },
  {
    title: "Delphix India Hackathon Winner",
    org: "Delphix",
    year: "2023",
    description:
      "Built a POC to horizontally scale Delphix's hyperscale compliance services — previously limited to a single node per tightly coupled service. Designed a multi-pod architecture with an orchestrating controller to enable true horizontal scaling, directly addressing a performance ceiling in the product's core compliance engine.",
    icon: "⬡",
    color: "#14b8a6",
  },
  {
    title: "Apex Ascent Award",
    org: "Delphix",
    year: "2022",
    description:
      "Top performer recognition, awarded to individuals who demonstrated exceptional impact and leadership beyond their scope. One of the highest internal honours at Delphix.",
    icon: "▲",
    color: "#14b8a6",
  },
  {
    title: "You Amaze Award",
    org: "Cisco",
    year: "2017–2019",
    description:
      "Peer-nominated award recognising exceptional contributions that went beyond the expected. Received multiple times across the tenure at Cisco.",
    icon: "★",
    color: "#f59e0b",
  },
  {
    title: "You Inspire Award",
    org: "Cisco",
    year: "2017–2019",
    description:
      "Peer recognition for inspiring others through approach, work quality, and attitude. Received alongside the You Amaze Award from colleagues across teams.",
    icon: "✦",
    color: "#3b82f6",
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

function AwardCard({ award, index }: { award: Award; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.08 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="gradient-border rounded-2xl p-6 bg-[#111827] group cursor-default"
    >
      {/* Icon + year */}
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold"
          style={{ background: `${award.color}15`, color: award.color }}
        >
          {award.icon}
        </div>
        <span className="text-xs text-[#475569] font-mono">{award.year}</span>
      </div>

      {/* Content */}
      <h3
        className="text-base font-semibold mb-1 transition-colors duration-200"
        style={{ color: award.color }}
      >
        {award.title}
      </h3>
      <div className="text-xs text-[#475569] mb-3 font-mono">{award.org}</div>
      <p className="text-sm text-[#94a3b8] leading-relaxed">{award.description}</p>
    </motion.div>
  );
}

export default function Awards() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section id="awards" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          ref={headerRef}
          variants={fadeUp}
          initial="hidden"
          animate={headerInView ? "show" : "hidden"}
          className="mb-16"
        >
          <span className="text-sm text-[#14b8a6] font-mono tracking-wider uppercase block mb-4">
            05. Awards
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#f1f5f9] mb-4">
            The work, acknowledged
          </h2>
          <p className="text-[#94a3b8] max-w-xl">
            Recognition from peers and organisations for impact that went beyond the expected.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {awards.map((award, i) => (
            <AwardCard key={award.title} award={award} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
