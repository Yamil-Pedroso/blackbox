import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FaChevronLeft,
  FaChevronRight,
  FaExternalLinkAlt,
  FaBookOpen,
} from "react-icons/fa";

import FeatureCard from "./common/cards/FeatureCard";
import type { Project } from "./types/fsWebProjects.types";

const PROJECT_IMAGE =
  "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2240&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

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
        <h2 className="text-xl font-semibold">{t("projectsGridTitle")}</h2>

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
          const image =
            project.image === "PROJECT_IMAGE" ? PROJECT_IMAGE : project.image;

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
                  <a
                    href={project.caseStudy}
                    className="flex items-center gap-2 px-3 py-2 text-sm rounded-md bg-zinc-800 hover:bg-zinc-700 transition"
                  >
                    <FaBookOpen />
                    {t("caseStudy")}
                  </a>
                )}

                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 text-sm rounded-md bg-blue-600 hover:bg-blue-500 transition"
                  >
                    <FaExternalLinkAlt />
                    {t("liveDemo")}
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
