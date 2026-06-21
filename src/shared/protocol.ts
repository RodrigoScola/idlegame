let cachedApi: ReturnType<typeof acquireVsCodeApi> | undefined;

// Lazy: only invoked from webview code, never at module load, so importing
// this file from the extension host (Node) never calls the undefined global.
export function getVsCodeApi() {
  if (!cachedApi) {
    cachedApi = acquireVsCodeApi();
  }
  return cachedApi;
}
