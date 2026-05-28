"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";

interface HighlightGroup {
  label: string;
  items: string[];
}

interface RoleEntry {
  title: string;
  period: string;
  highlights: string[];
  highlightGroups?: HighlightGroup[]; // optional sub-grouped highlights
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
      "Pursuing an MBA at Singapore's #1-ranked business school (Financial Times). Concurrently serving as a paid Research Associate in the Division of Leadership, Management & Organisation, contributing to active empirical studies on human-AI systems.",
    roles: [
      {
        title: "Research Associate",
        period: "Jan 2026 — Present",
        highlights: [
          "Statistical analysis and data processing for empirical studies on AI-augmented decision-making and human-AI trust dynamics",
          "Contributing to manuscript preparation for journal submissions on prompt engineering efficacy and human-AI collaboration",
        ],
      },
      {
        title: "MBA Candidate",
        period: "July 2025 — June 2026",
        highlights: [],
        highlightGroups: [
          {
            label: "Project PRISM",
            items: [
              "SPAN Capstone | IBM Consulting — Client Lead & Solution Architect on Project PRISM: conceived a 0-to-1 Agentic AI Digital Twin for commerce, led agent architecture, business case, and APAC GTM strategy for a 5-member team",
            ],
          },
          {
            label: "Recognition",
            items: [
              "Selected as one of 100 Most Inspiring MBA Leaders globally; leading a Summit Laboratory Session at MBA World Summit 2026, IPAI Heilbronn — Europe's largest AI innovation hub",
              "Won Mazda Singapore Brand Strategy Challenge — repositioned the brand for an emerging life-stage segment with a \"Mazda grows with you\" narrative grounded in changing market dynamics",
            ],
          },
        ],
      },
    ],
    tags: ["Human-AI Systems", "Agentic AI", "Product Strategy", "Research", "MBA"],
    accentColor: "#C9856A",
    roleDividerLabel: "+ added role",
  },
  {
    company: "Delphix",
    location: "Remote / Bangalore",
    overallPeriod: "Aug 2021 — June 2025",
    description:
      "The work kept expanding beyond the title. Drove product strategy for test data management solutions for Fortune 500 enterprise clients, spanning data virtualisation and compliance. In a deliberately flat organisation, the boundaries between engineering and product were porous by design — and I found myself drawn toward that intersection, again and again.",
    roles: [
      {
        title: "Senior Software Development Engineer 2",
        period: "May 2023 — June 2025",
        highlights: [
          "Rearchitected fragmented connector infrastructure into a unified modular platform — cut customer onboarding time by 20% and unlocked 8% revenue uplift",
          "Led Proof of Value pilots with enterprise pre-sales; translated client requirements into product roadmap decisions that drove new acquisitions",
          "Selected for CEO-initiated cross-functional team to redesign company-wide documentation architecture — reduced documentation-driven customer escalations",
          "Drove Git workflow migration across 4 engineering teams — freed 3 days of branch management overhead per release cycle",
        ],
      },
      {
        title: "Senior Software Development Engineer 1",
        period: "Aug 2021 — Apr 2023",
        highlights: [
          "Resolved TDM and compliance friction for clients across financial services, logistics, and healthcare — ~75% reduction in customer escalations",
          "Built the case for Agile adoption from scratch and secured VP sponsorship to scale Scrum across all 4 engineering teams",
          "Sustained 100% Net Revenue Retention across the full enterprise client base",
        ],
      },
    ],
    tags: ["Data Virtualisation", "TDM", "Compliance", "Product Strategy", "Agile", "Enterprise"],
    accentColor: "#C9856A",
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
          "Led technical architecture for microservices migration of a legacy alert monitoring platform; developed the alert ingestion service end to end — scaled capacity to 200K+ devices",
          "Built real-time alert ingestion that cut Mean Time to Detect from 5 minutes to seconds — 90% improvement in SLA performance",
          "Integrated monitoring with ServiceNow and PagerDuty; reduced Mean Time to Resolve from 3 days to 1 hour",
        ],
      },
      {
        title: "Software Development Engineer 1",
        period: "July 2018 — July 2019",
        highlights: [
          "Engineered an alert categorisation engine that cut noise by 85% (14M → 2M alerts) — let support teams focus on what actually mattered",
          "Built predictive tooling that automatically resolved recurring issues before alerts fired, shifting operations from reactive to proactive",
        ],
      },
      {
        title: "Software Development Engineer — Intern",
        period: "Jan 2018 — June 2018",
        dividerLabel: "→ campus hire",
        highlights: [
          "Built the MVP and redesigned the UI for the alert monitoring dashboard",
          "Wrote 3 alert data parsers; onboarded 12,000 compute resources to the monitoring platform",
        ],
      },
    ],
    tags: ["Infrastructure", "Python", "Distributed Systems", "Monitoring"],
    accentColor: "#C9856A",
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
        <div className="text-xs text-[#90788E] font-mono leading-relaxed">
          {entry.overallPeriod.split("—").map((part, i) => (
            <span key={i} className="block">{i === 0 ? part.trim() : `— ${part.trim()}`}</span>
          ))}
        </div>
        <div className="text-xs text-[#90788E] mt-1">{entry.location}</div>
      </div>

      {/* Timeline dot */}
      <div className="hidden lg:flex absolute left-[180px] top-1.5 -translate-x-1/2 flex-col items-center z-10">
        <div
          className="w-3 h-3 rounded-full border-2 border-[#150D14] transition-all duration-300 group-hover:scale-125"
          style={{
            backgroundColor: entry.accentColor,
            boxShadow: `0 0 12px ${entry.accentColor}60`,
          }}
        />
      </div>

      {/* Right — company card */}
      <div className="gradient-border rounded-2xl transition-all duration-300 overflow-hidden group-hover:brightness-110">
        {/* Company header */}
        <div className="px-6 pt-6 pb-4 border-b border-[rgba(201,133,106,0.12)]">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <h3
              className="text-lg font-bold"
              style={{ color: entry.accentColor }}
            >
              {entry.company}
            </h3>
            <span className="text-xs font-mono text-[#90788E] lg:hidden">{entry.overallPeriod}</span>
          </div>
          <p className="text-sm text-[#90788E] leading-relaxed mt-2">{entry.description}</p>
        </div>

        {/* Role timeline inside card */}
        <div className="px-6 py-4 space-y-0">
          {entry.roles.map((role, i) => (
            <div key={role.title}>
              {/* Promotion divider */}
              {i > 0 && (
                <div className="flex items-center gap-3 my-4">
                  <div className="flex-1 h-px bg-[rgba(201,133,106,0.12)]" />
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
                  <div className="flex-1 h-px bg-[rgba(201,133,106,0.12)]" />
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
                    <span className="text-sm font-semibold text-[#EDE5F0]">{role.title}</span>
                    <span className="text-xs font-mono text-[#90788E]">{role.period}</span>
                  </div>
                  {role.highlightGroups ? (
                    <div className="space-y-3">
                      {role.highlightGroups.map((group) => (
                        <div key={group.label}>
                          <span className="text-xs font-mono text-[#90788E] block mb-1">{group.label}</span>
                          <ul className="space-y-1.5">
                            {group.items.map((h) => (
                              <li key={h} className="flex items-start gap-2 text-xs text-[#90788E]">
                                <span
                                  className="mt-1.5 w-1 h-1 rounded-full shrink-0"
                                  style={{ backgroundColor: entry.accentColor, opacity: 0.6 }}
                                />
                                {h}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <ul className="space-y-1.5">
                      {role.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-2 text-xs text-[#90788E]">
                          <span
                            className="mt-1.5 w-1 h-1 rounded-full shrink-0"
                            style={{ backgroundColor: entry.accentColor, opacity: 0.6 }}
                          />
                          {h}
                        </li>
                      ))}
                    </ul>
                  )}
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
                backgroundColor: "rgba(201,133,106,0.1)",
                borderColor: "rgba(201,133,106,0.2)",
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
    <section id="experience" className="py-24 px-6 bg-[#180F17] border-t border-[rgba(201,133,106,0.07)]">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          ref={headerRef}
          variants={fadeUp}
          initial="hidden"
          animate={headerInView ? "show" : "hidden"}
          className="mb-16"
        >
          <span className="text-sm text-[#C9856A] font-mono tracking-wider uppercase block mb-4">
            02. Experience
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#EDE5F0]">
            Where the work happened
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical connecting line */}
          <div className="hidden lg:block absolute left-[180px] top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-[rgba(201,133,106,0.12)] to-transparent -translate-x-1/2" />

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
