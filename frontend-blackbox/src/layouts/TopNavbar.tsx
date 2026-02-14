import { Link, useRouterState } from "@tanstack/react-router";

interface TopNavbarProps {
  itemsMenu?: { name: string; to: string }[];
  itemsMenu2?: string[];
}

const topNavbarDefaultItemsMenu: TopNavbarProps["itemsMenu"] = [
  {
    name: "yami.info",
    to: "/",
  },
  {
    name: "content1",
    to: "/content1",
  },
  {
    name: "content2",
    to: "/content2",
  },
];

const topNavbarDefaultItemsMenu2: TopNavbarProps["itemsMenu2"] = [
  "Open to new creation",
  "Switzerland, Zurich",
  "My time:",
];

const TopNavbar = ({
  itemsMenu = topNavbarDefaultItemsMenu,
  itemsMenu2 = topNavbarDefaultItemsMenu2,
}: TopNavbarProps) => {
  // Get current pathname from TanStack Router
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  const currentTime = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <header className="h-[27.6px] border-b border-neutral-800 flex items-center px-6 bg-secondary-bg">
      {/* Logo */}
      <div className="w-75">
        <h1 className="font-ibm-plex-mono text-secondary tracking-wide text-[12px]">
          Blackbox
        </h1>
      </div>

      <div className="w-full flex justify-between ml-auto space-x-6">
        {/* Left Menu */}
        <ul className="flex space-x-6 ml-10">
          {itemsMenu.map((item) => {
            const isActive = pathname === item.to;

            return (
              <Link to={item.to} key={item.name}>
                <li
                  className={`relative font-ibm-plex-mono text-[12px] cursor-pointer transition-colors duration-300 hover:text-primary ${
                    isActive ? "text-primary" : "text-secondary"
                  }`}
                >
                  {item.name}

                  {/* Underline */}
                  <div
                    className={`absolute left-0 -bottom-1 h-0.5 rounded-full transition-all duration-300 ${
                      isActive ? "w-full bg-primary" : "w-0 bg-transparent"
                    }`}
                  />
                </li>
              </Link>
            );
          })}
        </ul>

        {/* Right Info Section */}
        <ul className="flex space-x-4 ml-10 items-center">
          {itemsMenu2.map((item) => (
            <li
              key={item}
              className="font-ibm-plex-mono text-secondary text-[12px]"
            >
              {item === topNavbarDefaultItemsMenu2[0] ? (
                <span className="relative inline-flex items-center gap-2 bg-[#5bee6c]/10 px-3 py-1 rounded-md">
                  <span className="relative flex h-2 w-2 justify-center items-center">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-[#5bee6c] opacity-40 animate-ping"></span>

                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#5bee6c]"></span>
                  </span>
                  <span className="text-[#5bee6c] font-ibm-plex-mono text-[12px]">
                    {item}
                  </span>
                </span>
              ) : item === topNavbarDefaultItemsMenu2[2] ? (
                <span>My time: {currentTime}</span>
              ) : (
                item
              )}
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default TopNavbar;
