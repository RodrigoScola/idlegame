import * as React from "react";
import { VscodeButton } from "@vscode-elements/react-elements";
import { getVsCodeApi } from "../shared/protocol";
import { useSnapshot } from "./hooks/useSnapshot";

export function GameView(): React.JSX.Element {
  const snapshot = useSnapshot();

  return (
    <div>
      <h2>Idle Game</h2>
      <div style={{ fontSize: "1.5em", margin: "8px 0" }}>{snapshot.score}</div>
      <VscodeButton onClick={() => getVsCodeApi().postMessage({ type: "click" })}>
        Click me (+1)
      </VscodeButton>
    </div>
  );
}
