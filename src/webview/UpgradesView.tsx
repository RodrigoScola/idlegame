import * as React from "react";
import { VscodeButton } from "@vscode-elements/react-elements";
import { useSnapshot } from "./hooks/useSnapshot";
import { getVsCodeApi } from '../shared/protocol';

export function UpgradesView(): React.JSX.Element {
  const snapshot = useSnapshot();
  const cost = snapshot.clicksPerSecond * 10;

  return (
    <div>
      <h2>Upgrades</h2>
      <VscodeButton
        disabled={snapshot.score < cost}
        onClick={() => getVsCodeApi().postMessage({ type: "buy" })}
      >
        Buy +1/sec (cost: {cost})
      </VscodeButton>
    </div>
  );
}
