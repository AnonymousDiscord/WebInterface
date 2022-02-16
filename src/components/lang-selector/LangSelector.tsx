import React, { useContext } from "react";
import { Lang, MSG, TranslationContext, Translator } from "../../hooks/Translate";
import "./LangSelector.scss"

const selectableLangs: Lang[] = [Lang.DE, Lang.EN, Lang.FR, Lang.JP, Lang.NL, Lang.RU, Lang.ES]

export default function LangSelector() {
  const translator = useContext(TranslationContext)
  return (
    <div>
      {translator.t(MSG.SELECT_LANG)}<br/>
      {selectableLangs.map(lang => <Flag lang={lang} translator={translator} key={Lang[lang]}/>)}
    </div>
  )
}

function Flag({ lang, translator }: { lang: Lang, translator: Translator }) {
  var code = Lang[lang].toLocaleLowerCase()
  if (code === "en") code = "us"
  return (
    <img
      className={lang === translator.lang ? "flag flag-selected" : "flag"}
      onClick={() => translator.setLang(lang)}
      src={"https://flagcdn.com/" + code + ".svg"}
      width="80"
      alt={Lang[lang]}
    />
  )
}