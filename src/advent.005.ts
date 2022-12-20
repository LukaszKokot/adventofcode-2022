import { open } from 'node:fs/promises';

type Crate = string;
type Pile = string[];

class State {
  private readonly piles: Array<Pile>;

  constructor(piles: number) {
    this.piles = new Array(piles);
  }

  public addCrate(crate: Crate, index: number): void {
    if (!this.piles[index]?.length) {
      this.piles[index] = [];
    }
    this.piles[index].unshift(crate);
  }

  public moveCrates({
    count,
    from,
    to,
  }: {
    count: number;
    from: number;
    to: number;
  }): void {
    const crates = this.piles[from].splice(-count, count);
    this.piles[to].push(...crates.reverse());
  }

  public toString(): string {
    return this.piles.map(p => p?.[p.length - 1] || ' ').join('');
  }
}

enum LineType {
  CRATES,
  CRATE_NUMBERS,
  IGNORE,
  MOVE,
}

class StateParser {
  private state: State | undefined = undefined;

  public getState(): State | undefined {
    return this.state;
  }

  public readLine(line: string): void {
    const lineType = this.getLineType(line);
    switch (lineType) {
      case LineType.CRATES: {
        this.readCrates(line);
        return;
      }
      case LineType.MOVE: {
        this.moveCrates(line);
      }
    }
  }

  private readCrates(line: string): void {
    if (!this.state) {
      this.initializeState(line);
    }

    this.pileCrates(line);
  }

  private pileCrates(line: string): void {
    const piles = line.match(/(   |\[[A-Z]\])[ ]{0,1}/g);
    piles?.forEach((p: string, index: number) => {
      if (p.trim()) {
        this.state?.addCrate(p[1], index);
      }
    });
  }

  private moveCrates(line: string): void {
    const info = line
      .match(/move ([0-9]+) from ([0-9]+) to ([0-9]+)/)
      ?.map(s => s);
    const [_, numberOfCrates, from, to] = info || [];
    this.state?.moveCrates({
      count: +numberOfCrates,
      from: +from - 1,
      to: +to - 1,
    });
  }

  private initializeState(line: string): void {
    const cratesCount = Math.floor(line.length / 3);
    this.state = new State(cratesCount);
  }

  private getLineType(line: string): LineType {
    if (line.includes('[') || line.includes(']')) {
      return LineType.CRATES;
    } else if (line.includes('move')) {
      return LineType.MOVE;
    } else if (line.includes('1')) {
      return LineType.CRATE_NUMBERS;
    }

    return LineType.IGNORE;
  }
}

export const computeFinalCratesState = async ({
  inputFilePath,
}: {
  inputFilePath: string;
}): Promise<string> => {
  const file = await open(inputFilePath);
  const parser = new StateParser();
  let line: string;

  for await (line of file.readLines()) {
    parser.readLine(line);
  }

  const state = parser.getState();
  return state?.toString() || '';
};
