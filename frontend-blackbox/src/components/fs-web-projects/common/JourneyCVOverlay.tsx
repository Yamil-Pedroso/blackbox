import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import assets from "@/assets";
import { IoMdDownload } from "react-icons/io";

import { FaGithub, FaLinkedin, FaMobile } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";

import type { IconType } from "react-icons";

interface JourneyCVOverlayProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  icon?: IconType;
}

const skills = {
  Frontend: [
    "React",
    "Next.js",
    "Angular",
    "TypeScript",
    "JavaScript",
    "HTML",
    "CSS",
    "Tailwind CSS",
    "Three.js",
  ],

  Backend: ["Node.js", "Django", "C#", "Python", "Ruby", "REST API"],

  Databases: ["MySQL", "NoSQL"],

  Design: ["Figma", "Photoshop", "Illustrator", "Digital Art"],

  DevOps: [
    "Docker",
    "Kubernetes",
    "Git",
    "Github",
    "Gitlab",
    "Netlify",
    "Vercel",
  ],

  Architecture: ["Design Pattern", "MVC", "Monolith", "API REST", "Serv/Func"],
};

const experience = [
  {
    role: "Principal Frontend Developer",
    company: "Squib Ltd · Luzern, Switzerland",
    date: "2022 — 2025",
    text: "Currently working as the lead frontend developer in a startup environment, where I’m responsible for building and maintaining the core UI architecture. I lead the implementation of responsive, accessible, and high-performance interfaces, while collaborating closely with backend and design teams. My role also involves setting frontend standards, choosing tech stacks, and ensuring smooth user experiences across the platform.",
    image: assets.experience_1,
    color: "#ccccff",
  },

  {
    role: "Full Stack Developer",
    company: "Qiibee AG · Zug, Switzerland",
    date: "Since 2021",
    text: "A Full Stack Developer focusing on authentication systems and custom configuration for Shopify-based platforms. My tasks included setting up secure user flows, integrating third-party services, and customizing storefronts through both backend logic and frontend components.",
    image: assets.experience_2,
    color: "#fde6fb",
  },

  {
    role: "Project Support Artist",
    company: "Mundus Vita · Zurich, Switzerland",
    date: "2018",
    text: "I work as a traditional oil painter supporting a company that builds foldable wooden houses for underserved communities in Africa. My role involves creating a series of sequential paintings that visually explain the different stages of the project — from construction to deployment. These works serve as a narrative tool to communicate the process in a clear and accessible way, blending artistic expression with practical storytelling.",
    image: assets.experience_3,
    color: "#d3e5d1",
  },

  {
    role: "Network Engineer and Code mantenance",
    company: "Casa del Alba Cultural · Havana, Cuba",
    date: "2014 — 2016",
    text: "I worked as a network engineer and code maintainer, handling both infrastructure and codebase responsibilities. On the networking side, I managed configurations, optimized connectivity, and resolved issues to keep systems running smoothly. On the software side, I maintained legacy code, refactored where needed, and ensured stability and performance across deployments.",
    image: assets.experience_4,
    color: "#fff2f5",
  },
  {
    role: "Network Engineer and Code mantenance",
    company: "UNESCO · Havana, Cuba",
    date: "2009 — 2010",
    text: "I worked as a network engineer and code maintainer, handling both infrastructure and codebase responsibilities. On the networking side, I managed configurations, optimized connectivity, and resolved issues to keep systems running smoothly. On the software side, I maintained legacy code, refactored where needed, and ensured stability and performance across deployments.",
    image: assets.experience_5,
    color: "#f8e6ce",
  },
];

const education = [
  {
    name: "Frontend Developer · Brainnest · Germany · 2023",
    image: assets.education_1,
  },
  {
    name: "Full Stack Academy · Le Wagon · Zurich · 2022",
    image: assets.education_2,
  },
  {
    name: "Full Stack Developer · Constructor Academy · 2020",
    image: assets.education_3,
  },
  {
    name: "NoSQL Database, MongoDB, Node.js and Express.js · freeCodeCamp · Online · 2020",
    image: assets.education_4,
  },
  {
    name: "SQL Database, Python, and Data Science · Udemy · Online · 2020",
    image: assets.education_5,
  },
  {
    name: "Computer Science · Havana University · 2003 — 2009",
    image: assets.education_6,
  },
];

