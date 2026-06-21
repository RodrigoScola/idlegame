export interface GameSnapshot {
  score: number;
  clicksPerSecond: number;
}

export type HostToWebviewMessage = {
  type: "update";
  snapshot: GameSnapshot;
};

export type WebviewToHostMessage = { type: "click" } | { type: "buy" };

export type ViewKind = "game" | "stats" | "upgrades";

declare function acquireVsCodeApi(): {
  postMessage(message: WebviewToHostMessage): void;
};

let cachedApi: ReturnType<typeof acquireVsCodeApi> | undefined;

// Lazy: only invoked from webview code, never at module load, so importing
// this file from the extension host (Node) never calls the undefined global.
export function getVsCodeApi() {
  if (!cachedApi) {
    cachedApi = acquireVsCodeApi();
  }
  return cachedApi;
}
