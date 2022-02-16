import React from 'react';
import '../App.scss';
import { motion } from "framer-motion"

type LinkButtonProps = { url: string, text: string, id: number }
type ButtonProps = { onClick(): void, text: string, id: number }

export function Button({ onClick, text, id }: ButtonProps) {
  return (
    <motion.div
      style={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ ease: "easeOut", duration: 0.5, delay: id / 3 }}
    >
      <motion.button className="button"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onClick}
      >
        <div className='link'>{text}</div>
      </motion.button>
    </motion.div>
  )
}

export function DirectButton(props: LinkButtonProps) {
  return Button({...props, onClick:()=>window.location.href = props.url})
}