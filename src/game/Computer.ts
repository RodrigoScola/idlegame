import { createPosition } from "./utils";

export function createComputer(): Computer {
  return {
    position: createPosition(),
    status: "fixed",
  };
}

export function breakComputer(comp: Computer): Computer {
  comp.status = "broken";
  return comp;
}

export function isBroken(comp: Computer) {
  return comp.status === "broken";
}

export function isFixed(comp: Computer) {
  return comp.status === "fixed";
}

export function fix(comp: Computer) {
  comp.status = "fixed";
}
