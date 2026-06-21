function createComputer() {
  return {
    position: {},
    status: "broken" as ComputerStatus,
  };
}

export class Computer {
  constructor(
    readonly col: number,
    readonly row: number,
    readonly status: ComputerStatus = "broken",
  ) {}

  get isBroken(): boolean {
    return this.status === "broken";
  }

  fixed(): Computer {
    return new Computer(this.col, this.row, "fixed");
  }
}
