import * as React from "react";
import { createRoot } from "react-dom/client";
import { GameView } from "./GameView";
import { StatsView } from "./StatsView";
import { UpgradesView } from "./UpgradesView";

const views: Record<ViewKind, React.ComponentType> = {
  game: GameView,
  stats: StatsView,
  upgrades: UpgradesView,
};

const View = views[window.__VIEW__];
const root = document.getElementById("root");
if (root) {
  createRoot(root).render(<View />);
}
