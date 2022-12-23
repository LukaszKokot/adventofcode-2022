import { open } from 'node:fs/promises';

const getLineFromVerticalLineOfForest = (
  index: number,
  forest: number[][]
): number[] => {
  return forest.map(f => f[index]);
};

const isVisibleTreeOnLine = (
  treePosition: number,
  lineOfTrees: number[]
): boolean => {
  let foundBiggerOrEqual = false;

  for (let tree = treePosition - 1; tree >= 0 && !foundBiggerOrEqual; tree--) {
    foundBiggerOrEqual = lineOfTrees[treePosition] <= lineOfTrees[tree];
  }

  if (!foundBiggerOrEqual) {
    return true;
  }

  for (let tree = treePosition + 1; tree < lineOfTrees.length; tree++) {
    if (lineOfTrees[treePosition] <= lineOfTrees[tree]) {
      return false;
    }
  }

  return true;
};

const countVisibleTrees = (forest: number[][]): number => {
  let count = 0;

  outer: for (let x = 0; x < forest.length; x++) {
    if (x === 0 || x === forest.length - 1) {
      // always count the first and last line of the forest
      count += forest[0].length;
      continue outer;
    }

    inner: for (let y = 0; y < forest[x].length; y++) {
      // always count the first and last tree of the line
      if (y === 0 || y === forest[x].length - 1) {
        count++;
        continue inner;
      }

      if (
        isVisibleTreeOnLine(y, forest[x]) ||
        isVisibleTreeOnLine(x, getLineFromVerticalLineOfForest(y, forest))
      ) {
        count++;
        continue inner;
      }
    }
  }

  return count;
};

export const getVisibleTrees = async ({
  inputFilePath,
}: {
  inputFilePath: string;
}): Promise<number> => {
  const file = await open(inputFilePath);
  let line: string;
  let trees: number[][] = [];

  for await (line of file.readLines()) {
    trees.push([...line].map(c => +c));
  }

  return countVisibleTrees(trees);
};
