import ColorCard from "./ColorCard";
import { hslStringToValues } from "../logic/convertColor";
import { hslToRgb, rgbToHex } from "../logic/colorFormat";

type Props = {
  colors: string[];
};

export default function PaletteGrid({ colors }: Props) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-11 gap-0 mt-12 ">
      {colors.map((color) => {
        // Si ya es HEX (AI palette)
        if (color.startsWith("#")) {
          return <ColorCard key={color} hex={color} rgb="" hsl="" />;
        }

        // Si es HSL (paleta normal)
        const values = hslStringToValues(color);

        if (!values) return null;

        const rgb = hslToRgb(values.h, values.s, values.l);

        const rgbNumbers = rgb.match(/\d+/g)?.map(Number) || [0, 0, 0];

        const hex = rgbToHex(rgbNumbers[0], rgbNumbers[1], rgbNumbers[2]);

        return <ColorCard key={color} hex={hex} rgb={rgb} hsl={color} />;
      })}
    </div>
  );
}
