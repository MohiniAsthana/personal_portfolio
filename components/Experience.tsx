"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

/* ─── Types ─────────────────────────────────────────────────────────────── */

interface Bullet { text: string }

interface FeaturedCardData {
  type: "featured";
  accent: "#C9856A" | "#D4A96A";
  secondary?: boolean;
  contextLine?: string;
  title: string;
  dates: string;
  bullets: string[];
}

interface CompactCardData {
  type: "compact";
  title: string;
  dates: string;
  note: string;
}

interface BadgeData {
  type: "badge";
  label: string;
}

interface TagRowData {
  type: "tags";
  tags: string[];
}

type CardItem = FeaturedCardData | CompactCardData | BadgeData | TagRowData;

interface Column {
  dot: "#D4A96A" | "#C9856A";
  dates: string;
  company: string;
  items: CardItem[];
}

/* ─── Data ───────────────────────────────────────────────────────────────── */

const columns: Column[] = [
  {
    dot: "#D4A96A",
    dates: "Jul 2025 — Present",
    company: "NTU · IBM Consulting",
    items: [
      {
        type: "featured",
        accent: "#D4A96A",
        title: "Client Lead & Solution Architect — Project PRISM",
        dates: "Jul 2025 — Jun 2026",
        bullets: [
          "Conceived and led 0-to-1 Agentic AI Digital Twin for commerce — multi-agent orchestration via LangGraph, Claude models, Pinecone memory layer",
          "Led product vision, agent architecture, business case, and APAC GTM strategy across a 5-member team",
        ],
      },
      { type: "badge", label: "+ concurrent role" },
      {
        type: "featured",
        accent: "#D4A96A",
        secondary: true,
        contextLine: "Division of Leadership, Management & Organisation · NBS",
        title: "Research Associate",
        dates: "Jan 2026 — Present",
        bullets: [
          "Statistical analysis and empirical research on AI-augmented decision-making and human-AI trust dynamics",
          "Contributing to manuscript preparation for journal submissions on prompt engineering efficacy and human-AI collaboration",
        ],
      },
      {
        type: "tags",
        tags: ["LangGraph", "Claude API", "Pinecone", "Human-AI Systems"],
      },
    ],
  },
  {
    dot: "#C9856A",
    dates: "Aug 2021 — Jun 2025",
    company: "Perforce Delphix",
    items: [
      {
        type: "featured",
        accent: "#C9856A",
        title: "Senior Software Development Engineer 2",
        dates: "May 2023 — Jun 2025",
        bullets: [
          "Rearchitected fragmented connector infrastructure into unified modular platform — cut customer onboarding 20%, unlocked 8% revenue uplift",
          "Led PoV pilots with enterprise pre-sales; translated client requirements into product roadmap decisions driving new acquisitions",
          "Drove Git workflow migration across 4 engineering teams — freed 3 days of branch management overhead per release cycle",
        ],
      },
      { type: "badge", label: "↑ promoted" },
      {
        type: "compact",
        title: "Senior Software Development Engineer 1",
        dates: "Aug 2021 — Apr 2023",
        note: "~75% escalation reduction across enterprise clients · 100% Net Revenue Retention · drove Agile adoption across 4 engineering teams",
      },
      {
        type: "tags",
        tags: ["PyArrow / PySpark", "Kubernetes", "Python", "Product Strategy"],
      },
    ],
  },
  {
    dot: "#D4A96A",
    dates: "Jan 2018 — Aug 2021",
    company: "Cisco",
    items: [
      {
        type: "featured",
        accent: "#D4A96A",
        title: "Software Development Engineer 2",
        dates: "Aug 2019 — Aug 2021",
        bullets: [
          "Led microservices migration; scaled alert ingestion platform to 200K+ devices end to end",
          "Cut Mean Time to Detect from 5 min → seconds — 90% SLA improvement",
          "Integrated ServiceNow and PagerDuty; reduced Mean Time to Resolve from 3 days to 1 hour",
        ],
      },
      { type: "badge", label: "↑ promoted" },
      {
        type: "compact",
        title: "Software Development Engineer 1",
        dates: "Jul 2018 — Jul 2019",
        note: "Built alert categorisation engine — cut noise 85% (14M → 2M alerts); predictive remediation tooling",
      },
      { type: "badge", label: "→ campus hire" },
      {
        type: "compact",
        title: "Software Development Engineer — Intern",
        dates: "Jan 2018 — Jun 2018",
        note: "Built MVP and redesigned UI for alert monitoring dashboard; onboarded 12,000 compute resources",
      },
      {
        type: "tags",
        tags: ["Python / Django", "RabbitMQ", "Redis", "D3.js"],
      },
    ],
  },
];

