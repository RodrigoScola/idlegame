export function createPosition(x: number = 0, y: number = 0): Position {
  return {
    col: x || 0,
    row: y || 0,
  };
}
