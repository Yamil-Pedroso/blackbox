import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

import {
  FaReact,
  FaAngular,
  FaJs,
  FaHtml5,
  FaCss3Alt,
  FaNodeJs,
  FaPython,
  FaDocker,
  FaGitAlt,
  FaGithub,
  FaGitlab,
  FaFigma,
} from "react-icons/fa";

import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiThreedotjs,
  SiDjango,
  SiSharp,
  SiRuby,
  SiMysql,
  SiPostgresql,
  SiMongodb,
  SiAdobephotoshop,
  SiAdobeillustrator,
  SiKubernetes,
  SiNetlify,
  SiVercel,
} from "react-icons/si";

import { Layers3, Palette, Server, Boxes, Workflow } from "lucide-react";

const techItems = [
  { name: "React", icon: <FaReact /> },
  { name: "Next.js", icon: <SiNextdotjs /> },
  { name: "Angular", icon: <FaAngular /> },
  { name: "TypeScript", icon: <SiTypescript /> },
  { name: "JavaScript", icon: <FaJs /> },
  { name: "HTML", icon: <FaHtml5 /> },
  { name: "CSS", icon: <FaCss3Alt /> },
  { name: "Tailwind", icon: <SiTailwindcss /> },
  { name: "Three.js", icon: <SiThreedotjs /> },

  { name: "Node.js", icon: <FaNodeJs /> },
  { name: "Django", icon: <SiDjango /> },
  { name: "C#", icon: <SiSharp /> },
  { name: "Python", icon: <FaPython /> },
  { name: "Ruby", icon: <SiRuby /> },
  { name: "REST API", icon: <Server size={18} /> },

  { name: "MySQL", icon: <SiMysql /> },
  { name: "NoSQL", icon: <SiMongodb /> },
  { name: "PostgreSQL", icon: <SiPostgresql /> },

  { name: "Figma", icon: <FaFigma /> },
  { name: "Photoshop", icon: <SiAdobephotoshop /> },
  { name: "Illustrator", icon: <SiAdobeillustrator /> },
  { name: "Digital Art", icon: <Palette size={18} /> },

  { name: "Docker", icon: <FaDocker /> },
  { name: "Kubernetes", icon: <SiKubernetes /> },
  { name: "Git", icon: <FaGitAlt /> },
  { name: "Github", icon: <FaGithub /> },
  { name: "Gitlab", icon: <FaGitlab /> },
  { name: "Netlify", icon: <SiNetlify /> },
  { name: "Vercel", icon: <SiVercel /> },

  { name: "Design Pattern", icon: <Workflow size={18} /> },
  { name: "MVC", icon: <Layers3 size={18} /> },
  { name: "Monolith", icon: <Boxes size={18} /> },
  { name: "Serv/Func", icon: <Workflow size={18} /> },
];

const StackOverview = () => {
  const { t } = useTranslation("fullStackProjects");

  return (
    <section className="space-y-5">
      <div>
        <h2 className="mt-2 text-xl font-semibold text-white">
          {t("stackOverview.title")}
        </h2>
      </div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="
          relative w-full overflow-hidden
          border border-green/20
          bg-[#101410]
          px-4 py-5
          shadow-[0_0_40px_rgba(57,255,20,0.08)]
        "
      >
        <div
          className="
            pointer-events-none absolute inset-0 opacity-[0.08]
            [background-image:linear-gradient(45deg,#9cff62_25%,transparent_25%,transparent_50%,#9cff62_50%,#9cff62_75%,transparent_75%,transparent)]
            [background-size:8px_8px]
          "
        />

        <div
          className="
            relative grid w-full
            grid-cols-3 gap-2

            sm:grid-cols-4
            md:grid-cols-6
            lg:grid-cols-8
            xl:grid-cols-11
          "
        >
          {techItems.map((tech, index) => (
            <motion.div
              key={tech.name}
              variants={{
                hidden: {
                  opacity: 0,
                  scale: 0.3,
                  y: 10,
                },
                show: {
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  transition: {
                    delay: index * 0.03,
                    duration: 0.35,
                    ease: [0.22, 1, 0.36, 1],
                  },
                },
              }}
              whileHover={{
                scale: 1.45,
                zIndex: 30,
                backgroundColor: "#66dd51",
                opacity: 1,
                transition: {
                  duration: 0.18,
                },
              }}
              className="
                group relative grid
                aspect-square w-full
                cursor-pointer place-items-center
                border border-green/20
                bg-green/70
                text-[#071007]
                shadow-[0_0_18px_rgba(57,255,20,0.25)]
              "
            >
              <div
                className="
                  absolute inset-0
                  opacity-20
                  transition-opacity duration-200
                  group-hover:opacity-0

                  [background-image:linear-gradient(135deg,rgba(0,0,0,0.45)_25%,transparent_25%,transparent_50%,rgba(0,0,0,0.45)_50%,rgba(0,0,0,0.45)_75%,transparent_75%,transparent)]
                  [background-size:6px_6px]
                "
              />

              <div className="relative z-10 flex flex-col items-center justify-center gap-1">
                <span
                  className="
                    text-xl
                    transition-transform duration-300
                    group-hover:scale-110

                    sm:text-2xl
                    lg:text-3xl
                  "
                >
                  {tech.icon}
                </span>

                <span
                  className="
                    hidden whitespace-nowrap
                    font-ibm-plex-mono
                    text-[7px] font-black uppercase tracking-[0.12em]
                    text-[#071007]

                    group-hover:block
                    sm:text-[8px]
                  "
                >
                  {tech.name}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default StackOverview;