/* ─── Sub-components ─────────────────────────────────────────────────────── */

function BadgeConnector({ label }: { label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "6px", margin: "3px 0" }}>
      <div style={{ flex: 1, height: "0.5px", background: "rgba(201,133,106,0.12)" }} />
      <span style={{ fontSize: "10px", fontFamily: "monospace", color: "rgba(201,133,106,0.6)" }}>
        {label}
      </span>
      <div style={{ flex: 1, height: "0.5px", background: "rgba(201,133,106,0.12)" }} />
    </div>
  );
}

function TagRow({ tags }: { tags: string[] }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginTop: "4px" }}>
      {tags.map((tag) => (
        <span
          key={tag}
          style={{
            fontSize: "10px",
            padding: "2px 7px",
            borderRadius: "20px",
            background: "rgba(201,133,106,0.07)",
            color: "rgba(201,133,106,0.75)",
            border: "0.5px solid rgba(201,133,106,0.12)",
          }}
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

function FeaturedCard({ card, reducedMotion }: { card: FeaturedCardData; reducedMotion: boolean | null }) {
  const bg = card.secondary
    ? "linear-gradient(145deg, #241520, #190E18)"
    : "linear-gradient(145deg, #2A1728, #1C0F1A)";
  const accentLine = card.accent === "#D4A96A"
    ? "linear-gradient(90deg, #D4A96A, rgba(212,169,106,0.15) 70%, transparent 100%)"
    : "linear-gradient(90deg, #C9856A, rgba(201,133,106,0.15) 70%, transparent 100%)";

  return (
    <motion.div
      whileHover={reducedMotion ? undefined : {
        y: -3,
        boxShadow: "0 8px 28px rgba(0,0,0,0.3), 0 0 0 0.5px rgba(201,133,106,0.1)",
      }}
      transition={{ duration: 0.25, ease: "easeOut" as const }}
      style={{
        position: "relative",
        background: bg,
        border: "0.5px solid rgba(201,133,106,0.15)",
        borderRadius: "10px",
        padding: "12px 14px",
        marginBottom: "6px",
        overflow: "hidden",
        cursor: "default",
        transition: "border-color 0.25s ease",
      }}
      className="exp-card"
    >
      {/* Top accent bar */}
      <div
        style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: "2px",
          background: accentLine,
        }}
      />
      {card.contextLine && (
        <div style={{ fontSize: "10px", color: "#6B5868", fontStyle: "italic", marginBottom: "5px" }}>
          {card.contextLine}
        </div>
      )}
      <div style={{ fontSize: "12px", fontWeight: 600, color: "#EDE5F0", lineHeight: 1.3 }}>
        {card.title}
      </div>
      <div style={{ fontSize: "10px", color: "#D4A96A", fontFamily: "monospace", marginBottom: "8px", marginTop: "2px" }}>
        {card.dates}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {card.bullets.map((b) => (
          <div
            key={b}
            style={{
              fontSize: "11px",
              color: "#90788E",
              lineHeight: 1.5,
              paddingLeft: "10px",
              position: "relative",
              marginBottom: "4px",
            }}
          >
            <span style={{ position: "absolute", left: 0, color: "#C9856A" }}>·</span>
            {b}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function CompactCard({ card, reducedMotion }: { card: CompactCardData; reducedMotion: boolean | null }) {
  return (
    <motion.div
      whileHover={reducedMotion ? undefined : {
        y: -3,
        boxShadow: "0 8px 28px rgba(0,0,0,0.3), 0 0 0 0.5px rgba(201,133,106,0.1)",
      }}
      transition={{ duration: 0.25, ease: "easeOut" as const }}
      style={{
        position: "relative",
        background: "rgba(201,133,106,0.03)",
        border: "0.5px solid rgba(201,133,106,0.08)",
        borderRadius: "8px",
        padding: "9px 11px",
        marginBottom: "6px",
        overflow: "hidden",
        cursor: "default",
        transition: "border-color 0.25s ease",
      }}
      className="exp-card"
    >
      {/* Top accent bar */}
      <div
        style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: "1px",
          background: "linear-gradient(90deg, rgba(201,133,106,0.15), transparent)",
        }}
      />
      <div style={{ fontSize: "11px", fontWeight: 500, color: "#BFB0BC" }}>{card.title}</div>
      <div style={{ fontSize: "10px", color: "#90788E", fontFamily: "monospace", marginBottom: "4px" }}>
        {card.dates}
      </div>
      <div style={{ fontSize: "10px", color: "#6B5868", lineHeight: 1.4 }}>{card.note}</div>
    </motion.div>
  );
}

/* ─── Main component ─────────────────────────────────────────────────────── */

export default function Experience() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });
  const timelineRef = useRef(null);
  const timelineInView = useInView(timelineRef, { once: true, margin: "-60px" });
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="experience"
      className="py-24 px-6 bg-[#180F17] section-glow-even border-t border-[rgba(201,133,106,0.07)]"
    >
      <div className="max-w-6xl mx-auto">

        {/* ── Section header ── */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-14"
        >
          <span
            className="text-sm font-mono tracking-wider uppercase block mb-4"
            style={{ color: "#D4A96A" }}
          >
            02. Experience
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#EDE5F0] mb-3">
            Where the work happened
          </h2>
          <p className="text-sm text-[#90788E]">
            Three companies. Seven years of building before leading.
          </p>
        </motion.div>

        {/* ── Horizontal timeline + columns ── */}
        <motion.div
          ref={timelineRef}
          initial={{ opacity: 0 }}
          animate={timelineInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {/* Timeline row — hidden on mobile */}
          <div className="hidden md:block mb-8">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                position: "relative",
              }}
            >
              {/* The line itself */}
              <div
                style={{
                  position: "absolute",
                  top: "calc(50% + 2px)",
                  left: "16.67%",
                  right: "16.67%",
                  height: "1px",
                  background:
                    "linear-gradient(90deg, rgba(201,133,106,0.15), rgba(201,133,106,0.5) 20%, rgba(201,133,106,0.5) 80%, rgba(201,133,106,0.15))",
                  zIndex: 0,
                }}
              />

              {/* Per-column dot + labels */}
              {columns.map((col) => (
                <div
                  key={col.company}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    position: "relative",
                    zIndex: 1,
                    gap: "6px",
                  }}
                >
                  {/* Dates above */}
                  <div style={{ fontSize: "10px", color: "#D4A96A", fontFamily: "monospace" }}>
                    {col.dates}
                  </div>
                  {/* Dot on the line */}
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      backgroundColor: col.dot,
                      border: "2px solid #180F17",
                      boxShadow: `0 0 0 1px ${col.dot}`,
                    }}
                  />
                  {/* Company name below */}
                  <div
                    style={{
                      fontSize: "11px",
                      fontWeight: 600,
                      color: "#C9856A",
                      letterSpacing: "0.03em",
                    }}
                  >
                    {col.company}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Three columns */}
          <div className="grid md:grid-cols-3 gap-5">
            {columns.map((col, colIdx) => (
              <motion.div
                key={col.company}
                initial={{ opacity: 0, y: 24 }}
                animate={timelineInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, ease: "easeOut", delay: colIdx * 0.1 }}
                style={{ display: "flex", flexDirection: "column" }}
              >
                {/* Mobile-only column header */}
                <div className="flex md:hidden items-center gap-3 mb-4">
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      backgroundColor: col.dot,
                      border: "2px solid #180F17",
                      boxShadow: `0 0 0 1px ${col.dot}`,
                      flexShrink: 0,
                    }}
                  />
                  <div>
                    <div style={{ fontSize: "11px", fontWeight: 600, color: "#C9856A", letterSpacing: "0.03em" }}>
                      {col.company}
                    </div>
                    <div style={{ fontSize: "10px", color: "#D4A96A", fontFamily: "monospace" }}>
                      {col.dates}
                    </div>
                  </div>
                </div>

                {/* Cards */}
                {col.items.map((item, itemIdx) => {
                  if (item.type === "featured") {
                    return (
                      <FeaturedCard
                        key={item.title}
                        card={item}
                        reducedMotion={reducedMotion}
                      />
                    );
                  }
                  if (item.type === "compact") {
                    return (
                      <CompactCard
                        key={item.title}
                        card={item}
                        reducedMotion={reducedMotion}
                      />
                    );
                  }
                  if (item.type === "badge") {
                    return <BadgeConnector key={`badge-${itemIdx}`} label={item.label} />;
                  }
                  if (item.type === "tags") {
                    return <TagRow key="tags" tags={item.tags} />;
                  }
                  return null;
                })}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
