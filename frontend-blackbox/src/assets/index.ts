import avatar from "./images/avatar/avatar.jpg";
import arrow_black from "./images/icons/arrow.png";
import arrow_gray from "./images/icons/arrow_gray.png";
import map from "./images/icons/map_gray.png";
import phone_gray from "./images/icons/phone_gray.png";
import lan_gray from "./images/icons/lan_gray.png";
import sun_gray from "./images/icons/sun_gray.png";
import moon_black from "./images/icons/moon_black.png";

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
};

export default assets;