const recommendations = [
  {
    name: "Marco Eichenberger",
    role: "Co-Founder",
    text: "Yamil consistently delivers high-quality work and collaborates effectively with the entire team, always open to feedback and suggestions. His positive attitude make him a pleasure to work with. I appreciate the value and impact he brings to our project.",
    image: assets.testimonial_1,
  },

  {
    name: "Pascal Pichler",
    role: "Software Engineer",
    text: "Yamil is able to follow coding guidelines and produces clean code. I can always count on him to deliver code on time, and it usually needs minimal adjustments.",
    image: assets.testimonial_2,
  },

  {
    name: "Pascal Sonder",
    role: "Product Designer",
    text: "Yamil quickly turns my designs into code and everything works as expected, he makes sure the design looks just right and functions well, we work well together, and he always understands what I want, if something doesn’t work, he finds a way to fix it without complicating things",
    image: assets.testimonial_3,
  },

  {
    name: "Claudia Calderone",
    role: "Therapeutin",
    text: "Yamil war für meine Anliegen immer verfügbar und hat zeitnah den Kontakt gehalten um meine Anliegen zu bearbeiten, seine technische und Gestalterische Unterstützung war sehr gut. Das Endprodukt der Website, der gestalterische Auftritt gefällt mir und entspricht genau dem was ich mir vorgestellt habe. Gerne empfehle ich Yamil zum erstellen einer neuen Website weiter.",
    image: assets.testimonial_4,
  },
];

const languages = [
  { name: "Spanish", level: "Native" },
  { name: "English", level: "Fluent" },
  { name: "German", level: "B1+" },
  { name: "Italian", level: "B1" },
  { name: "French", level: "B1" },
];

const socialLinks = [
  {
    name: <FaLinkedin />,
    url: "https://www.linkedin.com/in/yamil-pedroso/",
  },

  {
    name: <FaGithub />,
    url: "https://github.com/Yamil-Pedroso",
  },

  {
    name: <BiLogoGmail />,
    url: "https://mail.google.com/mail/?view=cm&fs=1&to=yamilpedroso@gmail.com",
  },

  {
    name: <FaMobile />,
    url: "tel:+41795326519",
  },
];

