import React from 'react';
import './Icons.scss';
import { motion } from "framer-motion"

export const QuestionMarkPath = "m0 2.6.6 1.32 1.44 3.13c1.22-.47 2.37-1.11 3.62-1.53 1.8-.6 4.87-1.05 5.66 1.26.13.39.13.76.13 1.16 0 .45-.08.91-.25 1.32-.37.93-1.12 1.62-1.87 2.24-.94.78-1.93 1.51-2.75 2.41-.81.9-1.42 1.98-1.65 3.18-.2 1-.15 2.03-.15 3.04h5.32c0-.96-.13-2.03.33-2.91.54-1.02 1.58-1.72 2.45-2.44 1.7-1.4 3.52-2.9 4.1-5.13.27-1.01.34-2.08.24-3.12-.09-.86-.3-1.68-.69-2.46-2.02-4.03-7.48-4.53-11.38-3.56-.78.19-1.55.44-2.3.73-.99.38-1.92.86-2.86 1.35m7.28 21.02c-.77.1-1.53.23-2.14.76-1.4 1.21-1.36 4 0 5.23.82.73 2.06.92 3.12.79.75-.09 1.49-.35 2.03-.9 1.23-1.23 1.23-3.71.05-4.97-.72-.77-2.04-1.05-3.06-.92"

export function Logo() {
  return (
    <motion.div className="logo-container"
      drag
      dragConstraints={{ left: 0, right: 0, top: -100, bottom: 0 }}
    >
      <motion.div
        whileHover={{ rotate: 3600 }}
        transition={{ duration: 3 }}
      >

        <motion.svg // 94.82 // 101,61
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -.9 17.27 30.34"
          className="logo-item"
        >
          <motion.path
            d={QuestionMarkPath}
            variants={{
              hidden: {
                opacity: 0,
                pathLength: 0,
                fill: "rgba(255, 128, 128, 0)"
              },
              visible: {
                opacity: 1,
                pathLength: 1,
                fill: "rgba(255, 0, 0, 1)"
              }
            }}
            initial="hidden"
            animate="visible"
            transition={{
              default: { duration: 3, ease: "easeInOut" },
              fill: { delay: 2, duration: 1, ease: [1, 0, 0.8, 1] }
            }}
          />
        </motion.svg>
      </motion.div>
    </motion.div>
  );
}

export function ChannelIcon({ path }: { path: string }) {
  return (
    <svg
      style={{ width: 24, height: 24 }}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path fill='white' d={path} />
    </svg>
  )
}