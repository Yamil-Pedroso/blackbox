import OpenAISummaryView from "./views/OpenAISummaryView";
import OllamaScrapedPageView from "./views/OllamaScrapedView";

const ExploreWebScrapingAI = () => {
  return (
    <section className="w-full px-5 py-8 md:px-10 xl:px-8">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="border border-neutral-800 bg-secondary-bg p-5 md:p-6">
          <OllamaScrapedPageView />
        </div>

        <div className="border border-neutral-800 bg-secondary-bg p-5 md:p-6">
          <OpenAISummaryView />
        </div>
      </div>
    </section>
  );
};

export default ExploreWebScrapingAI;
