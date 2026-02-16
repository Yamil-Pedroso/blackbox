import { useRouterState } from "@tanstack/react-router";

const moduleInfoMap: Record<string, string[]> = {
  "/": ["Overview", "Blackbox Structure", "Modules"],
  "/experiments": ["Overview", "Purpose", "Planned Explorations", "Status"],
  "/tools": ["Overview", "Purpose", "Planned Utilities", "Status"],
  "/ai": ["Overview", "Purpose", "Planned Integrations", "Status"],
  "/systems": ["Overview", "Purpose", "Architecture Plan", "Status"],
  "/mini-games": ["Overview", "Purpose", "Planned Concepts", "Status"],
};

const RightSidebar = () => {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  const baseRoute = pathname === "/" ? "/" : "/" + pathname.split("/")[1];

  const items = moduleInfoMap[baseRoute] || [];

  return (
    <aside className="border-l border-neutral-800 bg-secondary-bg hidden large:flex flex-col h-screen px-8 py-10">
      <div>
        <h3 className="font-ibm-plex-mono text-secondary text-[12px] uppercase tracking-widest">
          Section
        </h3>

        <div className="border-t border-neutral-800 mt-4 mb-6" />

        <ul className="space-y-3 font-ibm-plex-mono text-secondary text-sm">
          {items.map((item) => (
            <li key={item} className="cursor-default opacity-80">
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-auto pt-10 border-t border-neutral-800">
        <p className="font-ibm-plex-mono text-secondary text-xs opacity-70">
          Blackbox is currently in active development.
        </p>
      </div>
    </aside>
  );
};

export default RightSidebar;
