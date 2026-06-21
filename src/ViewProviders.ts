import * as vscode from "vscode";
import { GameState } from "./GameState";

abstract class BaseViewProvider implements vscode.WebviewViewProvider {
  protected abstract readonly viewKind: ViewKind;

  constructor(
    protected readonly state: GameState,
    private readonly extensionUri: vscode.Uri,
  ) {}

  resolveWebviewView(webviewView: vscode.WebviewView): void {
    const webview = webviewView.webview;
    webview.options = {
      enableScripts: true,
      localResourceRoots: [vscode.Uri.joinPath(this.extensionUri, "dist")],
    };
    webview.html = this.getHtml(webview);

    const post = (snapshot: GameSnapshot) =>
      webview.postMessage({ type: "update", snapshot });
    post(this.state.snapshot());

    const subscription = this.state.onDidChange(post);
    webviewView.onDidDispose(() => subscription.dispose());

    webview.onDidReceiveMessage((message: WebviewToHostMessage) =>
      this.onMessage(message),
    );
  }

  protected onMessage(_message: WebviewToHostMessage): void {
    // Override in subclasses that need to handle button clicks, etc.
  }

  private getHtml(webview: vscode.Webview): string {
    const scriptUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this.extensionUri, "dist", "webview", "main.js"),
    );
    const nonce = String(Date.now());
    return /* html */ `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; script-src 'nonce-${nonce}';" />
  <style>
    body { font-family: var(--vscode-font-family); padding: 0 10px; color: var(--vscode-foreground); }
    h2 { font-size: 1em; }
  </style>
</head>
<body>
  <div id="root"></div>
  <script nonce="${nonce}">window.__VIEW__ = ${JSON.stringify(this.viewKind)};</script>
  <script nonce="${nonce}" src="${scriptUri}"></script>
</body>
</html>`;
  }
}

export class GameViewProvider extends BaseViewProvider {
  protected readonly viewKind: ViewKind = "game";

  protected onMessage(message: WebviewToHostMessage): void {
    if (message.type === "click") {
      this.state.click();
    }
  }
}

export class StatsViewProvider extends BaseViewProvider {
  protected readonly viewKind: ViewKind = "stats";
}

export class UpgradesViewProvider extends BaseViewProvider {
  protected readonly viewKind: ViewKind = "upgrades";

  protected onMessage(message: WebviewToHostMessage): void {
    if (message.type === "buy") {
      this.state.buyUpgrade();
    }
  }
}
