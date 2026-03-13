import React, { useState, useEffect } from "react";
import { ToolBaseLayout } from "@/components/ToolBaseLayout";
import { getToolById } from "@/lib/registry";

export default function JwtDecoder() {
  const tool = getToolById('jwt-decoder')!;
  const [token, setToken] = useState("");
  const [decoded, setDecoded] = useState<{ header: any; payload: any; valid: boolean } | null>(null);

  useEffect(() => {
    if (!token.trim()) {
      setDecoded(null);
      return;
    }

    try {
      const parts = token.split('.');
      if (parts.length !== 3) throw new Error("Invalid structure");
      
      const decodeBase64Url = (str: string) => {
        let b64 = str.replace(/-/g, '+').replace(/_/g, '/');
        while (b64.length % 4) b64 += '=';
        return JSON.parse(decodeURIComponent(escape(window.atob(b64))));
      };

      setDecoded({
        header: decodeBase64Url(parts[0]),
        payload: decodeBase64Url(parts[1]),
        valid: true
      });
    } catch (e) {
      setDecoded({ header: null, payload: null, valid: false });
    }
  }, [token]);

  return (
    <ToolBaseLayout 
      tool={tool}
      exampleUsage={`// Input (JWT):\neyJhbGciOiJIUzI1NiIsInR5cCI... (truncated)\n\n// Output (Payload):\n{\n  "sub": "1234567890",\n  "name": "John Doe",\n  "iat": 1516239022\n}`}
      faq={[
        { q: "Is it safe to decode JWTs here?", a: "Yes. Our JWT decoder runs entirely in your browser. Your token is never sent to any server, making it perfectly safe for production tokens." },
        { q: "Can I verify JWT signatures?", a: "Currently, this tool only decodes the header and payload. It does not verify the cryptographic signature since that requires the server's private key." },
        { q: "What are JWT claims?", a: "Claims are pieces of information asserted about a subject. For example, 'sub' (subject), 'name', and 'iat' (issued at) are claims stored in the payload section of the token." },
        { q: "Can anyone read my JWT?", a: "Yes! A standard JWT is only base64-encoded, not encrypted. Anyone who intercepts the token can read its contents. Never put passwords or sensitive personal data in a standard JWT." }
      ]}
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-foreground uppercase tracking-wider mb-2">JWT String</label>
          <textarea
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="ey..."
            className="w-full h-32 bg-input text-foreground font-mono p-4 rounded-xl border-2 border-border focus:border-primary focus:ring-4 focus:ring-primary/10 focus:outline-none transition-all resize-y"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-secondary uppercase tracking-wider">Header (Algorithm)</h3>
            <div className={`w-full h-48 bg-card font-mono p-4 rounded-xl border-2 border-border overflow-auto ${!decoded?.valid && token ? 'border-destructive/50' : ''}`}>
              {decoded?.valid ? (
                <pre className="text-secondary whitespace-pre-wrap">
                  {JSON.stringify(decoded.header, null, 2)}
                </pre>
              ) : token ? (
                <span className="text-destructive">Invalid JWT format</span>
              ) : (
                <span className="text-muted-foreground/50">Header data...</span>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-bold text-primary uppercase tracking-wider">Payload (Data)</h3>
            <div className={`w-full h-64 bg-card font-mono p-4 rounded-xl border-2 border-border overflow-auto ${!decoded?.valid && token ? 'border-destructive/50' : ''}`}>
              {decoded?.valid ? (
                <pre className="text-primary whitespace-pre-wrap">
                  {JSON.stringify(decoded.payload, null, 2)}
                </pre>
              ) : token ? (
                <span className="text-destructive">Invalid JWT format</span>
              ) : (
                <span className="text-muted-foreground/50">Payload data...</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </ToolBaseLayout>
  );
}
