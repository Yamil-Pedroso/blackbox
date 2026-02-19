import { Link } from "@tanstack/react-router";
import SectionHero from "../../common/SectionHero";
import SectionLabel from "../../common/SectionLabel";
import { phases } from "./data/phases";

const BookingSimulation = () => {
  const currentPhase = phases.find((p) => p.status === "active");

  return (
    <div className="px-6 md:px-10 xl:px-8 py-8 max-w-6xl space-y-16">
      <section className="space-y-6">
        <SectionLabel text="Product Simulation" />
        <SectionHero
          title="Booking Platform Simulation"
          description="A structured simulation of a real-world booking platform, designed to replicate product-level frontend challenges."
        />
      </section>

      <section className="grid md:grid-cols-2 gap-12">
        <div className="border border-neutral-800 p-6 bg-secondary-bg">
          <h3 className="font-geist text-xl text-primary mb-6">
            Development Phases
          </h3>

          <ul className="space-y-4 font-ibm-plex-mono text-sm">
            {phases.map((phase) => (
              <li key={phase.id} className="flex items-center justify-between">
                <span className="text-secondary">
                  Phase {phase.id}: {phase.name}
                </span>

                <span
                  className={`text-xs ${
                    phase.status === "active"
                      ? "text-green"
                      : phase.status === "done"
                        ? "text-primary"
                        : "text-neutral-500"
                  }`}
                >
                  {phase.status === "active"
                    ? "In Progress"
                    : phase.status === "done"
                      ? "Completed"
                      : "Pending"}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="border border-neutral-800 p-6 bg-secondary-bg flex flex-col justify-between max-h-96 ">
          <div>
            <h3 className="font-geist text-xl text-primary mb-4">
              Current Focus
            </h3>

            <div className="font-ibm-plex-mono text-sm text-secondary leading-relaxed overflow-y-auto h-50 pr-2">
              {currentPhase ? (
                <>
                  {phases.map((phase) => {
                    if (phase.status === "active") {
                      return (
                        <div key={phase.id} className="mb-6">
                          <h4 className="font-semibold text-secondary">
                            Phase {phase.id}: {phase.name}
                          </h4>
                          <p className="text-secondary opacity-50 mt-1">
                            Goal: {phase.goal}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  })}
                </>
              ) : (
                "No active phase."
              )}
            </div>

            <p className="font-ibm-plex-mono text-xs text-secondary opacity-70 mt-4"></p>
          </div>

          <Link
            to="/experiments/booking-simulation/app"
            search={{
              location: "",
              guests: 1,
              minPrice: 0,
              maxPrice: 500,
              sort: "price_asc",
              checkInDate: undefined,
              checkOutDate: undefined,
              page: 1,
              limit: 6,
            }}
          >
            <button className="mt-8 border border-primary px-6 py-3 text-sm font-ibm-plex-mono text-primary hover:bg-primary hover:text-tertiary transition-colors duration-300 cursor-pointer">
              Enter Box →
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default BookingSimulation;
