"use client";

import React, { useRef, useState, useCallback } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════════════════
   BOLD HELPERS  — explicit colors, never inherit accent
═══════════════════════════════════════════════════════════════════════════ */

const B1 = ({ children }: { children: React.ReactNode }) => (
  <strong style={{ fontWeight: 600, color: "#EDE5F0" }}>{children}</strong>
);

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN CARD DATA  (summary view — 2 bullets + italic summary per card)
═══════════════════════════════════════════════════════════════════════════ */

interface MainCardData {
  company: string;
  dot: "#D4A96A" | "#C9856A";
  champagne: boolean;          // top accent colour
  title: string;
  dates: string;
  summary: string;
  bullets: [React.ReactNode, React.ReactNode];
}

const mainCards: MainCardData[] = [
  {
    company: "NTU · IBM Consulting",
    dot: "#D4A96A",
    champagne: true,
    title: "Client Lead & Solution Architect — Project PRISM",
    dates: "Nov 2025 — May 2026",
    summary:
      "Led the product vision and architecture of an Agentic AI commerce platform from zero to deployment with IBM Consulting — while concurrently serving as a paid Research Associate studying human-AI decision-making and trust at NBS.",
    bullets: [
      <>Built <B1>0-to-1 Agentic AI Digital Twin</B1> via <B1>LangGraph, Claude models, Pinecone</B1></>,
      <>Owned <B1>agent architecture, business case, and APAC GTM strategy</B1> across a 5-member team</>,
    ],
  },
  {
    company: "Perforce Delphix",
    dot: "#C9856A",
    champagne: false,
    title: "Senior Software Development Engineer 2",
    dates: "May 2023 — Jun 2025",
    summary:
      "Grew from building connectors to shaping product direction — bridging engineering depth with enterprise client strategy across financial services, healthcare, and logistics.",
    bullets: [
      <>Rearchitected connector platform — <B1>cut onboarding 20%</B1>, unlocked <B1>8% revenue uplift</B1></>,
      <>Led PoV pilots; turned client requirements into <B1>product roadmap decisions</B1></>,
    ],
  },
  {
    company: "Cisco",
    dot: "#D4A96A",
    champagne: true,
    title: "Software Development Engineer 2",
    dates: "Aug 2019 — Aug 2021",
    summary:
      "Joined as a campus hire and built the infrastructure monitoring platform that served Cisco's global operations — from the MVP up through a full microservices migration.",
    bullets: [
      <>Scaled alert ingestion to <B1>200K+ devices</B1> end to end</>,
      <>Cut MTTD from <B1>5 min → seconds — 90% SLA improvement</B1></>,
    ],
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   DETAIL PANEL DATA  (full history — tiered role cards)
═══════════════════════════════════════════════════════════════════════════ */

interface DetailRole {
  tier: 1 | 2 | 3;
  champagneAccent?: boolean;
  altBg?: boolean;
  contextLine?: string;
  title: string;
  dates: string;
  bullets: React.ReactNode[];
}

interface DetailPanelData {
  header: string;
  roles: Array<DetailRole | { badge: string }>;
  tags: string[];
}

const detailPanels: DetailPanelData[] = [
  /* ── NTU · IBM Consulting ── */
  {
    header: "NTU · IBM Consulting — Full History",
    roles: [
      {
        tier: 1,
        champagneAccent: true,
        title: "Client Lead & Solution Architect — Project PRISM",
        dates: "Nov 2025 — May 2026",
        bullets: [
          <>Conceived and led <B1>0-to-1 Agentic AI Digital Twin</B1> for commerce — <B1>LangGraph, Claude models, Pinecone</B1> memory layer</>,
          <>Led <B1>agent architecture, business case, and APAC GTM strategy</B1> across a 5-member team</>,
          <>Designed credential-token auth modeled on Plaid; implemented <B1>4 checkout modes</B1> including <B1>Stripe Issuing</B1> virtual cards</>,
        ],
      },
      { badge: "+ concurrent role" },
      {
        tier: 1,
        champagneAccent: true,
        altBg: true,
        contextLine: "Division of Leadership, Management & Organisation · NBS",
        title: "Research Associate",
        dates: "Jan 2026 — Present",
        bullets: [
          <>Statistical analysis and empirical research on <B1>AI-augmented decision-making</B1> and human-AI trust dynamics</>,
          "Contributing to manuscript preparation for journal submissions on prompt engineering efficacy and human-AI collaboration",
          "Research topics span AI hallucination detection, role-biased agent design for critical thinking, and empathy and cross-cultural competency development — examining AI's impact on human capability in management education",
        ],
      },
    ],
    tags: ["LangGraph", "Claude API", "Pinecone", "Human-AI Systems"],
  },

  /* ── Perforce Delphix ── */
  {
    header: "Perforce Delphix — Full History",
    roles: [
      {
        tier: 1,
        champagneAccent: false,
        title: "Senior Software Development Engineer 2",
        dates: "May 2023 — Jun 2025",
        bullets: [
          <>Rearchitected fragmented connector infrastructure into unified modular platform — <B1>cut onboarding 20%</B1>, unlocked <B1>8% revenue uplift</B1></>,
          <>Led PoV pilots with enterprise pre-sales; translated requirements into <B1>product roadmap decisions</B1> driving new acquisitions</>,
          <>Drove Git workflow migration across <B1>4 engineering teams</B1> — freed <B1>3 days</B1> of branch management overhead per release cycle</>,
          "Reduced documentation-driven customer escalations by redesigning company-wide documentation architecture",
        ],
      },
      { badge: "↑ promoted" },
      {
        tier: 2,
        title: "Senior Software Development Engineer 1",
        dates: "Aug 2021 — Apr 2023",
        bullets: [
          <>Resolved TDM and compliance friction across financial services, logistics, and healthcare — <B1>~75% reduction in escalations</B1></>,
          <>Secured VP sponsorship to drive <B1>Agile adoption across 4 engineering teams</B1>; sustained <B1>100% Net Revenue Retention</B1></>,
        ],
      },
    ],
    tags: ["PyArrow / PySpark", "Kubernetes", "Python", "Product Strategy"],
  },

  /* ── Cisco ── */
  {
    header: "Cisco — Full History",
    roles: [
      {
        tier: 1,
        champagneAccent: true,
        title: "Software Development Engineer 2",
        dates: "Aug 2019 — Aug 2021",
        bullets: [
          <>Led microservices migration; scaled alert ingestion platform to <B1>200K+ devices</B1> end to end</>,
          <>Cut Mean Time to Detect from <B1>5 min → seconds — 90% SLA improvement</B1></>,
          <>Integrated ServiceNow and PagerDuty; reduced MTTR from <B1>3 days to 1 hour</B1></>,
        ],
      },
      { badge: "↑ promoted" },
      {
        tier: 2,
        title: "Software Development Engineer 1",
        dates: "Jul 2018 — Jul 2019",
        bullets: [
          <>Built alert categorisation engine — cut noise <B1>85% (14M → 2M alerts)</B1></>,
          <>Built predictive remediation tooling; shifted operations from <B1>reactive to proactive</B1></>,
        ],
      },
      { badge: "→ campus hire" },
      {
        tier: 3,
        title: "Software Development Engineer — Intern",
        dates: "Jan 2018 — Jun 2018",
        bullets: [
          "Built MVP and redesigned UI for alert monitoring dashboard; onboarded 12,000 compute resources",
        ],
      },
    ],
    tags: ["Python / Django", "RabbitMQ", "Redis", "D3.js"],
  },
];

/* column timeline config (dot + dates + company) */
const timelineCols = mainCards.map((c) => ({
  dot: c.dot,
  dates: c.dates,
  company: c.company,
}));

/* ═══════════════════════════════════════════════════════════════════════════
   SHARED SUB-COMPONENTS
═══════════════════════════════════════════════════════════════════════════ */

function BadgeConnector({ label, prominent }: { label: string; prominent?: boolean }) {
  const lineC = prominent ? "rgba(201,133,106,0.2)" : "rgba(201,133,106,0.1)";
  const textC = prominent ? "rgba(201,133,106,0.7)" : "rgba(201,133,106,0.5)";
  const bg    = prominent ? "#150D14" : "transparent";
  const pad   = prominent ? "0 10px" : undefined;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "6px", margin: "6px 0" }}>
      <div style={{ flex: 1, height: "0.5px", background: lineC }} />
      <span style={{ fontSize: "10px", fontFamily: "monospace", color: textC, background: bg, padding: pad }}>
        {label}
      </span>
      <div style={{ flex: 1, height: "0.5px", background: lineC }} />
    </div>
  );
}

