import type { ToolTypes } from "../types/toolTypes";
import { getStatusColor, getStageInfo } from "../../../../lib/utils/toolStage";
import { Link } from "@tanstack/react-router";

const PresentationCard = ({ tool }: { tool: ToolTypes }) => {
  return (
    <div className="tool-card group border border-neutral-800 bg-secondary-bg p-6 flex flex-col justify-between hover:border-primary transition-colors duration-300">
      <div className="space-y-4">
        <h2 className="text-primary font-geist text-xl md:text-2xl">
          {tool.title}
        </h2>

        <p className="text-secondary font-ibm-plex-mono text-sm leading-relaxed">
          {tool.description}
        </p>

        <div className="flex flex-col gap-3 text-xs font-ibm-plex-mono text-secondary pt-2">
          <span>{tool.stack}</span>

          <span className={getStatusColor(tool.status)}>{tool.status}</span>

          <span
            className={`${getStageInfo(tool.stage).color} flex items-center`}
          >
            {tool.stage.toUpperCase()}
            {(() => {
              const IconComponent = getStageInfo(tool.stage).icon;
              return <IconComponent className="ml-2" />;
            })()}
          </span>
        </div>
      </div>

      <div className="flex flex-col mt-6">
        <Link
          to="/tools/$slug/process"
          params={{ slug: tool.slug }}
          className="relative mt-6 border border-neutral-700 px-4 py-2 text-center text-xs font-ibm-plex-mono text-secondary overflow-hidden group/process"
        >
          <span className="absolute inset-0 bg-secondary origin-left scale-x-0 transition-transform duration-300 ease-out group-hover/process:scale-x-100"></span>

          <span className="relative z-10 group-hover/process:text-black transition-colors duration-300">
            {tool.viewProcess}
          </span>
        </Link>

        <Link
          to="/tools/$slug/launch"
          params={{ slug: tool.slug }}
          className="relative mt-6 border border-neutral-700 px-4 py-2 text-center text-xs font-ibm-plex-mono text-secondary overflow-hidden group/launch"
        >
          <span className="absolute inset-0 bg-secondary origin-left scale-x-0 transition-transform duration-300 ease-out group-hover/launch:scale-x-100"></span>

          <span className="relative z-10 group-hover/launch:text-black transition-colors duration-300">
            {tool.launch}
          </span>
        </Link>
      </div>
    </div>
  );
};

export default PresentationCard;
