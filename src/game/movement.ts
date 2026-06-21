export function pathBetween(from: Position, to: Position): Position[] {
  const steps: Position[] = [];
  let { col, row } = from;

  while (col !== to.col) {
    col += col < to.col ? 1 : -1;
    steps.push({ col, row });
  }
  while (row !== to.row) {
    row += row < to.row ? 1 : -1;
    steps.push({ col, row });
  }
  return steps;
}
