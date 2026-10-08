import type Lenis from "lenis";

/* Single shared Lenis instance, created in <Effects/>. */
let instance: Lenis | null = null;
export const setLenis = (l: Lenis | null) => {
  instance = l;
};
export const lenis = () => instance;
