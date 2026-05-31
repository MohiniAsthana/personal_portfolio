"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

/* ─── Types ─────────────────────────────────────────────────────────────── */

interface CardData {
  type: "card";
  tier: 1 | 2 | 3;
  /** NTU column cards get champagne-gold top accent instead of rose-gold */
  ntuAccent?: boolean;
  /** Research Associate gets a slightly darker Tier-1 background */
  secondary?: boolean;
  contextLine?: string;
  title: string;
  dates: string;
  bullets: string[];
}

interface BadgeData {
  type: "badge";
  label: string;
}

interface TagRowData {
  type: "tags";
  tags: string[];
}

type CardItem = CardData | BadgeData | TagRowData;

interface Column {
  dot: "#D4A96A" | "#C9856A";
  dates: string;
  company: string;
  items: CardItem[];
}

/* ─── Data ───────────────────────────────────────────────────────────────── */

const columns: Column[] = [
  /* ── Column 1 — NTU · IBM Consulting ── */
  {
    dot: "#D4A96A",
    dates: "Jul 2025 — Present",
    company: "NTU · IBM Consulting",
    items: [
      {
        type: "card",
        tier: 1,
        ntuAccent: true,
        title: "Client Lead & Solution Architect — Project PRISM",
        dates: "Nov 2025 — May 2026",
        bullets: [
          "Conceived and led 0-to-1 Agentic AI Digital Twin for commerce — multi-agent orchestration via LangGraph, Claude models, Pinecone memory layer",
          "Led product vision, agent architecture, business case, and APAC GTM strategy across a 5-member team",
          "Designed credential-token authentication modeled on Plaid; implemented 4 checkout modes including Stripe Issuing virtual cards for agent-initiated transactions",
        ],
      },
      { type: "badge", label: "+ concurrent role" },
      {
        type: "card",
        tier: 1,
        ntuAccent: true,
        secondary: true,
        contextLine: "Division of Leadership, Management & Organisation · NBS",
        title: "Research Associate",
        dates: "Jan 2026 — Present",
        bullets: [
          "Statistical analysis and empirical research on AI-augmented decision-making and human-AI trust dynamics",
          "Contributing to manuscript preparation for journal submissions on prompt engineering efficacy and human-AI collaboration",
          "Research topics span AI hallucination detection, role-biased agent design for critical thinking, and empathy and cross-cultural competency development — examining AI's impact on human capability in management education",
        ],
      },
      { type: "tags", tags: ["LangGraph", "Claude API", "Pinecone", "Human-AI Systems"] },
    ],
  },

  /* ── Column 2 — Perforce Delphix ── */
  {
    dot: "#C9856A",
    dates: "Aug 2021 — Jun 2025",
    company: "Perforce Delphix",
    items: [
      {
        type: "card",
        tier: 1,
        title: "Senior Software Development Engineer 2",
        dates: "May 2023 — Jun 2025",
        bullets: [
          "Rearchitected fragmented connector infrastructure into unified modular platform — cut customer onboarding 20%, unlocked 8% revenue uplift",
          "Led PoV pilots with enterprise pre-sales; translated client requirements into product roadmap decisions driving new acquisitions",
          "Drove Git workflow migration across 4 engineering teams — freed 3 days of branch management overhead per release cycle",
          "Reduced documentation-driven customer escalations by redesigning company-wide documentation architecture",
        ],
      },
      { type: "badge", label: "↑ promoted" },
      {
        type: "card",
        tier: 2,
        title: "Senior Software Development Engineer 1",
        dates: "Aug 2021 — Apr 2023",
        bullets: [
          "Resolved TDM and compliance friction for enterprise clients across financial services, logistics, and healthcare — ~75% reduction in escalations",
          "Secured VP sponsorship to drive Agile adoption across 4 engineering teams; sustained 100% Net Revenue Retention through the transition",
        ],
      },
      { type: "tags", tags: ["PyArrow / PySpark", "Kubernetes", "Python", "Product Strategy"] },
    ],
  },

  /* ── Column 3 — Cisco ── */
  {
    dot: "#D4A96A",
    dates: "Jan 2018 — Aug 2021",
    company: "Cisco",
    items: [
      {
        type: "card",
        tier: 1,
        ntuAccent: true,
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
        type: "card",
        tier: 2,
        title: "Software Development Engineer 1",
        dates: "Jul 2018 — Jul 2019",
        bullets: [
          "Built alert categorisation engine — cut noise 85% (14M → 2M alerts)",
          "Built predictive remediation tooling that automatically resolved recurring issues before alerts fired — shifted operations from reactive to proactive",
        ],
      },
      { type: "badge", label: "→ campus hire" },
      {
        type: "card",
        tier: 3,
        title: "Software Development Engineer — Intern",
        dates: "Jan 2018 — Jun 2018",
        bullets: [
          "Built MVP and redesigned UI for alert monitoring dashboard; onboarded 12,000 compute resources",
        ],
      },
      { type: "tags", tags: ["Python / Django", "RabbitMQ", "Redis", "D3.js"] },
    ],
  },
];

