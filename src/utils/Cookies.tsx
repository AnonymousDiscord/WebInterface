import { Lang } from "../hooks/Translate";
import { Range } from "./Range";

// theme

export function setHueCookie(hue: Range<361>) {
  setCookie("hue", String(hue))
}

export function setSatCookie(hue: Range<101>) {
  setCookie("sat", String(hue))
}

export function getHue() {
  const cookie = getCookie("hue")
  if (cookie === undefined) return 220
  return Number(cookie) as Range<361>
}

export function getSat() {
  const cookie = getCookie("sat")
  if (cookie === undefined) return 20
  return Number(cookie) as Range<101>
}

// lang

export function setLang(lang: Lang) {
  setCookie("lg", Lang[lang])
}

export function getLang() {
  return Lang[(getCookie("lg") || "EN") as keyof typeof Lang]
}

// get & set

const days = 180;
const save = new Map<string, string>()

function setCookie(name: string, value: string) {
  if (!checkCookies()) {
    save.set(name, value)
    return
  }
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = "; expires=" + date.toUTCString();
  document.cookie = name + "=" + value + expires + "; path=/";
}

function getCookie(name: string) {
  return document.cookie.split(";").map(c => c.trim()).find(c => c.startsWith(name + "="))?.split("=", 2)[1] || save.get(name)
}

// utils

let allowCookies = allow()

function allow() {
  return document.cookie.includes("coockiless=1")
}

if (allowCookies) {
  document.cookie.split(";").map(c => c.trim()).filter(c => !c.startsWith("_")).map(c => c.split("=", 2)).forEach(sp => setCookie(sp[0], sp[1]))
}

function checkCookies() {
  if (allowCookies) return true;
  if (allow()) {
    allowCookies = true
    save.forEach((v, k) => setCookie(k, v))
    save.clear()
    return true
  }
  return false
}