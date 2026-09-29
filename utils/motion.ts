import { Transition } from "motion/react";

export const springConfig: Transition = {
  type: "spring",
  stiffness: 100,
  damping: 20,
  mass: 0.5,
};

export const defaultViewport = {
  once: true,
  margin: "-80px",
};