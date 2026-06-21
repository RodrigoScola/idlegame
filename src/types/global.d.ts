type HostToWebviewMessage = {
  type: "update";
  snapshot: GameSnapshot;
};

type WebviewToHostMessage = { type: "click" } | { type: "buy" };

type ViewKind = "game" | "stats" | "upgrades";

type ComputerStatus = "broken" | "fixed";

interface Updatable {
  position: Position;
}

type Computer = Updatable & {
  status: ComputerStatus;
};

interface Position {
  col: number;
  row: number;
}

type GameSnapshot = {
  score: number;
  clicksPerSecond: number;
  computers: Computer[];
};

declare function acquireVsCodeApi(): {
  postMessage(message: WebviewToHostMessage): void;
};

interface Window {
  __VIEW__: ViewKind;
}