/* ─── Tier style maps ────────────────────────────────────────────────────── */

const tierStyles = {
  1: {
    background: (secondary?: boolean) =>
      secondary
        ? "linear-gradient(145deg, #241520, #190E18)"
        : "linear-gradient(145deg, #2A1728, #1C0F1A)",
    border: "0.5px solid rgba(201,133,106,0.15)",
    borderRadius: "10px",
    padding: "13px 15px",
    accentHeight: "2px",
    accent: (ntu?: boolean) =>
      ntu
        ? "linear-gradient(90deg, #D4A96A, rgba(212,169,106,0.15) 70%, transparent 100%)"
        : "linear-gradient(90deg, #C9856A, rgba(201,133,106,0.15) 70%, transparent 100%)",
    titleSize: "14px",
    titleWeight: 600,
    titleColor: "#EDE5F0",
    datesSize: "11px",
    datesColor: "#D4A96A",
    bulletSize: "12px",
    bulletColor: "#90788E",
    bulletDot: "#C9856A",
  },
  2: {
    background: () => "linear-gradient(145deg, #130810, #0D060C)",
    border: "0.5px solid rgba(201,133,106,0.06)",
    borderRadius: "10px",
    padding: "13px 15px",
    accentHeight: "1px",
    accent: () =>
      "linear-gradient(90deg, rgba(201,133,106,0.28), transparent 45%)",
    titleSize: "13px",
    titleWeight: 600,
    titleColor: "#7A6A76",
    datesSize: "11px",
    datesColor: "#6A5448",
    bulletSize: "12px",
    bulletColor: "#4A3848",
    bulletDot: "rgba(201,133,106,0.25)",
  },
  3: {
    background: () => "rgba(201,133,106,0.015)",
    border: "0.5px solid rgba(201,133,106,0.04)",
    borderRadius: "8px",
    padding: "10px 12px",
    accentHeight: "1px",
    accent: () =>
      "linear-gradient(90deg, rgba(201,133,106,0.1), transparent 40%)",
    titleSize: "13px",
    titleWeight: 500,
    titleColor: "#5A4A56",
    datesSize: "11px",
    datesColor: "#4A3A38",
    bulletSize: "11px",
    bulletColor: "#3A2A36",
    bulletDot: "rgba(201,133,106,0.15)",
  },
} as const;

/* ─── Sub-components ─────────────────────────────────────────────────────── */

function BadgeConnector({ label }: { label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "6px", margin: "3px 0" }}>
      <div style={{ flex: 1, height: "0.5px", background: "rgba(201,133,106,0.12)" }} />
      <span style={{ fontSize: "11px", fontFamily: "monospace", color: "rgba(201,133,106,0.6)" }}>
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
            fontSize: "11px",
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

