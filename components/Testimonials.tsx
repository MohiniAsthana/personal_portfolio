"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence, type Variants } from "framer-motion";

interface Testimonial {
  name: string;
  title: string;
  relationship: string;
  date: string;
  quote: string;
  initials: string;
  accentColor: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Thejaswini Kodavur",
    title: "Engineering Leader · Goldman · INSEAD · Women Icon Award 2022",
    relationship: "Managed Mohini directly",
    date: "May 2024",
    quote:
      "Words that describe Mohini are 'Curious, Sharp, Courageous and a Go Getter.' I have managed Mohini for many years and I must say that the energy she gets into the team is truly valuable. She is someone who can understand complex technologies and deliver products very quickly. She has tremendous amount of clarity in her thoughts that has several times helped in making right design decisions, come up with innovative solutions and level up the thinking of the team. Undoubtedly an engineer with tremendous potential and a bright future ahead.",
    initials: "TK",
    accentColor: "#C9856A",
  },
  {
    name: "Hariharan Radhakrishnan",
    title: "AI Native Engineering @ Atlan · Ex-Delphix · Ex-Cisco",
    relationship: "Worked on the same team",
    date: "July 2025",
    quote:
      "I've had the privilege of working with Mohini Asthana and can confidently say she's one of the most dependable and technically strong professionals I've worked with. She's deeply customer-focused, often going the extra mile to help resolve issues. Her technical depth is outstanding — she asks the right questions and challenges design choices in a way that helps us build better software. Whether it's leading a team, managing a product, or solving a complex problem, Mohini handles it all with calm, clarity, and care. She'd be a tremendous asset to any company.",
    initials: "HR",
    accentColor: "#C9856A",
  },
  {
    name: "Deepa Pawar",
    title: "Risk Analyst · Ex-Cisco",
    relationship: "Worked on the same team",
    date: "June 2024",
    quote:
      "I had the pleasure of working with Mohini for around three years. Mohini consistently demonstrated exceptional dedication, quickly mastering complex tasks and automating manual processes to improve efficiency. As a mentor, she guided many new graduates, helping them transition smoothly into their roles. Additionally, as a member of Cisco CDAN, Mohini organised several events promoting disability awareness and inclusivity, showcasing her commitment to a positive workplace culture. She is a hardworking and innovative individual who brings a positive attitude to every project.",
    initials: "DP",
    accentColor: "#C9856A",
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

function TestimonialCard({
  testimonial,
  index,
  isActive,
  onClick,
}: {
  testimonial: Testimonial;
  index: number;
  isActive: boolean;
  onClick: () => void;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
      onClick={onClick}
      className="gradient-border rounded-2xl p-6 bg-[#2A2320] cursor-pointer transition-all duration-300 hover:bg-[#2E2522]"
      style={isActive ? { outline: `1px solid ${testimonial.accentColor}50` } : {}}
    >
      {/* Quote mark */}
      <div
        className="text-4xl font-serif leading-none mb-4 opacity-40"
        style={{ color: testimonial.accentColor }}
      >
        &ldquo;
      </div>

      {/* Quote — truncated unless active */}
      <AnimatePresence initial={false} mode="wait">
        <motion.p
          key={isActive ? "full" : "short"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="text-sm text-[#9A8A84] leading-relaxed mb-5"
        >
          {isActive
            ? testimonial.quote
            : `${testimonial.quote.slice(0, 180).trim()}…`}
        </motion.p>
      </AnimatePresence>

      <button
        className="text-xs mb-5 transition-colors duration-200 cursor-pointer"
        style={{ color: testimonial.accentColor }}
      >
        {isActive ? "Show less ↑" : "Read more ↓"}
      </button>

      {/* Author */}
      <div className="flex items-center gap-3 pt-4 border-t border-[rgba(201,133,106,0.12)]">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
          style={{
            background: `${testimonial.accentColor}20`,
            color: testimonial.accentColor,
          }}
        >
          {testimonial.initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold text-[#F0E8E3] truncate">{testimonial.name}</div>
          <div className="text-xs text-[#7A6A64] truncate">{testimonial.title}</div>
        </div>
        <div className="text-right shrink-0">
          <div className="text-xs text-[#7A6A64]">{testimonial.date}</div>
          <div
            className="text-xs mt-0.5"
            style={{ color: `${testimonial.accentColor}80` }}
          >
            {testimonial.relationship}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggle = (i: number) => setActiveIndex(activeIndex === i ? null : i);

  return (
    <section id="testimonials" className="py-24 px-6">
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
            06. Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#F0E8E3] mb-4">
            In their own words
          </h2>
          <p className="text-[#9A8A84] max-w-xl">
            From managers, peers, and teammates — across Cisco and Delphix.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <TestimonialCard
              key={t.name}
              testimonial={t}
              index={i}
              isActive={activeIndex === i}
              onClick={() => toggle(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