function TagRow({ tags, small }: { tags: string[]; small?: boolean }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginTop: "10px" }}>
      {tags.map((t) => (
        <span key={t} style={{
          fontSize: small ? "10px" : "11px",
          padding: "2px 7px",
          borderRadius: "20px",
          background: "rgba(201,133,106,0.07)",
          color: "rgba(201,133,106,0.7)",
          border: "0.5px solid rgba(201,133,106,0.12)",
        }}>{t}</span>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   DETAIL CARD (inside expanded panel)
═══════════════════════════════════════════════════════════════════════════ */

/* Shared text values — identical across all tiers */
const SHARED_TEXT = {
  titleColor:  "#EDE5F0",
  titleSize:   "12px",
  titleWeight: 600,
  datesColor:  "#D4A96A",
  bulletColor: "#90788E",
  bulletDot:   "#C9856A",
  bulletSize:  "11px",
  lineHeight:  1.4,
} as const;

const detailTierStyles = {
  1: {
    ...SHARED_TEXT,
    bg:      (alt?: boolean) => alt
               ? "linear-gradient(145deg, #241520, #190E18)"
               : "linear-gradient(145deg, #2A1728, #1C0F1A)",
    border:  "0.5px solid rgba(201,133,106,0.15)",
    accentH: "1.5px",
    accent:  (champ?: boolean) => champ
               ? "linear-gradient(90deg, #D4A96A, transparent 60%)"
               : "linear-gradient(90deg, #C9856A, transparent 60%)",
  },
  2: {
    ...SHARED_TEXT,
    bg:      () => "linear-gradient(145deg, #1E1020, #150C15)",
    border:  "0.5px solid rgba(201,133,106,0.09)",
    accentH: "1px",
    accent:  () => "linear-gradient(90deg, rgba(201,133,106,0.4), transparent 50%)",
  },
  3: {
    ...SHARED_TEXT,
    bg:      () => "linear-gradient(145deg, #190E18, #130A12)",
    border:  "0.5px solid rgba(201,133,106,0.07)",
    accentH: "1px",
    accent:  () => "linear-gradient(90deg, rgba(201,133,106,0.2), transparent 50%)",
  },
} as const;

function DetailCard({ role }: { role: DetailRole }) {
  const s = detailTierStyles[role.tier];
  return (
    <div style={{
      position: "relative",
      background: s.bg(role.altBg),
      border: s.border,
      borderRadius: "9px",
      padding: "11px 13px",
      overflow: "hidden",
    }}>
      {/* top accent */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0,
        height: s.accentH,
        background: s.accent(role.champagneAccent),
      }} />
      {/* context line */}
      {role.contextLine && (
        <div style={{ fontSize: "10px", color: "#D4A96A", fontStyle: "italic", marginBottom: "4px" }}>
          {role.contextLine}
        </div>
      )}
      <div style={{ fontSize: s.titleSize, fontWeight: s.titleWeight, color: s.titleColor, lineHeight: 1.3 }}>
        {role.title}
      </div>
      <div style={{ fontSize: "10px", color: s.datesColor, fontFamily: "monospace", marginBottom: "7px", marginTop: "2px" }}>
        {role.dates}
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {role.bullets.map((b, i) => (
          <div key={i} style={{
            fontSize: s.bulletSize,
            color: s.bulletColor,
            lineHeight: s.lineHeight,
            paddingLeft: "10px",
            position: "relative",
            marginBottom: "4px",
          }}>
            <span style={{ position: "absolute", left: 0, color: s.bulletDot }}>·</span>
            {b}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   DETAIL PANEL WRAPPER
═══════════════════════════════════════════════════════════════════════════ */

function DetailPanel({
  panel,
  open,
  onClose,
  reducedMotion,
}: {
  panel: DetailPanelData;
  open: boolean;
  onClose: () => void;
  reducedMotion: boolean | null;
}) {
  const transition = reducedMotion
    ? "none"
    : "max-height 0.45s cubic-bezier(0.4,0,0.2,1), opacity 0.35s ease, margin-top 0.35s ease";

  return (
    <div style={{
      maxHeight: open ? "1000px" : "0",
      overflow: "hidden",
      opacity: open ? 1 : 0,
      marginTop: open ? "10px" : "0",
      transition,
    }}>
      {/* inner container */}
      <div style={{
        position: "relative",
        background: "linear-gradient(145deg, #1E0E1C, #170C16)",
        border: "0.5px solid rgba(201,133,106,0.2)",
        borderRadius: "12px",
        padding: "16px",
        overflow: "hidden",
      }}>
        {/* top accent */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0,
          height: "2px",
          background: "linear-gradient(90deg, #D4A96A 0%, rgba(212,169,106,0.2) 40%, transparent 70%)",
        }} />

        {/* header row */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "14px" }}>
          <span style={{ fontSize: "10px", color: "#D4A96A", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 500 }}>
            {panel.header}
          </span>
          <button
            onClick={onClose}
            style={{
              fontSize: "10px",
              color: "rgba(201,133,106,0.6)",
              padding: "3px 9px",
              border: "0.5px solid rgba(201,133,106,0.2)",
              borderRadius: "4px",
              cursor: "pointer",
              background: "transparent",
              flexShrink: 0,
              marginLeft: "12px",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = "#C9856A";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(201,133,106,0.4)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = "rgba(201,133,106,0.6)";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(201,133,106,0.2)";
            }}
          >
            ✕ Close
          </button>
        </div>

        {/* roles */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {panel.roles.map((r, i) => {
            if ("badge" in r) {
              return <BadgeConnector key={i} label={r.badge} prominent={r.badge === "+ concurrent role"} />;
            }
            return <DetailCard key={i} role={r} />;
          })}
        </div>

        <TagRow tags={panel.tags} small />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN CARD (clickable summary)
═══════════════════════════════════════════════════════════════════════════ */

function MainCard({
  card,
  active,
  onClick,
  reducedMotion,
}: {
  card: MainCardData;
  active: boolean;
  onClick: () => void;
  reducedMotion: boolean | null;
}) {
  const accentBar = card.champagne
    ? "linear-gradient(90deg, #D4A96A, rgba(212,169,106,0.1) 70%, transparent)"
    : "linear-gradient(90deg, #C9856A, rgba(201,133,106,0.1) 70%, transparent)";

  const activeBorder = "rgba(201,133,106,0.45)";
  const defaultBorder = "rgba(201,133,106,0.15)";

  return (
    <motion.div
      onClick={onClick}
      whileHover={(!active && !reducedMotion) ? { y: -2 } : undefined}
      transition={{ duration: 0.2, ease: "easeOut" as const }}
      style={{
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(145deg, #2A1728, #1C0F1A)",
        border: `0.5px solid ${active ? activeBorder : defaultBorder}`,
        borderRadius: "10px",
        padding: "16px 18px 14px",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        boxShadow: active
          ? "0 0 0 1px rgba(201,133,106,0.2), 0 8px 28px rgba(0,0,0,0.4), 0 0 20px rgba(201,133,106,0.08)"
          : "none",
        transition: "border-color 0.3s, box-shadow 0.3s",
      }}
    >
      {/* top accent */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0,
        height: "2px",
        background: accentBar,
      }} />

      {/* role title */}
      <div style={{ fontSize: "13px", fontWeight: 600, color: "#EDE5F0", lineHeight: 1.3, marginBottom: "2px" }}>
        {card.title}
      </div>

      {/* dates */}
      <div style={{ fontSize: "10px", color: "#D4A96A", fontFamily: "monospace", marginBottom: "10px" }}>
        {card.dates}
      </div>

      {/* summary */}
      <div style={{
        fontSize: "11px",
        color: "#C9A898",
        fontStyle: "italic",
        lineHeight: 1.6,
        marginBottom: "10px",
        paddingBottom: "10px",
        borderBottom: "0.5px solid rgba(201,133,106,0.1)",
      }}>
        {card.summary}
      </div>

      {/* bullets */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0px" }}>
        {card.bullets.map((b, i) => (
          <div key={i} style={{
            fontSize: "11px",
            color: "#90788E",
            lineHeight: 1.4,
            paddingLeft: "10px",
            position: "relative",
            marginBottom: "5px",
          }}>
            <span style={{ position: "absolute", left: 0, color: "#C9856A" }}>·</span>
            {b}
          </div>
        ))}
      </div>

      {/* CTA row */}
      <div style={{
        marginTop: "auto",
        paddingTop: "10px",
        borderTop: "0.5px solid rgba(201,133,106,0.1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <span style={{
          fontSize: "9px",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          fontWeight: 500,
          color: active ? "#C9856A" : "rgba(201,133,106,0.65)",
          transition: "color 0.2s",
        }}>
          {active ? "Close detail" : "Explore full history"}
        </span>
        <span style={{
          fontSize: "13px",
          color: "#C9856A",
          display: "inline-block",
          transition: reducedMotion ? "none" : "transform 0.3s ease",
          transform: active ? "rotate(90deg)" : "rotate(0deg)",
        }}>
          →
        </span>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN EXPERIENCE COMPONENT
═══════════════════════════════════════════════════════════════════════════ */

export default function Experience() {
  const headerRef      = useRef(null);
  const headerInView   = useInView(headerRef,   { once: true, margin: "-80px" });
  const timelineRef    = useRef(null);
  const timelineInView = useInView(timelineRef, { once: true, margin: "-60px" });
  const reducedMotion  = useReducedMotion();

  const [activePanel, setActivePanel] = useState<number | null>(null);

  const handleCardClick = useCallback((idx: number) => {
    if (activePanel === idx) {
      // same card → close
      setActivePanel(null);
    } else if (activePanel !== null) {
      // different card open → close first, then open after 50ms
      setActivePanel(null);
      setTimeout(() => setActivePanel(idx), 50);
    } else {
      setActivePanel(idx);
    }
  }, [activePanel]);

  const handleClose = useCallback((idx: number) => {
    if (activePanel === idx) setActivePanel(null);
  }, [activePanel]);

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
          <span className="text-sm font-mono tracking-wider uppercase block mb-4" style={{ color: "#D4A96A" }}>
            02. Experience
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#EDE5F0] mb-3">
            Where the work happened
          </h2>
          <p className="text-sm text-[#90788E]">
            Seven years of building before leading.
          </p>
        </motion.div>

        {/* ── Horizontal timeline — hidden on mobile ── */}
        <motion.div
          ref={timelineRef}
          initial={{ opacity: 0 }}
          animate={timelineInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" as const }}
        >
          <div className="hidden md:block mb-8">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", position: "relative" }}>
              {/* horizontal line */}
              <div style={{
                position: "absolute",
                top: "32px",
                left: "16.67%", right: "16.67%",
                height: "1px",
                background: "linear-gradient(90deg, rgba(201,133,106,0.15), rgba(201,133,106,0.5) 20%, rgba(201,133,106,0.5) 80%, rgba(201,133,106,0.15))",
                zIndex: 0,
              }} />

              {timelineCols.map((col, idx) => {
                const glowing = activePanel === idx;
                return (
                  <div key={col.company} style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative", zIndex: 1, gap: "6px" }}>
                    <div style={{ fontSize: "11px", color: "#D4A96A", fontFamily: "monospace" }}>{col.dates}</div>
                    <div style={{ position: "relative", width: "16px", height: "16px" }}>
                      <div style={{
                        position: "absolute", top: "50%", left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "8px", height: "8px",
                        borderRadius: "50%",
                        backgroundColor: col.dot,
                        border: "2px solid #180F17",
                        boxShadow: glowing
                          ? `0 0 0 1px ${col.dot}, 0 0 10px rgba(201,133,106,0.5)`
                          : `0 0 0 1px ${col.dot}`,
                        transition: "box-shadow 0.3s ease",
                      }} />
                    </div>
                    <div style={{ fontSize: "12px", fontWeight: 600, color: "#C9856A", letterSpacing: "0.03em" }}>{col.company}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Three main summary cards ── */}
          <div className="grid md:grid-cols-3" style={{ gap: "8px", overflow: "hidden" }}>
            {mainCards.map((card, idx) => (
              <motion.div
                key={card.company}
                initial={{ opacity: 0, y: 24 }}
                animate={timelineInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, ease: "easeOut" as const, delay: idx * 0.1 }}
              >
                {/* Mobile column header */}
                <div className="flex md:hidden items-center gap-3 mb-3">
                  <div style={{
                    width: "8px", height: "8px", borderRadius: "50%",
                    backgroundColor: card.dot, border: "2px solid #180F17",
                    boxShadow: `0 0 0 1px ${card.dot}`, flexShrink: 0,
                  }} />
                  <div>
                    <div style={{ fontSize: "12px", fontWeight: 600, color: "#C9856A", letterSpacing: "0.03em" }}>{card.company}</div>
                    <div style={{ fontSize: "11px", color: "#D4A96A", fontFamily: "monospace" }}>{card.dates}</div>
                  </div>
                </div>

                <MainCard
                  card={card}
                  active={activePanel === idx}
                  onClick={() => handleCardClick(idx)}
                  reducedMotion={reducedMotion}
                />

                {/* Mobile: detail panel sits directly under its card */}
                <div className="block md:hidden">
                  <DetailPanel
                    panel={detailPanels[idx]}
                    open={activePanel === idx}
                    onClose={() => handleClose(idx)}
                    reducedMotion={reducedMotion}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* ── Desktop: detail panels below the columns grid ── */}
          <div className="hidden md:block">
            {detailPanels.map((panel, idx) => (
              <DetailPanel
                key={idx}
                panel={panel}
                open={activePanel === idx}
                onClose={() => handleClose(idx)}
                reducedMotion={reducedMotion}
              />
            ))}
          </div>

        </motion.div>
      </div>
    </section>
  );
}
