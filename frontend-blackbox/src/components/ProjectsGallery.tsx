import { useState, useRef } from "react";
import { BsGridFill, BsGrid3X3GapFill } from "react-icons/bs";
import { FaArrowRight } from "react-icons/fa";
import { BsImage } from "react-icons/bs";
import gsap from "gsap";
import Flip from "gsap/Flip";

gsap.registerPlugin(Flip);

interface Project {
  id: number;
  title: string;
  image: React.ComponentType<{ className?: string }>;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Lorem Ipsum Generator",
    image: BsImage,
  },
  {
    id: 2,
    title: "Lorem Ipsum Generator",
    image: BsImage,
  },
  {
    id: 3,
    title: "Lorem Ipsum Generator",
    image: BsImage,
  },
  {
    id: 4,
    title: "Lorem Ipsum Generator",
    image: BsImage,
  },
  {
    id: 5,
    title: "Lorem Ipsum Generator",
    image: BsImage,
  },
  {
    id: 6,
    title: "Lorem Ipsum Generator",
    image: BsImage,
  },
];

const ProjectsGallery = () => {
  const [compact, setCompact] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleLayout = (nextValue: boolean) => {
    if (!containerRef.current) return;

    const state = Flip.getState(".project-card");

    setCompact(nextValue);

    requestAnimationFrame(() => {
      Flip.from(state, {
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.03,
        absolute: false,
      });
    });
  };

  return (
    <div className="w-full space-y-6">
      {/* Toggle Buttons */}
      <div className="flex justify-end gap-3">
        <button
          onClick={() => toggleLayout(false)}
          className={`p-2 border border-neutral-700 transition-all duration-500 ${
            !compact
              ? "bg-primary text-black"
              : "text-secondary hover:border-primary"
          }`}
        >
          <BsGridFill />
        </button>

        <button
          onClick={() => toggleLayout(true)}
          className={`p-2 border border-neutral-700 transition-all duration-300 ${
            compact
              ? "bg-primary text-black"
              : "text-secondary hover:border-primary"
          }`}
        >
          <BsGrid3X3GapFill />
        </button>
      </div>

      <div
        ref={containerRef}
        className={`grid gap-6 ${compact ? "grid-cols-3" : "grid-cols-2"}`}
      >
        {projects.map((project) => (
          <div
            key={project.id}
            className="project-card h-120 bg-secondary-bg border border-neutral-800 hover:border-primary transition-all duration-300 group overflow-hidden"
          >
            <div className="flex justify-between items-center px-4 py-3 border-b border-neutral-800">
              <span className="font-ibm-plex-mono text-secondary text-xs">
                {project.title}
              </span>
              {!compact && (
                <FaArrowRight className="text-secondary group-hover:text-primary transition-colors" />
              )}
            </div>

            <div className="overflow-hidden mt-20">
              <div
                className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                  compact ? "h-40" : "h-65"
                }`}
              >
                <project.image className="w-full h-full" />
              </div>
              div
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsGallery;
