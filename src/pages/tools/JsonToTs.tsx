import React, { useState, useEffect } from "react";
import { ToolBaseLayout } from "@/components/ToolBaseLayout";
import { getToolById } from "@/lib/registry";
import { useToast } from "@/hooks/use-toast";
import { Copy, AlertCircle } from "lucide-react";

export default function JsonToTs() {
  const tool = getToolById('json-to-ts')!;
  const { toast } = useToast();
  const [json, setJson] = useState('{\n  "id": 1,\n  "name": "Hack Utility",\n  "isAwesome": true\n}');
  const [ts, setTs] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      if (!json.trim()) {
        setTs("");
        setError(null);
        return;
      }
      const obj = JSON.parse(json);
      setTs(jsonToTs(obj, "RootInterface"));
      setError(null);
    } catch (e) {
      if (e instanceof Error) setError(e.message);
      setTs("");
    }
  }, [json]);

  // Very rudimentary JSON to TS generator for client-side tool
  const jsonToTs = (obj: any, rootName: string): string => {
    const interfaces: string[] = [];

    const getType = (val: any, key: string): string => {
      if (val === null) return "null";
      if (Array.isArray(val)) {
        if (val.length === 0) return "any[]";
        return `${getType(val[0], key)}[]`;
      }
      if (typeof val === 'object') {
        const interfaceName = key.charAt(0).toUpperCase() + key.slice(1);
        generateInterface(val, interfaceName);
        return interfaceName;
      }
      return typeof val;
    };

    const generateInterface = (o: any, name: string) => {
      let result = `export interface ${name} {\n`;
      for (const key in o) {
        result += `  ${key}: ${getType(o[key], key)};\n`;
      }
      result += "}";
      interfaces.push(result);
    };

    if (Array.isArray(obj)) {
      if (obj.length > 0) generateInterface(obj[0], rootName);
      else return "export type RootInterface = any[];";
    } else if (typeof obj === 'object' && obj !== null) {
      generateInterface(obj, rootName);
    } else {
      return `export type RootInterface = ${typeof obj};`;
    }

    return interfaces.reverse().join('\n\n');
  };

  const copyTs = () => {
    navigator.clipboard.writeText(ts);
    toast({ title: "Copied TypeScript interface" });
  };

  return (
    <ToolBaseLayout 
      tool={tool}
      exampleUsage={`// Input (JSON):\n{\n  "user": { "id": 1, "name": "Alice" },\n  "tags": ["admin", "staff"]\n}\n\n// Output (TypeScript):\nexport interface User {\n  id: number;\n  name: string;\n}\n\nexport interface RootInterface {\n  user: User;\n  tags: string[];\n}`}
      faq={[
        { q: "Does it handle nested objects?", a: "Yes. Nested objects are extracted into their own standalone interfaces automatically, named based on the key they were found under." },
        { q: "Can it convert arrays?", a: "Yes. It will inspect the first item in the array to determine the type. For primitive arrays it will output e.g. 'string[]', and for object arrays it will create an interface for the object." },
        { q: "What about optional fields?", a: "This basic utility generates strict types based exactly on the provided JSON. It does not currently infer optional (?) fields across multiple array items." },
        { q: "Is the output standard TypeScript?", a: "Yes, it outputs standard TypeScript interface declarations that you can directly copy/paste into your .ts or .d.ts files." }
      ]}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-foreground uppercase tracking-wider">JSON Input</label>
          <textarea
            value={json}
            onChange={(e) => setJson(e.target.value)}
            className={`w-full h-[500px] bg-input text-foreground font-mono p-4 rounded-xl border-2 focus:outline-none focus:ring-4 transition-all resize-none
              ${error ? 'border-destructive focus:border-destructive focus:ring-destructive/20' : 'border-border focus:border-primary focus:ring-primary/10'}
            `}
            spellCheck="false"
          />
          {error && (
            <div className="flex items-center gap-2 text-destructive text-sm font-mono mt-2">
              <AlertCircle className="w-4 h-4" /> {error}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-bold text-foreground uppercase tracking-wider">TypeScript Output</label>
            <button 
              onClick={copyTs}
              className="text-primary hover:text-primary/80 transition-colors flex items-center gap-1 text-sm"
            >
              <Copy className="w-4 h-4" /> Copy
            </button>
          </div>
          <pre className="w-full h-[500px] bg-card text-secondary font-mono p-4 rounded-xl border-2 border-border overflow-auto">
            {ts || <span className="text-muted-foreground/50">TypeScript interfaces will appear here...</span>}
          </pre>
        </div>
      </div>
    </ToolBaseLayout>
  );
}
