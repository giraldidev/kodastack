"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "PulseFinance",
    category: "FinTech · Plataforma Web",
    description: "Dashboard de investimentos em tempo real com 200k+ usuários ativos, processando R$50M/mês.",
    tags: ["Next.js", "Node.js", "PostgreSQL", "AWS"],
    color: "#F7E115",
    year: "2024",
    metric: "200k+ usuários",
  },
  {
    title: "LogiTrack Pro",
    category: "Enterprise · Sistema ERP",
    description: "Sistema de logística integrado com rastreamento GPS, automação de rotas e BI em tempo real.",
    tags: ["React", "Python", "Redis", "GCP"],
    color: "#61DAFB",
    year: "2024",
    metric: "40% + eficiência",
  },
  {
    title: "MedConnect",
    category: "HealthTech · Mobile",
    description: "App de telemedicina com agendamento, prontuário eletrônico e integração com planos de saúde.",
    tags: ["React Native", "TypeScript", "Firebase"],
    color: "#68A063",
    year: "2023",
    metric: "4.9★ App Store",
  },
  {
    title: "EduVerse",
    category: "EdTech · Plataforma LMS",
    description: "Plataforma de educação online com streaming de vídeo adaptativo, gamificação e certificação.",
    tags: ["Next.js", "Prisma", "Cloudflare", "Stripe"],
    color: "#FF9900",
    year: "2023",
    metric: "15k+ alunos",
  },
];

export default function PortfolioSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8,
          scrollTrigger: { trigger: titleRef.current, start: "top 80%" } }
      );

      const items = gridRef.current?.children;
      if (items) {
        gsap.fromTo(
          Array.from(items),
          { y: 60, opacity: 0, scale: 0.95 },
          {
            y: 0, opacity: 1, scale: 1, duration: 0.7,
            ease: "power3.out", stagger: 0.12,
            scrollTrigger: { trigger: gridRef.current, start: "top 75%" },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="portfolio" className="relative py-32 bg-[#050D1A] overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" />

      <div className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none">
        <div className="w-full h-full rounded-full bg-[#F7E115] opacity-[0.03] blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div ref={titleRef} className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-[#F7E115]" />
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#F7E115]">
              Portfólio
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="font-[family-name:var(--font-syne)] font-black text-4xl md:text-5xl text-white leading-tight">
              Projetos que{" "}
              <span className="text-[#F7E115]">falam</span>
              <br />
              por si mesmos.
            </h2>
            <a
              href="#contato"
              className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white border-b border-white/15 hover:border-white/50 pb-0.5 transition-all self-start md:self-auto"
            >
              Ver todos os projetos
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </a>
          </div>
        </div>

        {/* Asymmetric grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((project, i) => (
            <div
              key={project.title}
              className={`relative rounded-2xl overflow-hidden group cursor-pointer ${i === 0 ? "md:row-span-1" : ""}`}
            >
              {/* Card background */}
              <div
                className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500"
                style={{ background: `radial-gradient(ellipse at 30% 30%, ${project.color}, transparent 70%)` }}
              />
              <div
                className="glass rounded-2xl p-8 h-full relative overflow-hidden"
                style={{ border: `1px solid rgba(255,255,255,0.07)` }}
              >
                {/* Top accent line */}
                <div
                  className="absolute top-0 left-0 right-0 h-px group-hover:opacity-100 opacity-40 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, transparent, ${project.color}, transparent)` }}
                />

                <div className="flex items-start justify-between mb-6">
                  <div>
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/30 mb-2 block">
                      {project.category}
                    </span>
                    <h3 className="font-[family-name:var(--font-syne)] font-black text-2xl text-white">
                      {project.title}
                    </h3>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-xs text-white/30">{project.year}</span>
                    <span
                      className="text-xs font-bold px-2 py-0.5 rounded-full"
                      style={{ color: project.color, background: `${project.color}15`, border: `1px solid ${project.color}30` }}
                    >
                      {project.metric}
                    </span>
                  </div>
                </div>

                <p className="text-white/45 text-sm leading-relaxed mb-6">
                  {project.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-[10px] text-white/30 border border-white/8 px-2 py-0.5 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div
                    className="w-8 h-8 rounded-full border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0 translate-x-2 flex-shrink-0"
                    style={{ borderColor: `${project.color}50`, color: project.color }}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M1 6h10M6 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
