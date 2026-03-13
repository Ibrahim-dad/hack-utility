import React from "react";
import { ToolMeta, getRelatedTools, getToolsByCategory, CATEGORIES } from "@/lib/registry";
import { ToolCard } from "./ToolCard";
import { Link } from "wouter";
import { ChevronRight } from "lucide-react";

interface ToolBaseLayoutProps {
  tool: ToolMeta;
  children: React.ReactNode;
  faq?: Array<{ q: string; a: string }>;
  exampleUsage?: string;
}

export function ToolBaseLayout({ tool, children, faq = [], exampleUsage }: ToolBaseLayoutProps) {
  const relatedTools = getRelatedTools(tool.id);
  const otherTools = getToolsByCategory(tool.category).filter(t => t.id !== tool.id && !tool.relatedTools.includes(t.id)).slice(0, 3);
  const categoryTitle = CATEGORIES[tool.category]?.title || tool.category;
  const Icon = tool.icon;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
          <li>
            <Link href="/" className="hover:text-foreground transition-colors" data-testid="link-breadcrumb-home">Home</Link>
          </li>
          <li className="flex items-center">
            <ChevronRight className="w-4 h-4 mx-1" />
            <Link href={`/${tool.category}`} className="hover:text-foreground transition-colors" data-testid={`link-breadcrumb-category-${tool.category}`}>
              {categoryTitle}
            </Link>
          </li>
          <li className="flex items-center">
            <ChevronRight className="w-4 h-4 mx-1" />
            <span className="text-foreground" aria-current="page" data-testid={`text-breadcrumb-tool-${tool.id}`}>
              {tool.title}
            </span>
          </li>
        </ol>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-mono uppercase tracking-wider mb-4 border border-primary/20">
          <Icon className="w-4 h-4" />
          {categoryTitle}
        </div>
        <h1 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4" data-testid={`text-title-${tool.id}`}>
          {tool.title}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl" data-testid={`text-description-${tool.id}`}>
          {tool.description} All processing happens locally in your browser. No data is sent to our servers.
        </p>
      </div>

      {/* Main Tool UI */}
      <div className="mb-12">
        {children}
      </div>

      {/* Example Usage */}
      {exampleUsage && (
        <section className="mb-12 max-w-3xl" data-testid="section-example-usage">
          <h2 className="text-xl font-display font-bold text-foreground mb-4">Example Usage</h2>
          <div className="bg-card p-6 rounded-xl border border-border">
            <p className="text-muted-foreground font-mono text-sm whitespace-pre-wrap">{exampleUsage}</p>
          </div>
        </section>
      )}

      {/* SEO Content / FAQ Section */}
      {faq.length > 0 && (
        <section className="mb-12 max-w-3xl" data-testid="section-faq">
          <h2 className="text-2xl font-display font-bold text-foreground mb-6 border-b border-border pb-2">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faq.map((item, i) => (
              <details key={i} className="group bg-card rounded-xl border border-border overflow-hidden" data-testid={`details-faq-${i}`}>
                <summary className="font-bold text-foreground p-6 cursor-pointer hover:text-primary transition-colors flex justify-between items-center">
                  {item.q}
                  <ChevronRight className="w-5 h-5 transition-transform group-open:rotate-90" />
                </summary>
                <div className="px-6 pb-6 text-muted-foreground">
                  <p>{item.a}</p>
                </div>
              </details>
            ))}
          </div>
        </section>
      )}

      {/* Inline Try these tools too */}
      {relatedTools.length > 0 && (
        <section className="mb-16 bg-card/50 p-6 rounded-xl border border-border" data-testid="section-try-also">
          <h3 className="text-lg font-bold text-foreground mb-4">Try these tools too:</h3>
          <div className="flex flex-wrap gap-4">
            {relatedTools.slice(0, 3).map(rt => (
              <Link 
                key={rt.id} 
                href={rt.path}
                className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
                data-testid={`link-related-${rt.id}`}
              >
                <rt.icon className="w-4 h-4" />
                {rt.title}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* You might also like */}
      {otherTools.length > 0 && (
        <section className="border-t border-border pt-12" data-testid="section-might-like">
          <h2 className="text-2xl font-display font-bold text-foreground mb-6">
            You might also like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherTools.map(t => (
              <ToolCard key={t.id} tool={t} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
