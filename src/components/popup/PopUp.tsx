import React, { ReactChild } from "react";
import "./PopUp.scss"

export default function PopUp({ children, close }: { children: ReactChild[] | ReactChild, close(): void }) {
  return (
    <div className="popup-background">
      <div className="popup">
        <div className="popup-x" onClick={close}>x</div>
        {children}
      </div>
    </div>
  )
}