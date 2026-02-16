import { FaMapMarkerAlt, FaLanguage, FaPhone } from "react-icons/fa";
import assets from "../assets";
import Button from "../components/common/Button";

interface LeftSidebarProps {
  items?: {
    title: string;
    icon: React.ComponentType<{ className?: string }>;
  }[];
}

const defaultInfoItems = [
  { title: "Switzerland, Zurich", icon: FaMapMarkerAlt },
  { title: "English, German", icon: FaLanguage },
  { title: "+41 79 532 65 19", icon: FaPhone },
];

const LeftSidebar = ({ items = defaultInfoItems }: LeftSidebarProps) => {
  return (
    <aside className="border-r border-neutral-800 bg-secondary-bg hidden large:flex flex-col h-screen px-8 py-10">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-neutral-700 flex items-center justify-center overflow-hidden">
          <img
            src={assets.avatar}
            alt="Avatar"
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <h2 className="font-ibm-plex-mono text-secondary text-[18px]">
            Yami Carfo
          </h2>
          <p className="font-ibm-plex-mono text-secondary text-[14px]">
            Creative Technologist
          </p>
        </div>
      </div>

      <div className="mt-12 flex flex-col gap-12">
        <p className="font-ibm-plex-mono text-secondary text-[14px] leading-relaxed">
          Focused on interactive systems, full-stack architecture and
          intelligent interfaces. Building structured environments where code,
          motion and logic converge.
        </p>

        <nav>
          <ul className="space-y-4">
            {items.map((item) => {
              const Icon = item.icon;
              return (
                <li
                  key={item.title}
                  className="font-ibm-plex-mono text-secondary text-sm flex items-center gap-3"
                >
                  <Icon className="text-[0.9rem]" />
                  <span>{item.title}</span>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="border-t border-neutral-800 pt-6">
          <h3 className="font-ibm-plex-mono text-secondary text-[12px] uppercase tracking-widest mb-4">
            Blackbox Status
          </h3>

          <div className="space-y-3 font-ibm-plex-mono text-secondary text-sm">
            <div className="flex justify-between">
              <span>Modules</span>
              <span>5</span>
            </div>

            <div className="flex justify-between">
              <span>Version</span>
              <span>v1.0</span>
            </div>

            <div className="flex justify-between">
              <span>Status</span>
              <span className="text-green">Active</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-auto pt-6 border-t border-neutral-800 flex flex-col gap-4 mb-3.5">
        <Button className="bg-white text-tertiary w-full" onClick={() => {}}>
          Schedule a call
        </Button>

        <Button
          className="border border-white text-white w-full"
          onClick={() => {}}
        >
          View development journey
        </Button>
      </div>
    </aside>
  );
};

export default LeftSidebar;
