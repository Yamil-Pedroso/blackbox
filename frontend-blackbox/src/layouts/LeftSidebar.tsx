import { FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import assets from "../assets";
import Button from "../components/common/Button";
import { LuLanguages } from "react-icons/lu";
import { useTranslation } from "react-i18next";

const LeftSidebar = () => {
  const { t } = useTranslation("leftSidebar");
  const defaultInfoItems = [
    { title: t("info.location"), icon: FaMapMarkerAlt },
    { title: t("info.languages"), icon: LuLanguages },
    { title: t("+41 79 532 65 19"), icon: FaPhone },
  ];

  return (
    <aside className="border-r border-neutral-800 bg-secondary-bg hidden large:flex flex-col h-screen px-8 py-10">
      <div className="flex items-center gap-4">
        <div className="w-12.5 h-12.5 bg-neutral-700 flex items-center justify-center overflow-hidden">
          <img
            src={assets.avatar}
            alt="Avatar"
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <h2 className="font-ibm-plex-mono text-secondary text-[18px]">
            Yamil Pedroso
          </h2>
          <p className="font-ibm-plex-mono text-secondary text-[14px] whitespace-nowrap">
            {t("profile.role")}
          </p>
        </div>
      </div>

      <div className="mt-12 flex flex-col gap-12">
        <p className="font-ibm-plex-mono text-secondary text-[14px] leading-relaxed">
          {t("profile.description")}
        </p>

        <nav>
          <ul className="space-y-4">
            {defaultInfoItems.map((item) => {
              const Icon = item.icon;
              const LanIcon = defaultInfoItems[1].icon;

              return (
                <li
                  key={item.title}
                  className="font-ibm-plex-mono text-secondary text-sm flex items-center gap-3"
                >
                  <div className="">
                    {Icon === LuLanguages ? (
                      <LanIcon className="text-[1.2rem]" />
                    ) : (
                      <Icon className="text-[0.9rem]" />
                    )}
                  </div>
                  <span className="">{item.title}</span>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="border-t border-neutral-800 pt-6">
          <h3 className="font-ibm-plex-mono text-secondary text-[12px] uppercase tracking-widest mb-4">
            {t("status.title")}
          </h3>

          <div className="space-y-3 font-ibm-plex-mono text-secondary text-sm">
            <div className="flex justify-between">
              <span>{t("status.modules")}</span>
              <span>5</span>
            </div>

            <div className="flex justify-between">
              <span>{t("status.version")}</span>
              <span>v1.0</span>
            </div>

            <div className="flex justify-between">
              <span>{t("status.state")}</span>
              <span className="text-green">{t("status.active")}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-auto pt-6 border-t border-neutral-800 flex flex-col gap-4 mb-3.5">
        <Button className="bg-white text-tertiary w-full" onClick={() => {}}>
          {t("buttons.schedule")}
        </Button>

        <Button
          className="border border-white text-white w-full"
          onClick={() => {}}
        >
          {t("buttons.journey")}
        </Button>
      </div>
    </aside>
  );
};

export default LeftSidebar;
