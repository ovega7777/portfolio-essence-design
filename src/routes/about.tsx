import { createFileRoute } from "@tanstack/react-router";
import { SiteFrame } from "../components/site-chrome";
import portrait from "../assets/about-portrait.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Nicholas Curzon" },
      {
        name: "description",
        content:
          "About Nicholas Curzon: FIT and University of Miami, Masters in International Business, second-generation sales operator with a designer's foundation.",
      },
      { property: "og:title", content: "About — Nicholas Curzon" },
      {
        property: "og:description",
        content:
          "Second-generation sales operator with a foundation in pattern-making and international business.",
      },
    ],
  }),
  component: About,
});

function About() {
  return (
    <SiteFrame>
      <section className="mx-auto max-w-6xl px-6 pt-8 pb-24">
        <p className="eyebrow mb-8">About Me</p>
        <h1 className="font-serif text-5xl leading-[1] md:text-7xl">
          A designer's eye
          <br />
          <span className="italic">for commercial craft.</span>
        </h1>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <img
              src={portrait}
              alt="Detail of a tailored garment"
              loading="lazy"
              width={1200}
              height={1500}
              className="w-full object-cover"
            />
          </div>
          <div className="lg:col-span-7 space-y-8 text-lg leading-relaxed text-foreground/90">
            <p>
              Nicholas Curzon is a sales strategist and designer working at the
              intersection of commerce and craft. He began learning
              pattern-making and industrial design in high school, and carried
              that discipline through his studies at the{" "}
              <span className="italic">Fashion Institute of Technology</span>{" "}
              and the <span className="italic">University of Miami</span>,
              where he earned a Masters in International Business.
            </p>
            <p>
              He is a second-generation operator inside his family's sales
              company — an environment that taught him early that a good
              product is only as strong as the system that carries it to
              market. His practice sits between those two worlds: the
              designer's obsession with the object itself, and the operator's
              obsession with how it moves.
            </p>
            <p>
              Selected work includes{" "}
              <span className="font-medium">No Comply</span> — a raw,
              brutalist visual system for a technical apparel concept — and{" "}
              <span className="font-medium">Lucky Day Co</span>, a refined
              commercial framework for luxury sales and distribution.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24 border-t border-border">
        <div className="grid gap-12 md:grid-cols-3">
          <Detail label="Education">
            Fashion Institute of Technology
            <br />
            University of Miami
            <br />
            M.S. International Business
          </Detail>
          <Detail label="Practice">
            Sales Strategy
            <br />
            Pattern-Making & Product
            <br />
            Brand Development
          </Detail>
          <Detail label="Contact">
            <a
              href="mailto:nicholasc@curzonco.com"
              className="hover:text-muted-foreground"
            >
              nicholasc@curzonco.com
            </a>
            <br />
            <a
              href="https://www.linkedin.com/in/nicholascurzon/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-muted-foreground"
            >
              LinkedIn ↗
            </a>
          </Detail>
        </div>
      </section>
    </SiteFrame>
  );
}

function Detail({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-t border-border pt-6">
      <p className="eyebrow mb-4">{label}</p>
      <p className="text-base leading-relaxed">{children}</p>
    </div>
  );
}
