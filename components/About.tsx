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
  { value: "7+", label: "Years across engineering & product" },
  { value: "100%", label: "Net revenue retention at Delphix" },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          {/* Section label */}
          <motion.div variants={fadeUp} className="mb-4">
            <span className="text-sm text-[#14b8a6] font-mono tracking-wider uppercase">
              01. About
            </span>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left — narrative */}
            <div>
              <motion.h2
                variants={fadeUp}
                className="text-3xl md:text-4xl font-bold text-[#f1f5f9] mb-8 leading-tight"
              >
                I&apos;ve always believed the hardest problems aren&apos;t technical —
                <span className="gradient-text"> they&apos;re human.</span>
              </motion.h2>

              <motion.div variants={stagger} className="space-y-5 text-[#94a3b8] leading-relaxed">
                <motion.p variants={fadeUp}>
                  My career started in engineering. At Cisco, I built infrastructure monitoring
                  systems from the ground up — alert platforms, predictive remediation tools, the kind
                  of work that lives deep in the stack and rarely gets seen. But what I kept noticing
                  wasn&apos;t the technology. It was the gap between what systems{" "}
                  <em className="text-[#f1f5f9]">could</em> do and what people actually{" "}
                  <em className="text-[#f1f5f9]">understood</em> about them.
                </motion.p>

                <motion.p variants={fadeUp}>
                  That gap became my work.
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
                  Now at NTU, I&apos;m studying that translation more formally — researching how
                  humans and AI systems make decisions together, where trust breaks down, and how
                  leadership shapes those dynamics. The MBA gives me the strategic lens to align
                  technology with business — not just the vocabulary, but the frameworks to make
                  that alignment deliberate and durable.
                </motion.p>

                <motion.p variants={fadeUp} className="text-[#f1f5f9] font-medium">
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
                className="relative w-full max-w-sm mx-auto lg:mx-0"
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
                  className="absolute -bottom-3 -right-3 w-full h-full rounded-2xl border border-[#14b8a6]/20 -z-10"
                />
              </motion.div>

              {/* Stats grid */}
              <motion.div variants={stagger} className="flex flex-col gap-4">
                {highlights.map((h) => (
                  <motion.div
                    key={h.label}
                    variants={fadeUp}
                    className="gradient-border rounded-xl px-6 py-5 bg-[#111827] flex items-center gap-5"
                  >
                    <div className="text-3xl font-bold gradient-text shrink-0">{h.value}</div>
                    <div className="text-sm text-[#94a3b8]">{h.label}</div>
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