const JourneyCVOverlay = ({ open, setOpen }: JourneyCVOverlayProps) => {
  const [expandedExperience, setExpandedExperience] = useState<number | null>(
    0,
  );

  return (
    <AnimatePresence>
      {open && (
        <motion.section
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{
            duration: 0.75,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            fixed inset-0 z-[100]
            h-screen overflow-y-auto
            bg-[#0d0d0d]
            font-ibm-plex-mono text-secondary
            custom-scroll
          "
        >
          <div
            className="
              sticky top-0 z-30
              flex items-center justify-between
              border-b border-neutral-800
              bg-[#0d0d0d]/90
              px-6 py-4
              backdrop-blur-xl
            "
          >
            <div>
              <p className="text-[10px] uppercase tracking-[0.35em] text-green">
                Journey / Curriculum
              </p>

              <h2 className="mt-1 font-geist text-2xl text-white">
                Yamil Pedroso
              </h2>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="
                grid h-10 w-10 place-items-center
                border border-neutral-700
                bg-black text-green
                transition

                hover:bg-green
                hover:text-black
              "
            >
              <X size={18} />
            </button>
          </div>

          <div
            className="
              mx-auto grid max-w-7xl gap-6
              px-6 py-8

              lg:grid-cols-[300px_1fr]
            "
          >
            <aside className="space-y-5">
              <div className="border border-neutral-800 bg-secondary-bg p-4">
                <div className="mb-4 h-56 overflow-hidden bg-neutral-800">
                  <img
                    src={assets.avatar}
                    alt="avatar"
                    className="h-full w-full object-cover"
                  />
                </div>

                <h3 className="font-geist text-xl text-white">
                  Full Stack Developer
                </h3>

                <p className="mt-3 text-sm leading-relaxed">
                  Open to work with companies, freelance clients, product teams
                  and creative web experiences.
                </p>

                <div className="mt-5 space-y-2 text-xs">
                  <p className="text-green">● Available to work</p>

                  <p>Zurich, Switzerland</p>

                  <p>Permit C · Cuban nationality</p>
                </div>
              </div>

              <div className="border border-neutral-800 bg-secondary-bg p-4">
                <h4 className="mb-5 text-xs uppercase tracking-[0.25em] text-green">
                  ● Skills
                </h4>

                <div className="space-y-5">
                  {Object.entries(skills).map(([category, items]) => (
                    <div key={category}>
                      <p className="mb-2 font-geist text-sm text-white">
                        {category}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {items.map((skill) => (
                          <span
                            key={skill}
                            className="
                border border-green/20
                bg-green/10
                px-2 py-1
                text-[10px] text-green hover:scale-115
                transition-transform duration-300
              "
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border border-neutral-800 bg-secondary-bg p-4">
                <h4 className="mb-4 text-xs uppercase tracking-[0.25em] text-green">
                  ● Languages
                </h4>

                <div className="space-y-2 text-sm">
                  {languages.map((lang) => (
                    <p key={lang.name}>
                      {lang.name} — {lang.level}
                    </p>
                  ))}
                </div>
              </div>

              <div className="border border-neutral-800 bg-secondary-bg p-4">
                <div className="mb-3 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-green" />

                  <h4 className="text-[11px] uppercase tracking-[0.25em] text-green">
                    Connect
                  </h4>
                </div>

                <div className="flex flex-wrap gap-2">
                  {socialLinks.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        border border-neutral-800
                        bg-black/30
                        px-3 py-2
                        text-lg text-secondary
                        transition-all duration-300

                        hover:border-green/40
                        hover:text-green
                      "
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              </div>

              <div className="border border-neutral-800 bg-secondary-bg p-4">
                <p className="mb-3 text-xs uppercase tracking-[0.25em] text-green">
                  ● Download CV
                </p>

                <div className="flex gap-3">
                  <a
                    href="/docs/CVs/Yamil_Pedroso_CV_DE_2026.pdf"
                    download
                    className="
        flex items-center gap-2
        border border-neutral-800
        bg-black/20
        px-4 py-2
        text-sm text-secondary
        transition-all duration-300

        hover:border-green/40
        hover:text-green
      "
                  >
                    <IoMdDownload size={16} />
                    EN
                  </a>

                  <a
                    href="/docs/CVs/Yamil_Pedroso_CV_EN_2026.pdf"
                    download
                    className="
        flex items-center gap-2
        border border-neutral-800
        bg-black/20
        px-4 py-2
        text-sm text-secondary
        transition-all duration-300

        hover:border-green/40
        hover:text-green
      "
                  >
                    <IoMdDownload size={16} />
                    DE
                  </a>
                </div>
              </div>
            </aside>

            <main className="space-y-6">
              <section className="border border-neutral-800 bg-secondary-bg p-5">
                <p className="mb-3 text-xs uppercase tracking-[0.25em] text-green">
                  About me
                </p>

                <h1 className="font-geist text-3xl text-white">
                  Hi, I’m Yamil Pedroso — Full Stack Developer.
                </h1>

                <p className="mt-4 max-w-3xl text-sm leading-relaxed">
                  I am a Full Stack Developer with over 5 years of experience
                  designing and building scalable, responsive and user-centered
                  web applications.
                </p>
              </section>

              {/* EXPERIENCE */}

              <section className="grid gap-4">
                <p className="text-xs uppercase tracking-[0.25em] text-green">
                  Experience
                </p>

                {experience.map((item, index) => (
                  <motion.article
                    key={item.role}
                    initial={false}
                    className="
                      overflow-hidden
                      border border-neutral-800
                      bg-secondary-bg
                    "
                  >
                    <button
                      onClick={() =>
                        setExpandedExperience((prev) =>
                          prev === index ? null : index,
                        )
                      }
                      className="
                        flex w-full items-center gap-4
                        p-4 text-left
                        transition-colors duration-300

                        hover:bg-black/20
                      "
                    >
                      <div
                        className={`
                          h-16 w-16 shrink-0 overflow-hidden
                          border border-neutral-700
                          p-1

                        `}
                        style={{ backgroundColor: item.color }}
                      >
                        <img
                          src={item.image}
                          alt={item.role}
                          className="h-full w-full object-contain"
                        />
                      </div>

                      <div className="flex-1">
                        <div
                          className="
                            flex flex-col gap-2
                            md:flex-row
                            md:items-center
                            md:justify-between
                          "
                        >
                          <div>
                            <h3 className="font-geist text-lg text-white">
                              {item.role}
                            </h3>

                            <p className="text-xs text-green">{item.company}</p>
                          </div>

                          <span className="text-[10px] uppercase tracking-[0.12em] text-secondary">
                            {item.date}
                          </span>
                        </div>
                      </div>
                    </button>

                    <AnimatePresence>
                      {expandedExperience === index && (
                        <motion.div
                          initial={{
                            height: 0,
                            opacity: 0,
                          }}
                          animate={{
                            height: "auto",
                            opacity: 1,
                          }}
                          exit={{
                            height: 0,
                            opacity: 0,
                          }}
                          transition={{
                            duration: 0.45,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="overflow-hidden"
                        >
                          <div className="border-t border-neutral-800 px-4 pb-5 pt-4">
                            <p className="text-sm leading-relaxed text-secondary">
                              {item.text}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.article>
                ))}
              </section>

              <section className="border border-neutral-800 bg-secondary-bg p-5">
                <div className="mb-6">
                  <p className="text-xs uppercase tracking-[0.25em] text-green">
                    ● Education
                  </p>

                  <h2 className="mt-2 font-geist text-2xl text-white">
                    Academic Path
                  </h2>
                </div>

                <div className="relative space-y-4">
                  <div className="absolute left-6 top-0 h-full w-px bg-neutral-800" />

                  {education.map((edu, index) => (
                    <motion.article
                      key={edu.name}
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.25 }}
                      className="
          relative flex gap-4
          border border-neutral-800
          bg-black/20
          p-4
          transition-all duration-300

          hover:border-green/30
          hover:bg-black/30
        "
                    >
                      <div
                        className="
            relative z-10 grid h-12 w-12 shrink-0 place-items-center
            overflow-hidden rounded-full
            border border-neutral-700
            bg-black p-1
          "
                      >
                        <img
                          src={edu.image}
                          alt={edu.name}
                          className="h-full w-full rounded-full object-cover"
                        />
                      </div>

                      <div className="flex flex-1 flex-col justify-center">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] uppercase tracking-[0.2em] text-green">
                            0{index + 1}
                          </span>

                          <span className="h-px flex-1 bg-neutral-800" />
                        </div>

                        <p className="mt-2 text-sm leading-relaxed text-secondary">
                          {edu.name}
                        </p>
                      </div>
                    </motion.article>
                  ))}
                </div>
              </section>

              {/* TESTIMONIALS */}

              <section className="border border-neutral-800 bg-secondary-bg p-5">
                <div className="mb-6">
                  <p className="text-xs uppercase tracking-[0.25em] text-green">
                    ● Recommendations
                  </p>

                  <h2 className="mt-2 font-geist text-3xl leading-none text-white">
                    What People
                    <br />
                    Really Say
                  </h2>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  {recommendations.map((rec) => (
                    <motion.article
                      key={rec.name}
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.25 }}
                      className="
          group overflow-hidden
          border border-neutral-800
          bg-black/20
          transition-all duration-300

          hover:border-green/30
        "
                    >
                      <div
                        className="
            flex h-full flex-col
            sm:flex-row
          "
                      >
                        {/* IMAGE */}

                        <div
                          className="
              relative overflow-hidden bg-black

              h-[300px]

              sm:h-[260px]
              sm:w-[170px]
              sm:min-w-[170px]
            "
                        >
                          <img
                            src={rec.image}
                            alt={rec.name}
                            className="
                h-full w-full
                object-cover
                transition duration-500
                group-hover:scale-105
              "
                          />
                        </div>

                        <div
                          className="
              flex min-h-[260px] flex-1 flex-col
              justify-between
              p-5
            "
                        >
                          <div className="relative">
                            <p
                              className="
      text-sm leading-relaxed text-secondary
      line-clamp-5
    "
                            >
                              “{rec.text}”
                            </p>

                            <div
                              className="
      absolute left-0 top-0 z-30
      h-[220px] w-[115%]
      translate-y-2
      overflow-y-hidden

      border border-green/20
      bg-[#111]
      p-4

      opacity-0
      shadow-[0_10px_30px_rgba(0,0,0,0.45)]

      transition-all duration-300
      custom-scroll

      group-hover:translate-y-0
      group-hover:overflow-y-auto
      group-hover:opacity-100
    "
                            >
                              <div className="mb-3 flex gap-1 text-green">
                                ★ ★ ★ ★ ★
                              </div>

                              <p className="text-sm leading-relaxed text-secondary">
                                “{rec.text}”
                              </p>
                            </div>
                          </div>

                          <div className="mt-6 border-t border-neutral-800 pt-4">
                            <h4 className="font-geist text-lg text-white">
                              {rec.name}
                            </h4>

                            <p className="text-xs text-green">{rec.role}</p>
                          </div>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </div>
              </section>
            </main>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default JourneyCVOverlay;
