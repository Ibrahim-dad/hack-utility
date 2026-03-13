import React, { useState } from "react";
import { ToolBaseLayout } from "@/components/ToolBaseLayout";
import { getToolById } from "@/lib/registry";
import { useToast } from "@/hooks/use-toast";
import { Copy, RefreshCw } from "lucide-react";

export default function UuidGenerator() {
  const tool = getToolById('uuid-generator')!;
  const { toast } = useToast();
  const [count, setCount] = useState(1);
  const [uuids, setUuids] = useState<string[]>([crypto.randomUUID()]);

  const generate = () => {
    const newUuids = Array.from({ length: count }, () => crypto.randomUUID());
    setUuids(newUuids);
  };

  const copyAll = () => {
    navigator.clipboard.writeText(uuids.join('\n'));
    toast({ title: "Copied all UUIDs" });
  };

  const copySingle = (uuid: string) => {
    navigator.clipboard.writeText(uuid);
    toast({ title: "Copied UUID" });
  };

  return (
    <ToolBaseLayout 
      tool={tool}
      exampleUsage={`// Output (UUID v4):\n550e8400-e29b-41d4-a716-446655440000`}
      faq={[
        { q: "What is a UUID v4?", a: "A Universally Unique Identifier (UUID) version 4 is a randomly generated 128-bit number used to uniquely identify information in computer systems." },
        { q: "Are UUIDs truly unique?", a: "While technically possible to generate a duplicate, the probability is so infinitesimally small that it can be ignored for all practical purposes. You would need to generate 1 billion UUIDs per second for 85 years to have a 50% chance of a single collision." },
        { q: "What's the difference between UUID and GUID?", a: "UUID (Universally Unique Identifier) and GUID (Globally Unique Identifier) are essentially the same thing. GUID is simply Microsoft's implementation and terminology for the UUID standard." },
        { q: "Is this cryptographically secure?", a: "Yes, this tool uses your browser's built-in Web Crypto API (crypto.randomUUID()) to generate cryptographically strong random values." }
      ]}
    >
      <div className="bg-card border border-border rounded-xl p-6 md:p-8 space-y-8 max-w-3xl">
        <div className="flex flex-col sm:flex-row items-end gap-4">
          <div className="w-full sm:w-1/3">
            <label className="block text-sm font-bold text-foreground uppercase tracking-wider mb-2">How many?</label>
            <input 
              type="number" 
              min="1" max="100" 
              value={count} 
              onChange={(e) => setCount(Math.min(100, Math.max(1, parseInt(e.target.value) || 1)))}
              className="w-full bg-input text-foreground p-3 rounded-lg border-2 border-border focus:border-primary focus:outline-none"
            />
          </div>
          <button 
            onClick={generate}
            className="w-full sm:w-auto px-6 py-3 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-5 h-5" /> Generate
          </button>
          <button 
            onClick={copyAll}
            className="w-full sm:w-auto px-6 py-3 bg-secondary/10 text-secondary font-bold rounded-lg hover:bg-secondary/20 transition-all flex items-center justify-center gap-2"
          >
            <Copy className="w-5 h-5" /> Copy All
          </button>
        </div>

        <div className="space-y-3">
          {uuids.map((uuid, i) => (
            <div key={i} className="flex items-center justify-between bg-input p-4 rounded-lg border border-border group hover:border-primary/50 transition-colors">
              <span className="font-mono text-primary md:text-lg">{uuid}</span>
              <button 
                onClick={() => copySingle(uuid)}
                className="text-muted-foreground hover:text-foreground p-2"
              >
                <Copy className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </ToolBaseLayout>
  );
}
