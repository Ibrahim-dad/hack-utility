import React, { useState, useEffect } from "react";
import { ToolBaseLayout } from "@/components/ToolBaseLayout";
import { getToolById } from "@/lib/registry";
import { useToast } from "@/hooks/use-toast";
import { Copy } from "lucide-react";
import { generateMd5 } from "@/lib/md5";

export default function HashGenerator() {
  const tool = getToolById('hash-generator')!;
  const { toast } = useToast();
  const [input, setInput] = useState("");
  const [hashes, setHashes] = useState<Record<string, string>>({
    MD5: "",
    "SHA-1": "",
    "SHA-256": "",
    "SHA-512": ""
  });

  useEffect(() => {
    if (!input) {
      setHashes({ MD5: "", "SHA-1": "", "SHA-256": "", "SHA-512": "" });
      return;
    }

    const computeHashes = async () => {
      const msgBuffer = new TextEncoder().encode(input);
      
      const bufferToHex = (buffer: ArrayBuffer) => 
        Array.from(new Uint8Array(buffer)).map(b => b.toString(16).padStart(2, '0')).join('');

      const [sha1, sha256, sha512] = await Promise.all([
        crypto.subtle.digest('SHA-1', msgBuffer).then(bufferToHex),
        crypto.subtle.digest('SHA-256', msgBuffer).then(bufferToHex),
        crypto.subtle.digest('SHA-512', msgBuffer).then(bufferToHex)
      ]);

      setHashes({
        MD5: generateMd5(input),
        "SHA-1": sha1,
        "SHA-256": sha256,
        "SHA-512": sha512
      });
    };

    computeHashes();
  }, [input]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Hash copied to clipboard" });
  };

  return (
    <ToolBaseLayout 
      tool={tool}
      exampleUsage={`// Input:\nHello World\n\n// Output (SHA-256):\na591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e`}
      faq={[
        { q: "What's the difference between MD5 and SHA-256?", a: "MD5 produces a 128-bit hash, while SHA-256 produces a 256-bit hash. SHA-256 is much more mathematically complex and secure than MD5." },
        { q: "Is MD5 still secure?", a: "No. MD5 has known vulnerabilities (collision attacks) and should never be used for security purposes like hashing passwords. It is still useful for simple checksums to verify file integrity against non-malicious corruption." },
        { q: "Can hashes be reversed?", a: "No, cryptographic hash functions are one-way by design. You cannot easily reverse a hash back into its original text. Attackers use 'rainbow tables' (pre-computed lists of hashes) to guess common passwords." },
        { q: "Are these hashes generated securely?", a: "Yes, we use the browser's built-in Web Crypto API (crypto.subtle.digest) which provides native, secure implementations of these algorithms." }
      ]}
    >
      <div className="space-y-8 max-w-4xl">
        <div>
          <label className="block text-sm font-bold text-foreground uppercase tracking-wider mb-2">Input Text</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Text to hash..."
            className="w-full h-32 bg-input text-foreground font-mono p-4 rounded-xl border-2 border-border focus:border-primary focus:ring-4 focus:ring-primary/10 focus:outline-none transition-all resize-y"
          />
        </div>

        <div className="space-y-4">
          {Object.entries(hashes).map(([algo, hash]) => (
            <div key={algo} className="bg-card p-4 rounded-xl border border-border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-secondary uppercase tracking-wider">{algo}</span>
                <button 
                  onClick={() => hash && copyToClipboard(hash)}
                  disabled={!hash}
                  className="text-xs text-muted-foreground hover:text-foreground disabled:opacity-50 transition-colors flex items-center gap-1"
                >
                  <Copy className="w-3 h-3" /> Copy
                </button>
              </div>
              <div className="font-mono text-primary break-all bg-input p-3 rounded-lg border border-border/50 min-h-[46px]">
                {hash || <span className="text-muted-foreground/30">Enter text to generate {algo}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </ToolBaseLayout>
  );
}
