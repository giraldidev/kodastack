export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#050D1A] border-t border-white/5 py-16 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#F7E115] flex items-center justify-center shadow-[0_0_20px_rgba(247,225,21,0.3)]">
                <span className="text-[#0A192F] font-black text-sm font-[family-name:var(--font-syne)]">K</span>
              </div>
              <span className="font-[family-name:var(--font-syne)] font-bold text-lg text-white">
                Koda<span className="text-[#F7E115]">Stack</span>
              </span>
            </div>
            <p className="text-white/35 text-sm leading-relaxed max-w-xs mb-6">
              Desenvolvimento de software excepcional — full stack, focado no futuro e comprometido com o seu resultado.
            </p>
            <div className="flex gap-3">
              {[
                { label: "ig", href: "https://instagram.com/kodastack.dev", title: "Instagram da Koda Stack" },
                { label: "ceo", href: "https://instagram.com/giraldidev", title: "CEO @giraldidev" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  title={social.title}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg glass gradient-border flex items-center justify-center text-[10px] font-bold text-white/40 hover:text-white hover:border-white/20 transition-all"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-xs uppercase tracking-widest text-white/30 mb-4">Navegação</h4>
            <ul className="flex flex-col gap-3">
              {[
                { label: "Sobre Nós", href: "#sobre" },
                { label: "Portfólio", href: "#portfolio" },
                { label: "Soluções Tech", href: "#solucoes" },
                { label: "Processo Ágil", href: "#processo" },
                { label: "Fale Conosco", href: "#contato" },
              ].map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-white/40 hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-xs uppercase tracking-widest text-white/30 mb-4">Serviços</h4>
            <ul className="flex flex-col gap-3">
              {[
                "Aplicativos Mobile",
                "Plataformas Web",
                "Sistemas Corporativos",
                "Consultoria Tech",
                "DevOps & Cloud",
              ].map((s) => (
                <li key={s}>
                  <span className="text-sm text-white/40 cursor-default">{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5">
          <p className="text-xs text-white/25">
            © {currentYear} Koda Stack. Todos os direitos reservados.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-white/25 hover:text-white/50 transition-colors">
              Política de Privacidade
            </a>
            <a href="#" className="text-xs text-white/25 hover:text-white/50 transition-colors">
              Termos de Uso
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
