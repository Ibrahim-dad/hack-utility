import React from "react";
import { Link } from "wouter";

export default function Privacy() {
  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-8">Privacy Policy</h1>
      <div className="prose dark:prose-invert prose-primary max-w-none text-muted-foreground space-y-6">
        <p className="text-lg"><strong>Last Updated: January 2025</strong></p>
        
        <p className="text-xl text-foreground font-medium my-8 p-6 bg-primary/10 border border-primary/20 rounded-xl">
          TL;DR: We do not send your data to our servers. All tools process your data locally in your web browser.
        </p>
        
        <h2 className="text-foreground font-display text-2xl border-b border-border pb-2 mt-12 mb-4">1. Zero Data Collection</h2>
        <p>
          Hack Utility is fundamentally designed around privacy. <strong>All tools execute entirely in your local browser.</strong> We do not send your data, strings, JSON, API responses, JWTs, or generated passwords to our servers. When you paste data into a text box on <Link href="/">Hack Utility</Link>, it stays on your machine.
        </p>

        <h2 className="text-foreground font-display text-2xl border-b border-border pb-2 mt-8 mb-4">2. Local Storage</h2>
        <p>
          We may use local storage (IndexedDB or localStorage) exclusively to save your UI preferences, such as dark mode settings or tool-specific formatting options. This data never leaves your device and is not synchronized to the cloud.
        </p>

        <h2 className="text-foreground font-display text-2xl border-b border-border pb-2 mt-8 mb-4">3. Analytics</h2>
        <p>
          We use basic, privacy-preserving, cookieless analytics to count page views and understand which tools are most popular. We do not track individual users across sessions, use tracking cookies, or collect personally identifiable information (PII).
        </p>

        <h2 className="text-foreground font-display text-2xl border-b border-border pb-2 mt-8 mb-4">4. Third-Party Links</h2>
        <p>
          Our <Link href="/guides">Developer Guides</Link> and documentation may contain links to third-party websites. If you click on a third-party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit.
        </p>

        <h2 className="text-foreground font-display text-2xl border-b border-border pb-2 mt-8 mb-4">5. Changes to This Privacy Policy</h2>
        <p>
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. Changes are effective immediately upon posting.
        </p>
      </div>
    </div>
  );
}
