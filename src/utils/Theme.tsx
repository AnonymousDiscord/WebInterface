import { Range } from "./Range";
import { setSatCookie, setHueCookie, getHue, getSat } from "./Cookies";

export function loadTheme() {
  setHue(getHue());
  setSat(getSat())
}

export function setHue(hue: Range<361>) {
  document.documentElement.style.setProperty("--hue", String(hue));
  setHueCookie(hue)
}

export function setSat(sat: Range<101>) {
  document.documentElement.style.setProperty("--sat", sat+"%");
  setSatCookie(sat)
}