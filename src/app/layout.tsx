import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-cyber',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "ConteúdoMestre - Planejamento de Redes Sociais",
  description: "Automação para ajudar criadores e equipes de marketing a planejarem postagens para redes sociais de forma visual, estratégica e organizada.",
  keywords: ["marketing", "redes sociais", "planejamento", "calendário", "posts"],
  authors: [{ name: "ConteúdoMestre" }],
  creator: "ConteúdoMestre",
  publisher: "ConteúdoMestre",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0F172A",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={`${inter.variable} antialiased min-h-screen bg-background cyber-grid`}>
        {children}
      </body>
    </html>
  );
}
