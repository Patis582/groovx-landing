"use client";
import { motion } from "framer-motion";
import PhoneFrame from "./PhoneFrame";

export default function PhoneMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
    >
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 4, ease: "easeInOut", repeat: Infinity, repeatType: "loop" }}
      >
        <PhoneFrame src="/feed.PNG" alt="GroovX feed" width={268} height={552} />
      </motion.div>
    </motion.div>
  );
}
