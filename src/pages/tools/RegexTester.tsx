import React, { useState, useMemo } from "react";
import { ToolBaseLayout } from "@/components/ToolBaseLayout";
import { getToolById } from "@/lib/registry";

export default function RegexTester() {
  const tool = getToolById('regex-tester')!;
  const [pattern, setPattern] = useState("[A-Z]\\w+");
  const [flags, setFlags] = useState("g");
  const [testString, setTestString] = useState("Hello World, regex testing is Fun.");

  const { matches, error } = useMemo(() => {
    if (!pattern) return { matches: [], error: null };
    try {
      const re = new RegExp(pattern, flags);
      const m = Array.from(testString.matchAll(re));
      return { matches: m, error: null };
    } catch (e) {
      if (e instanceof Error) return { matches: [], error: e.message };
      return { matches: [], error: "Invalid regex" };
    }
  }, [pattern, flags, testString]);

  // A very simple highlighter overlay
  const renderHighlighted = () => {
    if (error || !pattern) return <>{testString}</>;
    
    try {
      const re = new RegExp(pattern, flags);
      const parts = [];
      let lastIndex = 0;
      
      // We must avoid infinite loops if regex matches empty string
      if (new RegExp(pattern, flags).test("")) return <>{testString}</>;

      let match;
      while ((match = re.exec(testString)) !== null) {
        parts.push(testString.substring(lastIndex, match.index));
        parts.push(<mark key={match.index} className="bg-primary/40 text-foreground rounded px-0.5 border border-primary/50">{match[0]}</mark>);
        lastIndex = match.index + match[0].length;
      }
      parts.push(testString.substring(lastIndex));
      return <>{parts}</>;
    } catch {
      return <>{testString}</>;
    }
  };

  return (
    <ToolBaseLayout 
      tool={tool}
      exampleUsage={`// Pattern:\n\\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}\\b\n\n// Test String:\nContact us at support@example.com\n\n// Matches:\nsupport@example.com`}
      faq={[
        { q: "What regex flags are supported?", a: "Common flags include 'g' (global, find all matches), 'i' (case-insensitive), 'm' (multiline), and 's' (dotAll, where '.' matches newlines)." },
        { q: "Why isn't my regex matching?", a: "Check your flags (did you forget 'g' for multiple matches or 'i' for case insensitivity?). Also remember that some characters like '.' or '*' have special meanings and need to be escaped with a backslash '\\' to match literally." },
        { q: "What's the difference between . and \\s?", a: "The dot '.' matches any single character except line terminators (unless the 's' flag is used). The '\\s' token specifically matches whitespace characters (spaces, tabs, line breaks)." },
        { q: "Which regex engine does this use?", a: "This tool uses your browser's native JavaScript regular expression engine (ECMAScript flavor)." }
      ]}
    >
      <div className="space-y-6 max-w-4xl">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-muted-foreground font-mono">/</span>
            <input 
              type="text" 
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              className="w-full bg-input text-primary font-mono text-lg p-4 pl-8 rounded-xl border-2 border-border focus:border-primary focus:outline-none"
              placeholder="pattern"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl text-muted-foreground font-mono">/</span>
          </div>
          <div className="w-24">
            <input 
              type="text" 
              value={flags}
              onChange={(e) => setFlags(e.target.value)}
              className="w-full bg-input text-secondary font-mono text-lg p-4 rounded-xl border-2 border-border focus:border-secondary focus:outline-none"
              placeholder="gm"
            />
          </div>
        </div>
        {error && <p className="text-destructive font-mono text-sm">{error}</p>}

        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="px-4 py-2 border-b border-border bg-input flex justify-between items-center">
            <span className="text-xs font-bold uppercase tracking-wider text-foreground">Test String</span>
            <span className="text-xs text-primary font-mono">{matches.length} matches</span>
          </div>
          <div className="relative h-64">
            {/* Syntax highlight underlay */}
            <div className="absolute inset-0 p-4 font-mono text-transparent whitespace-pre-wrap break-words pointer-events-none z-10" aria-hidden="true">
              {renderHighlighted()}
            </div>
            {/* Actual textarea */}
            <textarea
              value={testString}
              onChange={(e) => setTestString(e.target.value)}
              className="absolute inset-0 w-full h-full bg-transparent text-muted-foreground font-mono p-4 resize-none focus:outline-none z-0 whitespace-pre-wrap break-words"
              spellCheck="false"
            />
          </div>
        </div>

        {matches.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">Match Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {matches.slice(0, 10).map((m, i) => (
                <div key={i} className="bg-input border border-border rounded-lg p-3 font-mono text-sm">
                  <span className="text-muted-foreground mr-2">Match {i+1}:</span>
                  <span className="text-primary">{m[0]}</span>
                </div>
              ))}
              {matches.length > 10 && (
                <div className="bg-input border border-border rounded-lg p-3 font-mono text-sm text-muted-foreground flex items-center justify-center">
                  + {matches.length - 10} more matches
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </ToolBaseLayout>
  );
}
