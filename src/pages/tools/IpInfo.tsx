import { useState, useEffect } from "react";
import { ToolBaseLayout } from "@/components/ToolBaseLayout";
import { getToolById } from "@/lib/registry";
import { useToast } from "@/hooks/use-toast";
import { Copy, RefreshCw, MapPin, Wifi, Clock, Globe, Server, Navigation } from "lucide-react";

interface IpData {
  ip: string;
  city: string;
  region: string;
  country: string;
  loc: string;
  org: string;
  timezone: string;
  postal: string;
  hostname?: string;
}

export default function IpInfo() {
  const tool = getToolById('ip-info')!;
  const { toast } = useToast();
  const [ipData, setIpData] = useState<IpData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchIpInfo = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("https://ipinfo.io/json?token=");
      if (!res.ok) throw new Error("Failed to fetch IP info");
      const data = await res.json();
      setIpData(data);
    } catch {
      try {
        const res = await fetch("https://api.ipify.org?format=json");
        const { ip } = await res.json();
        const geoRes = await fetch(`https://ipapi.co/${ip}/json/`);
        const geo = await geoRes.json();
        setIpData({
          ip: ip,
          city: geo.city || "Unknown",
          region: geo.region || "Unknown",
          country: geo.country_name || geo.country || "Unknown",
          loc: `${geo.latitude || 0},${geo.longitude || 0}`,
          org: geo.org || geo.asn || "Unknown",
          timezone: geo.timezone || "Unknown",
          postal: geo.postal || "Unknown",
          hostname: geo.hostname,
        });
      } catch {
        setError("Unable to fetch IP information. Please check your connection and try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIpInfo();
  }, []);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: `${label} copied to clipboard` });
  };

  const [lat, lon] = ipData?.loc?.split(",") || ["", ""];

  const infoFields = ipData
    ? [
        { icon: Globe, label: "IP Address", value: ipData.ip, color: "text-primary" },
        { icon: MapPin, label: "City", value: ipData.city, color: "text-secondary" },
        { icon: Navigation, label: "Region", value: ipData.region, color: "text-secondary" },
        { icon: Globe, label: "Country", value: ipData.country, color: "text-secondary" },
        { icon: MapPin, label: "Coordinates", value: ipData.loc, color: "text-accent" },
        { icon: Server, label: "ISP / Organization", value: ipData.org, color: "text-primary" },
        { icon: Clock, label: "Timezone", value: ipData.timezone, color: "text-accent" },
        { icon: Wifi, label: "Postal Code", value: ipData.postal, color: "text-muted-foreground" },
      ]
    : [];

  return (
    <ToolBaseLayout
      tool={tool}
      exampleUsage={`// Your public IP and network info:\nIP: 203.0.113.42\nCity: San Francisco\nRegion: California\nCountry: United States\nISP: AS13335 Cloudflare, Inc.\nTimezone: America/Los_Angeles`}
      faq={[
        { q: "Is my IP address being stored?", a: "No. We fetch your IP info from a third-party API and display it directly in your browser. Hack Utility does not log, store, or transmit your IP address to any of our own servers." },
        { q: "What is a public IP address?", a: "Your public IP address is the address assigned to your network by your Internet Service Provider (ISP). It's how websites and services identify your connection on the internet. It's different from your local/private IP (like 192.168.x.x) used within your home network." },
        { q: "Why does my location look inaccurate?", a: "IP geolocation is an approximation based on ISP data. It typically identifies your city or region but not your exact street address. VPNs, proxies, and mobile networks can further shift the reported location." },
        { q: "What does the ISP/Organization field mean?", a: "This shows the Autonomous System (AS) number and name of the organization that owns your IP address block. It's usually your Internet Service Provider, but can also be a cloud provider or corporate network." },
      ]}
    >
      <div className="space-y-6 max-w-4xl">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Your Network Info</h2>
          <button
            onClick={fetchIpInfo}
            disabled={loading}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-bold text-primary border border-primary rounded-lg hover:bg-primary hover:text-primary-foreground transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>

        {loading && (
          <div className="bg-card rounded-2xl border border-border p-12 flex flex-col items-center justify-center gap-4">
            <RefreshCw className="w-10 h-10 text-primary animate-spin" />
            <p className="text-muted-foreground font-mono text-sm">Fetching your IP information...</p>
          </div>
        )}

        {error && (
          <div className="bg-card rounded-2xl border border-destructive/50 p-8 text-center">
            <p className="text-destructive font-bold mb-2">Error</p>
            <p className="text-muted-foreground text-sm">{error}</p>
          </div>
        )}

        {!loading && !error && ipData && (
          <>
            <div className="bg-card rounded-2xl border border-primary/30 p-8 text-center">
              <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2">Your Public IP</p>
              <div className="flex items-center justify-center gap-3">
                <span className="text-3xl md:text-5xl font-display font-bold text-primary tracking-wider">
                  {ipData.ip}
                </span>
                <button
                  onClick={() => copyToClipboard(ipData.ip, "IP address")}
                  className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
                >
                  <Copy className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {infoFields.slice(1).map((field) => (
                <div
                  key={field.label}
                  className="bg-card rounded-xl border border-border p-5 flex items-start gap-4 group hover:border-primary/30 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center flex-shrink-0 border border-border">
                    <field.icon className={`w-5 h-5 ${field.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-1">{field.label}</p>
                    <p className="text-foreground font-bold truncate">{field.value || "N/A"}</p>
                  </div>
                  <button
                    onClick={() => copyToClipboard(field.value, field.label)}
                    className="opacity-0 group-hover:opacity-100 p-1.5 rounded text-muted-foreground hover:text-foreground transition-all"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {lat && lon && lat !== "0" && lon !== "0" && (
              <div className="bg-card rounded-2xl border border-border overflow-hidden">
                <div className="p-4 border-b border-border">
                  <h3 className="text-sm font-bold text-foreground uppercase tracking-wider flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    Approximate Location
                  </h3>
                </div>
                <div className="h-64 bg-background flex items-center justify-center">
                  <a
                    href={`https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=10/${lat}/${lon}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-3 text-muted-foreground hover:text-primary transition-colors group"
                  >
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:bg-primary/20 transition-colors">
                      <MapPin className="w-8 h-8 text-primary" />
                    </div>
                    <span className="font-mono text-sm">{lat}, {lon}</span>
                    <span className="text-xs">Click to view on OpenStreetMap</span>
                  </a>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </ToolBaseLayout>
  );
}
