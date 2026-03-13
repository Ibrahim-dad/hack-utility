import React, { useState } from "react";
import { Link } from "wouter";
import { Search, ChevronRight, Zap, Shield, Cpu, Binary, Network, BookOpen, CheckCircle } from "lucide-react";
import { TOOLS_REGISTRY, searchTools, CATEGORIES, CategorySlug } from "@/lib/registry";
import { ToolCard } from "@/components/ToolCard";
import { GUIDES_LIST } from "@/lib/guides-data";
import { motion } from "framer-motion";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  
  const displayedTools = searchQuery 
    ? searchTools(searchQuery)
    : TOOLS_REGISTRY;

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative pt-20 pb-24 md:pt-32 md:pb-40 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-[-2] opacity-30">
          <img 
            src={`${import.meta.env.BASE_URL}images/hero-bg.png`} 
            alt="Hero background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-background/80 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-mono uppercase tracking-wider mb-6 border border-primary/20"
          >
            <Zap className="w-4 h-4" />
            100% Client-Side Processing
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-foreground mb-6 leading-tight"
          >
            Free Developer & Security Tools <br/>
            <span className="text-gradient">Built for Speed</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto"
          >
            The fastest collection of open-source developer utilities. Format JSON, decode JWTs, generate passwords, and more — all running locally in your browser.
          </motion.p>
          
          {/* Search Bar */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="max-w-2xl mx-auto relative group"
          >
            <div className="absolute inset-[-2px] bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-25 group-focus-within:opacity-50 transition-opacity duration-300"></div>
            <div className="relative bg-card rounded-xl border border-border flex items-center p-2 shadow-2xl">
              <Search className="w-6 h-6 text-muted-foreground ml-3" />
              <input 
                type="text" 
                placeholder="Search tools... (e.g. JSON, JWT, Base64)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none text-foreground px-4 py-3 focus:outline-none focus:ring-0 text-lg placeholder:text-muted-foreground/50 font-mono"
                data-testid="input-search-tools"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-display font-bold text-foreground">
                {searchQuery ? "Search Results" : "All Tools"}
              </h2>
              <p className="text-muted-foreground mt-2">
                {searchQuery ? `Found ${displayedTools.length} tools` : "Our complete collection of utilities"}
              </p>
            </div>
            {!searchQuery && (
              <Link href="/dev-tools" className="hidden sm:flex items-center text-primary hover:text-primary/80 font-medium" data-testid="link-view-all-tools">
                View Developer Tools <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            )}
          </div>
          
          {displayedTools.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedTools.map((tool, i) => (
                <motion.div 
                  key={tool.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  data-testid={`card-tool-${tool.id}`}
                >
                  <ToolCard tool={tool} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-card rounded-2xl border border-border" data-testid="empty-search-results">
              <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-bold text-foreground mb-2">No tools found</h3>
              <p className="text-muted-foreground">Try adjusting your search terms.</p>
            </div>
          )}
        </div>
      </section>

      {/* Categories / Features */}
      <section className="py-24 border-t border-border relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">Browse by Category</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Everything you need to debug, encode, format, and secure your data.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(Object.entries(CATEGORIES) as [CategorySlug, typeof CATEGORIES[CategorySlug]][]).map(([slug, cat]) => (
              <Link key={slug} href={`/${slug}`} className="group block relative overflow-hidden rounded-2xl border border-border hover:border-primary transition-colors bg-card h-64" data-testid={`link-category-${slug}`}>
                <div className="absolute inset-0 z-0">
                  <div className={`w-full h-full opacity-20 group-hover:opacity-40 transition-opacity duration-500 ${
                    slug === 'dev-tools' ? 'bg-gradient-to-br from-primary/40 via-primary/10 to-transparent' :
                    slug === 'security-tools' ? 'bg-gradient-to-br from-accent/40 via-accent/10 to-transparent' :
                    slug === 'encoding-tools' ? 'bg-gradient-to-br from-secondary/40 via-secondary/10 to-transparent' :
                    'bg-gradient-to-br from-blue-500/40 via-blue-500/10 to-transparent'
                  }`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/80 to-transparent" />
                </div>
                <div className="relative z-10 p-6 h-full flex flex-col justify-end">
                  <cat.icon className={`w-8 h-8 mb-4 ${slug === 'dev-tools' ? 'text-primary' : slug === 'security-tools' ? 'text-accent' : slug === 'encoding-tools' ? 'text-secondary' : 'text-blue-400'}`} />
                  <h3 className="text-xl font-bold text-foreground mb-2">{cat.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{cat.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Section: Why Hack Utility */}
      <section className="py-24 border-t border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">Why Hack Utility?</h2>
              <p className="text-lg text-muted-foreground mb-8">
                We built Hack Utility because we were tired of pasting sensitive API tokens, passwords, and proprietary JSON into random websites that send data to their servers.
              </p>
              <ul className="space-y-4">
                {[
                  "Privacy First: All tools run 100% locally in your browser. No server calls.",
                  "Blazing Fast: Zero network latency means instant formatting and generation.",
                  "Free & Open Source: No paywalls, no limits, community driven.",
                  "Modern Design: A beautiful interface that respects your eyes."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-muted-foreground">
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-background rounded-2xl border border-border p-8 shadow-2xl">
              <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <BookOpen className="text-primary" /> Popular Guides
              </h3>
              <div className="space-y-4">
                {GUIDES_LIST.map((guide) => (
                  <Link key={guide.slug} href={`/guides/${guide.slug}`} className="block p-4 rounded-xl border border-border hover:border-primary/50 transition-colors group">
                    <h4 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">{guide.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-1">{guide.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
