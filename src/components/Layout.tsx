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
    <div className="min-h-screen bg-slate-50">
      <header className="fixed w-full bg-white/90 backdrop-blur-sm z-50 shadow-sm">
        <nav className="border-b border-slate-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="flex justify-between h-16 md:h-20">
              <div className="flex items-center">
                <Link to="/" className="flex items-center">
                  <div className="w-8 h-8 mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none">
                      <rect width="32" height="32" rx="8" fill="#1E293B" />
                      <path d="M8 8H24M8 16H24M8 24H24M16 8V24M12 8V12M20 8V12M12 20V24M20 20V24" 
                        stroke="#94A3B8" strokeWidth="1" strokeLinecap="round" />
                      <circle cx="12" cy="8" r="1.5" fill="#38BDF8" />
                      <circle cx="20" cy="8" r="1.5" fill="#38BDF8" />
                      <circle cx="12" cy="24" r="1.5" fill="#38BDF8" />
                      <circle cx="20" cy="24" r="1.5" fill="#38BDF8" />
                      <circle cx="16" cy="16" r="2.5" fill="#22D3EE" />
                    </svg>
                  </div>
                  <span className="text-lg font-medium tracking-wide text-slate-900">
                    Harsha's <span className="text-cyan-600">Tech Hub</span>
                  </span>
                </Link>
                <div className="hidden md:flex ml-8 space-x-8">
                  <Link
                    to="/"
                    className={`py-1 border-b-2 ${
                      isActiveRoute('/') 
                        ? 'border-cyan-500 text-cyan-600' 
                        : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
                    } transition-colors`}
                  >
                    Home
                  </Link>
                  <Link
                    to="/about"
                    className={`py-1 border-b-2 ${
                      isActiveRoute('/about') 
                        ? 'border-cyan-500 text-cyan-600' 
                        : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
                    } transition-colors`}
                  >
                    About
                  </Link>
                </div>
              </div>
              <div className="flex items-center">
                <a 
                  href="https://github.com/harsha-gouru" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <main className="pt-20 md:pt-24 pb-16 min-h-[calc(100vh-300px)]">
        {children}
      </main>

      <footer className="border-t border-warm-gray-100 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 md:py-16">
          <div className="grid gap-12 md:grid-cols-2">
            <div className="space-y-4">
              <h3 className="text-sm tracking-widest uppercase text-slate-900 font-semibold">
                About This Blog
              </h3>
              <p className="text-slate-600 leading-relaxed max-w-md">
                Exploring the intersection of quantum computing, modern web development, and AI. 
                Join me on this journey through cutting-edge technology.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm tracking-widest uppercase text-slate-900 font-semibold">
                Connect
              </h3>
              <div className="space-y-3">
                <a
                  href="https://github.com/harsha-gouru"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-slate-600 hover:text-slate-900 transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub
                </a>
                <a
                  href="https://linkedin.com/in/harsha-gouru"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-slate-600 hover:text-slate-900 transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  LinkedIn
                </a>
                <a
                  href="mailto:harsha.gouru@example.com"
                  className="flex items-center text-slate-600 hover:text-slate-900 transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z"/>
                  </svg>
                  Email
                </a>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-6 border-t border-slate-100 text-center">
            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} Harsha's Tech Hub. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout; 