interface LeftSidebarProps {
  items?: string[];
}

const leftSidebarDefaultItems: LeftSidebarProps["items"] = [
  "Work",
  "About me",
  "What I do",
  "Tech stack",
  "Awards",
  "Client’s word",
  "Blog",
  "Contact me",
];

const RightSidebar = ({
  items = leftSidebarDefaultItems,
}: LeftSidebarProps) => {
  return (
    <aside className="border-l border-neutral-800 bg-secondary-bg p-6 hidden large:flex">
      <div>
        <span className="text-secondary">Index</span>
        <div className="border-t border-neutral-800 mt-2" />
        <ul className="mt-2 space-y-1">
          {items.map((item) => (
            <li
              key={item}
              className="font-ibm-plex-mono text-secondary text-sm cursor-pointer hover:text-primary transition-colors"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default RightSidebar;
