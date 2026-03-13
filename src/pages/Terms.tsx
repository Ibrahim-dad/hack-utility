import React from "react";
import { Link } from "wouter";

export default function Terms() {
  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-8">Terms of Service</h1>
      <div className="prose dark:prose-invert prose-primary max-w-none text-muted-foreground space-y-6">
        <p className="text-lg"><strong>Last Updated: January 2025</strong></p>

        <h2 className="text-foreground font-display text-2xl border-b border-border pb-2 mt-12 mb-4">1. Acceptance of Terms</h2>
        <p>
          By accessing and using <Link href="/">Hack Utility</Link> ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these terms, please do not use this service.
        </p>

        <h2 className="text-foreground font-display text-2xl border-b border-border pb-2 mt-8 mb-4">2. Description of Service</h2>
        <p>
          Hack Utility provides a collection of web-based developer tools (such as JSON formatters, Encoders, Hash Generators, etc.) that operate strictly entirely within the user's web browser environment. The Service is provided free of charge.
        </p>

        <h2 className="text-foreground font-display text-2xl border-b border-border pb-2 mt-8 mb-4">3. Disclaimer of Warranties</h2>
        <p>
          The tools provided on Hack Utility are provided "as is" and "as available" without any representations or warranties, express or implied. 
        </p>
        <p>
          While we strive for accuracy in our tools (such as <Link href="/dev-tools/json-to-typescript">JSON to TypeScript</Link> conversion or Hash Generation), you should always verify critical outputs independently. We do not warrant that the results obtained from the use of the Service will be accurate or reliable for production environments without secondary verification.
        </p>

        <h2 className="text-foreground font-display text-2xl border-b border-border pb-2 mt-8 mb-4">4. Limitation of Liability</h2>
        <p>
          In no event shall Hack Utility, nor its creators, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
        </p>
        <ul>
          <li>Your access to or use of or inability to access or use the Service.</li>
          <li>Any conduct or content of any third party on the Service.</li>
          <li>Any content or output obtained from the Service.</li>
        </ul>

        <h2 className="text-foreground font-display text-2xl border-b border-border pb-2 mt-8 mb-4">5. Intellectual Property</h2>
        <p>
          The visual design, layout, look, appearance, and graphics of the Service are protected by copyright. The underlying logic and tool implementations utilize common open-source standards and algorithms.
        </p>
      </div>
    </div>
  );
}
