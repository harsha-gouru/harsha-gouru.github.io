import type { Metadata } from "next";
import { Space_Grotesk, Newsreader, JetBrains_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Sri Harsha Gouru",
  description: "Tinkerer. Builder. Learner.",
};

function Nav() {
  return (
    <nav className="flex items-center justify-between py-8">
      <Link
        href="/"
        className="text-sm text-muted hover:text-foreground transition-colors tracking-wide"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        harsha gouru
      </Link>
      <div className="flex gap-8 text-sm" style={{ fontFamily: "var(--font-sans)" }}>
        <Link href="/projects" className="text-muted hover:text-foreground transition-colors">
          projects
        </Link>
        <Link href="/blog" className="text-muted hover:text-foreground transition-colors">
          writing
        </Link>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border py-8 mt-20">
      <div className="flex items-center justify-between text-sm text-muted" style={{ fontFamily: "var(--font-sans)" }}>
        <span>&copy; 2026</span>
        <a
          href="https://github.com/harsha-gouru"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-foreground transition-colors"
        >
          github
        </a>
      </div>
    </footer>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${spaceGrotesk.variable} ${newsreader.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <div className="max-w-2xl mx-auto px-6">
          <Nav />
          <main className="min-h-[70vh]">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
