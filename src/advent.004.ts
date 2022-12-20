import { open } from 'node:fs/promises';

const hasFullyContainingSet = (set1: string, set2: string): boolean => {
  const [low1, high1] = set1.split('-').map(s => BigInt(s));
  const [low2, high2] = set2.split('-').map(s => BigInt(s));

  return (low1 >= low2 && high1 <= high2) || (low2 >= low1 && high2 <= high1);
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
    if (hasFullyContainingSet(set1, set2)) {
      sets++;
    }
  }

  return sets;
};
