import { useTranslation } from "react-i18next";
import { MdOutlineWeb } from "react-icons/md";
import { FaMobile } from "react-icons/fa";

const SystemsContainer = () => {
  const { t } = useTranslation("systems");

  const projectsEngine = t("projectsEngine", { returnObjects: true }) as {
    engine: {
      title: string;
      description: string;
    };
    meta: {
      architecture: string;
      security?: string;
      status: string;
      statusValue: string;
    };
    actions: {
      api: string;
      diagram: string;
      protected?: string;
      logs: string;
    };
    platform: {
      type: string;
    };
  }[];
  return (
    <section className="systems-block space-y-8">
      <div className="space-y-4">
        {projectsEngine.map((proj) => (
          <div
            key={proj.engine.title}
            className="bg-secondary-bg border border-neutral-800 p-8 rounded-lg space-y-6"
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-primary font-geist text-3xl">
                  {proj.engine.title}
                </h2>

                <p className="text-secondary mt-4 font-ibm-plex-mono text-sm leading-relaxed max-w-3xl">
                  {proj.engine.description}
                </p>
              </div>

              <div className="flex items-center gap-2 text-secondary text-2xl opacity-40">
                {proj.platform.type === "web" ? (
                  <MdOutlineWeb className="" />
                ) : (
                  <FaMobile className="" />
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8 font-ibm-plex-mono text-sm text-secondary">
              <div className="systems-meta">
                <span className="block text-primary mb-2">
                  {proj.meta.architecture}
                </span>
                Controller → Service → Repository
              </div>

              <div className="systems-meta">
                <span className="block text-primary mb-2">
                  {proj.meta.security}
                </span>
                JWT + Role Guards
              </div>

              <div className="systems-meta">
                <span className="block text-primary mb-2">
                  {proj.meta.status}
                </span>
                <span className="text-green">{proj.meta.statusValue}</span>
              </div>
            </div>

            <div className="pt-6 border-t border-neutral-800 flex flex-wrap gap-4">
              <button className="systems-actions border border-neutral-700 px-4 py-2 text-secondary font-ibm-plex-mono text-xs opacity-50">
                {proj.actions.api}
              </button>

              <button className="systems-actions border border-neutral-700 px-4 py-2 text-secondary font-ibm-plex-mono text-xs opacity-50">
                {proj.actions.diagram}
              </button>

              <button className="systems-actions border border-neutral-700 px-4 py-2 text-secondary font-ibm-plex-mono text-xs opacity-50">
                {proj.actions.protected}
              </button>

              <button className="systems-actions border border-neutral-700 px-4 py-2 text-secondary font-ibm-plex-mono text-xs opacity-50 cursor-not-allowed">
                {proj.actions.logs}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SystemsContainer;
