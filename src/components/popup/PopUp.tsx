import React, { ReactChild, useState } from "react";
import "./PopUp.scss"

export default function PopUp({ children, close }: { children: ReactChild[] | ReactChild, close(): void }) {
  const [doClose, setDoClose] = useState(false)
  const closefunc = () => {
    setDoClose(true)
    setTimeout(close, 250);
  }

  return (
    <div onKeyDown={e => {if (e.key === "Escape") closefunc()}} onClick={closefunc} key={"" + doClose} className={"popup-background"+(doClose?" popup-background-close":"")}  >
      <div className={"popup"+(doClose?" popup-close":"")} >
        <div className="popup-x" onClick={closefunc}>x</div>
        {children}
      </div>
    </div>
  )
}