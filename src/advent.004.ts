import { open } from 'node:fs/promises';

type RangeSets = [bigint, bigint][];

const getRangeSets = (set1: string, set2: string): RangeSets => {
  const [low1, high1] = set1.split('-').map(s => BigInt(s));
  const [low2, high2] = set2.split('-').map(s => BigInt(s));
  return [
    [low1, high1],
    [low2, high2],
  ];
};

const hasFullyContainingSet = (rangeSets: RangeSets): boolean => {
  const [low1, high1] = rangeSets[0];
  const [low2, high2] = rangeSets[1];

  return (low1 >= low2 && high1 <= high2) || (low2 >= low1 && high2 <= high1);
};

const hasOverlappingSet = (rangeSets: RangeSets): boolean => {
  const [low1, high1] = rangeSets[0];
  const [low2, high2] = rangeSets[1];

  return (low1 >= low2 && low1 <= high2) || (high1 >= low2 && high1 <= high2);
};

export const countFullyContainingSets = async ({
  inputFilePath,
}: {
  inputFilePath: string;
}): Promise<number | undefined> => {
  const file = await open(inputFilePath);
  let line: string;
  let sets = 0;

  for await (line of file.readLines()) {
    const [set1, set2] = line.split(',');
    const rangeSets = getRangeSets(set1, set2);
    if (hasFullyContainingSet(rangeSets)) {
      sets++;
    }
  }

  return sets;
};

export const countOverlappingSets = async ({
  inputFilePath,
}: {
  inputFilePath: string;
}): Promise<number | undefined> => {
  const file = await open(inputFilePath);
  let line: string;
  let sets = 0;

  for await (line of file.readLines()) {
    const [set1, set2] = line.split(',');
    const rangeSets = getRangeSets(set1, set2);
    if (hasFullyContainingSet(rangeSets) || hasOverlappingSet(rangeSets)) {
      sets++;
    }
  }

  return sets;
};
