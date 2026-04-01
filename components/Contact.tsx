"use client";

import { useRef, useState } from "react";
import { motion, useInView, type Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

type FormState = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [formState, setFormState] = useState<FormState>("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setFormState("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }
  };

  return (
    <section id="contact" className="py-24 px-6 bg-[#0f1629]">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          ref={headerRef}
          variants={stagger}
          initial="hidden"
          animate={headerInView ? "show" : "hidden"}
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
            Let&apos;s build something together
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[#94a3b8] max-w-lg mx-auto leading-relaxed">
            Whether you&apos;re working on a hard problem at the intersection of technology and
            human systems, or you just want to connect — I&apos;d love to hear from you.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left — links */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={headerInView ? "show" : "hidden"}
            className="space-y-6"
          >
            {[
              {
                label: "LinkedIn",
                value: "linkedin.com/in/mohiniasthana",
                href: "https://www.linkedin.com/in/mohiniasthana",
                color: "#3b82f6",
              },
              {
                label: "GitHub",
                value: "github.com/MohiniAsthana",
                href: "https://github.com/MohiniAsthana",
                color: "#94a3b8",
              },
              {
                label: "Email",
                value: "mohini.asthana@gmail.com",
                href: "mailto:mohini.asthana@gmail.com",
                color: "#14b8a6",
              },
            ].map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.label !== "Email" ? "_blank" : undefined}
                rel="noopener noreferrer"
                variants={fadeUp}
                whileHover={{ x: 6 }}
                className="flex items-center gap-4 group cursor-pointer"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-mono font-bold shrink-0"
                  style={{ background: `${link.color}15`, color: link.color }}
                >
                  {link.label.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="text-xs text-[#475569] mb-0.5">{link.label}</div>
                  <div
                    className="text-sm transition-colors duration-200 group-hover:text-[#f1f5f9]"
                    style={{ color: link.color }}
                  >
                    {link.value}
                  </div>
                </div>
              </motion.a>
            ))}
          </motion.div>

          {/* Right — form */}
          <motion.form
            onSubmit={handleSubmit}
            variants={stagger}
            initial="hidden"
            animate={headerInView ? "show" : "hidden"}
            className="space-y-4"
          >
            {[
              { name: "name", label: "Your name", type: "text", placeholder: "Jane Smith" },
              { name: "email", label: "Email address", type: "email", placeholder: "jane@example.com" },
            ].map((field) => (
              <motion.div key={field.name} variants={fadeUp}>
                <label className="block text-xs text-[#94a3b8] mb-1.5">{field.label}</label>
                <input
                  type={field.type}
                  name={field.name}
                  value={form[field.name as keyof typeof form]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-[#111827] border border-[#1e2d45] text-[#f1f5f9] text-sm placeholder:text-[#475569] focus:outline-none focus:border-[#14b8a6] transition-colors duration-200"
                />
              </motion.div>
            ))}

            <motion.div variants={fadeUp}>
              <label className="block text-xs text-[#94a3b8] mb-1.5">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="What are you working on?"
                required
                rows={5}
                className="w-full px-4 py-3 rounded-xl bg-[#111827] border border-[#1e2d45] text-[#f1f5f9] text-sm placeholder:text-[#475569] focus:outline-none focus:border-[#14b8a6] transition-colors duration-200 resize-none"
              />
            </motion.div>

            <motion.div variants={fadeUp}>
              <motion.button
                type="submit"
                disabled={formState === "sending"}
                whileHover={{ scale: 1.02, boxShadow: "0 0 25px rgba(20,184,166,0.25)" }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3.5 rounded-xl text-sm font-semibold text-[#0a0e1a] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer transition-all duration-200"
                style={{ background: "linear-gradient(135deg, #14b8a6, #8b5cf6)" }}
              >
                {formState === "sending" ? "Sending..." : "Send message"}
              </motion.button>

              {formState === "success" && (
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-[#14b8a6] text-center mt-3"
                >
                  Message sent — I&apos;ll be in touch soon.
                </motion.p>
              )}
              {formState === "error" && (
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-red-400 text-center mt-3"
                >
                  Something went wrong. Try emailing directly.
                </motion.p>
              )}
            </motion.div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
