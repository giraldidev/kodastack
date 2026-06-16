"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const values = [
  { label: "Excelência Técnica", desc: "Stack moderno, código limpo e arquitetura que escala." },
  { label: "Transparência Total", desc: "Comunicação diária, acesso ao board do projeto e relatórios semanais." },
  { label: "Foco em Resultado", desc: "Métricas de negócio guiam cada decisão técnica que tomamos." },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const counterRefs = useRef<HTMLSpanElement[]>([]);

  const counters = [
    { end: 50, suffix: "+", label: "Projetos" },
    { end: 98, suffix: "%", label: "Satisfação" },
    { end: 7, suffix: "+", label: "Anos" },
    { end: 12, suffix: "+", label: "Tecnologias" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftRef.current,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: leftRef.current, start: "top 75%" } }
      );

      gsap.fromTo(
        rightRef.current,
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: rightRef.current, start: "top 75%" } }
      );

      // Counter animation
      counterRefs.current.forEach((el, i) => {
        if (!el) return;
        const target = counters[i].end;
        const suffix = counters[i].suffix;
        const obj = { val: 0 };
        gsap.fromTo(
          obj,
          { val: 0 },
          {
            val: target,
            duration: 1.5,
            ease: "power2.out",
            onUpdate: () => { el.textContent = Math.round(obj.val) + suffix; },
            scrollTrigger: { trigger: el, start: "top 80%", once: true },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="sobre" className="relative py-32 overflow-hidden bg-[#0A192F]">
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />

      {/* Accent decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-[#F7E115]/30 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div ref={leftRef}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-[#F7E115]" />
              <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#F7E115]">
                Sobre Nós
              </span>
            </div>

            <h2 className="font-[family-name:var(--font-syne)] font-black text-4xl md:text-5xl text-white leading-tight mb-6">
              Engenharia de software
              <br />
              com{" "}
              <span className="text-[#F7E115]">alma de startup</span>.
            </h2>

            <p className="text-white/50 text-base leading-relaxed mb-6">
              A Koda Stack nasceu da frustração com agências que entregam
              templates genéricos. Somos um time de engenheiros e designers
              obsessivos por qualidade — cada projeto é tratado como se fosse
              o nosso próprio produto.
            </p>
            <p className="text-white/40 text-sm leading-relaxed mb-10">
              Com mais de 7 anos de mercado, já aceleramos startups early-stage,
              modernizamos sistemas legados de grandes corporações e construímos
              plataformas que hoje servem centenas de milhares de usuários.
            </p>

            {/* Values */}
            <div className="flex flex-col gap-4">
              {values.map((v) => (
                <div key={v.label} className="flex items-start gap-3">
                  <div className="mt-1 w-4 h-4 rounded-sm bg-[#F7E115]/15 border border-[#F7E115]/40 flex items-center justify-center flex-shrink-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#F7E115]" />
                  </div>
                  <div>
                    <span className="font-semibold text-sm text-white">{v.label}</span>
                    <span className="text-white/40 text-sm"> — {v.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Counter grid + visual */}
          <div ref={rightRef} className="relative">
            {/* Asymmetric frame */}
            <div className="absolute -top-8 -right-8 w-48 h-48 border border-[#F7E115]/10 rounded-2xl rotate-6 pointer-events-none" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 border border-white/5 rounded-full pointer-events-none" />

            {/* Counter grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {counters.map((c, i) => (
                <div
                  key={c.label}
                  className="glass gradient-border rounded-2xl p-6 flex flex-col gap-1"
                >
                  <span
                    ref={(el) => { if (el) counterRefs.current[i] = el; }}
                    className="font-[family-name:var(--font-syne)] font-black text-3xl text-[#F7E115]"
                  >
                    0{c.suffix}
                  </span>
                  <span className="text-xs text-white/40 uppercase tracking-widest">{c.label}</span>
                </div>
              ))}
            </div>

            {/* Quote card */}
            <div className="glass gradient-border rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#F7E115]/40 to-transparent" />
              <blockquote className="text-white/60 text-sm leading-relaxed italic mb-4">
                "A Koda Stack não apenas entregou o sistema — eles nos ajudaram
                a pensar o produto. O resultado superou todas as nossas
                expectativas de prazo e qualidade."
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#F7E115]/30 to-[#112D55] flex items-center justify-center">
                  <span className="text-xs font-bold text-[#F7E115]">MC</span>
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">Marcos Costa</div>
                  <div className="text-[10px] text-white/40">CEO, FinTech Pulse</div>
                </div>
                <div className="ml-auto flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="10" height="10" viewBox="0 0 10 10" fill="#F7E115">
                      <path d="M5 1l1.09 2.26L9 3.82l-2 1.95.47 2.73L5 7.25 2.53 8.5 3 5.77 1 3.82l2.91-.56z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
