import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFrame } from "../components/site-chrome";
import noComplyThumb from "../assets/no-comply-hero.png.asset.json";
import luckyDayThumb from "../assets/lucky-day-thumb.jpg";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title: "Projects — Nicholas Curzon" },
      {
        name: "description",
        content:
          "Selected projects by Nicholas Curzon — No Comply and Lucky Day Co.",
      },
      { property: "og:title", content: "Projects — Nicholas Curzon" },
      {
        property: "og:description",
        content: "Selected projects: No Comply and Lucky Day Co.",
      },
    ],
  }),
  component: ProjectsIndex,
});

const projects = [
  {
    to: "/projects/no-comply" as const,
    number: "01",
    title: "No Comply",
    year: "2025",
    role: "Visual Identity",
    meta: "A raw, brutalist visual system for a technical apparel concept.",
    src: "no-comply",
  },
  {
    to: "/projects/lucky-day-co" as const,
    number: "02",
    title: "Lucky Day Co",
    year: "2024",
    role: "Brand Strategy",
    meta: "A refined commercial framework for luxury sales and distribution.",
    src: "lucky-day",
  },
];

function ProjectsIndex() {
  return (
    <SiteFrame>
      <section className="mx-auto max-w-6xl px-6 pt-8 pb-16">
        <p className="eyebrow mb-8">Projects</p>
        <h1 className="font-serif text-5xl leading-[1] md:text-7xl">
          Selected <span className="italic">Works.</span>
        </h1>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-16 md:grid-cols-2">
          <ProjectCard project={projects[0]} src={noComplyThumb.url} />
          <ProjectCard project={projects[1]} src={luckyDayThumb} />
        </div>
      </section>
    </SiteFrame>
  );
}

function ProjectCard({
  project,
  src,
}: {
  project: (typeof projects)[number];
  src: string;
}) {
  return (
    <Link to={project.to} className="group block">
      <div className="mb-6 flex items-center justify-between">
        <span className="eyebrow">{project.number}</span>
        <span className="eyebrow">
          {project.year} — {project.role}
        </span>
      </div>
      <div className="mb-6 overflow-hidden bg-secondary">
        <img
          src={src}
          alt={project.title}
          loading="lazy"
          width={1600}
          height={1067}
          className="aspect-[3/2] w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="flex items-start justify-between">
        <div>
          <h2 className="font-serif text-3xl">{project.title}</h2>
          <p className="mt-2 max-w-md text-sm italic text-muted-foreground">
            {project.meta}
          </p>
        </div>
        <span className="grid size-10 shrink-0 place-items-center rounded-full border border-border transition-colors group-hover:bg-accent group-hover:text-accent-foreground group-hover:border-accent">
          →
        </span>
      </div>
    </Link>
  );
}
