import { MidModWordmark } from "@/components/mid-mod-wordmark";
import { midModDescription, midModPreview } from "@/data/mid-mod";
import { LuckyDayWordmark } from "@/components/lucky-day-wordmark";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFrame } from "../components/site-chrome";
import noComplyPrimary from "../assets/home/no-comply-primary.jpg";
import { AnimatedWordmark } from "@/components/no-comply/animated-wordmark";
import noComplyCover02 from "../assets/home/no-comply-cover-02.jpg";
import noComplyCover03 from "../assets/home/no-comply-cover-03.jpg";
import luckyDayThumb from "../assets/lucky-day-main.jpg";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title: "Projects — Nicholas Curzon" },
      {
        name: "description",
        content: "Selected projects by Nicholas Curzon — No Comply, Lucky Day Co., and MID MOD.",
      },
      { property: "og:title", content: "Projects — Nicholas Curzon" },
      {
        property: "og:description",
        content: "Selected projects: No Comply, Lucky Day Co., and MID MOD.",
      },
    ],
  }),
  component: ProjectsIndex,
});

const projects = [
  {
    to: "/projects/no-comply" as const,
    number: "01",
    title: "NO COMPLY USA",
    description:
      "NO COMPLY USA is a unisex experimental apparel brand rooted in nonconformity and an open-ended approach to American style. Drawing from the rebellious energy of American counterculture, the brand translates varied influences into a distinctly contemporary visual language.",
    images: [
      {
        src: noComplyPrimary,
        alt: "NO COMPLY USA campaign model wearing a black patched jacket",
      },
      {
        src: noComplyCover02,
        alt: "NO COMPLY USA campaign model wearing a black patched shirt and plaid trousers",
      },
      {
        src: noComplyCover03,
        alt: "NO COMPLY USA campaign model wearing a black patched jacket and carrying a black bag",
      },
    ],
  },
  {
    to: "/projects/lucky-day-co" as const,
    number: "02",
    title: "Lucky Day Co.",
    description:
      "Lucky Day Co. is an elegant jewelry and lifestyle brand grounded in classic design, responsibly sourced materials, and transparent pricing. Each piece is designed with care as a personal charm, created to carry meaning and invite good luck into everyday life.",
    images: [
      {
        src: luckyDayThumb,
        alt: "Lucky Day Co. silver signet rings on a tattooed hand resting on an open book",
      },
    ],
  },
  {
    to: "/projects/mid-mod" as const,
    number: "03",
    title: "MID MOD",
    description: midModDescription,
    images: [midModPreview],
  },
];

function ProjectsIndex() {
  return (
    <SiteFrame className="portfolio-projects-page [--background:#fff] [--card:#fff] [--foreground:#111] [--muted-foreground:#666] [--border:#d9d9d9]">
      <section className="projects-page-container mx-auto max-w-6xl px-6 pt-8 pb-16">
        <p className="eyebrow mb-8">Projects</p>
        <h1 className="font-serif text-5xl leading-[1] md:text-7xl">
          Selected <span className="italic">Works.</span>
        </h1>
      </section>

      <section className="projects-page-container mx-auto max-w-6xl px-6 pb-24">
        <div className="projects-page-grid">
          {projects.map((project) => (
            <ProjectCard key={project.to} project={project} />
          ))}
        </div>
      </section>
    </SiteFrame>
  );
}

function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  return (
    <Link
      to={project.to}
      aria-label={`View ${project.title} project`}
      className="projects-page-card group block border-t border-black pt-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
    >
      <div className="mb-4 flex items-center justify-between gap-4">
        <span className="eyebrow text-black">{project.number}</span>
        <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-black/55">
          View Project <span aria-hidden="true">→</span>
        </span>
      </div>
      <div
        className={`portfolio-project-images projects-card-images mb-5 grid overflow-hidden ${project.to === "/projects/mid-mod" ? "aspect-square bg-white" : project.to === "/projects/lucky-day-co" ? "aspect-[1125/1280] bg-white" : "aspect-[3/2] bg-neutral-100"} ${
          project.images.length > 1 ? "grid-cols-3" : "grid-cols-1"
        }`}
      >
        {project.images.map((image) => (
          <img
            key={image.src}
            src={image.src}
            alt={image.alt}
            loading="lazy"
            width={project.to === "/projects/mid-mod" ? 1254 : project.to === "/projects/lucky-day-co" ? 1125 : 960}
            height={project.to === "/projects/mid-mod" ? 1254 : 1280}
            className={`h-full w-full ${project.to !== "/projects/no-comply" ? "object-contain" : "object-cover object-top"} transition-opacity duration-300 group-hover:opacity-90`}
          />
        ))}
      </div>
      <div className="projects-card-body">
        <div className="projects-card-copy min-w-0">
          <h2 className="projects-card-title font-sans text-2xl font-extrabold leading-none text-black lg:text-3xl">
            {project.to === "/projects/no-comply" ? <AnimatedWordmark /> : project.to === "/projects/mid-mod" ? <MidModWordmark /> : <LuckyDayWordmark />}
          </h2>
          <p className="projects-card-description mt-3 max-w-lg text-sm leading-relaxed text-black/65">
            {project.description}
          </p>
        </div>
      </div>
    </Link>
  );
}
