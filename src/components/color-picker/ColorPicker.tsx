import React, { useContext, useEffect, useState } from "react";
import { MSG, TranslationContext } from "../../hooks/Translate";
import { getHue, getSat } from "../../utils/Cookies";
import { Range } from "../../utils/Range";
import { setHue, setSat } from "../../utils/Theme";
import "./ColorPicker.scss"

export default function ColorPicker() {
  const { t } = useContext(TranslationContext)

  return (
    <div>
      {t(MSG.CHANGE_THEME)}
      <HuePicker />
      <SatPicker />
    </div>
  )
}

function HuePicker() {
  const [value, setValue] = useState(getHue())
  useEffect(() => setHue(value), [value])

  return (
    <div className="wrap">
      <input type="range" className="range" min="0" max="360" step="0.1" value="0" onInput={(e) => setValue(Number(e.currentTarget.value) as Range<361>)} />
      <div className="track" />
      <div className="thumb" style={{ left: value, transform: `translate(-${value / 3.6}%, -50%)` }} />
    </div>
  )
}

function SatPicker() {
  const [value, setValue] = useState(getSat())
  useEffect(() => setSat(value), [value])

  return (
    <div className="wrap">
      <input type="range" className="range" min="0" max="360" step="0.1" value="0" onInput={(e) => setValue(Number(e.currentTarget.value) / 3.6 as Range<101>)} />
      <div className="track sat" />
      <div className="thumb" style={{ left: value * 3.6, transform: `translate(-${value}%, -50%)` }} />
    </div>
  )
}