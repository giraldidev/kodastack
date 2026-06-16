"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    title: "Descoberta & Estratégia",
    description:
      "Mergulhamos no seu negócio: mapeamos objetivos, analisamos o mercado e definimos a arquitetura técnica ideal antes de escrever uma linha de código.",
    icon: "◈",
    duration: "1–2 semanas",
  },
  {
    number: "02",
    title: "Design & Prototipagem",
    description:
      "Criamos wireframes de alta fidelidade e protótipos interativos validados com usuários reais, garantindo que a interface converta e encante.",
    icon: "◉",
    duration: "2–3 semanas",
  },
  {
    number: "03",
    title: "Desenvolvimento Ágil",
    description:
      "Sprints de 2 semanas com entregas contínuas, code reviews rigorosos, testes automatizados e deploy em ambiente de staging após cada iteração.",
    icon: "◐",
    duration: "4–12 semanas",
  },
  {
    number: "04",
    title: "QA & Performance",
    description:
      "Bateria completa de testes — unitários, integração, E2E e carga — além de auditoria de performance para atingir Core Web Vitals nota 100.",
    icon: "◑",
    duration: "1–2 semanas",
  },
  {
    number: "05",
    title: "Launch & Crescimento",
    description:
      "Deploy com zero downtime, monitoramento em tempo real e suporte pós-lançamento. Seu produto cresce e nós crescemos junto com ele.",
    icon: "◍",
    duration: "Contínuo",
  },
];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title
      gsap.fromTo(
        titleRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8,
          scrollTrigger: { trigger: titleRef.current, start: "top 80%" },
        }
      );

      // Animate SVG timeline line drawing
      if (lineRef.current) {
        const length = lineRef.current.getTotalLength();
        gsap.set(lineRef.current, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });
        gsap.to(lineRef.current, {
          strokeDashoffset: 0,
          duration: 2,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "bottom 80%",
            scrub: 1,
          },
        });
      }

      // Steps stagger
      stepsRef.current.forEach((step, i) => {
        if (!step) return;
        gsap.fromTo(
          step,
          { y: 50, opacity: 0, x: i % 2 === 0 ? -20 : 20 },
          {
            y: 0, opacity: 1, x: 0, duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: step,
              start: "top 82%",
            },
            delay: i * 0.1,
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="processo" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #050D1A 0%, #0A192F 100%)" }} />
      <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />

      {/* Decorative orbs */}
      <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-[#112D55] blur-[100px] opacity-40 pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-64 h-64 rounded-full bg-[#F7E115] blur-[120px] opacity-5 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div ref={titleRef} className="mb-20 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-[#F7E115]" />
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#F7E115]">
              Processo Ágil
            </span>
            <div className="w-8 h-px bg-[#F7E115]" />
          </div>
          <h2 className="font-[family-name:var(--font-syne)] font-black text-4xl md:text-5xl text-white mb-4">
            Do briefing ao{" "}
            <span className="text-[#F7E115]">lançamento</span>.
          </h2>
          <p className="text-white/45 max-w-md mx-auto text-sm leading-relaxed">
            Um processo transparente e iterativo que elimina surpresas e entrega
            valor em cada etapa do projeto.
          </p>
        </div>

        {/* Timeline — desktop horizontal sinuous, mobile vertical */}
        <div className="hidden lg:block relative mb-12">
          {/* SVG connecting line */}
          <svg
            className="absolute inset-x-0 top-16 pointer-events-none"
            style={{ height: 80, width: "100%" }}
            viewBox="0 0 1200 80"
            preserveAspectRatio="none"
          >
            <path
              ref={lineRef}
              d="M0 40 C150 10, 250 70, 400 40 S650 10, 800 40 S1050 70, 1200 40"
              fill="none"
              stroke="#F7E115"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.5"
            />
            {/* Dots at each step position */}
            {[0, 25, 50, 75, 100].map((pct, i) => (
              <circle
                key={i}
                cx={pct === 0 ? 0 : pct === 100 ? 1200 : pct * 12}
                cy={40}
                r={4}
                fill="#F7E115"
                opacity={0.8}
              />
            ))}
          </svg>

          {/* Steps */}
          <div className="grid grid-cols-5 gap-4">
            {steps.map((step, i) => (
              <div
                key={step.number}
                ref={(el) => { stepsRef.current[i] = el; }}
                className={`relative pt-24 ${i % 2 === 0 ? "" : "pt-32"}`}
              >
                {/* Number bubble */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full border border-[#F7E115]/40 bg-[#0A192F] flex items-center justify-center z-10">
                  <span className="text-[#F7E115] text-xs font-bold font-[family-name:var(--font-syne)]">
                    {step.number}
                  </span>
                </div>

                {/* Card */}
                <div className="glass gradient-border rounded-xl p-5 group hover:border-[#F7E115]/30 transition-all duration-300">
                  <div className="text-2xl mb-3 text-[#F7E115] opacity-70">{step.icon}</div>
                  <h3 className="font-[family-name:var(--font-syne)] font-bold text-sm text-white mb-2 leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-xs text-white/40 leading-relaxed mb-3">
                    {step.description}
                  </p>
                  <span className="text-[10px] font-semibold text-[#F7E115]/60 border border-[#F7E115]/20 px-2 py-0.5 rounded-full">
                    {step.duration}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile vertical timeline */}
        <div className="lg:hidden relative">
          <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-[#F7E115]/40 via-[#F7E115]/20 to-transparent" />

          <div className="flex flex-col gap-8">
            {steps.map((step, i) => (
              <div
                key={step.number}
                ref={(el) => { stepsRef.current[i] = el; }}
                className="relative pl-16"
              >
                {/* Number bubble */}
                <div className="absolute left-0 top-4 w-10 h-10 rounded-full border border-[#F7E115]/40 bg-[#0A192F] flex items-center justify-center z-10">
                  <span className="text-[#F7E115] text-xs font-bold font-[family-name:var(--font-syne)]">
                    {step.number}
                  </span>
                </div>

                <div className="glass gradient-border rounded-xl p-6">
                  <div className="text-2xl mb-3 text-[#F7E115] opacity-70">{step.icon}</div>
                  <h3 className="font-[family-name:var(--font-syne)] font-bold text-base text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-white/40 leading-relaxed mb-3">
                    {step.description}
                  </p>
                  <span className="text-[10px] font-semibold text-[#F7E115]/60 border border-[#F7E115]/20 px-2 py-0.5 rounded-full">
                    {step.duration}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
