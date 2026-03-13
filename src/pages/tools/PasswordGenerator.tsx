import React, { useState, useEffect } from "react";
import { ToolBaseLayout } from "@/components/ToolBaseLayout";
import { getToolById } from "@/lib/registry";
import { useToast } from "@/hooks/use-toast";
import { Copy, RefreshCw } from "lucide-react";

export default function PasswordGenerator() {
  const tool = getToolById('password-generator')!;
  const { toast } = useToast();
  
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(16);
  const [opts, setOpts] = useState({
    upper: true,
    lower: true,
    numbers: true,
    symbols: true
  });

  const generate = () => {
    const chars = {
      upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      lower: 'abcdefghijklmnopqrstuvwxyz',
      numbers: '0123456789',
      symbols: '!@#$%^&*()_+~|}{[]:;?><,./-='
    };
    
    let pool = '';
    if (opts.upper) pool += chars.upper;
    if (opts.lower) pool += chars.lower;
    if (opts.numbers) pool += chars.numbers;
    if (opts.symbols) pool += chars.symbols;
    
    if (!pool) {
      setPassword("Please select at least one option");
      return;
    }

    let pass = '';
    const array = new Uint32Array(length);
    crypto.getRandomValues(array);
    for (let i = 0; i < length; i++) {
      pass += pool[array[i] % pool.length];
    }
    setPassword(pass);
  };

  useEffect(() => {
    generate();
  }, [length, opts]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    toast({ title: "Password copied securely" });
  };

  const getStrength = () => {
    let score = 0;
    if (length > 8) score++;
    if (length > 12) score++;
    if (opts.upper && opts.lower) score++;
    if (opts.numbers) score++;
    if (opts.symbols) score++;
    
    if (score < 2) return { label: "Weak", color: "text-destructive" };
    if (score < 4) return { label: "Medium", color: "text-yellow-400" };
    return { label: "Strong", color: "text-accent" };
  };

  const strength = getStrength();

  return (
    <ToolBaseLayout 
      tool={tool}
      exampleUsage={`// Settings:\nLength: 16\nInclude: Uppercase, Lowercase, Numbers, Symbols\n\n// Output:\nk9#mP2$xL5@vN8*q`}
      faq={[
        { q: "How secure are generated passwords?", a: "Very secure. We use your browser's Web Crypto API (crypto.getRandomValues) to ensure high-entropy, cryptographically strong random generation that cannot be easily predicted." },
        { q: "Is the password stored anywhere?", a: "No. The password exists only in your browser's active memory. It is never saved to cookies, local storage, or sent to any server. Once you close the tab, it's gone." },
        { q: "What makes a strong password?", a: "Length is the most important factor. A 16-character password with mixed character types is highly resistant to brute-force attacks. We recommend at least 16 characters for critical accounts." },
        { q: "Should I remember these passwords?", a: "No. You should use a dedicated Password Manager to store these complex passwords. You only need to remember one strong master password for the vault." }
      ]}
    >
      <div className="max-w-2xl bg-card border border-border rounded-2xl p-6 md:p-8 space-y-8">
        
        {/* Password Display */}
        <div className="relative group">
          <div className="w-full bg-input break-all text-foreground font-mono text-2xl md:text-3xl p-6 rounded-xl border-2 border-border flex items-center justify-between">
            <span className="mr-4 tracking-wider">{password}</span>
            <button 
              onClick={copyToClipboard}
              className="flex-shrink-0 bg-primary text-primary-foreground p-3 rounded-lg hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all"
            >
              <Copy className="w-6 h-6" />
            </button>
          </div>
          <div className="mt-3 flex justify-between items-center px-2">
            <span className={`text-sm font-bold uppercase tracking-wider ${strength.color}`}>
              {strength.label} Password
            </span>
            <button 
              onClick={generate}
              className="text-sm font-medium text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              <RefreshCw className="w-4 h-4" /> Regenerate
            </button>
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold text-foreground uppercase tracking-wider">Length</label>
              <span className="text-xl font-mono text-primary">{length}</span>
            </div>
            <input 
              type="range" 
              min="8" max="128" 
              value={length} 
              onChange={(e) => setLength(parseInt(e.target.value))}
              className="w-full h-2 bg-input rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-border">
            {[
              { id: 'upper', label: 'Uppercase (A-Z)' },
              { id: 'lower', label: 'Lowercase (a-z)' },
              { id: 'numbers', label: 'Numbers (0-9)' },
              { id: 'symbols', label: 'Symbols (!@#$)' }
            ].map(opt => (
              <label key={opt.id} className="flex items-center p-4 bg-input rounded-xl border border-border cursor-pointer hover:border-primary/50 transition-colors">
                <input 
                  type="checkbox"
                  checked={opts[opt.id as keyof typeof opts]}
                  onChange={(e) => setOpts(o => ({ ...o, [opt.id]: e.target.checked }))}
                  className="w-5 h-5 rounded border-border text-primary focus:ring-primary focus:ring-offset-background bg-background"
                />
                <span className="ml-3 font-medium text-foreground">{opt.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </ToolBaseLayout>
  );
}
