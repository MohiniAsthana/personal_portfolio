"use client";

import { useEffect, useRef, useState } from "react";

const SKILLS_CONFIG = [
  {
    id: "shape",
    label: "SHAPE",
    color: "#D4A96A",
    glowRgb: "212,169,106",
    description: "AI system design, product architecture, and applied intelligence.",
    skills: [
      "Agentic AI Architecture",
      "Multi-agent System Design",
      "Microservices",
      "Confidential Computing",
      "LLM Integration",
      "Prompt Engineering",
      "Product Architecture",
      "AI GTM Strategy",
    ],
  },
  {
    id: "build",
    label: "BUILD",
    color: "#6AADB5",
    glowRgb: "106,173,181",
    description: "Engineering depth across data infrastructure and full-stack development.",
    skills: [
      "Python",
      "PySpark",
      "PyArrow",
      "PostgreSQL",
      "Oracle EBS",
      "Snowflake",
      "Redis",
      "Docker",
      "Kubernetes",
      "REST APIs",
      "D3.js",
      "Django",
    ],
  },
  {
    id: "lead",
    label: "LEAD",
    color: "#9A7EC0",
    glowRgb: "154,126,192",
    description: "Strategy, stakeholder alignment, and executive communication.",
    skills: [
      "Product Strategy",
      "Stakeholder Management",
      "Business Case Development",
      "Cross-functional Leadership",
      "GTM Strategy",
      "Technical Communication",
      "Agile / Scrum",
      "Qualitative Research",
      "Human-AI Trust Research",
    ],
  },
];

const CROSS_LINKS = [
  { from: { cluster: "build", skillIndex: 0 }, to: { cluster: "shape", skillIndex: 0 } },
  { from: { cluster: "build", skillIndex: 6 }, to: { cluster: "shape", skillIndex: 2 } },
  { from: { cluster: "lead", skillIndex: 0 }, to: { cluster: "shape", skillIndex: 7 } },
  { from: { cluster: "lead", skillIndex: 3 }, to: { cluster: "shape", skillIndex: 6 } },
  { from: { cluster: "build", skillIndex: 3 }, to: { cluster: "lead", skillIndex: 5 } },
];

const CANVAS_PADDING = 65;
const CORE_RADIUS = 26;
const MAX_BLOOM_RADIUS_BASE = 168;
const CHIP_HEIGHT = 24;
const CHIP_ESTIMATED_WIDTH = 160;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

interface NodeState {
  x: number;
  y: number;
  vx: number;
  vy: number;
  restPos: { x: number; y: number };
  angle: number;
  driftPhaseX: number;
  driftPhaseY: number;
  driftSpeed: number;
  driftAmp: number;
  clusterId: string;
  skillIndex: number;
  label: string;
}

const CLUSTER_ARC_CONFIG: Record<string, { center: number; spread: number }> = {
  shape: { center: -Math.PI / 2,   spread: Math.PI * 1.5 },
  build: { center: Math.PI * (5 / 6), spread: Math.PI * 1.5 },
  lead:  { center: Math.PI / 6,      spread: Math.PI * 1.5 },
};

