import {
  Activity,
  AlertTriangle,
  ArrowRight,
  Boxes,
  CheckCircle2,
  Cpu,
  GitBranch,
} from "lucide-react";
import { useTranslation } from "react-i18next";

type ProcessStage = {
  title: string;
  description: string;
  detail: string;
};

type ProcessMiniApp = {
  eyebrow: string;
  title: string;
  summary: string;
  conceptDetails?: string[];
  runtime: string;
  userValue: string;
  stages: ProcessStage[];
  architecture: string[];
  signals: string[];
  caveats: string[];
};

type ProcessMiniAppViewProps = {
  slug: string;
};

const getList = (value: unknown): string[] => (Array.isArray(value) ? value : []);

const getStages = (value: unknown): ProcessStage[] =>
  Array.isArray(value) ? (value as ProcessStage[]) : [];

const ProcessMiniAppView = ({ slug }: ProcessMiniAppViewProps) => {
  const { t } = useTranslation("processMiniAppsAi");
  const app = t(`apps.${slug}`, { returnObjects: true }) as ProcessMiniApp;
  const stages = getStages(app.stages);
  const conceptDetails = getList(app.conceptDetails);
  const architecture = getList(app.architecture);
  const signals = getList(app.signals);
  const caveats = getList(app.caveats);

  return (
    <section className="w-full bg-main-bg px-5 py-8 text-primary md:px-10 xl:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-10">
        <header className="grid gap-8 border-b border-neutral-800 pb-10 lg:grid-cols-[1.25fr_0.75fr]">
          <div className="min-w-0">
            <p className="font-ibm-plex-mono text-xs uppercase tracking-[0.18em] text-green">
              {app.eyebrow}
            </p>
            <h1 className="mt-4 max-w-4xl font-geist text-4xl font-semibold leading-tight text-primary md:text-6xl">
              {app.title}
            </h1>
            <p className="mt-6 max-w-3xl font-ibm-plex-mono text-sm leading-7 text-secondary md:text-base">
              {app.userValue}
            </p>
          </div>

          <aside className="grid content-start gap-4">
            <div className="border border-neutral-800 bg-secondary-bg p-5">
              <div className="flex items-center gap-3">
                <Cpu className="h-5 w-5 text-green" />
                <p className="font-ibm-plex-mono text-xs uppercase tracking-[0.14em] text-secondary">
                  {t("shared.runtime")}
                </p>
              </div>
              <p className="mt-4 text-lg leading-snug text-primary">
                {app.runtime}
              </p>
            </div>

            <div className="border border-neutral-800 bg-secondary-bg p-5">
              <div className="flex items-center gap-3">
                <Activity className="h-5 w-5 text-green" />
                <p className="font-ibm-plex-mono text-xs uppercase tracking-[0.14em] text-secondary">
                  {t("shared.concept")}
                </p>
              </div>
              <p className="mt-4 text-lg leading-snug text-primary">
                {app.summary}
              </p>
            </div>
          </aside>
        </header>

        <section className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="border border-neutral-800 bg-secondary-bg p-6">
            <p className="font-ibm-plex-mono text-xs uppercase tracking-[0.16em] text-green">
              {t("shared.conceptLens")}
            </p>
            <h2 className="mt-4 font-geist text-2xl font-semibold text-primary">
              {t("shared.whatItIs")}
            </h2>
            <p className="mt-4 font-ibm-plex-mono text-sm leading-7 text-secondary">
              {app.summary}
            </p>
            {conceptDetails.length > 0 && (
              <ul className="mt-5 space-y-3">
                {conceptDetails.map((detail) => (
                  <li
                    key={detail}
                    className="border-l border-green/40 pl-4 font-ibm-plex-mono text-sm leading-6 text-secondary"
                  >
                    {detail}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="border border-neutral-800 bg-secondary-bg p-6">
            <p className="font-ibm-plex-mono text-xs uppercase tracking-[0.16em] text-green">
              {t("shared.fullStackLens")}
            </p>
            <h2 className="mt-4 font-geist text-2xl font-semibold text-primary">
              {t("shared.howItRuns")}
            </h2>
            <p className="mt-4 font-ibm-plex-mono text-sm leading-7 text-secondary">
              {app.runtime}
            </p>
          </div>
        </section>

        <section>
          <div className="mb-5 flex items-center gap-3">
            <GitBranch className="h-5 w-5 text-green" />
            <h2 className="font-geist text-2xl font-semibold text-primary">
              {t("shared.pipeline")}
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {stages.map((stage, index) => (
              <article
                key={stage.title}
                className="group flex min-h-[18rem] flex-col border border-neutral-800 bg-secondary-bg p-5 transition-colors duration-300 hover:border-green/60"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="grid size-10 place-items-center border border-green/40 font-ibm-plex-mono text-sm text-green">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <ArrowRight className="h-4 w-4 text-secondary transition-transform duration-300 group-hover:translate-x-1 group-hover:text-green" />
                </div>

                <h3 className="mt-6 text-xl font-semibold leading-tight text-primary">
                  {stage.title}
                </h3>
                <p className="mt-4 font-ibm-plex-mono text-sm leading-6 text-secondary">
                  {stage.description}
                </p>
                <p className="mt-auto border-t border-neutral-800 pt-5 font-ibm-plex-mono text-xs leading-5 text-secondary/80">
                  {stage.detail}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="border border-neutral-800 bg-secondary-bg p-6">
            <div className="mb-6 flex items-center gap-3">
              <Boxes className="h-5 w-5 text-green" />
              <h2 className="font-geist text-2xl font-semibold text-primary">
                {t("shared.architecture")}
              </h2>
            </div>

            <div className="grid gap-3">
              {architecture.map((item, index) => (
                <div
                  key={item}
                  className="flex items-start gap-4 border border-neutral-800 bg-main-bg p-4"
                >
                  <span className="font-ibm-plex-mono text-xs text-green">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="font-ibm-plex-mono text-sm leading-6 text-secondary">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
            <section className="border border-neutral-800 bg-secondary-bg p-6">
              <div className="mb-5 flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-green" />
                <h2 className="font-geist text-xl font-semibold text-primary">
                  {t("shared.signals")}
                </h2>
              </div>
              <ul className="space-y-3">
                {signals.map((signal) => (
                  <li
                    key={signal}
                    className="border-l border-green/40 pl-4 font-ibm-plex-mono text-sm leading-6 text-secondary"
                  >
                    {signal}
                  </li>
                ))}
              </ul>
            </section>

            <section className="border border-neutral-800 bg-secondary-bg p-6">
              <div className="mb-5 flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-green" />
                <h2 className="font-geist text-xl font-semibold text-primary">
                  {t("shared.caveats")}
                </h2>
              </div>
              <ul className="space-y-3">
                {caveats.map((caveat) => (
                  <li
                    key={caveat}
                    className="border-l border-neutral-700 pl-4 font-ibm-plex-mono text-sm leading-6 text-secondary"
                  >
                    {caveat}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </section>
      </div>
    </section>
  );
};

export default ProcessMiniAppView;
