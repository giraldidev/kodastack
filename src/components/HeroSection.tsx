"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import TechStack3D from "./TechStack3D";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const btnPrimaryRef = useRef<HTMLAnchorElement>(null);
  const btnInnerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.4 });

      tl.fromTo(
        badgeRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
      )
        .fromTo(
          headlineRef.current,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
          "-=0.3"
        )
        .fromTo(
          subRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
          "-=0.4"
        )
        .fromTo(
          ctaRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
          "-=0.3"
        )
        .fromTo(
          statsRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
          "-=0.2"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Magnetic on primary button
  useEffect(() => {
    const btn = btnPrimaryRef.current;
    if (!btn) return;

    const handleMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.3, ease: "power2.out" });
      if (btnInnerRef.current) {
        gsap.to(btnInnerRef.current, { x: x * 0.12, y: y * 0.12, duration: 0.3 });
      }
    };
    const handleLeave = () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.5)" });
      if (btnInnerRef.current) {
        gsap.to(btnInnerRef.current, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.5)" });
      }
    };

    const zone = btn.parentElement!;
    zone.addEventListener("mousemove", handleMove);
    zone.addEventListener("mouseleave", handleLeave);
    return () => {
      zone.removeEventListener("mousemove", handleMove);
      zone.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "linear-gradient(135deg, #050D1A 0%, #0A192F 40%, #0D2444 100%)" }}
    >
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid opacity-100 pointer-events-none" />

      {/* Radial glow top-right */}
      <div className="absolute top-0 right-0 w-[700px] h-[700px] pointer-events-none">
        <div className="w-full h-full rounded-full bg-[#112D55] opacity-40 blur-[120px] translate-x-1/4 -translate-y-1/4" />
      </div>

      {/* Bottom left glow */}
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] pointer-events-none">
        <div className="w-full h-full rounded-full bg-[#F7E115] opacity-5 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left — Text content */}
          <div className="flex flex-col">
            {/* Badge */}
            <div ref={badgeRef} className="inline-flex items-center gap-2 self-start mb-8">
              <div className="px-4 py-1.5 rounded-full glass gradient-border text-xs font-semibold tracking-widest uppercase text-[#F7E115]">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#F7E115] mr-2 animate-pulse" />
                Agência Full Stack Premium
              </div>
            </div>

            {/* H1 */}
            <h1
              ref={headlineRef}
              className="font-[family-name:var(--font-syne)] font-black text-5xl md:text-6xl xl:text-7xl leading-[1.0] tracking-tight text-white mb-6"
            >
              DESENVOLVIMENTO
              <br />
              DE SOFTWARE
              <br />
              <span className="text-[#F7E115] relative inline-block">
                EXCEPCIONAL.
                <span className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-[#F7E115] to-transparent" />
              </span>
              <br />
              <span className="text-white/30">FULL STACK,</span>
              <br />
              <span className="text-white/30">FOCADO NO FUTURO.</span>
            </h1>

            {/* Subtitle */}
            <p
              ref={subRef}
              className="text-lg text-white/50 leading-relaxed max-w-lg mb-10"
            >
              Entregamos produtos digitais de alto impacto — desde arquiteturas
              escaláveis até interfaces que convertem. Tecnologia sob medida,
              metodologia ágil e resultado que faz o negócio crescer.
            </p>

            {/* CTAs */}
            <div ref={ctaRef} className="flex flex-wrap gap-4 mb-14">
              {/* Magnetic zone */}
              <div className="p-8 -m-8">
                <a
                  ref={btnPrimaryRef}
                  href="#contato"
                  className="relative inline-flex items-center gap-3 px-8 py-4 bg-[#F7E115] text-[#0A192F] font-bold text-base rounded-full overflow-hidden group animate-pulse-glow hover:shadow-[0_0_50px_rgba(247,225,21,0.6)] transition-shadow"
                >
                  <span ref={btnInnerRef} className="relative z-10 flex items-center gap-3">
                    Iniciar Projeto
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M1 9h16M9 1l8 8-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-400 rounded-full" />
                </a>
              </div>

              <a
                href="#portfolio"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/15 text-white/70 hover:text-white hover:border-white/40 transition-all duration-300 text-base group"
              >
                Ver Portfólio
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="group-hover:translate-x-1 transition-transform">
                  <path d="M1 8h14M8 1l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </a>
            </div>

            {/* Stats */}
            <div ref={statsRef} className="flex items-center gap-8 pt-8 border-t border-white/8">
              {[
                { value: "50+", label: "Projetos entregues" },
                { value: "98%", label: "Satisfação do cliente" },
                { value: "7+", label: "Anos de mercado" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <span className="font-[family-name:var(--font-syne)] font-bold text-2xl text-[#F7E115]">
                    {stat.value}
                  </span>
                  <span className="text-xs text-white/40 mt-0.5">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — 3D Tech Stack */}
          <div className="relative flex items-center justify-center">
            {/* Decorative asymmetric frame */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-8 right-8 w-32 h-32 border border-[#F7E115]/15 rounded-xl rotate-12" />
              <div className="absolute bottom-12 left-4 w-20 h-20 border border-white/8 rounded-full" />
              <div className="absolute top-1/2 left-0 w-1 h-24 bg-gradient-to-b from-[#F7E115]/40 to-transparent rounded-full -translate-y-1/2" />
            </div>
            <TechStack3D />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="text-xs tracking-widest uppercase text-white/40">Rolar</span>
        <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent animate-[pulse_2s_ease-in-out_infinite]" />
      </div>
    </section>
  );
}
