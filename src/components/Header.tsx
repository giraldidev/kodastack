"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const navLinks = [
  { label: "Sobre Nós", href: "#sobre" },
  { label: "Portfólio", href: "#portfolio" },
  { label: "Soluções Tech", href: "#solucoes" },
  { label: "Processo Ágil", href: "#processo" },
];

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);
  const btnInnerRef = useRef<HTMLSpanElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Magnetic button effect
  useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(btn, { x: x * 0.35, y: y * 0.35, duration: 0.3, ease: "power2.out" });
      if (btnInnerRef.current) {
        gsap.to(btnInnerRef.current, { x: x * 0.15, y: y * 0.15, duration: 0.3, ease: "power2.out" });
      }
    };

    const handleMouseLeave = () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.5)" });
      if (btnInnerRef.current) {
        gsap.to(btnInnerRef.current, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.5)" });
      }
    };

    const area = btn.parentElement!;
    area.addEventListener("mousemove", handleMouseMove);
    area.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      area.removeEventListener("mousemove", handleMouseMove);
      area.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Entrance animation
  useEffect(() => {
    gsap.fromTo(
      headerRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2 }
    );
  }, []);

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "py-3 bg-[#0A192F]/90 backdrop-blur-xl border-b border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-[#F7E115] flex items-center justify-center shadow-[0_0_20px_rgba(247,225,21,0.4)] group-hover:shadow-[0_0_30px_rgba(247,225,21,0.6)] transition-shadow duration-300">
            <span className="text-[#0A192F] font-black text-sm leading-none font-[family-name:var(--font-syne)]">K</span>
          </div>
          <span className="font-[family-name:var(--font-syne)] font-bold text-lg tracking-tight text-white">
            Koda<span className="text-[#F7E115]">Stack</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-white/60 hover:text-white transition-colors duration-200 relative group"
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#F7E115] group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </nav>

        {/* CTA magnetic zone */}
        <div className="hidden md:block p-6 -m-6">
          <a
            ref={btnRef}
            href="#contato"
            className="relative inline-flex items-center justify-center px-6 py-2.5 bg-[#F7E115] text-[#0A192F] font-semibold text-sm rounded-full overflow-hidden group hover:shadow-[0_0_30px_rgba(247,225,21,0.5)] transition-shadow duration-300"
          >
            <span
              ref={btnInnerRef}
              className="relative z-10 inline-flex items-center gap-2"
            >
              Fale Conosco
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 rounded-full" />
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Menu"
        >
          <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
        <nav className="px-6 py-4 flex flex-col gap-4 border-t border-white/5 bg-[#0A192F]/95 backdrop-blur-xl">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-white/70 hover:text-white py-1 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contato"
            onClick={() => setMenuOpen(false)}
            className="mt-2 inline-flex justify-center px-6 py-3 bg-[#F7E115] text-[#0A192F] font-semibold rounded-full text-sm"
          >
            Fale Conosco
          </a>
        </nav>
      </div>
    </header>
  );
}
