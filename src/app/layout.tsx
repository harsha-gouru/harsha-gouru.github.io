import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sri Harsha Gouru",
  description: "Tinkerer. Builder. Learner.",
};

function Nav() {
  return (
    <nav className="flex items-center justify-between py-8">
      <Link href="/" className="font-mono text-sm text-muted hover:text-foreground transition-colors">
        ~/harsha
      </Link>
      <div className="flex gap-6 font-mono text-sm">
        <Link href="/projects" className="text-muted hover:text-foreground transition-colors">
          projects
        </Link>
        <Link href="/blog" className="text-muted hover:text-foreground transition-colors">
          blog
        </Link>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border py-8 mt-20">
      <div className="flex items-center justify-between text-sm text-muted">
        <span className="font-mono">Sri Harsha Gouru</span>
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
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
