import * as React from "react";
import { VscodeBadge } from "@vscode-elements/react-elements";
import { useSnapshot } from "./hooks/useSnapshot";

export function StatsView(): React.JSX.Element {
  const snapshot = useSnapshot();

  return (
    <div>
      <h2>Stats</h2>
      <div>
        Score: <VscodeBadge>{snapshot.score}</VscodeBadge>
      </div>
      <div>
        Per second: <VscodeBadge>{snapshot.clicksPerSecond}</VscodeBadge>
      </div>
    </div>
  );
}
