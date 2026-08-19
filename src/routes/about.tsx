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
              My background combines apparel design training, fashion business
              education, and commercial sales experience. I developed hands-on
              skills in fashion illustration, patternmaking, textiles, garment
              construction, and product development before earning a degree in
              Fashion Business Management from the{" "}
              <strong>
                <em>Fashion Institute of Technology</em>
              </strong>{" "}
              and a master’s degree in International Business from the{" "}
              <strong>
                <em>University of Miami</em>
              </strong>.
            </p>
            <p>
              Through my experience in B2B and B2C sales, I have developed a
              strong understanding of customer needs, market opportunities, and
              product performance. Collaborating with customers, sales teams,
              and product-development partners has strengthened my ability to
              translate commercial insights into relevant product and brand
              opportunities.
            </p>
            <p>
              The projects featured in this portfolio demonstrate how I apply
              that perspective across creative direction, product and graphic
              design, brand strategy, marketing, and web and digital interface
              design.{" "}
              <strong>
                <em>NO COMPLY USA</em>
              </strong>{" "}
              and{" "}
              <strong>
                <em>Lucky Day Co.</em>
              </strong>{" "}
              serve as case studies of my contributions to collection
              development, product merchandising, campaign art direction,
              content production, and digital experiences.
            </p>
            <a
              href="/nicholas-curzon-resume-2026.pdf"
              target="_blank"
              rel="noreferrer"
              aria-label="View Nicholas Curzon's resume (opens in a new tab)"
              className="inline-flex min-h-14 items-center border border-foreground px-[30px] py-5 text-[11px] font-bold uppercase tracking-[0.25em] transition-colors hover:bg-foreground hover:text-background focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
            >
              View Resume →
            </a>
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
