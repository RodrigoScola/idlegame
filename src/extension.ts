// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { GameState } from "./GameState";
import {
  GameViewProvider,
  StatsViewProvider,
  UpgradesViewProvider,
} from "./ViewProviders";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  const state = new GameState();
  context.subscriptions.push(state);

  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      "idlegame.game",
      new GameViewProvider(state, context.extensionUri),
    ),
    vscode.window.registerWebviewViewProvider(
      "idlegame.stats",
      new StatsViewProvider(state, context.extensionUri),
    ),
    vscode.window.registerWebviewViewProvider(
      "idlegame.upgrades",
      new UpgradesViewProvider(state, context.extensionUri),
    ),
  );

  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "idlegame" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  const disposable = vscode.commands.registerCommand(
    "idlegame.helloWorld",
    () => {
      // The code you place here will be executed every time your command is executed
      // Display a message box to the user
      vscode.window.showInformationMessage("Hello World from idlegame!");
    },
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
