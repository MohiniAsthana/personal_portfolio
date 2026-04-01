"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";

interface RoleEntry {
  title: string;
  period: string;
  highlights: string[];
  dividerLabel?: string; // label shown above this role (transition from the previous)
}

interface CompanyEntry {
  company: string;
  location: string;
  overallPeriod: string;
  description: string;
  roles: RoleEntry[];
  tags: string[];
  accentColor: string;
  roleDividerLabel?: string;
}

const companies: CompanyEntry[] = [
  {
    company: "Nanyang Business School, NTU",
    location: "Singapore",
    overallPeriod: "July 2025 — June 2026",
    description:
      "Pursuing an MBA with a focus on strategy and technology leadership. Concurrently working as a Research Associate conducting empirical studies on human-AI systems, and leading product strategy for an Agentic AI commerce solution as part of an IBM consulting engagement.",
    roles: [
      {
        title: "Research Associate",
        period: "Jan 2026 — Present",
        highlights: [
          "Empirical research on human-AI decision-making and trust dynamics",
          "IBM consulting engagement: Agentic AI commerce strategy",
        ],
      },
      {
        title: "MBA Candidate",
        period: "July 2025 — June 2026",
        highlights: [
          "Specialisation in strategy and technology leadership",
          "1st place — Mazda Brand Strategy Challenge",
        ],
      },
    ],
    tags: ["Human-AI Systems", "Product Strategy", "Research", "MBA"],
    accentColor: "#8b5cf6",
    roleDividerLabel: "+ added role",
  },
  {
    company: "Delphix",
    location: "Remote / Bangalore",
    overallPeriod: "Aug 2019 — June 2025",
    description:
      "The work kept expanding beyond the title. Drove product strategy for test data management solutions for Fortune 500 enterprise clients, spanning data virtualisation and compliance. In a deliberately flat organisation, the boundaries between engineering and product were porous by design — and I found myself drawn toward that intersection, again and again.",
    roles: [
      {
        title: "Senior Software Development Engineer 2",
        period: "May 2023 — June 2025",
        highlights: [
          "Led Agile transformation adopted firm-wide at VP level",
          "Drove 100% NRR across enterprise client portfolio",
          "Apex Ascent Award recipient (top performer recognition)",
          "Clients: LinkedIn, Truist, Choice Hotels",
        ],
      },
      {
        title: "Senior Software Development Engineer 1",
        period: "Aug 2021 — Apr 2023",
        highlights: [
          "Shipped data virtualisation and compliance features for enterprise clients",
          "Translated complex TDM architecture into tangible business value",
          "Established cross-functional working patterns across engineering and product",
        ],
      },
    ],
    tags: ["Data Virtualisation", "TDM", "Compliance", "Product Strategy", "Agile", "Enterprise"],
    accentColor: "#14b8a6",
  },
  {
    company: "Cisco",
    location: "Bangalore",
    overallPeriod: "Jan 2018 — Aug 2021",
    description:
      "Built infrastructure alert monitoring platform from scratch — a system that reduced alert noise significantly across global operations. Served as L3 escalation owner and developed predictive remediation tooling that proactively addressed recurring failure patterns.",
    roles: [
      {
        title: "Software Development Engineer 2",
        period: "Aug 2019 — Aug 2021",
        highlights: [
          "L3 escalation owner for critical infrastructure issues",
          "Developed predictive remediation tools",
          "Multiple 'You Amaze' and 'You Inspire' peer awards",
        ],
      },
      {
        title: "Software Development Engineer 1",
        period: "July 2018 — July 2019",
        highlights: [
          "Built infrastructure alert monitoring platform from scratch",
          "Contributed to alert noise reduction across global operations",
        ],
      },
      {
        title: "Software Development Engineer — Intern",
        period: "Jan 2018 — June 2018",
        dividerLabel: "→ campus hire",
        highlights: [
          "First engineering role — built familiarity with large-scale infrastructure systems",
          "Contributed to internal tooling and monitoring features",
        ],
      },
    ],
    tags: ["Infrastructure", "Python", "Distributed Systems", "Monitoring"],
    accentColor: "#3b82f6",
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

function CompanyCard({ entry, index }: { entry: CompanyEntry; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
      className="relative grid lg:grid-cols-[180px_1fr] gap-6 lg:gap-10 group"
    >
      {/* Left — period + dot */}
      <div className="lg:text-right pt-1 hidden lg:block pr-6">
        <div className="text-xs text-[#94a3b8] font-mono leading-relaxed">
          {entry.overallPeriod.split("—").map((part, i) => (
            <span key={i} className="block">{i === 0 ? part.trim() : `— ${part.trim()}`}</span>
          ))}
        </div>
        <div className="text-xs text-[#475569] mt-1">{entry.location}</div>
      </div>

      {/* Timeline dot */}
      <div className="hidden lg:flex absolute left-[180px] top-1.5 -translate-x-1/2 flex-col items-center z-10">
        <div
          className="w-3 h-3 rounded-full border-2 border-[#0a0e1a] transition-all duration-300 group-hover:scale-125"
          style={{
            backgroundColor: entry.accentColor,
            boxShadow: `0 0 12px ${entry.accentColor}60`,
          }}
        />
      </div>

      {/* Right — company card */}
      <div className="gradient-border rounded-2xl bg-[#111827] group-hover:bg-[#1a2235] transition-colors duration-300 overflow-hidden">
        {/* Company header */}
        <div className="px-6 pt-6 pb-4 border-b border-[#1e2d45]">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <h3
              className="text-lg font-bold"
              style={{ color: entry.accentColor }}
            >
              {entry.company}
            </h3>
            <span className="text-xs font-mono text-[#475569] lg:hidden">{entry.overallPeriod}</span>
          </div>
          <p className="text-sm text-[#94a3b8] leading-relaxed mt-2">{entry.description}</p>
        </div>

        {/* Role timeline inside card */}
        <div className="px-6 py-4 space-y-0">
          {entry.roles.map((role, i) => (
            <div key={role.title}>
              {/* Promotion divider */}
              {i > 0 && (
                <div className="flex items-center gap-3 my-4">
                  <div className="flex-1 h-px bg-[#1e2d45]" />
                  <span
                    className="text-xs font-mono px-2.5 py-0.5 rounded-full border"
                    style={{
                      color: entry.accentColor,
                      borderColor: `${entry.accentColor}30`,
                      backgroundColor: `${entry.accentColor}08`,
                    }}
                  >
                    {role.dividerLabel ?? entry.roleDividerLabel ?? "↑ promoted"}
                  </span>
                  <div className="flex-1 h-px bg-[#1e2d45]" />
                </div>
              )}

              <div className="flex items-start gap-3">
                {/* Inner timeline dot */}
                <div className="flex flex-col items-center mt-1.5 shrink-0">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: entry.accentColor, opacity: i === 0 ? 1 : 0.5 }}
                  />
                  {i < entry.roles.length - 1 && (
                    <div
                      className="w-px flex-1 mt-1"
                      style={{ background: `${entry.accentColor}30`, minHeight: "40px" }}
                    />
                  )}
                </div>

                <div className="flex-1 pb-2">
                  <div className="flex items-center justify-between gap-3 flex-wrap mb-2">
                    <span className="text-sm font-semibold text-[#f1f5f9]">{role.title}</span>
                    <span className="text-xs font-mono text-[#475569]">{role.period}</span>
                  </div>
                  <ul className="space-y-1.5">
                    {role.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2 text-xs text-[#94a3b8]">
                        <span
                          className="mt-1.5 w-1 h-1 rounded-full shrink-0"
                          style={{ backgroundColor: entry.accentColor, opacity: 0.6 }}
                        />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tags */}
        <div className="px-6 pb-5 flex flex-wrap gap-2">
          {entry.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-1 rounded-full border"
              style={{
                borderColor: `${entry.accentColor}30`,
                color: entry.accentColor,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section id="experience" className="py-24 px-6 bg-[#0f1629]">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          ref={headerRef}
          variants={fadeUp}
          initial="hidden"
          animate={headerInView ? "show" : "hidden"}
          className="mb-16"
        >
          <span className="text-sm text-[#14b8a6] font-mono tracking-wider uppercase block mb-4">
            02. Experience
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#f1f5f9]">
            Where the work happened
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical connecting line */}
          <div className="hidden lg:block absolute left-[180px] top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-[#1e2d45] to-transparent -translate-x-1/2" />

          <div className="space-y-10">
            {companies.map((entry, i) => (
              <CompanyCard key={entry.company} entry={entry} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
