"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { Mail } from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

function LinkedInIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

function GitHubIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
    </svg>
  );
}

const links = [
  {
    label: "LinkedIn",
    value: "linkedin.com/in/mohiniasthana",
    href: "https://www.linkedin.com/in/mohiniasthana",
    color: "#3b82f6",
    Icon: LinkedInIcon,
  },
  {
    label: "GitHub",
    value: "github.com/MohiniAsthana",
    href: "https://github.com/MohiniAsthana",
    color: "#94a3b8",
    Icon: GitHubIcon,
  },
  {
    label: "Email",
    value: "mohini.asthana@gmail.com",
    href: "mailto:mohini.asthana@gmail.com",
    color: "#14b8a6",
    Icon: ({ size }: { size?: number }) => <Mail size={size} strokeWidth={1.5} />,
  },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="contact" className="py-24 px-6 bg-[#0f1629]">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="text-center mb-16"
        >
          <motion.span
            variants={fadeUp}
            className="text-sm text-[#14b8a6] font-mono tracking-wider uppercase block mb-4"
          >
            07. Contact
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="text-3xl md:text-4xl font-bold text-[#f1f5f9] mb-4"
          >
            Let&apos;s connect
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[#94a3b8] max-w-lg mx-auto leading-relaxed">
            Whether you&apos;re working on something interesting or just want to say hello — find me here.
          </motion.p>
        </motion.div>

        {/* Links — horizontal on desktop, stacked on mobile */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="flex flex-col md:flex-row gap-6 justify-center"
        >
          {links.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.label !== "Email" ? "_blank" : undefined}
              rel="noopener noreferrer"
              variants={fadeUp}
              whileHover={{ y: -4 }}
              className="gradient-border rounded-2xl bg-[#111827] hover:bg-[#1a2235] px-8 py-7 flex flex-col items-center gap-4 flex-1 cursor-pointer transition-colors duration-300"
              style={{ maxWidth: "280px", margin: "0 auto" }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: `${link.color}15`, color: link.color }}
              >
                <link.Icon size={22} />
              </div>
              <div className="text-center">
                <div className="text-xs text-[#475569] mb-1 font-mono uppercase tracking-wider">{link.label}</div>
                <div className="text-sm transition-colors duration-200" style={{ color: link.color }}>
                  {link.value}
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
