"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const techItems = [
  { label: "React", color: "#61DAFB", icon: "⚛" },
  { label: "Node", color: "#68A063", icon: "⬡" },
  { label: "TS", color: "#3178C6", icon: "TS" },
  { label: "Next", color: "#ffffff", icon: "N" },
  { label: "AWS", color: "#FF9900", icon: "⬢" },
  { label: "SQL", color: "#F29111", icon: "🗄" },
];

export default function TechStack3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitsRef = useRef<HTMLDivElement[]>([]);
  const coreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
      mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
    };

    const animate = () => {
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;
      if (container) {
        container.style.transform = `rotateY(${targetX}deg) rotateX(${-targetY}deg)`;
      }
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove);
    rafId = requestAnimationFrame(animate);

    // Pulse core
    if (coreRef.current) {
      gsap.to(coreRef.current, {
        scale: 1.08,
        duration: 2,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
    }

    // Entrance animation
    orbitsRef.current.forEach((el, i) => {
      if (!el) return;
      gsap.from(el, {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        delay: 0.8 + i * 0.1,
        ease: "back.out(1.7)",
      });
    });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="relative w-full flex items-center justify-center" style={{ height: 420 }}>
      {/* Glow backdrop */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-64 h-64 rounded-full bg-[#112D55] blur-3xl opacity-60" />
        <div className="absolute w-40 h-40 rounded-full bg-[#F7E115] blur-3xl opacity-10" />
      </div>

      {/* 3D Container */}
      <div
        ref={containerRef}
        className="relative"
        style={{ transformStyle: "preserve-3d", width: 300, height: 300 }}
      >
        {/* Core sphere */}
        <div
          ref={coreRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ transform: "translate(-50%, -50%) translateZ(0px)" }}
        >
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#112D55] to-[#0A192F] border border-[#F7E115]/30 shadow-[0_0_40px_rgba(247,225,21,0.3),inset_0_0_20px_rgba(247,225,21,0.1)] flex items-center justify-center">
            <span className="font-[family-name:var(--font-syne)] font-black text-2xl text-[#F7E115]">KS</span>
          </div>
          {/* Orbit ring 1 */}
          <div className="absolute inset-0 -m-6 rounded-full border border-[#F7E115]/10 animate-[spin_8s_linear_infinite]" />
          <div className="absolute inset-0 -m-12 rounded-full border border-[#F7E115]/5 animate-[spin_14s_linear_infinite_reverse]" />
        </div>

        {/* Orbiting tech badges */}
        {techItems.map((tech, i) => {
          const angle = (360 / techItems.length) * i;
          const rad = (angle * Math.PI) / 180;
          const radius = 120;
          const x = Math.cos(rad) * radius;
          const y = Math.sin(rad) * radius;
          const zOffset = Math.sin(rad * 2) * 20;

          return (
            <div
              key={tech.label}
              ref={(el) => { if (el) orbitsRef.current[i] = el; }}
              className="absolute top-1/2 left-1/2 group"
              style={{
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) translateZ(${zOffset}px)`,
              }}
            >
              <div
                className="w-14 h-14 rounded-xl glass gradient-border flex flex-col items-center justify-center gap-0.5 hover:scale-110 transition-transform duration-200 cursor-default shadow-lg"
                style={{ boxShadow: `0 4px 20px ${tech.color}22` }}
              >
                <span className="text-lg leading-none">{tech.icon}</span>
                <span className="text-[9px] font-bold text-white/60 uppercase tracking-wider">
                  {tech.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating particles */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-[#F7E115] opacity-40"
          style={{
            width: Math.random() * 3 + 2 + "px",
            height: Math.random() * 3 + 2 + "px",
            left: 20 + Math.random() * 60 + "%",
            top: 20 + Math.random() * 60 + "%",
            animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 3}s`,
          }}
        />
      ))}
    </div>
  );
}
