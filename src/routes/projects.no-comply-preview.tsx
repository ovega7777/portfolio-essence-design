import { Button } from "@/components/ui/button";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { SiteFrame } from "../components/site-chrome";

const LIVE_SITE_URL = "https://riot-reveal-commerce.lovable.app";

export const Route = createFileRoute("/projects/no-comply-preview")({
  head: () => ({
    meta: [
      { title: "NO COMPLY USA — Live Website · Nicholas Curzon" },
      {
        name: "description",
        content: "Explore the live NO COMPLY USA website and enter the complete Nicholas Curzon case study.",
      },
      { property: "og:title", content: "NO COMPLY USA — Live Website · Nicholas Curzon" },
      {
        property: "og:description",
        content: "Explore the live NO COMPLY USA website and enter the complete Nicholas Curzon case study.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: NoComplyPreview,
});

function NoComplyPreview() {
  return (
    <SiteFrame className="portfolio-no-comply-preview">
      <section className="mx-auto max-w-6xl px-6 pb-16 pt-8 md:pb-24 md:pt-12">
        <div className="mb-7 border-t border-foreground pt-4 md:mb-9">
          <p className="eyebrow mb-3">01 — Digital Experience</p>
          <h1 className="font-sans text-3xl font-extrabold uppercase leading-none md:text-5xl">
            NO COMPLY USA
          </h1>
        </div>

        <div className="no-comply-browser overflow-hidden border border-border bg-card shadow-xl">
          <div className="flex h-10 items-center gap-2 border-b border-border bg-muted px-4" aria-hidden="true">
            <span className="size-2.5 rounded-full bg-destructive" />
            <span className="size-2.5 rounded-full bg-stone-ink" />
            <span className="size-2.5 rounded-full bg-foreground" />
          </div>
          <div className="no-comply-browser-viewport relative overflow-hidden bg-background">
            <iframe
              src={LIVE_SITE_URL}
              title="Live NO COMPLY USA website"
              className="no-comply-browser-iframe absolute left-0 top-0 border-0"
              allow="autoplay; fullscreen"
              loading="eager"
            />
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <Button asChild variant="default" size="lg" className="h-12 rounded-none px-7 text-xs font-bold uppercase tracking-[0.18em]">
            <Link to="/projects/no-comply">Enter Shop</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="h-12 rounded-none px-7 text-xs font-bold uppercase tracking-[0.18em]">
            <a href={LIVE_SITE_URL} target="_blank" rel="noopener noreferrer">
              View Full Website
              <ExternalLink aria-hidden="true" />
            </a>
          </Button>
        </div>
      </section>
    </SiteFrame>
  );
}