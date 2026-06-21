import { useEffect, useState } from "react";
import { GameSnapshot, HostToWebviewMessage } from "../../shared/protocol";

const initial: GameSnapshot = { score: 0, clicksPerSecond: 1 };

export function useSnapshot(): GameSnapshot {
  const [snapshot, setSnapshot] = useState<GameSnapshot>(initial);

  useEffect(() => {
    const listener = (event: MessageEvent<HostToWebviewMessage>) => {
      if (event.data.type === "update") {
        setSnapshot(event.data.snapshot);
      }
    };
    window.addEventListener("message", listener);
    return () => window.removeEventListener("message", listener);
  }, []);

  return snapshot;
}
