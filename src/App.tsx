import { useEffect } from "react";
import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/lib/theme";

import { AppLayout } from "@/components/layout/AppLayout";

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [location]);
  return null;
}
import NotFound from "@/pages/not-found";

import Home from "@/pages/Home";
import Category from "@/pages/Category";
import Guides from "@/pages/Guides";
import GuideDetail from "@/pages/GuideDetail";
import About from "@/pages/About";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import Sitemap from "@/pages/Sitemap";

import JsonFormatter from "@/pages/tools/JsonFormatter";
import Base64Encoder from "@/pages/tools/Base64";
import JwtDecoder from "@/pages/tools/JwtDecoder";
import UuidGenerator from "@/pages/tools/UuidGenerator";
import PasswordGenerator from "@/pages/tools/PasswordGenerator";
import HashGenerator from "@/pages/tools/HashGenerator";
import RegexTester from "@/pages/tools/RegexTester";
import JsonToTs from "@/pages/tools/JsonToTs";
import IpInfo from "@/pages/tools/IpInfo";

const queryClient = new QueryClient();

function Router() {
  return (
    <AppLayout>
      <ScrollToTop />
      <Switch>
        {/* Core Pages */}
        <Route path="/" component={Home} />
        <Route path="/guides" component={Guides} />
        <Route path="/guides/:slug" component={GuideDetail} />
        <Route path="/about" component={About} />
        <Route path="/privacy" component={Privacy} />
        <Route path="/terms" component={Terms} />
        <Route path="/sitemap" component={Sitemap} />

        {/* Tools Pages */}
        <Route path="/dev-tools/json-formatter" component={JsonFormatter} />
        <Route path="/dev-tools/jwt-decoder" component={JwtDecoder} />
        <Route path="/dev-tools/uuid-generator" component={UuidGenerator} />
        <Route path="/dev-tools/regex-tester" component={RegexTester} />
        <Route path="/dev-tools/json-to-typescript" component={JsonToTs} />
        <Route path="/encoding-tools/base64-encoder" component={Base64Encoder} />
        <Route path="/security-tools/password-generator" component={PasswordGenerator} />
        <Route path="/security-tools/hash-generator" component={HashGenerator} />
        <Route path="/network-tools/ip-info" component={IpInfo} />

        {/* Categories (must be below explicit paths) */}
        <Route path="/:slug" component={Category} />

        <Route component={NotFound} />
      </Switch>
    </AppLayout>
  );
}

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
