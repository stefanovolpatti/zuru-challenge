import { Button } from "@/components/ui/button/Button";
import type { Cta } from "@/types/content";

type PageSectionProps = {
  /** Anchor target, also used to label the section for assistive tech. */
  id: string;
  title: string;
  description: string;
  cta?: Cta;
  children: React.ReactNode;
};

export function PageSection({ id, title, description, cta, children }: PageSectionProps) {
  const headingId = `${id}-heading`;

  return (
    <section id={id} aria-labelledby={headingId} className="my-[180px] lg:mx-32">
      <div className="mt-16 mb-20 flex flex-col items-center gap-4">
        <h2 id={headingId} className="text-6xl font-bold text-primary">
          {title}
        </h2>
        <p className="mb-8 text-secondary">{description}</p>
        {cta && (
          <Button href={cta.href} variant={cta.variant ?? "neutral"}>
            {cta.label}
          </Button>
        )}
      </div>
      {children}
    </section>
  );
}
