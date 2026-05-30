"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const highlights = [
  {
    category: "ENGINEERING",
    headline: "Started writing the systems. Stayed to shape what they became.",
    sub: "7+ years · infrastructure, data platforms, and AI",
  },
  {
    category: "LEADERSHIP",
    headline: "Valedictorian, NTU MBA · Class of 2026",
    sub: "Awarded Women in Business Scholarship",
  },
  {
    category: "RECOGNITION",
    headline: "Top 100 Most Inspiring MBA Leaders",
    sub: "MBA World Summit 2026 · IPAI, Heilbronn",
  },
  {
    category: "SPEAKING",
    headline: "Summit Lab Session Speaker",
    sub: "“The Unseen Truth About Beautiful Lies” · IPAI Heilbronn",
  },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 px-6 bg-[#150D14] border-t border-[rgba(201,133,106,0.07)]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          {/* Section label */}
          <motion.div variants={fadeUp} className="mb-4">
            <span className="text-sm font-mono tracking-wider uppercase" style={{ color: "#D4A96A" }}>
              01. About
            </span>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left — narrative */}
            <div>
              <motion.h2
                variants={fadeUp}
                className="text-3xl md:text-4xl font-bold text-[#EDE5F0] mb-8 leading-tight"
              >
                I&apos;ve always believed the hardest problems aren&apos;t technical —
                <span className="gradient-text"> they&apos;re human.</span>
              </motion.h2>

              <motion.div variants={stagger} className="space-y-5 text-[#90788E] leading-relaxed">
                <motion.p variants={fadeUp}>
                  My career started in engineering. At Cisco, I built infrastructure monitoring
                  systems from the ground up — alert platforms, predictive remediation tools, the kind
                  of work that lives deep in the stack and rarely gets seen. But what I kept noticing
                  wasn&apos;t the technology. It was the gap between what systems could do and what people actually understood about them.
                </motion.p>

                <motion.p variants={fadeUp}>
                  <span style={{ color: "#D4A96A" }}>That gap became my work.</span>
                </motion.p>

                <motion.p variants={fadeUp}>
                  At Delphix, the work kept expanding in directions I hadn&apos;t expected. I drove
                  product strategy for test data management solutions for enterprise clients, spanning
                  data virtualisation and compliance, working across teams to shape roadmaps, lead
                  Agile transformations, and translate complex technical capability into real business
                  value. In a deliberately flat organisation, the boundaries between engineering and
                  product were porous by design — and I found myself drawn toward that intersection,
                  again and again.
                </motion.p>

                <motion.p variants={fadeUp}>
                  As I complete my MBA, I&apos;m studying that translation more formally — researching how humans and AI systems make decisions together, where trust breaks down, and how leadership shapes those dynamics. Somewhere along the way, I became genuinely fascinated by agentic systems: <span style={{ color: "#D4A96A" }}>not just what they can do, but what they reveal about the humans working alongside them</span>. The MBA gives me the strategic lens to make that alignment deliberate and durable.
                </motion.p>

                <motion.p variants={fadeUp} className="text-[#EDE5F0] font-medium">
                  The thread across all of it: technology is most powerful when it disappears into
                  the background and just <em>works</em>{" "}for people. That&apos;s what I build toward.
                </motion.p>
              </motion.div>
            </div>

            {/* Right — photo + stats */}
            <div className="flex flex-col gap-8">
              {/* Photo placeholder */}
              <motion.div
                variants={fadeUp}
                className="relative w-full max-w-sm mx-auto"
              >
                <div className="w-full aspect-[3/4] rounded-2xl overflow-hidden gradient-border">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/headshot.jpg"
                    alt="Mohini Asthana"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                {/* Decorative corner accent */}
                <div
                  className="absolute -bottom-3 -right-3 w-full h-full rounded-2xl border border-[#C9856A]/20 -z-10"
                />
              </motion.div>

              {/* Typographic highlight list */}
              <motion.div variants={stagger} className="flex flex-col">
                {highlights.map((h, i) => (
                  <motion.div
                    key={h.category}
                    variants={fadeUp}
                    style={{
                      padding: "10px 0",
                      borderBottom: i < highlights.length - 1
                        ? "0.5px solid rgba(201,133,106,0.15)"
                        : "none",
                    }}
                  >
                    <div style={{
                      fontSize: "10px",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      color: "#C9856A",
                      marginBottom: "4px",
                    }}>
                      {h.category}
                    </div>
                    <div style={{
                      fontSize: "13px",
                      fontWeight: 500,
                      color: "#EDE5F0",
                      lineHeight: 1.3,
                    }}>
                      {h.headline}
                    </div>
                    <div style={{
                      fontSize: "11px",
                      color: "#90788E",
                      marginTop: "2px",
                    }}>
                      {h.sub}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
