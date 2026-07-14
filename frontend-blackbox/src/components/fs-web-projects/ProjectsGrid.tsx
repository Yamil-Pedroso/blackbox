import { useState } from "react";
import { motion } from "framer-motion";
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
    <motion.section
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{t("projectsGrid.title")}</h2>

        {totalPages > 1 && (
          <div className="flex gap-2">
            <button
              onClick={prevPage}
              className="p-2 rounded-lg border border-border bg-secondary-bg text-primary hover:border-green/50 hover:bg-tertiary transition"
            >
              <FaChevronLeft />
            </button>

            <button
              onClick={nextPage}
              className="p-2 rounded-lg border border-border bg-secondary-bg text-primary hover:border-green/50 hover:bg-tertiary transition"
            >
              <FaChevronRight />
            </button>
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6 items-stretch">
        {visibleProjects.map((project, index) => {
          const image = project.image;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                delay: index * 0.08,
                duration: 0.45,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="h-full"
            >
              <FeatureCard
                title={project.title}
                description={project.description}
                image={image}
                tags={project.stack}
                className="h-full"
              >
                <div className="flex gap-3 pt-3 mt-auto pb-4">
                  {project.caseStudy && (
                    <Tooltip
                      className="bg-secondary-bg border border-green"
                      text="Pending"
                    >
                      <a
                        href={project.caseStudy}
                        className="flex items-center gap-2 px-3 py-2 text-sm rounded-md border border-border bg-muted text-secondary transition cursor-not-allowed pointer-events-none"
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
                      className="flex items-center gap-2 px-3 py-2 text-sm rounded-md bg-green text-black hover:brightness-95 transition"
                    >
                      <FaExternalLinkAlt />
                      {t("projectsGrid.buttons.liveDemo")}
                    </a>
                  )}
                </div>
              </FeatureCard>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
};

export default ProjectsGrid;
