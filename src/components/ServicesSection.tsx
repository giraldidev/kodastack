"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" width={40} height={40}>
        <rect x="6" y="8" width="28" height="18" rx="3" stroke="#F7E115" strokeWidth="1.5" />
        <path d="M14 30h12M20 26v4" stroke="#F7E115" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M12 17l3 3 6-6" stroke="#F7E115" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    category: "Produto Digital",
    title: "Aplicativos Móveis & Plataformas Web",
    description:
      "Desenvolvemos aplicações mobile nativas e cross-platform (iOS/Android) e plataformas web de alta conversão, com UX de classe mundial e performance acima da média do mercado.",
    tags: ["React Native", "Next.js", "PWA", "iOS", "Android"],
    accent: "#F7E115",
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" width={40} height={40}>
        <rect x="6" y="6" width="12" height="12" rx="2" stroke="#61DAFB" strokeWidth="1.5" />
        <rect x="22" y="6" width="12" height="12" rx="2" stroke="#61DAFB" strokeWidth="1.5" />
        <rect x="6" y="22" width="12" height="12" rx="2" stroke="#61DAFB" strokeWidth="1.5" />
        <rect x="22" y="22" width="12" height="12" rx="2" stroke="#61DAFB" strokeWidth="1.5" />
        <path d="M18 12h4M20 6v28M6 20h28" stroke="#61DAFB" strokeWidth="1" strokeOpacity="0.4" />
      </svg>
    ),
    category: "Enterprise",
    title: "Sistemas Corporativos Complexos",
    description:
      "Arquitetamos e entregamos sistemas ERP, CRM e plataformas B2B sob medida, com integrações robustas, escalabilidade na nuvem e segurança de nível bancário.",
    tags: ["Microsserviços", "AWS", "PostgreSQL", "Docker", "CI/CD"],
    accent: "#61DAFB",
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" width={40} height={40}>
        <path d="M20 6C12.268 6 6 12.268 6 20s6.268 14 14 14 14-6.268 14-14S27.732 6 20 6z" stroke="#68A063" strokeWidth="1.5" />
        <path d="M20 6v28M6 20h28M9 11l22 18M31 11L9 29" stroke="#68A063" strokeWidth="1" strokeOpacity="0.3" />
        <circle cx="20" cy="20" r="3" fill="#68A063" />
      </svg>
    ),
    category: "Estratégia & Ops",
    title: "Consultoria Tech & DevOps",
    description:
      "Auditoria arquitetural, migração para cloud, automação de pipelines e squads dedicados — transformamos o seu stack técnico em uma vantagem competitiva real.",
    tags: ["Kubernetes", "Terraform", "GitHub Actions", "Observability"],
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
              Soluções que{" "}
              <span className="text-[#F7E115]">transformam</span>{" "}
              negócios.
            </h2>
            <p className="text-white/45 text-sm max-w-xs leading-relaxed md:text-right">
              Do conceito à produção — construímos produtos que
              escalam e geram resultados mensuráveis.
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
