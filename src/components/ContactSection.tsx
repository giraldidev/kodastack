"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8,
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" } }
      );
      gsap.fromTo(
        formRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, delay: 0.15,
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSent(true);
  };

  const inputClass =
    "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#F7E115]/50 focus:bg-white/8 transition-all duration-200";

  return (
    <section ref={sectionRef} id="contato" className="relative py-32 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0A192F 0%, #050D1A 100%)" }}
    >
      <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />

      {/* Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-64 pointer-events-none">
        <div className="w-full h-full bg-[#F7E115] blur-[120px] opacity-[0.06] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div ref={leftRef}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-[#F7E115]" />
              <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#F7E115]">
                Fale Conosco
              </span>
            </div>

            <h2 className="font-[family-name:var(--font-syne)] font-black text-4xl md:text-5xl text-white leading-tight mb-6">
              Pronto para
              <br />
              <span className="text-[#F7E115]">construir</span>
              <br />
              algo incrível?
            </h2>

            <p className="text-white/45 text-sm leading-relaxed mb-10 max-w-sm">
              Nos conte sobre seu projeto. Respondemos em até 24 horas
              com uma análise inicial e proposta de valor.
            </p>

            {/* Contact info */}
            <div className="flex flex-col gap-5">
              {[
                { icon: "✉", label: "E-mail", value: "oi@kodastack.com.br" },
                { icon: "📱", label: "WhatsApp", value: "+55 (11) 99999-0000" },
                { icon: "📍", label: "Localização", value: "São Paulo, SP — Brasil" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl glass gradient-border flex items-center justify-center text-sm flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-[10px] text-white/30 uppercase tracking-wider mb-0.5">{item.label}</div>
                    <div className="text-sm text-white/70">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          {sent ? (
            <div className="glass gradient-border rounded-2xl p-10 flex flex-col items-center justify-center text-center gap-4 min-h-96">
              <div className="w-16 h-16 rounded-full bg-[#F7E115]/15 border border-[#F7E115]/40 flex items-center justify-center mb-2">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <path d="M5 14l6 6L23 8" stroke="#F7E115" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="font-[family-name:var(--font-syne)] font-bold text-xl text-white">
                Mensagem enviada!
              </h3>
              <p className="text-white/45 text-sm max-w-xs">
                Recebemos seu contato e retornaremos em até 24 horas com uma análise personalizada.
              </p>
            </div>
          ) : (
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="glass gradient-border rounded-2xl p-8 flex flex-col gap-5"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="text-[10px] font-semibold uppercase tracking-wider text-white/30 mb-2 block">
                    Nome *
                  </label>
                  <input required type="text" placeholder="Seu nome" className={inputClass} />
                </div>
                <div>
                  <label className="text-[10px] font-semibold uppercase tracking-wider text-white/30 mb-2 block">
                    E-mail *
                  </label>
                  <input required type="email" placeholder="seu@email.com" className={inputClass} />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-semibold uppercase tracking-wider text-white/30 mb-2 block">
                  Empresa
                </label>
                <input type="text" placeholder="Nome da empresa (opcional)" className={inputClass} />
              </div>

              <div>
                <label className="text-[10px] font-semibold uppercase tracking-wider text-white/30 mb-2 block">
                  Tipo de projeto *
                </label>
                <select required className={`${inputClass} cursor-pointer`}>
                  <option value="" className="bg-[#0A192F]">Selecione uma opção</option>
                  <option value="mobile" className="bg-[#0A192F]">Aplicativo Mobile</option>
                  <option value="web" className="bg-[#0A192F]">Plataforma Web</option>
                  <option value="corporate" className="bg-[#0A192F]">Sistema Corporativo</option>
                  <option value="consulting" className="bg-[#0A192F]">Consultoria Tech</option>
                  <option value="other" className="bg-[#0A192F]">Outro</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-semibold uppercase tracking-wider text-white/30 mb-2 block">
                  Sobre o projeto *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Descreva seu projeto, objetivos e prazos desejados..."
                  className={`${inputClass} resize-none`}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="relative w-full py-4 bg-[#F7E115] text-[#0A192F] font-bold rounded-xl overflow-hidden group hover:shadow-[0_0_40px_rgba(247,225,21,0.4)] transition-shadow disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Enviando...
                    </>
                  ) : (
                    <>
                      Enviar Proposta
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M1 8h14M8 1l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </>
                  )}
                </span>
                <span className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
              </button>

              <p className="text-center text-[10px] text-white/25">
                Sem spam. Sua privacidade é respeitada.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
