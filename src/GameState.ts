import * as vscode from "vscode";

export class GameState {
  private score = 0;
  private clicksPerSecond = 1;
  private readonly emitter = new vscode.EventEmitter<GameSnapshot>();
  readonly onDidChange = this.emitter.event;
  private readonly timer: ReturnType<typeof setInterval>;

  constructor() {
    this.timer = setInterval(() => this.tick(), 1000);
  }

  private tick(): void {
    this.score += this.clicksPerSecond;
    this.emitChange();
  }

  click(): void {
    this.score += 1;
    this.emitChange();
  }

  buyUpgrade(): void {
    const cost = this.clicksPerSecond * 10;
    if (this.score < cost) {
      return;
    }
    this.score -= cost;
    this.clicksPerSecond += 1;
    this.emitChange();
  }

  snapshot(): GameSnapshot {
    return { score: this.score, clicksPerSecond: this.clicksPerSecond };
  }

  private emitChange(): void {
    this.emitter.fire(this.snapshot());
  }

  dispose(): void {
    clearInterval(this.timer);
    this.emitter.dispose();
  }
}
