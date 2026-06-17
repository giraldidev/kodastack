"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" width={40} height={40}>
        <rect x="4" y="6" width="32" height="20" rx="2.5" stroke="#F7E115" strokeWidth="1.5"/>
        <path d="M4 12h32" stroke="#F7E115" strokeWidth="1.5" strokeOpacity=".4"/>
        <circle cx="8" cy="9" r="1.2" fill="#F7E115" fillOpacity=".5"/>
        <circle cx="12" cy="9" r="1.2" fill="#F7E115" fillOpacity=".5"/>
        <circle cx="16" cy="9" r="1.2" fill="#F7E115" fillOpacity=".5"/>
        <path d="M12 19h16M16 23h8" stroke="#F7E115" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M14 33h12M20 26v7" stroke="#F7E115" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    category: "Conversão",
    title: "Landing Pages de Alta Conversão",
    description:
      "Páginas que vendem enquanto você dorme. Design premium, animações que encantam e copy estratégico — tudo otimizado para transformar visitante em lead.",
    tags: ["Design Exclusivo", "GSAP Animations", "SEO Técnico", "Entrega em 7 dias"],
    accent: "#F7E115",
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" width={40} height={40}>
        <rect x="4" y="4" width="14" height="14" rx="2.5" stroke="#61DAFB" strokeWidth="1.5"/>
        <rect x="22" y="4" width="14" height="14" rx="2.5" stroke="#61DAFB" strokeWidth="1.5"/>
        <rect x="4" y="22" width="14" height="14" rx="2.5" stroke="#61DAFB" strokeWidth="1.5"/>
        <rect x="22" y="22" width="14" height="14" rx="2.5" stroke="#61DAFB" strokeWidth="1.5"/>
        <path d="M18 11h4M20 18v4M18 29h4" stroke="#61DAFB" strokeWidth="1" strokeOpacity=".4" strokeLinecap="round"/>
      </svg>
    ),
    category: "Enterprise",
    title: "Sistemas Empresariais sob Medida",
    description:
      "Softwares construídos para o jeito que sua empresa trabalha — não o contrário. Automatizamos processos, eliminamos planilhas e conectamos setores em uma única plataforma.",
    tags: ["CRM & ERP", "Automação de Processos", "Integrações API", "Suporte Contínuo"],
    accent: "#61DAFB",
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" width={40} height={40}>
        <circle cx="20" cy="20" r="14" stroke="#68A063" strokeWidth="1.5"/>
        <path d="M20 12v8.5l4.5 2.5" stroke="#68A063" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10 8C12.5 6.2 15.6 5 19 5" stroke="#68A063" strokeWidth="1.5" strokeLinecap="round" strokeOpacity=".4"/>
      </svg>
    ),
    category: "Estratégia",
    title: "Consultoria Técnica Estratégica",
    description:
      "Antes de escrever uma linha de código, a gente entende a sua dor. Mapeamos o problema real, desenhamos a solução ideal e entregamos um roadmap claro — sem achismos.",
    tags: ["Diagnóstico de Negócio", "Mapeamento de Processos", "Tech Stack", "Roadmap"],
    accent: "#68A063",
  },
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    let bounds: DOMRect;

    const refresh = () => { bounds = card.getBoundingClientRect(); };
    refresh();

    // 3D Tilt effect
    const handleMouseMove = (e: MouseEvent) => {
      if (!bounds) return;
      const x = e.clientX - bounds.left;
      const y = e.clientY - bounds.top;
      const centerX = bounds.width / 2;
      const centerY = bounds.height / 2;
      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      gsap.to(card, {
        rotateX,
        rotateY,
        transformPerspective: 800,
        duration: 0.3,
        ease: "power2.out",
      });

      // Glow follow
      if (glowRef.current) {
        gsap.to(glowRef.current, {
          opacity: 1,
          x: x - 100,
          y: y - 100,
          duration: 0.3,
        });
      }
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.5)",
      });
      if (glowRef.current) {
        gsap.to(glowRef.current, { opacity: 0, duration: 0.4 });
      }
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", refresh);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", refresh);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="gsap-fade relative rounded-2xl p-8 cursor-default overflow-hidden group"
      style={{
        transformStyle: "preserve-3d",
        background: "rgba(255,255,255,0.03)",
        backdropFilter: "blur(20px)",
        border: `1px solid rgba(255,255,255,0.07)`,
      }}
      data-delay={index * 0.15}
    >
      {/* Gradient glow that follows cursor */}
      <div
        ref={glowRef}
        className="absolute w-48 h-48 rounded-full pointer-events-none opacity-0"
        style={{
          background: `radial-gradient(circle, ${service.accent}22 0%, transparent 70%)`,
        }}
      />

      {/* Top border accent */}
      <div
        className="absolute top-0 left-8 right-8 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${service.accent}60, transparent)`,
        }}
      />

      {/* Category badge */}
      <div className="flex items-center gap-3 mb-6">
        <span
          className="text-[10px] font-bold tracking-[0.2em] uppercase px-2.5 py-1 rounded-full"
          style={{
            color: service.accent,
            background: `${service.accent}15`,
            border: `1px solid ${service.accent}30`,
          }}
        >
          {service.category}
        </span>
      </div>

      {/* Icon */}
      <div className="mb-5 opacity-90 group-hover:opacity-100 transition-opacity">
        {service.icon}
      </div>

      {/* Title */}
      <h3 className="font-[family-name:var(--font-syne)] font-bold text-xl text-white mb-3 leading-tight">
        {service.title}
      </h3>

      {/* Description */}
      <p className="text-white/50 text-sm leading-relaxed mb-6">
        {service.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {service.tags.map((tag) => (
          <span
            key={tag}
            className="text-[10px] font-medium px-2.5 py-1 rounded-full text-white/40 border border-white/8 hover:border-white/20 hover:text-white/70 transition-all"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Hover arrow */}
      <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ color: service.accent }}
      >
        Saiba mais
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M1 6h10M6 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
}

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section title
      gsap.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
          },
        }
      );

      // Cards stagger
      const cards = cardsRef.current?.querySelectorAll(".gsap-fade");
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.15,
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 75%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="solucoes"
      className="relative py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[#050D1A]" />
      <div className="absolute inset-0 bg-grid opacity-60 pointer-events-none" />

      {/* Side decoration */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-64 bg-gradient-to-b from-transparent via-[#F7E115]/30 to-transparent" />
      <div className="absolute right-0 top-1/3 w-px h-48 bg-gradient-to-b from-transparent via-white/10 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div ref={titleRef} className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-[#F7E115]" />
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#F7E115]">
              Nossas Especialidades
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="font-[family-name:var(--font-syne)] font-black text-4xl md:text-5xl text-white leading-tight max-w-xl">
              O que a gente{" "}
              <span className="text-[#F7E115]">faz de verdade</span>.
            </h2>
            <p className="text-white/45 text-sm max-w-xs leading-relaxed md:text-right">
              Três serviços com foco total — cada um pensado para gerar
              resultado real, não apenas entregar código.
            </p>
          </div>
        </div>

        {/* Cards grid — asymmetric */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {services.map((service, i) => (
            <div
              key={service.title}
              className={i === 1 ? "lg:mt-10" : i === 2 ? "lg:mt-5" : ""}
            >
              <ServiceCard service={service} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
