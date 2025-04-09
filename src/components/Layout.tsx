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
    <div className="min-h-screen bg-white">
      <header className="fixed w-full bg-white/90 backdrop-blur-sm z-50 shadow-sm">
        <nav className="border-b border-warm-gray-100">
          <div className="container-base">
            <div className="flex justify-between h-16 md:h-20">
              <div className="flex items-center space-x-8 md:space-x-12">
                <Link to="/" className="text-lg font-medium tracking-wider text-warm-gray-900">
                  HARSHA'S BLOG
                </Link>
                <div className="hidden md:flex space-x-8">
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

      <main className="pt-16 md:pt-20 pb-16 min-h-[calc(100vh-300px)]">
        {children}
      </main>

      <footer className="border-t border-warm-gray-100 bg-warm-gray-50/50">
        <div className="container-base py-12 md:py-16">
          <div className="grid gap-12 md:grid-cols-2">
            <div className="space-y-6">
              <h3 className="heading-4 uppercase text-warm-gray-900">
                About
              </h3>
              <p className="body-normal max-w-md">
                A personal collection of notes on design, development, and the intersection of technology and aesthetics.
              </p>
            </div>
            <div className="space-y-6">
              <h3 className="heading-4 uppercase text-warm-gray-900">
                Connect
              </h3>
              <div className="space-y-4">
                <a
                  href="https://github.com/harsha-gouru"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block body-normal hover:text-warm-gray-900 transition-colors duration-300"
                >
                  GitHub
                </a>
                <a
                  href="https://linkedin.com/in/harsha-gouru"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block body-normal hover:text-warm-gray-900 transition-colors duration-300"
                >
                  LinkedIn
                </a>
                <a
                  href="mailto:harsha.gouru@example.com"
                  className="block body-normal hover:text-warm-gray-900 transition-colors duration-300"
                >
                  Email
                </a>
              </div>
            </div>
          </div>
          <div className="mt-16 pt-6 border-t border-warm-gray-200">
            <p className="body-small">
              © {new Date().getFullYear()} Harsha's Blog. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout; 