import { Reveal } from "@/components/anim/Reveal";
import { SplitReveal } from "@/components/anim/SplitReveal";

type SectionHeadingProps = {
  index: string;
  eyebrow: string;
  title: React.ReactNode;
  className?: string;
};

export function SectionHeading({ index, eyebrow, title, className }: SectionHeadingProps) {
  return (
    <div className={`flex flex-col gap-6 ${className ?? ""}`}>
      <Reveal className="flex items-center gap-4">
        <span className="font-mono text-sm text-accent">{index}</span>
        <span className="h-px w-10 bg-line-strong" />
        <span className="eyebrow">{eyebrow}</span>
      </Reveal>
      <SplitReveal as="h2" className="display-lg max-w-4xl text-balance">
        {title}
      </SplitReveal>
    </div>
  );
}
