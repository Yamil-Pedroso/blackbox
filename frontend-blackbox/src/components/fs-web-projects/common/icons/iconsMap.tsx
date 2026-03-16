import {
  FaReact,
  FaNodeJs,
  FaServer,
  FaLayerGroup,
  FaCode,
  FaBolt,
  FaUserAstronaut,
} from "react-icons/fa";

import { SiTypescript, SiPostgresql, SiTailwindcss } from "react-icons/si";

export const iconsMap = {
  react: <FaReact size={24} color="#61DBFB" />,
  typescript: <SiTypescript size={24} color="#3178C6" />,
  node: <FaNodeJs size={24} color="#3C873A" />,
  postgresql: <SiPostgresql size={24} color="#336791" />,
  api: <FaServer size={24} color="#F59E0B" />,
  tailwind: <SiTailwindcss size={24} color="#38BDF8" />,

  architecture: <FaLayerGroup size={20} color="#60A5FA" />,
  code: <FaCode size={20} color="#34D399" />,
  performance: <FaBolt size={20} color="#F59E0B" />,
  ux: <FaUserAstronaut size={20} color="#A78BFA" />,
};
