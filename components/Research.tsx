"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";

interface Paper {
  title: string;
  venue: string;
  year: string;
  type: string;
  description: string;
  tags: string[];
  status: "published" | "in-progress";
  link?: string;
  badgeText?: string;
}

const papers: Paper[] = [
  {
    title: "Human-AI Decision-Making in Organisational Systems",
    venue: "NTU Research — Empirical Study",
    year: "2026–Present",
    type: "Empirical Research",
    description:
      "Empirical investigation into human-AI collaboration and decision-making in organisational systems, combining experiment design, survey instrument development, and statistical analysis (regression, thematic coding). Research covers AI-augmented decision-making, prompt engineering efficacy, and how leadership context shapes AI adoption and trust.",
    tags: ["Human-AI Interaction", "Trust", "Leadership", "Mixed Methods"],
    status: "in-progress",
  },
  {
    title: "Project PRISM — Agentic AI Digital Twin for Commerce",
    venue: "IBM Consulting Engagement (SPAN) — NTU",
    year: "2025–2026",
    type: "Applied Research",
    description:
      "Reframed an ambiguous client brief on AI-driven retail intelligence into Project PRISM — a consumer-centric Agentic AI Digital Twin unifying a consumer's fragmented shopping identity across platforms, cards, and product categories. Serving as Client Lead and solution architect: driving 0-to-1 product design, agent architecture (credential-token authentication, payment-method optimisation, agentic workflow design), business case development, and APAC GTM strategy.",
    tags: ["Agentic AI", "Digital Twin", "Commerce", "0-to-1", "APAC GTM"],
    status: "in-progress",
  },
  {
    title: "Beyond the Monolithic Prompt",
    venue: "Essay · Medium",
    year: "2025",
    type: "Published Research",
    badgeText: "Published · 2025",
    description:
      "A technical essay exploring the architectural parallels between microservices and agentic AI systems — covering orchestration vs choreography, Saga patterns, and what distributed systems thinking reveals about designing reliable multi-agent pipelines.",
    tags: ["Agentic AI", "System Design", "Multi-Agent Architecture"],
    status: "published",
    link: "https://medium.com/@mohini.asthana/beyond-the-monolithic-prompt",
  },
  {
    title: "Machine Learning Approaches to Predictive Classification",
    venue: "IRJET — International Research Journal of Engineering and Technology",
    year: "2018",
    type: "Published Research",
    description:
      "Peer-reviewed publication from undergraduate research exploring ML-based classification techniques. The work applied supervised learning methods to structured datasets, establishing an early foundation in applied machine learning before the field reached its current prominence.",
    tags: ["Machine Learning", "Classification", "Python", "Supervised Learning"],
    status: "published",
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

function PaperCard({ paper, index }: { paper: Paper; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const badgeLabel = paper.badgeText ?? (paper.status === "published" ? "Published" : "In Progress");

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
      className="gradient-border rounded-2xl p-6 hover:bg-[#2E2522] transition-colors duration-300 group"
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span
              className={`text-xs px-2.5 py-1 rounded-full font-mono ${
                paper.status === "published"
                  ? "bg-[#C9856A]/10 text-[#C9856A] border border-[#C9856A]/30"
                  : "bg-[#C9856A]/10 text-[#C9856A] border border-[#C9856A]/30 opacity-70"
              }`}
            >
              {badgeLabel}
            </span>
            <span className="text-xs text-[#7A6A64] font-mono">{paper.year}</span>
          </div>
          {paper.link ? (
            <a
              href={paper.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-base font-semibold text-[#F0E8E3] mb-1 leading-snug group-hover:text-[#C9856A] transition-colors duration-200 hover:underline underline-offset-2 block"
            >
              {paper.title}
            </a>
          ) : (
            <h3 className="text-base font-semibold text-[#F0E8E3] mb-1 leading-snug group-hover:text-[#C9856A] transition-colors duration-200">
              {paper.title}
            </h3>
          )}
          <div className="text-xs text-[#9A8A84] mb-4">{paper.venue}</div>
        </div>
      </div>

      <p className="text-sm text-[#9A8A84] leading-relaxed mb-4">{paper.description}</p>

      <div className="flex flex-wrap gap-2">
        {paper.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2.5 py-1 rounded-full bg-[#1A1614] border border-[rgba(201,133,106,0.12)] text-[#7A6A64]"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Research() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section id="research" className="py-24 px-6 bg-[#1E1714] border-t border-[rgba(201,133,106,0.07)]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          ref={headerRef}
          variants={fadeUp}
          initial="hidden"
          animate={headerInView ? "show" : "hidden"}
          className="mb-16"
        >
          <span className="text-sm text-[#C9856A] font-mono tracking-wider uppercase block mb-4">
            04. Research
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#F0E8E3] mb-4">
            Studying the translation
          </h2>
          <p className="text-[#9A8A84] max-w-xl leading-relaxed">
            My research centres on the gap between what AI systems can do and what humans actually
            do with them — where trust forms, where it breaks, and what that means for the people
            designing and leading these systems.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
          {papers.map((paper, i) => (
            <PaperCard key={paper.title} paper={paper} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
