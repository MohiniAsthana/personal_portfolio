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
}

const papers: Paper[] = [
  {
    title: "Human-AI Decision-Making in Organisational Systems",
    venue: "NTU Research — Empirical Study",
    year: "2024–Present",
    type: "Empirical Research",
    description:
      "Investigating how individuals and teams make decisions in the presence of AI recommendations, with a focus on where trust calibration breaks down and how leadership context shapes adoption. Mixed-methods study combining interview data and quantitative analysis.",
    tags: ["Human-AI Interaction", "Trust", "Leadership", "Mixed Methods"],
    status: "in-progress",
  },
  {
    title: "Agentic AI in Commerce: Product Strategy and Human Oversight",
    venue: "IBM Consulting Engagement — NTU",
    year: "2024–Present",
    type: "Applied Research",
    description:
      "Leading product strategy for an agentic AI commerce solution as part of an IBM-NTU consulting engagement. Research focuses on the intersection of autonomous AI systems, human oversight, and enterprise adoption patterns.",
    tags: ["Agentic AI", "Commerce", "Product Strategy", "Enterprise"],
    status: "in-progress",
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

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
      className="gradient-border rounded-2xl p-6 bg-[#111827] hover:bg-[#1a2235] transition-colors duration-300 group"
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span
              className={`text-xs px-2.5 py-1 rounded-full font-mono ${
                paper.status === "published"
                  ? "bg-[#14b8a6]/10 text-[#14b8a6] border border-[#14b8a6]/30"
                  : "bg-[#8b5cf6]/10 text-[#8b5cf6] border border-[#8b5cf6]/30"
              }`}
            >
              {paper.status === "published" ? "Published" : "In Progress"}
            </span>
            <span className="text-xs text-[#475569] font-mono">{paper.year}</span>
          </div>
          <h3 className="text-base font-semibold text-[#f1f5f9] mb-1 leading-snug group-hover:text-[#14b8a6] transition-colors duration-200">
            {paper.title}
          </h3>
          <div className="text-xs text-[#94a3b8] mb-4">{paper.venue}</div>
        </div>
      </div>

      <p className="text-sm text-[#94a3b8] leading-relaxed mb-4">{paper.description}</p>

      <div className="flex flex-wrap gap-2">
        {paper.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2.5 py-1 rounded-full bg-[#0a0e1a] border border-[#1e2d45] text-[#475569]"
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
    <section id="research" className="py-24 px-6 bg-[#0f1629]">
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
            04. Research
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#f1f5f9] mb-4">
            Studying the translation
          </h2>
          <p className="text-[#94a3b8] max-w-xl leading-relaxed">
            My research centres on the gap between what AI systems can do and what humans actually
            do with them — where trust forms, where it breaks, and what that means for the people
            designing and leading these systems.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {papers.map((paper, i) => (
            <PaperCard key={paper.title} paper={paper} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
