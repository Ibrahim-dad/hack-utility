import React, { useState } from "react";
import { ToolBaseLayout } from "@/components/ToolBaseLayout";
import { getToolById } from "@/lib/registry";
import { useToast } from "@/hooks/use-toast";
import { Copy, AlertCircle, FileJson, Trash2, AlignLeft, Minimize2 } from "lucide-react";

export default function JsonFormatter() {
  const tool = getToolById('json-formatter')!;
  const { toast } = useToast();
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);

  const formatJson = (spaces: number) => {
    try {
      if (!input.trim()) return;
      const parsed = JSON.parse(input);
      setInput(JSON.stringify(parsed, null, spaces));
      setError(null);
    } catch (e) {
      if (e instanceof Error) setError(e.message);
      else setError("Invalid JSON");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(input);
    toast({ title: "Copied to clipboard", description: "JSON has been copied." });
  };

  const clearInput = () => {
    setInput("");
    setError(null);
  };

  return (
    <ToolBaseLayout 
      tool={tool}
      exampleUsage={`// Input (Minified):\n{"id":1,"name":"John","active":true}\n\n// Output (Prettified):\n{\n  "id": 1,\n  "name": "John",\n  "active": true\n}`}
      faq={[
        { q: "Is my JSON data sent anywhere?", a: "No. All formatting happens locally in your browser using JavaScript. No data is ever sent to a server." },
        { q: "Can it handle large JSON files?", a: "Yes, it can handle typical API responses smoothly, limited only by your browser's memory." },
        { q: "What is the difference between prettify and minify?", a: "Prettify adds spaces, indentation, and line breaks to make JSON readable for humans. Minify removes all unnecessary whitespace to make the data as small as possible for network transmission." },
        { q: "What causes 'Unexpected token' errors?", a: "This usually happens when your JSON is invalid. Common causes include missing quotes around keys, trailing commas after the last item in an object or array, or using single quotes instead of double quotes." }
      ]}
    >
      <div className="space-y-4">
        {/* Toolbar */}
        <div className="flex flex-wrap gap-3 bg-card p-3 rounded-xl border border-border">
          <button 
            onClick={() => formatJson(2)}
            className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary hover:bg-primary/20 rounded-lg font-medium transition-colors"
          >
            <AlignLeft className="w-4 h-4" /> Prettify
          </button>
          <button 
            onClick={() => formatJson(0)}
            className="flex items-center gap-2 px-4 py-2 bg-secondary/10 text-secondary hover:bg-secondary/20 rounded-lg font-medium transition-colors"
          >
            <Minimize2 className="w-4 h-4" /> Minify
          </button>
          <div className="flex-1" />
          <button 
            onClick={copyToClipboard}
            className="flex items-center gap-2 px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-lg transition-colors"
          >
            <Copy className="w-4 h-4" /> Copy
          </button>
          <button 
            onClick={clearInput}
            className="flex items-center gap-2 px-4 py-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" /> Clear
          </button>
        </div>

        {/* Editor Area */}
        <div className="relative group">
          <textarea
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              if (error) setError(null);
            }}
            placeholder='{"paste": "your json here..."}'
            className={`w-full h-[500px] bg-input text-foreground font-mono p-6 rounded-xl border-2 focus:outline-none focus:ring-4 transition-all resize-y
              ${error ? 'border-destructive focus:border-destructive focus:ring-destructive/20' : 'border-border focus:border-primary focus:ring-primary/10'}
            `}
            spellCheck="false"
          />
          {!input && (
            <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center text-muted-foreground/30">
              <FileJson className="w-24 h-24 mb-4" />
              <p className="font-mono text-xl">Paste JSON</p>
            </div>
          )}
        </div>

        {/* Status Bar */}
        {error && (
          <div className="flex items-center gap-3 p-4 bg-destructive/10 text-destructive border border-destructive/20 rounded-xl animate-in slide-in-from-top-2">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span className="font-mono text-sm">{error}</span>
          </div>
        )}
      </div>
    </ToolBaseLayout>
  );
}
