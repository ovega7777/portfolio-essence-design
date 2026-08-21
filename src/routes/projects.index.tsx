import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFrame } from "../components/site-chrome";
import noComplyPrimary from "../assets/home/no-comply-primary.jpg";
import noComplyCover02 from "../assets/home/no-comply-cover-02.jpg";
import noComplyCover03 from "../assets/home/no-comply-cover-03.jpg";
import luckyDayThumb from "../assets/lucky-day-thumb.jpg";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title: "Projects — Nicholas Curzon" },
      {
        name: "description",
        content: "Selected projects by Nicholas Curzon — No Comply and Lucky Day Co.",
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
    title: "NO COMPLY USA",
    description:
      "Product design, graphic design, and creative direction for an experimental apparel brand—developing its collections, visual identity, campaign imagery, graphics, and digital presentation.",
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
    title: "LUCKY DAY CO",
    description:
      "Product design, graphic design, and creative direction for a refined lifestyle brand—shaping its identity, packaging, campaign visuals, and cohesive customer-facing experience.",
    images: [
      {
        src: luckyDayThumb,
        alt: "Lucky Day Co — refined product still life",
      },
    ],
  },
];

function ProjectsIndex() {
  return (
    <SiteFrame className="[--background:#fff] [--card:#fff] [--foreground:#111] [--muted-foreground:#666] [--border:#d9d9d9]">
      <section className="mx-auto max-w-6xl px-6 pt-8 pb-16">
        <p className="eyebrow mb-8">Projects</p>
        <h1 className="font-serif text-5xl leading-[1] md:text-7xl">
          Selected <span className="italic">Works.</span>
        </h1>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-12 md:grid-cols-2 md:gap-8 lg:gap-10">
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
      className="group block border-t border-black pt-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
    >
      <div className="mb-4 flex items-center justify-between gap-4">
        <span className="eyebrow text-black">{project.number}</span>
        <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-black/55">
          View Project →
        </span>
      </div>
      <div
        className={`mb-5 grid aspect-[3/2] overflow-hidden bg-neutral-100 ${
          project.images.length > 1 ? "grid-cols-3" : "grid-cols-1"
        }`}
      >
        {project.images.map((image) => (
          <img
            key={image.src}
            src={image.src}
            alt={image.alt}
            loading="lazy"
            width={960}
            height={1280}
            className="h-full w-full object-cover object-top transition-opacity duration-300 group-hover:opacity-90"
          />
        ))}
      </div>
      <div className="flex items-start gap-5">
        <div className="min-w-0">
          <h2 className="font-sans text-2xl font-extrabold leading-none text-black lg:text-3xl">
            {project.title}
          </h2>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-black/65">
            {project.description}
          </p>
        </div>
        <span
          aria-hidden
          className="ml-auto grid size-9 shrink-0 place-items-center rounded-full border border-black transition-colors group-hover:bg-black group-hover:text-white"
        >
          →
        </span>
      </div>
    </Link>
  );
}
