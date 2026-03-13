import React from "react";
import { Link } from "wouter";
import { GUIDES_LIST } from "@/lib/guides-data";
import { BookOpen, Clock, Wrench } from "lucide-react";
import { getToolById } from "@/lib/registry";

export default function Guides() {
  // Simple reading time calculation (~200 words per minute)
  const getReadingTime = (text: string) => {
    const words = text.trim().split(/\s+/).length;
    return Math.ceil(words / 200);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <div className="mb-16 text-center">
        <div className="inline-flex justify-center p-3 bg-primary/10 rounded-2xl mb-6">
          <BookOpen className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
          Developer Guides
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          In-depth explanations of formats, protocols, and security concepts. Learn the fundamentals behind the tools you use every day to build better, more secure software.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {GUIDES_LIST.map(guide => {
          const tool = guide.relatedTool ? getToolById(guide.relatedTool.split('/').pop()!) : null;
          
          return (
            <div key={guide.slug} className="flex flex-col h-full bg-card rounded-2xl border border-border overflow-hidden group hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1" data-testid={`card-guide-${guide.slug}`}>
              <Link href={`/guides/${guide.slug}`} className="p-8 flex-grow block">
                <div className="flex items-center gap-4 mb-4">
                  <BookOpen className="w-6 h-6 text-primary" />
                  <span className="text-xs font-mono text-muted-foreground flex items-center gap-1 bg-background px-2 py-1 rounded border border-border">
                    <Clock className="w-3 h-3" /> {getReadingTime(guide.content)} min read
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {guide.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {guide.description}
                </p>
                <div className="flex items-center text-sm font-medium text-primary mt-auto pt-4 border-t border-border/50">
                  Read Article <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                </div>
              </Link>
              
              {tool && (
                <div className="bg-background px-8 py-4 border-t border-border">
                  <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider font-bold">Related Tool</p>
                  <Link href={guide.relatedTool} className="inline-flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors">
                    <Wrench className="w-4 h-4 text-primary" />
                    {tool.title}
                  </Link>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
