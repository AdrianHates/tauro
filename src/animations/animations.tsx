import { Variants } from "framer-motion";

export const fadeInFromPosition = {
  initial: { opacity: 0, x: -100 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.5, ease: "easeOut" },
};

export const fadeInFromTop: Variants = {
  initial: { opacity: 0, y: -100 },
  animate: { opacity: 1, y: 0 },
};

export const fadeInFromXY = (
  x: number,
  y: number,
  opacity: number
): Variants => ({
  initial: { opacity, x, y },
  animate: { opacity: 1, x: 0, y: 0 },
});

export const fadeInFromBottomToTopReturn: Variants = {
  initial: { opacity: 0, y: 500 },
  animate: {
    opacity: [0, 1, 1],
    y: [500, -20, 0],
  },
};

export const appearFromCenter: Variants = {
  initial: { opacity: 0, scale: 0 },
  animate: { opacity: 1, scale: 1 },
};

export const appearFromCenterScale: Variants = {
  initial: { opacity: 0, scale: 1.2 },
  animate: { opacity: 1, scale: 1 },
};