function computeGeometry(canvasWidth: number, canvasHeight: number) {
  const R = Math.min(canvasWidth * 0.40, canvasHeight * 0.32, 230);
  const cx = canvasWidth / 2;
  const cy = canvasHeight * 0.55;

  const vertices: Record<string, { x: number; y: number }> = {
    shape: { x: cx, y: cy - R },
    build: { x: cx - R * 0.92, y: cy + R * 0.52 },
    lead: { x: cx + R * 0.92, y: cy + R * 0.52 },
  };

  const maxBloomRadius: Record<string, number> = {};
  SKILLS_CONFIG.forEach((cl) => {
    const v = vertices[cl.id];
    const arc = CLUSTER_ARC_CONFIG[cl.id];
    const half = arc.spread / 2;
    const angles: number[] = [];
    const N = cl.skills.length;
    for (let si = 0; si < N; si++) {
      angles.push(
        arc.center - half + (si / Math.max(N - 1, 1)) * arc.spread
      );
    }
    let r = MAX_BLOOM_RADIUS_BASE;
    for (let iter = 0; iter < 20; iter++) {
      let fits = true;
      for (const a of angles) {
        const nx = v.x + Math.cos(a) * r + Math.cos(a) * CHIP_ESTIMATED_WIDTH / 2;
        const ny = v.y + Math.sin(a) * r + Math.sin(a) * CHIP_HEIGHT / 2;
        if (
          nx < CANVAS_PADDING ||
          nx > canvasWidth - CANVAS_PADDING ||
          ny < CANVAS_PADDING ||
          ny > canvasHeight - CANVAS_PADDING
        ) {
          fits = false;
          break;
        }
      }
      if (fits) break;
      r -= 8;
      if (r < 80) { r = 80; break; }
    }
    maxBloomRadius[cl.id] = r;
  });

  return { vertices, maxBloomRadius, cx, cy };
}

function computeCanvasHeight(canvasWidth: number): number {
  let canvasHeight = 840;
  while (canvasHeight < 960) {
    const R = Math.min(canvasWidth * 0.40, canvasHeight * 0.32, 230);
    const cy = canvasHeight * 0.55;
    const lowestY = cy + R * 0.52;
    if (lowestY + MAX_BLOOM_RADIUS_BASE + CHIP_HEIGHT + CANVAS_PADDING <= canvasHeight) break;
    canvasHeight += 20;
  }
  return Math.min(canvasHeight, 960);
}

function buildNodes(
  vertices: Record<string, { x: number; y: number }>,
  maxBloomRadius: Record<string, number>
): NodeState[] {
  const nodes: NodeState[] = [];
  SKILLS_CONFIG.forEach((cl, _ci) => {
    const N = cl.skills.length;
    const baseRestR = Math.max(maxBloomRadius[cl.id] * 0.85, 90);
    const v = vertices[cl.id];
    const arc = CLUSTER_ARC_CONFIG[cl.id];
    cl.skills.forEach((skill, si) => {
      const stagger = (si % 2 === 1) ? 20 : 0;
      const restR = baseRestR + stagger;
      const angle = arc.center - arc.spread / 2 + (si / Math.max(N - 1, 1)) * arc.spread;
      const rx = v.x + Math.cos(angle) * restR;
      const ry = v.y + Math.sin(angle) * restR;
      nodes.push({
        x: rx,
        y: ry,
        vx: 0,
        vy: 0,
        restPos: { x: rx, y: ry },
        angle,
        driftPhaseX: Math.random() * Math.PI * 2,
        driftPhaseY: Math.random() * Math.PI * 2,
        driftSpeed: 0.28 + Math.random() * 0.18,
        driftAmp: 8 + Math.random() * 10,
        clusterId: cl.id,
        skillIndex: si,
        label: skill,
      });
    });
  });
  return nodes;
}

