import avatar from "./images/avatar/avatar.jpg";
import arrow_black from "./images/icons/arrow.png";
import arrow_gray from "./images/icons/arrow_gray.png";
import map from "./images/icons/map_gray.png";
import phone_gray from "./images/icons/phone_gray.png";
import lan_gray from "./images/icons/lan_gray.png";
import sun_gray from "./images/icons/sun_gray.png";
import moon_black from "./images/icons/moon_black.png";

// UI/UX Page
import uiux_1 from "./images/ui-ux/uiux-01.png";
import uiux_2 from "./images/ui-ux/uiux-02.png";
import uiux_3 from "./images/ui-ux/uiux-03.png";
import uiux_4 from "./images/ui-ux/uiux-04.png";

interface IAssets {
  [key: string]: string;
}

const assets: IAssets = {
  avatar,
  arrow_black,
  arrow_gray,
  map,
  phone_gray,
  lan_gray,
  sun_gray,
  moon_black,
  uiux_1,
  uiux_2,
  uiux_3,
  uiux_4,
};

export default assets;
