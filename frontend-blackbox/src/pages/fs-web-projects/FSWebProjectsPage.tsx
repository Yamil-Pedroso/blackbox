import FeatureHeader from "@/components/common/header/FeatureHeader";
import StackOverview from "@/components/fs-web-projects/StackOverview";
import ProjectsGrid from "@/components/fs-web-projects/ProjectsGrid";
import EngineeringFocus from "@/components/fs-web-projects/EngineeringFocus";

const FSWebProjectsPage = () => {
  return (
    <div className="px-6 md:px-10 xl:px-8 py-8 max-w-6xl space-y-8">
      <FeatureHeader label="webProjects" content="webProjects" />

      <StackOverview />

      <ProjectsGrid />

      <EngineeringFocus />
    </div>
  );
};

export default FSWebProjectsPage;
