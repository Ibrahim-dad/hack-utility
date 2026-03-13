import React from "react";
import { useRoute, Link } from "wouter";
import { CATEGORIES, getToolsByCategory, CategorySlug, TOOLS_REGISTRY } from "@/lib/registry";
import { ToolCard } from "@/components/ToolCard";
import NotFound from "./not-found";
import { ChevronRight } from "lucide-react";

export default function Category() {
  const [match, params] = useRoute("/:slug");
  
  if (!match || !params?.slug) return <NotFound />;
  
  const slug = params.slug as CategorySlug;
  const category = CATEGORIES[slug];
  
  if (!category) return <NotFound />;

  const tools = getToolsByCategory(slug);
  const Icon = category.icon;
  const otherCategories = Object.entries(CATEGORIES).filter(([key]) => key !== slug) as [CategorySlug, typeof CATEGORIES[CategorySlug]][];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
          <li>
            <Link href="/" className="hover:text-foreground transition-colors" data-testid="link-breadcrumb-home">Home</Link>
          </li>
          <li className="flex items-center">
            <ChevronRight className="w-4 h-4 mx-1" />
            <span className="text-foreground" aria-current="page" data-testid={`text-breadcrumb-category-${slug}`}>
              {category.title}
            </span>
          </li>
        </ol>
      </nav>

      <div className="mb-12">
        <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-xl mb-6 border border-primary/20">
          <Icon className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
          {category.title}
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mb-6 leading-relaxed">
          {category.description} These tools run entirely in your browser, ensuring maximum privacy and zero latency. 
          Perfect for quickly processing data without worrying about security leaks.
        </p>
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-card border border-border rounded-full text-sm font-medium text-foreground">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          {tools.length > 0 ? `${tools.length} tools available` : "Coming soon"}
        </div>
      </div>

      {tools.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {tools.map(tool => (
            <div key={tool.id} data-testid={`card-tool-${tool.id}`}>
              <ToolCard tool={tool} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-card rounded-2xl border border-border border-dashed mb-24" data-testid="empty-category">
          <h3 className="text-2xl font-bold text-foreground mb-2">Tools Coming Soon</h3>
          <p className="text-muted-foreground">We are actively building utilities for this category.</p>
        </div>
      )}

      {/* Browse Other Categories */}
      <section className="border-t border-border pt-16">
        <h2 className="text-2xl font-display font-bold text-foreground mb-8">Browse Other Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {otherCategories.map(([otherSlug, cat]) => (
            <Link key={otherSlug} href={`/${otherSlug}`} className="group p-6 bg-card rounded-xl border border-border hover:border-primary transition-colors flex items-center gap-4">
              <div className="p-3 bg-background rounded-lg group-hover:bg-primary/10 transition-colors">
                <cat.icon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <div>
                <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">{cat.title}</h3>
                <span className="text-sm text-muted-foreground">{getToolsByCategory(otherSlug).length} tools</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
