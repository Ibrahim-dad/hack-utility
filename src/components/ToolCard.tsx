import React from "react";
import { Link } from "wouter";
import { ToolMeta } from "@/lib/registry";

interface ToolCardProps {
  tool: ToolMeta;
}

export function ToolCard({ tool }: ToolCardProps) {
  const Icon = tool.icon;
  
  return (
    <Link href={tool.path} className="group block h-full">
      <div className="h-full bg-card rounded-xl p-6 border border-border transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 relative overflow-hidden">
        {/* Hover Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative z-10 flex flex-col h-full">
          <div className="w-12 h-12 rounded-lg bg-background border border-border flex items-center justify-center mb-4 group-hover:border-primary/50 group-hover:text-primary transition-colors">
            <Icon className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
          
          <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
            {tool.title}
          </h3>
          
          <p className="text-sm text-muted-foreground flex-grow">
            {tool.description}
          </p>
          
          <div className="mt-4 pt-4 border-t border-border flex items-center text-xs font-mono text-muted-foreground group-hover:text-primary/80 transition-colors">
            Use Tool <span className="ml-2 font-sans">→</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