function Card({ card, reducedMotion }: { card: CardData; reducedMotion: boolean | null }) {
  const s = tierStyles[card.tier];

  return (
    <motion.div
      whileHover={reducedMotion ? undefined : {
        scale: 1.025,
        zIndex: 10,
        borderColor: "rgba(201,133,106,0.28)",
        boxShadow: "0 8px 28px rgba(0,0,0,0.3), 0 0 0 0.5px rgba(201,133,106,0.1)",
      }}
      transition={{ duration: 0.25, ease: "easeOut" as const }}
      style={{
        position: "relative",
        zIndex: 1,
        background: s.background(card.secondary),
        border: s.border,
        borderRadius: s.borderRadius,
        padding: s.padding,
        marginBottom: "6px",
        overflow: "hidden",
        cursor: "default",
        transition: "transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease",
      }}
    >
      {/* Top accent bar */}
      <div
        style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: s.accentHeight,
          background: s.accent(card.ntuAccent),
        }}
      />

      {/* Context line */}
      {card.contextLine && (
        <div style={{
          fontSize: "11px",
          color: "#6B5868",
          fontStyle: "italic",
          marginBottom: "5px",
        }}>
          {card.contextLine}
        </div>
      )}

      {/* Title */}
      <div style={{
        fontSize: s.titleSize,
        fontWeight: s.titleWeight,
        color: s.titleColor,
        lineHeight: 1.3,
      }}>
        {card.title}
      </div>

      {/* Dates */}
      <div style={{
        fontSize: s.datesSize,
        color: s.datesColor,
        fontFamily: "monospace",
        marginBottom: "8px",
        marginTop: "2px",
      }}>
        {card.dates}
      </div>

      {/* Bullets */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        {card.bullets.map((b) => (
          <div
            key={b}
            style={{
              fontSize: s.bulletSize,
              color: s.bulletColor,
              lineHeight: card.tier === 3 ? 1.4 : 1.5,
              paddingLeft: "10px",
              position: "relative",
              marginBottom: "4px",
            }}
          >
            <span style={{ position: "absolute", left: 0, color: s.bulletDot }}>·</span>
            {b}
          </div>
        ))}
      </div>
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
          transition={{ duration: 0.6, ease: "easeOut" as const }}
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
            Seven years of building before leading.
          </p>
        </motion.div>

        {/* ── Horizontal timeline + columns ── */}
        <motion.div
          ref={timelineRef}
          initial={{ opacity: 0 }}
          animate={timelineInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" as const }}
        >
          {/* Timeline row — hidden on mobile */}
          <div className="hidden md:block mb-8">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", position: "relative" }}>
              {/* Horizontal line — vertically centred on the dot row (height 16px) */}
              <div
                style={{
                  position: "absolute",
                  /* dates row ~18px + gap 6px = 24px from top; dot row is 16px tall, centre at 24 + 8 = 32px */
                  top: "32px",
                  left: "16.67%",
                  right: "16.67%",
                  height: "1px",
                  background:
                    "linear-gradient(90deg, rgba(201,133,106,0.15), rgba(201,133,106,0.5) 20%, rgba(201,133,106,0.5) 80%, rgba(201,133,106,0.15))",
                  zIndex: 0,
                }}
              />
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
                  {/* Dates — normal flow */}
                  <div style={{ fontSize: "11px", color: "#D4A96A", fontFamily: "monospace" }}>
                    {col.dates}
                  </div>
                  {/* Dot wrapper — fixed height so line top value is predictable */}
                  <div style={{ position: "relative", width: "16px", height: "16px" }}>
                    <div
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        backgroundColor: col.dot,
                        border: "2px solid #180F17",
                        boxShadow: `0 0 0 1px ${col.dot}`,
                      }}
                    />
                  </div>
                  {/* Company name — normal flow */}
                  <div style={{ fontSize: "12px", fontWeight: 600, color: "#C9856A", letterSpacing: "0.03em" }}>
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
                transition={{ duration: 0.55, ease: "easeOut" as const, delay: colIdx * 0.1 }}
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
                    <div style={{ fontSize: "12px", fontWeight: 600, color: "#C9856A", letterSpacing: "0.03em" }}>
                      {col.company}
                    </div>
                    <div style={{ fontSize: "11px", color: "#D4A96A", fontFamily: "monospace" }}>
                      {col.dates}
                    </div>
                  </div>
                </div>

                {/* Cards */}
                {col.items.map((item, itemIdx) => {
                  if (item.type === "card") {
                    return (
                      <Card key={item.title} card={item} reducedMotion={reducedMotion} />
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
