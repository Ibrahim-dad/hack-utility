import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Terminal, Menu, X, Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CATEGORIES } from "@/lib/registry";
import { useTheme } from "@/lib/theme";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const { theme, toggleTheme } = useTheme();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col w-full relative overflow-x-hidden">
      {/* Background elements */}
      <div className="fixed inset-0 z-[-1] bg-background"></div>
      
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-xl border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center gap-2 group" aria-label="Hack Utility Home">
                <div className="p-1.5 bg-primary/10 rounded-md group-hover:bg-primary/20 transition-colors">
                  <Terminal className="h-6 w-6 text-primary" />
                </div>
                <span className="font-display font-bold text-xl tracking-tight text-foreground group-hover:text-primary transition-colors">
                  Hack Utility
                </span>
              </Link>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-8" aria-label="Main Navigation">
              {Object.entries(CATEGORIES).map(([slug, cat]) => (
                <Link 
                  key={slug} 
                  href={`/${slug}`}
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors uppercase tracking-wider"
                >
                  {cat.title}
                </Link>
              ))}
              <Link href="/guides" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors uppercase tracking-wider">
                Guides
              </Link>
            </nav>

            {/* Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                About
              </Link>
              <div className="h-8 w-px bg-border"></div>
              <button onClick={toggleTheme} className="text-primary p-2 hover:bg-primary/10 rounded-full transition-colors" title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"} aria-label="Toggle theme">
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-muted-foreground hover:text-foreground p-2"
                aria-label="Toggle mobile menu"
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-panel border-t border-white/5 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {Object.entries(CATEGORIES).map(([slug, cat]) => (
                <Link
                  key={slug}
                  href={`/${slug}`}
                  className="block px-3 py-3 rounded-md text-base font-medium text-muted-foreground hover:text-foreground hover:bg-white/5"
                >
                  {cat.title}
                </Link>
              ))}
              <Link
                href="/guides"
                className="block px-3 py-3 rounded-md text-base font-medium text-muted-foreground hover:text-foreground hover:bg-white/5"
              >
                Guides
              </Link>
              <Link
                href="/about"
                className="block px-3 py-3 rounded-md text-base font-medium text-muted-foreground hover:text-foreground hover:bg-white/5"
              >
                About
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={location}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="flex-1 w-full"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-auto bg-card relative z-10">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-1 sm:col-span-2 md:col-span-1">
              <Link href="/" className="flex items-center gap-2 group mb-4" aria-label="Hack Utility Home">
                <Terminal className="h-6 w-6 text-primary" />
                <span className="font-display font-bold text-xl text-foreground">
                  Hack Utility
                </span>
              </Link>
              <p className="text-muted-foreground text-sm max-w-xs">
                Free, fast, and secure developer utilities. Run completely locally in your browser. 
                Zero server tracking.
              </p>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase mb-4">
                Categories
              </h3>
              <ul className="space-y-3">
                {Object.entries(CATEGORIES).map(([slug, cat]) => (
                  <li key={slug}>
                    <Link href={`/${slug}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {cat.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase mb-4">
                Popular Tools
              </h3>
              <ul className="space-y-3">
                <li><Link href="/dev-tools/json-formatter" className="text-sm text-muted-foreground hover:text-primary transition-colors">JSON Formatter</Link></li>
                <li><Link href="/security-tools/password-generator" className="text-sm text-muted-foreground hover:text-primary transition-colors">Password Generator</Link></li>
                <li><Link href="/encoding-tools/base64-encoder" className="text-sm text-muted-foreground hover:text-primary transition-colors">Base64 Encoder</Link></li>
                <li><Link href="/security-tools/hash-generator" className="text-sm text-muted-foreground hover:text-primary transition-colors">Hash Generator</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase mb-4">
                Resources
              </h3>
              <ul className="space-y-3">
                <li><Link href="/guides" className="text-sm text-muted-foreground hover:text-primary transition-colors">Developer Guides</Link></li>
                <li><Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
                <li><Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link></li>
                <li><Link href="/sitemap" className="text-sm text-muted-foreground hover:text-primary transition-colors">Sitemap</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Hack Utility. All rights reserved.
            </p>
            <p className="text-sm font-medium text-muted-foreground">
              All tools run 100% client-side. Your data never leaves your browser.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
