import React, { ReactChild, useState } from 'react';
import './Forms.scss';

export default function EasyForm({ title, children }: { title: string, children: ReactChild[] | ReactChild }) {
  return (
    <div className="form">
      <div style={{ padding: 20 }}>
        {title}
      </div>
      <div style={{ padding: 20, paddingTop: 0 }}>
        <form>{children}</form>
      </div>
    </div>
  )
}

function onChange(setError: (error: string | undefined) => void, update: (text: string) => void, checkError?: (text: string) => string | undefined, formateText?: (text: string) => string): React.ChangeEventHandler<HTMLInputElement> {
  return (event: React.ChangeEvent<HTMLInputElement>) => {
    if (formateText !== undefined) event.currentTarget.value = formateText(event.currentTarget.value!==undefined?event.currentTarget.value:event.currentTarget.defaultValue)
    if (checkError !== undefined) setError(checkError(event.currentTarget.value))
    update(event.currentTarget.value)
  }
}

export function TextElement({ name, defauld, update, checkError, formateText }: { name: string, defauld: string, update: (text: string) => void, checkError?: (text: string) => string | undefined, formateText?: (text: string) => string }) {
  const [error, setError] = useState<string | undefined>(checkError ? checkError(defauld) : undefined)
  return (
    <label>
      {name}<br />
      <input type="text" style={error ? { backgroundColor: "#ffb2b2", marginBottom: 0 } : {}} value={defauld} onChange={onChange(setError, update, checkError, formateText)} />
      {error ? <div style={{ color: "red", fontSize: 18 }}>{error}</div> : <br />}
    </label>
  )
}

// TODO type = number
export function NumberElement({ name, defauld, update, minVal, maxVal }: { name: string, defauld: number, update: (number: number) => void, minVal: number, maxVal: number }) {
  return (<TextElement name={name} defauld={String(defauld)} update={text => update(Number(text))} formateText={text => {
    text = text.replaceAll(/\D/g, "");
    if (text.length === 0) text = "0"
    let num = Number(text)
    if (num < minVal) num = minVal
    if (num > maxVal) num = maxVal
    return String(num)
  }} />)
}

export function SelectElement<Type extends string>({ name, defauld, show, options, types, updateSelected }: { name: string, defauld?: Type, show?: boolean, options?: { id: Type, name?: string }[], types?: Type[], updateSelected: (selected: Type) => void }) {
  if (defauld === undefined) {
    defauld = options ? options[0].id : types ? types[0] : undefined
  }
  return (
    <label hidden={show !== undefined && !show}>
      {name}<br />
      <select value={defauld} onChange={c => updateSelected(c.currentTarget.value as Type)}>
        {options === undefined ? <></> : options.map(c => <option value={c.id} key={c.id}>{c.name === undefined ? c.id : c.name}</option>)}
        {types === undefined ? <></> : types.map(c => <option value={c} key={c}>{c}</option>)}
      </select><br />
    </label>
  )
}

export function SelectButton({ name, onClick, onDelete }: { name: string, onClick: () => void, onDelete?: () => void }) {
  return (
    <div className="button-grid">
      <input type="button" value={name} onClick={onClick} style={onDelete?{}:{gridColumn: "1 / 3"}} />
      {onDelete ? <input type="image" src="https://ano.bot/trash.svg" alt='delete' onClick={e => {e.preventDefault(); onDelete()}} /> : <></>}
    </div>
  )
}