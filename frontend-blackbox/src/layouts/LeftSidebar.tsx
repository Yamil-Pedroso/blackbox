import { FaMapMarkerAlt, FaLanguage, FaPhone } from "react-icons/fa";
import assets from "../assets";
import Button from "../components/common/Button";

interface LeftSidebarProps {
  items?: {
    title: string;
    icon: React.ComponentType<{ className?: string }>;
  }[];
}

const leftSidebarDefaultItems = [
  {
    title: "Swizerland, Zurich",
    icon: FaMapMarkerAlt,
  },
  {
    title: "English, German",
    icon: FaLanguage,
  },
  {
    title: "+41 79 532 65 19",
    icon: FaPhone,
  },
];

const LeftSidebar = ({ items = leftSidebarDefaultItems }: LeftSidebarProps) => {
  return (
    <aside className="border-r border-neutral-800 bg-secondary-bg p-6 flex-col h-screen w-80 hidden large:flex">
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-10 h-10 bg-neutral-700 flex items-center justify-center">
          <img
            src={assets.avatar}
            alt="Logo"
            className="w-full h-full  object-cover"
          />
        </div>
        <div>
          <h2 className="font-ibm-plex-mono text-secondary tracking-wide text-[18px]">
            Yami Carfo{" "}
          </h2>
          <p className="font-ibm-plex-mono text-secondary text-[14px]">
            Software dev
          </p>
        </div>
      </div>

      <p className="font-ibm-plex-mono text-secondary tracking-wide text-[1rem] mb-2">
        Lorem ipsum dolor sit amet, consectetur adipiscing consectetur
        adipiscing.
      </p>

      <nav className="space-y-3 mt-6">
        <ul>
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <li
                key={item.title}
                className="font-ibm-plex-mono text-secondary text-sm cursor-pointer hover:text-primary transition-colors flex items-center space-x-2 mb-5"
              >
                <Icon className="text-[1rem]" />
                <span>{item.title}</span>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="space-y-4 border-t border-neutral-800 pt-8 mt-auto mb-10">
        <Button className="bg-white text-tertiary " onClick={() => {}}>
          Schedule a call
        </Button>
        <Button className="border border-white text-white" onClick={() => {}}>
          Development journey
        </Button>
      </div>
    </aside>
  );
};

export default LeftSidebar;
