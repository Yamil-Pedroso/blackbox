import type { CaseStudyTypes } from "../types/toolTypes";
import ProcessCard from "../ProcessCard";
import ProcessHero from "../ProcessHero";
import ProcessSection from "../ProcessSection";
import ProcessTimeline from "../ProcessTimeLine";
import CodeBlock from "../CodeBlock";

type CaseStudyProps = {
  caseStudy: CaseStudyTypes;
};

const CaseStudy = ({ caseStudy }: CaseStudyProps) => {
  return (
    <div className="space-y-20 max-w-5xl">
      <ProcessHero
        title={caseStudy.title}
        description={caseStudy.description}
      />

      <ProcessSection title="Overview">{caseStudy.overview}</ProcessSection>

      <ProcessSection title="Problem">{caseStudy.problem}</ProcessSection>

      <ProcessSection title="Solution">{caseStudy.solution}</ProcessSection>

      <ProcessSection title="Features">
        <div className="grid md:grid-cols-2 gap-6">
          {caseStudy.features.map((feature) => (
            <ProcessCard
              key={feature.title}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </ProcessSection>

      <ProcessSection title="Architecture">
        <CodeBlock code={caseStudy.architecture} />
      </ProcessSection>

      <ProcessSection title="Implementation">
        <CodeBlock code={caseStudy.implementation} />
      </ProcessSection>

      <ProcessSection title="Development Flow">
        <ProcessTimeline steps={caseStudy.developmentFlow} />
      </ProcessSection>

      <ProcessSection title="Lessons Learned">
        <ul className="list-disc pl-6 space-y-2 font-ibm-plex-mono text-secondary">
          {caseStudy.lessonsLearned.map((lesson) => (
            <li key={lesson}>{lesson}</li>
          ))}
        </ul>
      </ProcessSection>

      <ProcessSection title="Next Steps">
        <ul className="list-disc pl-6 space-y-2 font-ibm-plex-mono text-secondary">
          {caseStudy.nextSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ul>
      </ProcessSection>
    </div>
  );
};

export default CaseStudy;
