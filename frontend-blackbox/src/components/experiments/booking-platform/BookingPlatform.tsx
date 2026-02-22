/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "@tanstack/react-router";
import SectionHero from "../../common/SectionHero";
import SectionLabel from "../../common/SectionLabel";
import { useTranslation } from "react-i18next";

const BookingPlatform = () => {
  const { t } = useTranslation("bookingPlatform");

  const phases = t("phases", { returnObjects: true }) as any[];

  const currentPhase = phases.find((p) => p.status === "active");

  return (
    <div className="px-6 md:px-10 xl:px-8 py-8 max-w-6xl space-y-16">
      <section className="space-y-6">
        <SectionLabel text={t("label")} />
        <SectionHero
          title={t("hero.title")}
          description={t("hero.description")}
        />
      </section>

      <section className="grid md:grid-cols-2 gap-12">
        <div className="border border-neutral-800 p-6 bg-secondary-bg">
          <h3 className="font-geist text-xl text-primary mb-6">
            {t("developmentPhases")}
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
                  {t(`status.${phase.status}`)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="border border-neutral-800 p-6 bg-secondary-bg flex flex-col justify-between max-h-96">
          <div>
            <h3 className="font-geist text-xl text-primary mb-4">
              {t("currentFocus")}
            </h3>

            <div className="font-ibm-plex-mono text-sm text-secondary leading-relaxed overflow-y-auto h-50 pr-2">
              {currentPhase ? (
                <div className="mb-6">
                  <h4 className="font-semibold text-secondary">
                    Phase {currentPhase.id}: {currentPhase.name}
                  </h4>
                  <p className="text-secondary opacity-50 mt-1">
                    Goal: {currentPhase.goal}
                  </p>
                </div>
              ) : (
                t("noActivePhase")
              )}
            </div>
          </div>

          <Link
            to="/experiments/booking-platform/app"
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
              {t("enter")}
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default BookingPlatform;
