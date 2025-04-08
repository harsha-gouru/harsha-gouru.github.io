import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-off-white">
      <header className="fixed w-full bg-off-white/80 backdrop-blur-sm z-50">
        <nav className="border-b border-warm-gray-200">
          <div className="max-w-6xl mx-auto px-6 md:px-8">
            <div className="flex justify-between h-24">
              <div className="flex items-center space-x-16">
                <Link to="/" className="text-lg tracking-wider text-warm-gray-900">
                  HARSHA'S NOTES
                </Link>
                <div className="hidden md:flex space-x-12">
                  <Link
                    to="/"
                    className={`nav-link ${isActiveRoute('/') && 'nav-link-active'}`}
                  >
                    Home
                  </Link>
                  <Link
                    to="/about"
                    className={`nav-link ${isActiveRoute('/about') && 'nav-link-active'}`}
                  >
                    About
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <main className="pt-32 min-h-screen">
        {children}
      </main>

      <footer className="border-t border-warm-gray-200 mt-32">
        <div className="max-w-6xl mx-auto px-6 md:px-8 py-24">
          <div className="grid gap-16 md:grid-cols-2">
            <div className="space-y-8">
              <h3 className="text-sm tracking-widest uppercase text-warm-gray-900">
                About
              </h3>
              <p className="text-warm-gray-600 tracking-wide leading-relaxed max-w-md">
                A personal collection of notes on design, development, and the intersection of technology and aesthetics.
              </p>
            </div>
            <div className="space-y-8">
              <h3 className="text-sm tracking-widest uppercase text-warm-gray-900">
                Connect
              </h3>
              <div className="space-y-4">
                <a
                  href="https://github.com/harsha-gouru"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-warm-gray-600 tracking-wide hover:text-warm-gray-900 transition-colors duration-300"
                >
                  GitHub
                </a>
                <a
                  href="https://linkedin.com/in/harsha-gouru"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-warm-gray-600 tracking-wide hover:text-warm-gray-900 transition-colors duration-300"
                >
                  LinkedIn
                </a>
                <a
                  href="mailto:harsha.gouru@example.com"
                  className="block text-warm-gray-600 tracking-wide hover:text-warm-gray-900 transition-colors duration-300"
                >
                  Email
                </a>
              </div>
            </div>
          </div>
          <div className="mt-24 pt-8 border-t border-warm-gray-200">
            <p className="text-sm text-warm-gray-500 tracking-wide">
              © {new Date().getFullYear()} Harsha's Notes. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout; 