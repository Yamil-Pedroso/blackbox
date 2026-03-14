import ColorCard from "./ColorCard";
import { hslStringToValues } from "../logic/convertColor";
import { hslToRgb, rgbToHex } from "../logic/colorFormat";
import { hexToRgb } from "../logic/hexToRgb";
import { rgbToHsl } from "../logic/rgbToHsl";

type Props = {
  colors: string[];
};

export default function PaletteGrid({ colors }: Props) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-11 gap-6 mt-12 ">
      {colors.map((color) => {
        const rgbIA = hexToRgb(color);
        const hsl = rgbToHsl(rgbIA.r, rgbIA.g, rgbIA.b);
        if (color.startsWith("#")) {
          return (
            <ColorCard
              key={color}
              hex={color}
              rgb={`rgb(${rgbIA.r}, ${rgbIA.g}, ${rgbIA.b})`}
              hsl={`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`}
              index={colors.indexOf(color)}
            />
          );
        }

        // Si es HSL (paleta normal)
        const values = hslStringToValues(color);

        if (!values) return null;

        const rgb = hslToRgb(values.h, values.s, values.l);

        const rgbNumbers = rgb.match(/\d+/g)?.map(Number) || [0, 0, 0];

        const hex = rgbToHex(rgbNumbers[0], rgbNumbers[1], rgbNumbers[2]);

        return (
          <ColorCard
            key={color}
            hex={hex}
            rgb={rgb}
            hsl={color}
            index={colors.indexOf(color)}
          />
        );
      })}
    </div>
  );
}
