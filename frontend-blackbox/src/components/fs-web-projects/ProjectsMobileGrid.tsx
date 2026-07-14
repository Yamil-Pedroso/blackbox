import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FiBattery, FiHeart, FiHome, FiSearch, FiUser } from "react-icons/fi";
import type { MobileProject } from "./types/fsWebProjects.types";

const ProjectsMobileGrid = () => {
  const { t } = useTranslation("fullStackProjects");
  const projects = t("mobileProjectsGrid.projects", {
    returnObjects: true,
  }) as MobileProject[];

  return (
    <motion.section
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="space-y-6"
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-green">
            {t("mobileProjectsGrid.eyebrow")}
          </p>
          <h2 className="mt-2 text-xl font-semibold">
            {t("mobileProjectsGrid.title")}
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-relaxed text-secondary">
          {t("mobileProjectsGrid.description")}
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {projects.map((project, index) => (
          <motion.article
            key={project.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              delay: index * 0.08,
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="group overflow-hidden rounded-xl border border-border bg-secondary-bg text-primary shadow-sm shadow-black/5 transition hover:border-green/60 hover:bg-tertiary"
          >
            <div className="flex min-h-72 items-center justify-center bg-muted p-5">
              <PhonePreview
                project={project}
                variant={index}
                actionLabel={t("mobileProjectsGrid.mockAction")}
              />
            </div>

            <div className="space-y-3 p-5">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-base font-semibold">{project.title}</h3>
                <span className="shrink-0 rounded-full border border-border bg-muted px-2 py-1 text-[10px] uppercase tracking-[0.12em] text-secondary">
                  {project.status}
                </span>
              </div>

              <p className="text-sm leading-relaxed text-secondary">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.stack.map((tag) => (
                  <span
                    key={tag}
                    className="rounded bg-muted px-2 py-1 text-xs text-secondary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </motion.section>
  );
};

function PhonePreview({
  project,
  variant,
  actionLabel,
}: {
  project: MobileProject;
  variant: number;
  actionLabel: string;
}) {
  return (
    <div className="relative h-56 w-28 rounded-[2rem] border-[5px] border-black bg-zinc-100 p-2 shadow-2xl shadow-black/50 ring-1 ring-zinc-500/30 transition duration-300 group-hover:-translate-y-1">
      <div className="absolute left-1/2 top-1.5 h-4 w-12 -translate-x-1/2 rounded-full bg-black" />
      <div className="flex h-full flex-col overflow-hidden rounded-[1.35rem] bg-zinc-50 text-zinc-800">
        <div className="flex items-center justify-between px-2 pt-2 text-[7px] font-semibold">
          <span>9:41</span>
          <div className="flex items-center gap-1">
            <span className="h-1.5 w-2 rounded-sm bg-zinc-500" />
            <FiBattery className="h-2.5 w-2.5" />
          </div>
        </div>

        {variant === 0 && <DashboardScreen project={project} />}
        {variant === 1 && <CommerceScreen project={project} />}
        {variant === 2 && (
          <SettingsScreen project={project} actionLabel={actionLabel} />
        )}

        <div className="mt-auto grid grid-cols-4 border-t border-zinc-200 px-2 py-1.5 text-zinc-400">
          <FiHome className="mx-auto h-3 w-3" />
          <FiSearch className="mx-auto h-3 w-3" />
          <FiHeart className="mx-auto h-3 w-3" />
          <FiUser className="mx-auto h-3 w-3" />
        </div>
      </div>
    </div>
  );
}

function DashboardScreen({ project }: { project: MobileProject }) {
  return (
    <div className="flex flex-1 flex-col gap-2 px-2 pb-2 pt-5">
      <div
        className="rounded-xl p-2 text-white"
        style={{ backgroundColor: project.accent }}
      >
        <p className="text-[8px] opacity-80">{project.screens[0]}</p>
        <p className="mt-1 text-lg font-bold">220</p>
      </div>
      <div className="grid grid-cols-2 gap-1.5">
        <MiniBlock label={project.screens[1]} />
        <MiniBlock label="5%" />
      </div>
      <div className="h-14 rounded-xl bg-zinc-200" />
      <div className="rounded-xl bg-zinc-800 px-2 py-1.5 text-center text-[8px] text-white">
        {project.screens[2]}
      </div>
    </div>
  );
}

function CommerceScreen({ project }: { project: MobileProject }) {
  return (
    <div className="flex flex-1 flex-col gap-2 px-2 pb-2 pt-5">
      <div className="flex gap-1">
        {project.screens.map((screen) => (
          <span
            key={screen}
            className="rounded-full bg-zinc-200 px-1.5 py-1 text-[6px]"
          >
            {screen}
          </span>
        ))}
      </div>
      <div className="grid flex-1 grid-cols-2 gap-1.5">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="rounded-lg bg-zinc-200 p-1">
            <div className="ml-auto h-2 w-2 rounded-full bg-white" />
            <div className="mt-6 h-1.5 w-8 rounded bg-zinc-300" />
            <div className="mt-1 h-1.5 w-5 rounded bg-zinc-400" />
          </div>
        ))}
      </div>
    </div>
  );
}

function SettingsScreen({
  project,
  actionLabel,
}: {
  project: MobileProject;
  actionLabel: string;
}) {
  return (
    <div className="flex flex-1 flex-col gap-2 px-2 pb-2 pt-5">
      <div className="text-center text-[9px] font-semibold">
        {project.screens[0]}
      </div>
      <div className="space-y-1.5">
        {project.screens.slice(1).map((screen) => (
          <div
            key={screen}
            className="rounded-lg border border-zinc-200 bg-white p-1.5"
          >
            <div className="h-1.5 w-10 rounded bg-zinc-300" />
            <p className="mt-1 text-[6px] text-zinc-500">{screen}</p>
          </div>
        ))}
      </div>
      <div
        className="mt-auto rounded-xl px-2 py-1.5 text-center text-[8px] text-white"
        style={{ backgroundColor: project.accent }}
      >
        {actionLabel}
      </div>
    </div>
  );
}

function MiniBlock({ label }: { label: string }) {
  return (
    <div className="rounded-lg bg-zinc-200 p-1.5">
      <p className="text-[6px] text-zinc-500">{label}</p>
      <div className="mt-3 h-1.5 w-8 rounded bg-zinc-300" />
    </div>
  );
}

export default ProjectsMobileGrid;
