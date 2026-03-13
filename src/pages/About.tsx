import React from "react";
import { Terminal, Shield, Zap, Lock, Code, Globe, Github } from "lucide-react";
import { Link } from "wouter";

export default function About() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="flex justify-center mb-8">
        <div className="p-4 bg-primary/10 rounded-2xl border border-primary/20 shadow-lg shadow-primary/5">
          <Terminal className="w-12 h-12 text-primary" />
        </div>
      </div>
      
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground text-center mb-6">
        About Hack Utility
      </h1>
      
      <p className="text-xl text-muted-foreground text-center max-w-2xl mx-auto mb-16">
        A premium collection of essential developer tools built with speed, privacy, and user experience in mind.
      </p>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        <div className="bg-card p-6 rounded-2xl border border-border">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
            <Lock className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">Privacy First</h3>
          <p className="text-muted-foreground">
            Zero server-side processing. Everything executes entirely in your local DOM. Your sensitive tokens and data never leave your machine.
          </p>
        </div>
        
        <div className="bg-card p-6 rounded-2xl border border-border">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
            <Zap className="w-5 h-5 text-accent" />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">Lightning Fast</h3>
          <p className="text-muted-foreground">
            No network latency for API calls. Tools respond instantly to your input, allowing you to format, decode, and generate without waiting.
          </p>
        </div>

        <div className="bg-card p-6 rounded-2xl border border-border">
          <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
            <Code className="w-5 h-5 text-secondary" />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">Open Ecosystem</h3>
          <p className="text-muted-foreground">
            Built using modern web technologies. We believe developer tools should be transparent, completely free, and a joy to use.
          </p>
        </div>
      </div>
      
      <div className="prose dark:prose-invert prose-primary max-w-none text-lg text-muted-foreground mb-16">
        <h2 className="text-foreground font-display text-3xl">The Origin Story</h2>
        <p>
          Hack Utility was built out of a simple frustration: every time developers needed to format JSON, decode a JWT, or generate a hash, they had to rely on random, ad-filled websites that sent their private data to unknown servers.
        </p>
        <p>
          We noticed that most "online developer tools" had not updated their design since 2010. They were clunky, slow, and worst of all, inherently insecure for handling proprietary API payloads or authentication tokens.
        </p>
        <p>
          <strong>We decided to fix that.</strong> Hack Utility combines a beautiful, modern cyberpunk aesthetic with robust client-side architecture. 
        </p>

        <h2 className="text-foreground font-display text-3xl mt-12">How It Works</h2>
        <p>
          When you load Hack Utility, your browser downloads a static bundle of HTML, CSS, and JavaScript. From that point on, you could disconnect your internet and the core tools would still function perfectly. 
        </p>
        <p>
          We utilize built-in browser APIs like <code>Web Crypto API</code> for password generation and hashing, ensuring native performance and cryptographic security without relying on external libraries.
        </p>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-card to-background border border-border p-8 md:p-12 rounded-3xl text-center shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5"></div>
        <div className="relative z-10">
          <h2 className="text-3xl font-display font-bold text-foreground mb-4">Ready to build?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Stop pasting your secure data into random websites. Bookmark Hack Utility and keep your development workflow fast and private.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/dev-tools" 
              className="px-6 py-3 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 transition-colors"
            >
              Explore Dev Tools
            </Link>
            <Link 
              href="/security-tools" 
              className="px-6 py-3 bg-card border border-border text-foreground font-bold rounded-lg hover:bg-white/5 transition-colors"
            >
              Security Utilities
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
