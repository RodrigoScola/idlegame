type GameSnapshot = {
  score: number;
  clicksPerSecond: number;
};

type HostToWebviewMessage = {
  type: "update";
  snapshot: GameSnapshot;
};

type WebviewToHostMessage = { type: "click" } | { type: "buy" };

type ViewKind = "game" | "stats" | "upgrades";

type ComputerStatus = "broken" | "fixed";

interface Position {
  col: number;
  row: number;
}

declare function acquireVsCodeApi(): {
  postMessage(message: WebviewToHostMessage): void;
};

interface Window {
  __VIEW__: ViewKind;
}
