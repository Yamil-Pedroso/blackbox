import { useState } from "react";
import { BsGridFill, BsGrid3X3GapFill } from "react-icons/bs";
import { FaArrowRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

interface Project {
  id: number;
  title: string;
  image: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Lorem Ipsum Generator",
    image:
      "https://images.unsplash.com/photo-1471981172431-b1c4155be4b1?q=80&w=2370&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Creative Dashboard",
    image:
      "https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?q=80&w=1287&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "UI System Design",
    image:
      "https://images.unsplash.com/photo-1471981172431-b1c4155be4b1?q=80&w=2370&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Portfolio Builder",
    image:
      "https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?q=80&w=1287&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "App Framework",
    image:
      "https://images.unsplash.com/photo-1471981172431-b1c4155be4b1?q=80&w=2370&auto=format&fit=crop",
  },
  {
    id: 6,
    title: "Component Library",
    image:
      "https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?q=80&w=1287&auto=format&fit=crop",
  },
];

const ProjectsGallery = () => {
  const [compact, setCompact] = useState(false);

  return (
    <div className="w-full space-y-6">
      {/* Toggle Buttons */}
      <div className="flex justify-end gap-3">
        <button
          onClick={() => setCompact(false)}
          className={`p-2 border border-neutral-700 transition-all duration-500 ${
            !compact
              ? "bg-primary text-tertiary"
              : "text-secondary hover:border-primary"
          }`}
        >
          <BsGridFill />
        </button>

        <button
          onClick={() => setCompact(true)}
          className={`p-2 border border-neutral-700 transition-all duration-500 ${
            compact
              ? "bg-primary text-tertiary"
              : "text-secondary hover:border-primary"
          }`}
        >
          <BsGrid3X3GapFill />
        </button>
      </div>

      <motion.div
        layout
        transition={{
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={`grid gap-6 ${compact ? "grid-cols-3" : "grid-cols-2"}`}
      >
        <AnimatePresence>
          {projects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.7,
                ease: "easeInOut",
              }}
              whileHover={{ scale: 1.02 }}
              className="h-105 bg-secondary-bg border border-neutral-800 hover:border-primary transition-colors duration-300 group overflow-hidden"
            >
              <div className="flex justify-between items-center px-4 py-3 border-b border-neutral-800">
                <span className="font-ibm-plex-mono text-secondary text-xs">
                  {project.title}
                </span>

                {!compact && (
                  <motion.div
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FaArrowRight className="text-secondary group-hover:text-primary transition-colors" />
                  </motion.div>
                )}
              </div>

              <motion.div layout className="overflow-hidden h-full">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                />
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ProjectsGallery;
