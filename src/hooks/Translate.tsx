import { createContext, useEffect, useState } from "react";
import { getLang, setLang as setCookie } from "../utils/Cookies";
import { getTranslation } from "../utils/Request";

export enum MSG {
  ADD_BOT,
  SETTINGS,
  CHANGE_THEME,
  SELECT_LANG,
  HOME,
  CHANNEL,
  JOIN_SERVER,
}

export enum Lang {
  DE, EN, FR, JP, NL, NO, RU, TR, ES
}

export enum LangNames {
  DE = "Deutsch", EN = "English", FR = "Français", JP = "日本語", NL = "Nederlands", NO = "Norsk", RU = "русский", TR = "Türk", ES = "Español"
}

export interface Translator {
  t(msg: MSG, vars?: {}): string
  translations: {},
  lang?: Lang
  setLang(lang: Lang): void
}

export const TranslationContext = createContext<Translator>({
  t: (msg: MSG, vars?: {}) => "",
  setLang: (lang: Lang) => {},
  translations: {}
})

export const TranslationProvider = TranslationContext.Provider;

export function useTranslator(): Translator {
  const [lang, setLang] = useState(getLang());
  const [translations, setTranslations] = useState({})
  useEffect(() => {setCookie(lang);getTranslation(lang).then(setTranslations)}, [lang])

  function t(msg: MSG, vars?: {}) {
    if (!translations) return ""
    var trans = (Object.entries<string>(translations).find(arr => arr[0] === MSG[msg])||["",MSG[msg]])[1];
    if (vars) Object.entries<string>(vars).forEach(arr => trans = trans.replace('{'+arr[0]+'}', arr[1]))
    return trans
  }

  return {
    lang: lang,
    t: t,
    setLang: setLang,
    translations: translations
  }
}