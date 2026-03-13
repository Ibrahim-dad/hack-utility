import React from "react";
import { useRoute, Link } from "wouter";
import { GUIDES, GUIDES_LIST } from "@/lib/guides-data";
import { getToolById } from "@/lib/registry";
import NotFound from "./not-found";
import { ArrowLeft, ChevronRight, Wrench, Clock } from "lucide-react";

export default function GuideDetail() {
  const [match, params] = useRoute("/guides/:slug");
  
  if (!match || !params?.slug) return <NotFound />;
  
  const guide = GUIDES[params.slug];
  if (!guide) return <NotFound />;

  const getReadingTime = (text: string) => Math.max(1, Math.ceil(text.trim().split(/\s+/).length / 200));
  
  // Extract tool ID from path (e.g. /dev-tools/json-formatter -> json-formatter)
  const toolId = guide.relatedTool ? guide.relatedTool.split('/').pop() : null;
  const tool = toolId ? getToolById(toolId) : null;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 flex flex-col lg:flex-row gap-12 relative">
      
      {/* Main Content */}
      <div className="flex-1 min-w-0">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
            <li><Link href="/" className="hover:text-foreground transition-colors">Home</Link></li>
            <li><ChevronRight className="w-4 h-4" /></li>
            <li><Link href="/guides" className="hover:text-foreground transition-colors">Guides</Link></li>
            <li><ChevronRight className="w-4 h-4" /></li>
            <li className="text-foreground truncate" aria-current="page">{guide.title}</li>
          </ol>
        </nav>
        
        <header className="mb-12">
          <div className="flex items-center gap-3 text-sm font-mono text-muted-foreground mb-4">
            <span className="flex items-center gap-1 bg-card px-2 py-1 rounded border border-border">
              <Clock className="w-4 h-4 text-primary" /> {getReadingTime(guide.content)} min read
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6 leading-tight">
            {guide.title}
          </h1>
          <p className="text-xl text-muted-foreground pb-8 border-b border-border leading-relaxed">
            {guide.description}
          </p>
        </header>
        
        {/* Simple Markdown-like rendering */}
        <article className="prose dark:prose-invert prose-primary max-w-none prose-h1:font-display prose-h2:font-display prose-h2:text-primary prose-h3:text-secondary prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-li:marker:text-primary prose-strong:text-foreground">
          {guide.content.split('\n').map((line, i) => {
            const trimmed = line.trim();
            if (trimmed.startsWith('# ')) return <h1 key={i}>{trimmed.substring(2)}</h1>;
            if (trimmed.startsWith('## ')) return <h2 key={i}>{trimmed.substring(3)}</h2>;
            if (trimmed.startsWith('### ')) return <h3 key={i} className="text-xl font-bold mt-6 mb-3">{trimmed.substring(4)}</h3>;
            if (trimmed.startsWith('- ')) {
              // Parse inline bold
              const parts = trimmed.substring(2).split(/(\*\*.*?\*\*)/g).map((part, j) => {
                if (part.startsWith('**') && part.endsWith('**')) return <strong key={j}>{part.slice(2, -2)}</strong>;
                return part;
              });
              return <li key={i}>{parts}</li>;
            }
            if (trimmed.match(/^\d+\.\s/)) {
              const text = trimmed.replace(/^\d+\.\s/, '');
              const parts = text.split(/(\*\*.*?\*\*)/g).map((part, j) => {
                if (part.startsWith('**') && part.endsWith('**')) return <strong key={j}>{part.slice(2, -2)}</strong>;
                return part;
              });
              return <div key={i} className="ml-4 mb-2 flex gap-2"><span className="text-primary font-bold">{trimmed.match(/^\d+/)?.[0]}.</span><span>{parts}</span></div>;
            }
            if (trimmed === '') return <br key={i} className="hidden" />; // Use margin instead of br
            
            // Parse inline links and code and bold
            let element: React.ReactNode = trimmed;
            
            // Link parser simple
            if (trimmed.match(/\[(.*?)\]\((.*?)\)/)) {
               const match = trimmed.match(/\[(.*?)\]\((.*?)\)/)!;
               return <p key={i}><Link href={match[2]} className="inline-flex items-center gap-2 mt-4 px-6 py-3 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 transition-colors no-underline not-prose">{match[1]}</Link></p>;
            }

            const parts = trimmed.split(/(`.*?`|\*\*.*?\*\*)/g).map((part, j) => {
              if (part.startsWith('`') && part.endsWith('`')) return <code key={j} className="bg-muted px-1.5 py-0.5 rounded text-primary text-sm font-mono">{part.slice(1, -1)}</code>;
              if (part.startsWith('**') && part.endsWith('**')) return <strong key={j}>{part.slice(2, -2)}</strong>;
              return part;
            });

            return <p key={i} className="mb-4 text-muted-foreground leading-relaxed">{parts}</p>;
          })}
        </article>
      </div>

      {/* Sidebar */}
      {tool && (
        <aside className="w-full lg:w-72 flex-shrink-0">
          <div className="sticky top-24 space-y-6">
            <div className="bg-card rounded-2xl border border-border p-6 shadow-xl">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 border border-primary/20">
                <Wrench className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Try it yourself</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Ready to put this knowledge to use? Try our completely free, client-side tool.
              </p>
              <Link 
                href={guide.relatedTool} 
                className="flex items-center justify-center w-full px-4 py-3 bg-card border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-lg font-bold transition-all"
                data-testid={`link-sidebar-tool-${tool.id}`}
              >
                Open {tool.title}
              </Link>
            </div>
            
            <div className="bg-background rounded-xl border border-border p-5">
              <h4 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4">More Guides</h4>
              <ul className="space-y-3">
                {GUIDES_LIST.filter(g => g.slug !== guide.slug).slice(0, 3).map(g => (
                  <li key={g.slug}>
                    <Link href={`/guides/${g.slug}`} className="text-sm text-muted-foreground hover:text-primary transition-colors block line-clamp-2">
                      {g.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>
      )}
    </div>
  );
}
