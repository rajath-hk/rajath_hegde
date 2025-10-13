"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Window from "@/components/window";

export function AnimatedWindow({ open, onClose, ...props }: any) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 40 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="fixed z-50"
        >
          <Window {...props} onClose={onClose} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
