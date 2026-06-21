import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { useSnapshot } from "./hooks/useSnapshot";
import { breakComputer, createComputer, isBroken } from "../game/Computer";
import { pathBetween } from '../game/movement';

const GRID_SIZE = 6;
const TILE_SIZE = 40;
const GAP = 4;
const STEP = TILE_SIZE + GAP;
const STEP_MS = 220;
const REPAIR_MS = 400;

const HOME: Position = { col: GRID_SIZE - 1, row: GRID_SIZE - 1 };

// One tile at a time, column first then row, never diagonal.

export function TileBoard(): React.JSX.Element {
  const snapshot = useSnapshot();

  const [computer] = useState(() => {
    const comp = snapshot.computers[0] || createComputer();
    return isBroken(comp) ? comp : breakComputer(comp);
  });

  const [characterPos, setCharacterPos] = useState<Position>(HOME);
  const [busy, setBusy] = useState(false);
  const timeouts = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    return () => {
      timeouts.current.forEach(clearTimeout);
    };
  }, []);

  function schedule(fn: () => void, delay: number): void {
    timeouts.current.push(setTimeout(fn, delay));
  }

  function walk(steps: Position[], onArrive: () => void): void {
    if (steps.length === 0) {
      onArrive();
      return;
    }
    const [next, ...rest] = steps;
    setCharacterPos(next);
    schedule(() => walk(rest, onArrive), STEP_MS);
  }

  function handleComputerClick(): void {
    if (busy || !isBroken(computer)) {
      return;
    }
    setBusy(true);

    const toComputer = pathBetween(characterPos, {
      col: computer.position.col,
      row: computer.position.row,
    });

    walk(toComputer, () => {
      //todo: make this function
      computer.status = "fixed";

      schedule(() => {
        const toHome = pathBetween(computer.position, HOME);
        walk(toHome, () => setBusy(false));
      }, REPAIR_MS);
    });
  }

  const boardSize = GRID_SIZE * STEP - GAP;

  return (
    <div>
      <style>{`
        @keyframes computer-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.35; }
        }
      `}</style>
      <div
        style={{
          position: "relative",
          width: boardSize,
          height: boardSize,
          background: "var(--vscode-editorWidget-background)",
        }}
      >
        {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: (i % GRID_SIZE) * STEP,
              top: Math.floor(i / GRID_SIZE) * STEP,
              width: TILE_SIZE,
              height: TILE_SIZE,
              border: "1px solid var(--vscode-panel-border)",
            }}
          />
        ))}

        <div
          onClick={handleComputerClick}
          style={{
            position: "absolute",
            left: computer.position.col * STEP,
            top: computer.position.row * STEP,
            width: TILE_SIZE,
            height: TILE_SIZE,
            background: isBroken(computer)
              ? "var(--vscode-errorForeground)"
              : "var(--vscode-terminal-ansiGreen)",
            animation: isBroken(computer)
              ? "computer-blink 1s infinite"
              : "none",
            cursor: isBroken(computer) && !busy ? "pointer" : "default",
          }}
        />

        <div
          style={{
            position: "absolute",
            left: characterPos.col * STEP,
            top: characterPos.row * STEP,
            width: TILE_SIZE,
            height: TILE_SIZE,
            borderRadius: "50%",
            background: "var(--vscode-charts-blue)",
            transition: `left ${STEP_MS}ms linear, top ${STEP_MS}ms linear`,
          }}
        />
      </div>
    </div>
  );
}
