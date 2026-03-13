import React, { useState, useEffect } from "react";
import { ToolBaseLayout } from "@/components/ToolBaseLayout";
import { getToolById } from "@/lib/registry";
import { useToast } from "@/hooks/use-toast";
import { ArrowRightLeft, Copy, Trash2 } from "lucide-react";

export default function Base64Encoder() {
  const tool = getToolById('base64-encoder')!;
  const { toast } = useToast();
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<'encode'|'decode'>('encode');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!input) {
      setOutput("");
      setError(null);
      return;
    }

    try {
      if (mode === 'encode') {
        setOutput(btoa(unescape(encodeURIComponent(input))));
      } else {
        setOutput(decodeURIComponent(escape(atob(input))));
      }
      setError(null);
    } catch (e) {
      setError("Invalid input for " + mode);
      setOutput("");
    }
  }, [input, mode]);

  const copyToClipboard = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    toast({ title: "Copied to clipboard" });
  };

  return (
    <ToolBaseLayout 
      tool={tool}
      exampleUsage={`// Input (Text):\nHello World!\n\n// Output (Base64 Encode):\nSGVsbG8gV29ybGQh`}
      faq={[
        { q: "Is Base64 encryption?", a: "No. Base64 is an encoding scheme. It provides no security and anyone can decode it instantly." },
        { q: "Does this support UTF-8?", a: "Yes, this implementation handles special characters and emojis correctly." },
        { q: "What is URL-safe Base64?", a: "Standard Base64 uses '+' and '/' characters, which have special meanings in URLs. URL-safe Base64 replaces '+' with '-' and '/' with '_' so the encoded string can be safely used in web addresses." },
        { q: "Can Base64 handle binary data?", a: "Yes, Base64 is specifically designed to represent binary data in an ASCII string format. It's commonly used to embed images directly in HTML or CSS." }
      ]}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Input */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">Input</h3>
            <button 
              onClick={() => setInput("")}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Clear
            </button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === 'encode' ? "Text to encode..." : "Base64 to decode..."}
            className="w-full h-64 bg-input text-foreground font-mono p-4 rounded-xl border-2 border-border focus:border-primary focus:ring-4 focus:ring-primary/10 focus:outline-none transition-all resize-y"
          />
        </div>

        {/* Center Toggle (Mobile absolute, desktop flex) */}
        <div className="lg:hidden flex justify-center -my-2 relative z-10">
           <button 
              onClick={() => setMode(m => m === 'encode' ? 'decode' : 'encode')}
              className="bg-primary text-primary-foreground p-3 rounded-full shadow-lg"
            >
              <ArrowRightLeft className="w-5 h-5 rotate-90" />
            </button>
        </div>

        {/* Right: Output */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">Output</h3>
              <div className="hidden lg:flex items-center bg-card rounded-lg p-1 border border-border">
                <button
                  onClick={() => setMode('encode')}
                  className={`px-3 py-1 text-xs rounded-md font-medium transition-colors ${mode === 'encode' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  Encode
                </button>
                <button
                  onClick={() => setMode('decode')}
                  className={`px-3 py-1 text-xs rounded-md font-medium transition-colors ${mode === 'decode' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  Decode
                </button>
              </div>
            </div>
            <button 
              onClick={copyToClipboard}
              className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors"
            >
              <Copy className="w-3 h-3" /> Copy
            </button>
          </div>
          
          <div className={`w-full h-64 font-mono p-4 rounded-xl border-2 transition-all overflow-auto
            ${error ? 'bg-destructive/5 border-destructive/50 text-destructive' : 'bg-card border-border text-primary'}`}
          >
            {error ? error : output || <span className="text-muted-foreground/50">Result will appear here...</span>}
          </div>
        </div>
      </div>
    </ToolBaseLayout>
  );
}
