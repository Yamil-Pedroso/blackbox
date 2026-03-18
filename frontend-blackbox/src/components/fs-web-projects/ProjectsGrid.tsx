import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FaChevronLeft,
  FaChevronRight,
  FaExternalLinkAlt,
  FaBookOpen,
} from "react-icons/fa";
import Tooltip from "./ui/Tooltip";

import FeatureCard from "./common/cards/FeatureCard";
import type { Project } from "./types/fsWebProjects.types";

const ITEMS_PER_PAGE = 4;

const ProjectsGrid = () => {
  const { t } = useTranslation("fullStackProjects");

  const projects = t("projectsGrid.projects", {
    returnObjects: true,
  }) as Project[];

  const [page, setPage] = useState(0);

  const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE);

  const start = page * ITEMS_PER_PAGE;

  const visibleProjects = projects.slice(start, start + ITEMS_PER_PAGE);

  const nextPage = () => {
    if (page < totalPages - 1) setPage(page + 1);
  };

  const prevPage = () => {
    if (page > 0) setPage(page - 1);
  };

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{t("projectsGrid.title")}</h2>

        {totalPages > 1 && (
          <div className="flex gap-2">
            <button
              onClick={prevPage}
              className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition"
            >
              <FaChevronLeft />
            </button>

            <button
              onClick={nextPage}
              className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition"
            >
              <FaChevronRight />
            </button>
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {visibleProjects.map((project, index) => {
          const image = project.image;

          return (
            <FeatureCard
              key={index}
              title={project.title}
              description={project.description}
              image={image}
              tags={project.stack}
            >
              <div className="flex gap-3 pt-3">
                {project.caseStudy && (
                  <Tooltip
                    className="bg-secondary-bg border border-green"
                    text="Pending"
                  >
                    <a
                      href={project.caseStudy}
                      className="flex items-center gap-2 px-3 py-2 text-sm rounded-md bg-zinc-800 hover:bg-zinc-700 transition cursor-not-allowed pointer-events-none"
                    >
                      <FaBookOpen />
                      {t("projectsGrid.buttons.caseStudy")}
                    </a>
                  </Tooltip>
                )}

                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 text-sm rounded-md bg-green-700 hover:bg-green-600 transition"
                  >
                    <FaExternalLinkAlt />
                    {t("projectsGrid.buttons.liveDemo")}
                  </a>
                )}
              </div>
            </FeatureCard>
          );
        })}
      </div>
    </section>
  );
};

export default ProjectsGrid;
