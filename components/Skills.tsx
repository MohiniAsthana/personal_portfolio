"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence, type Variants } from "framer-motion";

interface Skill {
  name: string;
  description: string;
}

interface SkillGroup {
  category: string;
  color: string;
  icon: string;
  skills: Skill[];
}

const skillGroups: SkillGroup[] = [
  {
    category: "Product Leadership",
    color: "#C9856A",
    icon: "◈",
    skills: [
      { name: "Product Strategy", description: "Roadmap definition, OKRs, and prioritisation frameworks that align technology decisions with business outcomes." },
      { name: "Agile / Scrum", description: "Led Agile transformations adopted at the VP level. Certified Scrum practitioner with deep facilitation experience." },
      { name: "Stakeholder Management", description: "Navigating complex enterprise environments with multiple competing priorities across engineering, sales, and executive teams." },
      { name: "Go-to-Market", description: "Partnering with sales and marketing on positioning, pricing strategy, and launch execution for enterprise SaaS products." },
      { name: "User Research", description: "Discovery interviews, usability studies, and synthesis techniques for deeply understanding enterprise user needs." },
    ],
  },
  {
    category: "Engineering",
    color: "#C9856A",
    icon: "◉",
    skills: [
      { name: "Python", description: "Primary programming language across infrastructure tooling, data pipelines, and ML/research work." },
      { name: "Distributed Systems", description: "Built infrastructure monitoring platforms handling high-volume alert processing at Cisco." },
      { name: "Data Virtualisation", description: "Deep domain expertise in TDM and data virtualisation architecture from Delphix." },
      { name: "REST APIs", description: "Designing and building RESTful APIs for both internal tooling and external-facing product surfaces." },
      { name: "SQL & Data", description: "Proficient in complex query optimisation, data modelling, and analytics for product decision-making." },
    ],
  },
  {
    category: "Research & AI",
    color: "#C9856A",
    icon: "◎",
    skills: [
      { name: "Human-AI Systems", description: "Empirical research on how humans and AI systems make decisions together and where trust breaks down." },
      { name: "Agentic AI", description: "Hands-on product strategy work for agentic AI commerce solutions in the IBM consulting engagement." },
      { name: "ML / Predictive Modelling", description: "Applied ML for predictive remediation tooling at Cisco; published ML research from undergraduate thesis." },
      { name: "Qualitative Research", description: "Interview study design, thematic analysis, and mixed-methods approaches for human-centred research." },
      { name: "Data Analysis", description: "Statistical analysis and research synthesis across multiple empirical studies at NTU." },
    ],
  },
  {
    category: "Leadership & Strategy",
    color: "#C9856A",
    icon: "◇",
    skills: [
      { name: "Cross-functional Leadership", description: "Led multiple simultaneous initiatives across engineering, product, design, and customer success teams." },
      { name: "Business Strategy", description: "MBA-level strategic frameworks applied to technology decisions, market analysis, and competitive positioning." },
      { name: "Executive Communication", description: "Presenting to C-suite and VP-level stakeholders with clarity, evidence, and structured recommendations." },
      { name: "Team Development", description: "Mentoring engineers into product thinking and running Agile ceremonies that genuinely improve team velocity." },
      { name: "Consulting", description: "Structured problem-solving and client engagement from the IBM NTU consulting engagement." },
    ],
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Skills() {
  const [activeGroup, setActiveGroup] = useState<SkillGroup>(skillGroups[0]);
  const [activeSkill, setActiveSkill] = useState<Skill | null>(null);

  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section id="skills" className="py-24 px-6 bg-[#150D14] border-t border-[rgba(201,133,106,0.07)]">
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
            03. Skills
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#EDE5F0] mb-4">
            The intersection where I live
          </h2>
          <p className="text-[#90788E] max-w-xl">
            Select a category, then explore individual skills. Click any skill to see how I use it.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[280px_1fr] gap-8">
          {/* Category selector */}
          <div className="flex flex-row lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
            {skillGroups.map((group) => (
              <motion.button
                key={group.category}
                onClick={() => { setActiveGroup(group); setActiveSkill(null); }}
                whileHover={{ x: 4 }}
                className={`shrink-0 flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer text-left border ${
                  activeGroup.category === group.category
                    ? "border-transparent text-[#EDE5F0]"
                    : "border-[rgba(201,133,106,0.12)] text-[#90788E] hover:text-[#EDE5F0] bg-transparent"
                }`}
                style={
                  activeGroup.category === group.category
                    ? { background: `linear-gradient(135deg, ${group.color}20, ${group.color}10)`, borderColor: `rgba(201,133,106,0.4)` }
                    : {}
                }
              >
                <span style={{ color: group.color }}>{group.icon}</span>
                {group.category}
              </motion.button>
            ))}
          </div>

          {/* Skill nodes */}
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeGroup.category}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {activeGroup.skills.map((skill) => (
                  <motion.button
                    key={skill.name}
                    onClick={() => setActiveSkill(activeSkill?.name === skill.name ? null : skill)}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className={`text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                      activeSkill?.name === skill.name
                        ? "border-transparent"
                        : "border-[rgba(201,133,106,0.12)] bg-gradient-to-br from-[#2A1728] to-[#1C0F1A] hover:border-[rgba(201,133,106,0.25)]"
                    }`}
                    style={
                      activeSkill?.name === skill.name
                        ? {
                            background: `linear-gradient(135deg, ${activeGroup.color}15, ${activeGroup.color}08)`,
                            borderColor: `${activeGroup.color}50`,
                          }
                        : {}
                    }
                  >
                    <div
                      className="text-sm font-semibold mb-1"
                      style={{ color: activeGroup.color }}
                    >
                      {skill.name}
                    </div>
                    <AnimatePresence>
                      {activeSkill?.name === skill.name && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="text-xs text-[#90788E] leading-relaxed mt-2"
                        >
                          {skill.description}
                        </motion.p>
                      )}
                    </AnimatePresence>
                    {activeSkill?.name !== skill.name && (
                      <div className="text-xs text-[#90788E]">Click to explore</div>
                    )}
                  </motion.button>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
