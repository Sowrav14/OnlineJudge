'use client'
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

export default function HeroSection() {
  const [text, setText] = useState("");
  const fullText = "Welcome to OnlineJudge ...";
  const speed = 200; // Typing speed in ms

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < fullText.length) {
        setText(fullText.slice(0, i + 1)); // Ensures correct state update
        i++;
      } else {
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, []);

  // Ensure "Blog" is found before slicing
  const onlineIndex = text.indexOf("Online");
  const judgeIndex = text.indexOf("Judge")
  const before = onlineIndex !== -1 ? text.slice(0, onlineIndex) : text;
  const after = judgeIndex !== -1 ? text.slice(judgeIndex + 5) : "";

  return (
    <div className="flex flex-col flex-grow gap-12 items-center justify-center h-[calc(72vh)]">
      {/* Typing Text */}
      <motion.h1
        className="text-7xl font-bold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {before}
        <span className="text-[#035196]">{onlineIndex !== -1 ? "Online" : ""}</span>
        <span className="text-[#df3434]">{judgeIndex !== -1 ? "Judge" : ""}</span>
        {after}
      </motion.h1>
    </div>
  );
}