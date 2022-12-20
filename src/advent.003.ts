import { open } from 'node:fs/promises';

const findAllMatchingCharacterInAllStrings = (
  strings: string[]
): RegExpMatchArray | null => {
  let currentMatches: RegExpMatchArray[] | null;
  let allMatches: string | null = null;

  strings.forEach(s => {
    if (allMatches === null) {
      allMatches = s;
      return;
    }

    currentMatches = [...s.matchAll(new RegExp(`([${allMatches}])`, 'g'))];
    allMatches = currentMatches.map(m => m[0]).join('');
  });

  return allMatches;
};

const findAllMatchingCharacterOnBothSidesOfString = (
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
    matches = findAllMatchingCharacterOnBothSidesOfString(line);
    if (matches?.length) {
      priorities += getPriorityOfCharacter(matches[0]);
    }
  }
  return priorities;
};

export const computeSumOfGroupPriorities = async ({
  inputFilePath,
  groupLength = 3,
}: {
  inputFilePath: string;
  groupLength?: number;
}): Promise<number | undefined> => {
  const file = await open(inputFilePath);
  let matches: RegExpMatchArray | null;
  let line: string;
  let lines: string[] = [];
  let priorities = 0;

  for await (line of file.readLines()) {
    if (lines.length < groupLength) {
      lines.push(line);
    }

    if (lines.length === groupLength) {
      matches = findAllMatchingCharacterInAllStrings(lines);
      if (matches?.length) {
        priorities += getPriorityOfCharacter(matches[0]);
      }
      lines = [];
    }
  }

  return priorities;
};
