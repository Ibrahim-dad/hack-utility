import { Link } from "wouter";
import { CATEGORIES, TOOLS_REGISTRY, CategorySlug } from "@/lib/registry";
import { GUIDES_LIST } from "@/lib/guides-data";
import { Map, Braces, Shield, Binary, Network, BookOpen, Info, FileText } from "lucide-react";

const categoryIcons: Record<CategorySlug, React.ElementType> = {
  'dev-tools': Braces,
  'security-tools': Shield,
  'encoding-tools': Binary,
  'network-tools': Network,
};

const categoryColors: Record<CategorySlug, string> = {
  'dev-tools': 'text-primary',
  'security-tools': 'text-accent',
  'encoding-tools': 'text-secondary',
  'network-tools': 'text-blue-400',
};

export default function Sitemap() {
  const toolsByCategory = (Object.keys(CATEGORIES) as CategorySlug[]).map((slug) => ({
    slug,
    ...CATEGORIES[slug],
    tools: TOOLS_REGISTRY.filter((t) => t.category === slug),
  }));

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-6">
            <Map className="w-4 h-4 text-primary" />
            <span className="text-sm font-mono text-primary uppercase tracking-wider">Sitemap</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-foreground mb-4">
            All Pages
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A complete overview of every page on Hack Utility. Find tools, guides, and resources quickly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-8">
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Info className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-xl font-bold text-foreground">Main Pages</h2>
              </div>
              <ul className="space-y-2">
                {[
                  { path: "/", label: "Home" },
                  { path: "/about", label: "About" },
                  { path: "/guides", label: "Guides" },
                  { path: "/privacy", label: "Privacy Policy" },
                  { path: "/terms", label: "Terms of Service" },
                  { path: "/sitemap", label: "Sitemap" },
                ].map((page) => (
                  <li key={page.path}>
                    <Link
                      href={page.path}
                      className="group flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-primary/5 transition-colors"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
                      <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                        {page.label}
                      </span>
                      <span className="ml-auto text-xs text-muted-foreground/50 font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                        {page.path}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-xl font-bold text-foreground">Guides</h2>
                <span className="ml-auto text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full font-mono">
                  {GUIDES_LIST.length} articles
                </span>
              </div>
              <ul className="space-y-2">
                {GUIDES_LIST.map((guide) => (
                  <li key={guide.slug}>
                    <Link
                      href={`/guides/${guide.slug}`}
                      className="group flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-primary/5 transition-colors"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
                      <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                        {guide.title}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-8">
            {toolsByCategory.map(({ slug, title, tools }) => {
              const Icon = categoryIcons[slug];
              const color = categoryColors[slug];
              return (
                <div key={slug} className="rounded-2xl border border-border bg-card p-6">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Icon className={`w-5 h-5 ${color}`} />
                    </div>
                    <div>
                      <Link href={`/${slug}`} className="text-xl font-bold text-foreground hover:text-primary transition-colors">
                        {title}
                      </Link>
                    </div>
                    <span className="ml-auto text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full font-mono">
                      {tools.length} {tools.length === 1 ? "tool" : "tools"}
                    </span>
                  </div>
                  <ul className="space-y-2">
                    <li>
                      <Link
                        href={`/${slug}`}
                        className="group flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-primary/5 transition-colors"
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${color.replace('text-', 'bg-')}/40 group-hover:${color.replace('text-', 'bg-')} transition-colors`} />
                        <span className="text-muted-foreground group-hover:text-foreground transition-colors font-medium">
                          {title} Overview
                        </span>
                      </Link>
                    </li>
                    {tools.map((tool) => (
                      <li key={tool.id}>
                        <Link
                          href={tool.path}
                          className="group flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-primary/5 transition-colors"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
                          <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                            {tool.title}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-sm text-muted-foreground">
            {TOOLS_REGISTRY.length} tools &middot; {GUIDES_LIST.length} guides &middot; {Object.keys(CATEGORIES).length} categories
          </p>
        </div>
      </div>
    </div>
  );
}
