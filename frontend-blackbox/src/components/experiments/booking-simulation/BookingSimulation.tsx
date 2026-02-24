/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "@tanstack/react-router";
import SectionHero from "../../common/SectionHero";
import SectionLabel from "../../common/SectionLabel";
import { useTranslation } from "react-i18next";

const BookingSimulation = () => {
  const { t } = useTranslation("bookingSimulation");

  const phases = t("phases", { returnObjects: true }) as any[];
  const currentPhase = phases.find((p) => p.status === "active");

  return (
    <div className="px-6 md:px-10 xl:px-8 py-8 max-w-6xl space-y-16">
      {/* HERO */}
      <section className="space-y-6">
        <SectionLabel text={t("label")} />
        <SectionHero
          title={t("hero.title")}
          description={t("hero.description")}
        />
      </section>

      {/* GRID */}
      <section className="grid md:grid-cols-2 gap-12">
        {/* LEFT CONTAINER */}
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

        {/* RIGHT CONTAINER */}
        <div className="border border-neutral-800 p-6 bg-secondary-bg flex flex-col">
          <div>
            <h3 className="font-geist text-xl text-primary mb-4">
              {t("currentFocus")}
            </h3>

            {currentPhase ? (
              <div>
                <h4 className="font-semibold text-secondary">
                  Phase {currentPhase.id}: {currentPhase.name}
                </h4>
                <p className="text-secondary opacity-50 mt-1">
                  Goal: {currentPhase.goal}
                </p>
              </div>
            ) : (
              <p className="font-ibm-plex-mono text-sm text-secondary">
                {t("noActivePhase")}
              </p>
            )}
          </div>

          {/* 🔥 Botón empujado abajo de forma inteligente */}
          <Link
            className="mt-auto"
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
            <button className="mt-6 w-full border border-primary px-6 py-3 text-sm font-ibm-plex-mono text-primary hover:bg-primary hover:text-tertiary transition-colors duration-300 cursor-pointer">
              {t("enter")}
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default BookingSimulation;