export default function Skills() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    let rafId: number;
    let activeCluster: string | null = null;
    const mouse = { x: 0, y: 0 };
    let nodes: NodeState[] = [];
    const bloomProgress: Record<string, number> = { shape: 0, build: 0, lead: 0 };
    let pulseT = 0;
    let lastTime = performance.now();

    function setup() {
      const canvasWidth = canvas!.parentElement!.clientWidth;
      const canvasHeight = computeCanvasHeight(canvasWidth);
      canvas!.width = canvasWidth * DPR;
      canvas!.height = canvasHeight * DPR;
      canvas!.style.width = canvasWidth + "px";
      canvas!.style.height = canvasHeight + "px";
      const ctx = canvas!.getContext("2d")!;
      ctx.scale(DPR, DPR);
      mouse.x = canvasWidth / 2;
      mouse.y = canvasHeight / 2;

      const { vertices, maxBloomRadius } = computeGeometry(canvasWidth, canvasHeight);
      nodes = buildNodes(vertices, maxBloomRadius);
    }

    function draw(now: number) {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d")!;
      const canvasWidth = parseInt(canvas.style.width);
      const canvasHeight = parseInt(canvas.style.height);
      const elapsed = now / 1000;
      const delta = (now - lastTime) / 1000;
      lastTime = now;
      pulseT += delta;

      const { vertices, maxBloomRadius, cx, cy } = computeGeometry(canvasWidth, canvasHeight);

      // Update bloom progress
      SKILLS_CONFIG.forEach((cl) => {
        const target = activeCluster === cl.id ? 1 : 0;
        bloomProgress[cl.id] += (target - bloomProgress[cl.id]) * 0.07;
      });

      // Chip separation: expand bloom radius using actual chip widths, bounded by canvas
      ctx.font = "400 11.5px system-ui, sans-serif";
      const effectiveBloomR: Record<string, number> = {};
      SKILLS_CONFIG.forEach((cl) => {
        const bloom = bloomProgress[cl.id];
        if (bloom <= 0.6) { effectiveBloomR[cl.id] = maxBloomRadius[cl.id]; return; }
        const v = vertices[cl.id];
        const arc = CLUSTER_ARC_CONFIG[cl.id];
        const N = cl.skills.length;
        const chipWidths = cl.skills.map((s) => ctx.measureText(s).width + 22);
        let r = maxBloomRadius[cl.id];
        for (let iter = 0; iter < 14; iter++) {
          let tooClose = false;
          for (let si = 0; si < N - 1; si++) {
            const a1 = arc.center - arc.spread / 2 + (si / Math.max(N - 1, 1)) * arc.spread;
            const a2 = arc.center - arc.spread / 2 + ((si + 1) / Math.max(N - 1, 1)) * arc.spread;
            const x1 = v.x + Math.cos(a1) * r;
            const y1 = v.y + Math.sin(a1) * r;
            const x2 = v.x + Math.cos(a2) * r;
            const y2 = v.y + Math.sin(a2) * r;
            const d = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
            const minSep = chipWidths[si] / 2 + chipWidths[si + 1] / 2 + 12;
            if (d < minSep) { tooClose = true; break; }
          }
          if (!tooClose) break;
          // Only expand if no chip tip would leave the padded canvas
          const rNext = r + 20;
          let outOfBounds = false;
          for (let si = 0; si < N; si++) {
            const a = arc.center - arc.spread / 2 + (si / Math.max(N - 1, 1)) * arc.spread;
            const nx = v.x + Math.cos(a) * rNext + Math.cos(a) * chipWidths[si] / 2;
            const ny = v.y + Math.sin(a) * rNext + Math.sin(a) * CHIP_HEIGHT / 2;
            if (nx < 20 || nx > canvasWidth - 20 ||
                ny < 20 || ny > canvasHeight - 20) {
              outOfBounds = true; break;
            }
          }
          if (outOfBounds) break;
          r = rNext;
        }
        effectiveBloomR[cl.id] = r;
      });

      // Update nodes
      nodes.forEach((n) => {
        const bloom = bloomProgress[n.clusterId];
        const v = vertices[n.clusterId];
        const stagger = (n.skillIndex % 2 === 1) ? 20 : 0;
        const restR = Math.max(maxBloomRadius[n.clusterId] * 0.85, 90) + stagger;
        const bloomR = effectiveBloomR[n.clusterId] + stagger;
        const targetX = v.x + Math.cos(n.angle) * lerp(restR, bloomR, bloom);
        const targetY = v.y + Math.sin(n.angle) * lerp(restR, bloomR, bloom);

        const idleScale = 1 - bloom * 0.85;
        const driftX =
          Math.sin(elapsed * n.driftSpeed + n.driftPhaseX) * n.driftAmp * idleScale;
        const driftY =
          Math.cos(elapsed * n.driftSpeed * 0.7 + n.driftPhaseY) * n.driftAmp * idleScale;

        let mx = 0;
        let my = 0;
        if (activeCluster === null) {
          const dx = mouse.x - n.x;
          const dy = mouse.y - n.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140 && dist > 0) {
            mx = (dx / dist) * (1 - dist / 140) * 0.009;
            my = (dy / dist) * (1 - dist / 140) * 0.009;
          }
        }

        const ax = (targetX + driftX - n.x) * 0.06 + mx;
        const ay = (targetY + driftY - n.y) * 0.06 + my;
        n.vx = (n.vx + ax) * 0.74;
        n.vy = (n.vy + ay) * 0.74;

        // Repel nodes away from The Translator ellipse bounds
        const transRx = 52 + 70; // ellipse rx + chip half-width clearance
        const transRy = 26 + 20; // ellipse ry + chip half-height clearance
        const cdx = n.x - cx;
        const cdy = n.y - cy;
        const t = Math.sqrt((cdx / transRx) ** 2 + (cdy / transRy) ** 2);
        if (t < 1.0 && t > 0.01) {
          const strength = (1.0 - t) * 0.15;
          const gx = cdx / (transRx * transRx);
          const gy = cdy / (transRy * transRy);
          const gLen = Math.sqrt(gx * gx + gy * gy);
          if (gLen > 0) {
            n.vx += (gx / gLen) * strength;
            n.vy += (gy / gLen) * strength;
          }
        }

        n.x += n.vx;
        n.y += n.vy;
      });

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      // 1. Triangle edges
      ctx.save();
      ctx.strokeStyle = "rgba(212,169,106,0.28)";
      ctx.lineWidth = 0.8;
      ctx.setLineDash([5, 9]);
      ctx.lineDashOffset = -elapsed * 4;
      ctx.beginPath();
      const verts = [vertices.shape, vertices.build, vertices.lead];
      ctx.moveTo(verts[0].x, verts[0].y);
      ctx.lineTo(verts[1].x, verts[1].y);
      ctx.lineTo(verts[2].x, verts[2].y);
      ctx.closePath();
      ctx.stroke();
      ctx.restore();

      // 2. Cross-cluster curves
      CROSS_LINKS.forEach((link) => {
        const bpA = bloomProgress[link.from.cluster];
        const bpB = bloomProgress[link.to.cluster];
        if (Math.max(bpA, bpB) <= 0.02) return;

        const nodeA = nodes.find(
          (n) => n.clusterId === link.from.cluster && n.skillIndex === link.from.skillIndex
        );
        const nodeB = nodes.find(
          (n) => n.clusterId === link.to.cluster && n.skillIndex === link.to.skillIndex
        );
        if (!nodeA || !nodeB) return;

        ctx.save();
        ctx.globalAlpha = Math.max(bpA, bpB);
        ctx.strokeStyle = "rgba(237,229,240,0.18)";
        ctx.lineWidth = 0.6;
        ctx.setLineDash([3, 7]);
        ctx.beginPath();
        ctx.moveTo(nodeA.x, nodeA.y);
        ctx.quadraticCurveTo(cx, cy, nodeB.x, nodeB.y);
        ctx.stroke();
        ctx.restore();
      });

      // 3. Node-to-core lines
      SKILLS_CONFIG.forEach((cl) => {
        const bloom = bloomProgress[cl.id];
        const v = vertices[cl.id];
        const [r, g, b] = cl.glowRgb.split(",");
        nodes
          .filter((n) => n.clusterId === cl.id)
          .forEach((n) => {
            ctx.save();
            ctx.strokeStyle = `rgba(${r},${g},${b},${0.05 + bloom * 0.1})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(v.x, v.y);
            ctx.lineTo(n.x, n.y);
            ctx.stroke();
            ctx.restore();
          });
      });

      // 4. Skill nodes
      ctx.save();
      ctx.font = "400 11.5px system-ui, sans-serif";
      SKILLS_CONFIG.forEach((cl) => {
        const bloom = bloomProgress[cl.id];
        const [r, g, b] = cl.glowRgb.split(",");
        nodes
          .filter((n) => n.clusterId === cl.id)
          .forEach((n) => {
            if (bloom > 0.04) {
              const textWidth = ctx.measureText(n.label).width;
              const chipW = textWidth + 22;
              const chipH = CHIP_HEIGHT;
              const radius = 12;
              ctx.globalAlpha = Math.min(bloom * 1.5, 1);
              ctx.beginPath();
              const x = n.x - chipW / 2;
              const y = n.y - chipH / 2;
              ctx.moveTo(x + radius, y);
              ctx.lineTo(x + chipW - radius, y);
              ctx.arcTo(x + chipW, y, x + chipW, y + radius, radius);
              ctx.lineTo(x + chipW, y + chipH - radius);
              ctx.arcTo(x + chipW, y + chipH, x + chipW - radius, y + chipH, radius);
              ctx.lineTo(x + radius, y + chipH);
              ctx.arcTo(x, y + chipH, x, y + chipH - radius, radius);
              ctx.lineTo(x, y + radius);
              ctx.arcTo(x, y, x + radius, y, radius);
              ctx.closePath();
              ctx.fillStyle = `rgba(${r},${g},${b},0.13)`;
              ctx.fill();
              ctx.strokeStyle = `rgba(${r},${g},${b},0.40)`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
              ctx.fillStyle = cl.color;
              ctx.textAlign = "center";
              ctx.textBaseline = "middle";
              ctx.fillText(n.label, n.x, n.y);
            } else {
              ctx.globalAlpha = 1;
              const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, 11);
              grad.addColorStop(0, `rgba(${r},${g},${b},0.85)`);
              grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
              ctx.beginPath();
              ctx.arc(n.x, n.y, 11, 0, Math.PI * 2);
              ctx.fillStyle = grad;
              ctx.fill();
              ctx.beginPath();
              ctx.arc(n.x, n.y, 3.5, 0, Math.PI * 2);
              ctx.fillStyle = cl.color;
              ctx.fill();
            }
          });
      });
      ctx.globalAlpha = 1;
      ctx.restore();

      // 5. Cluster cores
      SKILLS_CONFIG.forEach((cl) => {
        const bloom = bloomProgress[cl.id];
        const v = vertices[cl.id];
        const [r, g, b] = cl.glowRgb.split(",");
        const coreR = CORE_RADIUS + bloom * 8;

        // Outer glow
        const glowGrad = ctx.createRadialGradient(v.x, v.y, 0, v.x, v.y, coreR * 3);
        glowGrad.addColorStop(0, `rgba(${r},${g},${b},${0.28 + bloom * 0.18})`);
        glowGrad.addColorStop(1, `rgba(${r},${g},${b},0)`);
        ctx.beginPath();
        ctx.arc(v.x, v.y, coreR * 3, 0, Math.PI * 2);
        ctx.fillStyle = glowGrad;
        ctx.fill();

        // Core circle
        ctx.beginPath();
        ctx.arc(v.x, v.y, coreR, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${0.16 + bloom * 0.1})`;
        ctx.fill();
        ctx.strokeStyle = `rgba(${r},${g},${b},${0.55 + bloom * 0.3})`;
        ctx.lineWidth = bloom > 0.5 ? 1.5 : 1;
        ctx.stroke();

        // Label
        ctx.fillStyle = cl.color;
        ctx.font = "600 10px system-ui, sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(cl.label, v.x, v.y);
      });

      // 6. Centre "The Translator" node
      const pulse = 0.5 + 0.5 * Math.sin(pulseT * 1.4);
      const ellipseRx = 52;
      const ellipseRy = 26;

      const pgr = ctx.createRadialGradient(cx, cy, 0, cx, cy, (ellipseRx + 20) * 1.5);
      pgr.addColorStop(0, "rgba(237,229,240,0.07)");
      pgr.addColorStop(1, "rgba(237,229,240,0)");
      ctx.beginPath();
      ctx.ellipse(cx, cy, (ellipseRx + 20) * 1.5, (ellipseRy + 20) * 1.2, 0, 0, Math.PI * 2);
      ctx.fillStyle = pgr;
      ctx.fill();

      ctx.beginPath();
      ctx.ellipse(cx, cy, ellipseRx + 6 + pulse * 4, ellipseRy + 4 + pulse * 2, 0, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(237,229,240,${0.06 + pulse * 0.08})`;
      ctx.lineWidth = 0.5;
      ctx.setLineDash([]);
      ctx.stroke();

      ctx.beginPath();
      ctx.ellipse(cx, cy, ellipseRx, ellipseRy, 0, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(237,229,240,0.04)";
      ctx.fill();
      ctx.strokeStyle = "rgba(237,229,240,0.22)";
      ctx.lineWidth = 0.5;
      ctx.stroke();

      ctx.fillStyle = "#EDE5F0";
      ctx.font = "500 11px system-ui";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("The", cx, cy - 8);
      ctx.fillText("Translator", cx, cy + 7);

      rafId = requestAnimationFrame(draw);
    }

    function onMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;

      let found: string | null = null;
      const canvasWidth = parseInt(canvas!.style.width);
      const canvasHeight = parseInt(canvas!.style.height);
      const { vertices } = computeGeometry(canvasWidth, canvasHeight);
      SKILLS_CONFIG.forEach((cl) => {
        const v = vertices[cl.id];
        const dx = mouse.x - v.x;
        const dy = mouse.y - v.y;
        if (Math.sqrt(dx * dx + dy * dy) < 38) found = cl.id;
      });
      activeCluster = found;
    }

    function onMouseLeave() {
      const canvasWidth = parseInt(canvas!.style.width);
      const canvasHeight = parseInt(canvas!.style.height);
      mouse.x = canvasWidth / 2;
      mouse.y = canvasHeight / 2;
      activeCluster = null;
    }

    function onResize() {
      setup();
    }

    setup();
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("resize", onResize);
    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", onResize);
    };
  }, [isMobile]);

  return (
    <section
      id="skills"
      style={{
        padding: "96px 0",
        background: "#150D14",
        borderTop: "0.5px solid rgba(201,133,106,0.07)",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "0 24px",
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <span
            style={{
              display: "block",
              color: "#D4A96A",
              fontSize: 11,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: 16,
              fontFamily: "monospace",
            }}
          >
            03. SKILLS
          </span>
          <h2
            style={{
              color: "#EDE5F0",
              fontSize: 32,
              fontWeight: 600,
              margin: "0 0 12px",
              lineHeight: 1.2,
            }}
          >
            Where strategy meets the stack.
          </h2>
          <p
            style={{
              color: "#90788E",
              fontSize: 14,
              maxWidth: 540,
              lineHeight: 1.6,
              margin: "0 0 24px",
            }}
          >
            Skills earned across infrastructure engineering, AI product architecture, and business
            strategy — and the ability to move fluently between all three.
          </p>
          <div
            style={{
              height: "0.5px",
              background:
                "linear-gradient(90deg, transparent, rgba(201,133,106,0.2), transparent)",
            }}
          />
        </div>

        {/* Canvas or mobile fallback */}
        {isMobile ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {SKILLS_CONFIG.map((cl) => (
              <div
                key={cl.id}
                style={{
                  background: "#20121E",
                  border: "0.5px solid rgba(201,133,106,0.07)",
                  borderRadius: 12,
                  padding: 20,
                }}
              >
                <div
                  style={{
                    color: cl.color,
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    marginBottom: 12,
                  }}
                >
                  {cl.label}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {cl.skills.map((skill) => (
                    <span
                      key={skill}
                      style={{
                        padding: "4px 11px",
                        borderRadius: 12,
                        fontSize: 11.5,
                        color: cl.color,
                        background: `rgba(${cl.glowRgb},0.13)`,
                        border: `0.5px solid rgba(${cl.glowRgb},0.40)`,
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <p
              style={{
                textAlign: "center",
                fontSize: 11,
                color: "rgba(144,120,142,0.45)",
                letterSpacing: "0.06em",
                marginBottom: 12,
              }}
            >
              Hover a cluster to explore · Move mouse to drift
            </p>
            <canvas
              ref={canvasRef}
              style={{ display: "block", width: "100%" }}
            />
          </>
        )}
      </div>
    </section>
  );
}
