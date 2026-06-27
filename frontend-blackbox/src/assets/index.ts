import avatar from "./images/avatar/avatar.jpg";
import arrow_black from "./images/icons/arrow.png";
import arrow_gray from "./images/icons/arrow_gray.png";
import map from "./images/icons/map_gray.png";
import phone_gray from "./images/icons/phone_gray.png";
import lan_gray from "./images/icons/lan_gray.png";
import sun_gray from "./images/icons/sun_gray.png";
import moon_black from "./images/icons/moon_black.png";

// Home
import tools from "./images/home/tools.png";
import ai from "./images/home/ai.png";
import systems from "./images/home/systems.png";
import experiments from "./images/home/experiments.png";
import uiux from "./images/home/ui-ux.png";
import fullstack from "./images/home/fullstack.png";

// ai
import explore from "./images/ai/explore.png";
import process from "./images/ai/process.png";

// UI/UX Page
import uiux_1 from "./images/ui-ux/uiux-01.png";
import uiux_2 from "./images/ui-ux/uiux-02.png";
import uiux_3 from "./images/ui-ux/uiux-03.png";
import uiux_4 from "./images/ui-ux/uiux-04.png";

// Experience
import experience_1 from "./images/experience/squib.png";
import experience_2 from "./images/experience/qiibee.png";
import experience_3 from "./images/experience/mundus.png";
import experience_4 from "./images/experience/alba.jpeg";
import experience_5 from "./images/experience/unesco.png";

// Education
import education_1 from "./images/education/brainnest.png";
import education_2 from "./images/education/leWagon.png";
import education_3 from "./images/education/constructor1.jpeg";
import education_4 from "./images/education/free_code_camp.png";
import education_5 from "./images/education/udemy.png";
import education_6 from "./images/education/havannaUni.jpg";

// Testimonials
import testimonial_1 from "./images/tesmonial-avatars/avatar_1.jpg";
import testimonial_2 from "./images/tesmonial-avatars/avatar_2.jpg";
import testimonial_3 from "./images/tesmonial-avatars/avatar_3.jpg";
import testimonial_4 from "./images/tesmonial-avatars/avatar_4.jpg";

interface IAssets {
  [key: string]: string;
}

const assets: IAssets = {
  avatar,
  tools,
  ai,
  systems,
  experiments,
  uiux,
  fullstack,
  arrow_black,
  arrow_gray,
  map,
  explore,
  process,
  phone_gray,
  lan_gray,
  sun_gray,
  moon_black,
  uiux_1,
  uiux_2,
  uiux_3,
  uiux_4,
  experience_1,
  experience_2,
  experience_3,
  experience_4,
  experience_5,
  education_1,
  education_2,
  education_3,
  education_4,
  education_5,
  education_6,
  testimonial_1,
  testimonial_2,
  testimonial_3,
  testimonial_4,
};

export default assets;
