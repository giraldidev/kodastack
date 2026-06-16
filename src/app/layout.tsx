import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Koda Stack — Desenvolvimento de Software Excepcional",
  description:
    "Agência de desenvolvimento full stack focada em soluções digitais de alta performance, sistemas corporativos e consultoria tecnológica.",
  keywords:
    "desenvolvimento software, full stack, mobile, sistemas corporativos, consultoria tech, devops",
  openGraph: {
    title: "Koda Stack — Desenvolvimento de Software Excepcional",
    description:
      "Transformamos visões ambiciosas em produtos digitais de alto impacto.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${syne.variable} antialiased`}
    >
      <body className="bg-[#0A192F] text-[#e8eaf0]">{children}</body>
    </html>
  );
}
