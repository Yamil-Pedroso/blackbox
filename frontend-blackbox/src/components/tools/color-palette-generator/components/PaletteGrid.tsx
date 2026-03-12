import ColorCard from "./ColorCard";
import { hslStringToValues } from "../logic/convertColor";
import { hslToRgb, rgbToHex } from "../logic/colorFormat";

type Props = {
  colors: string[];
};

export default function PaletteGrid({ colors }: Props) {
  return (
    <div className="grid grid-cols-5 mt-20 ">
      {colors.map((color) => {
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
