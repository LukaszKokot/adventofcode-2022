import { open } from 'node:fs/promises';

const findFirstMatchingCharacterOnBothSidesOfString = (
  s: string
): RegExpMatchArray | null => {
  const l = s.substring(0, s.length / 2);
  const r = s.substring(s.length / 2);
  return r.match(`([${l}])`);
};

const getPriorityOfCharacter = (s: string): number => {
  const charCode = s.charCodeAt(0);
  if (charCode >= 'a'.charCodeAt(0)) {
    return charCode - 'a'.charCodeAt(0) + 1;
  }

  return charCode - 'A'.charCodeAt(0) + 27;
};

export const computeSumOfPriorities = async ({
  inputFilePath,
}: {
  inputFilePath: string;
}): Promise<number | undefined> => {
  const file = await open(inputFilePath);
  let matches: RegExpMatchArray | null;
  let line: string;
  let priorities = 0;

  for await (line of file.readLines()) {
    matches = findFirstMatchingCharacterOnBothSidesOfString(line);
    if (matches?.length) {
      priorities += getPriorityOfCharacter(matches[0]);
    }
  }
  return priorities;
};
