import { open } from 'node:fs/promises';

const hasDuplicatesInString = (chunk: string): boolean => {
  for (var i = 0; i < chunk.length; i++) {
    const lastIdx = chunk.lastIndexOf(chunk.charAt(i));
    for (var j = 0; j < chunk.length; j++) {
      if (chunk[i] === chunk[j] && i != j) {
        return true;
      }
    }
  }

  return false;
};

const findStartOfDistinctiveCharactersInStream = async ({
  inputFilePath,
  countOfDistinctiveCharacters,
}: {
  inputFilePath: string;
  countOfDistinctiveCharacters: number;
}): Promise<number> => {
  const file = await open(inputFilePath);
  let index = -1;

  return new Promise(resolve => {
    const readable = file.createReadStream();

    readable.on('readable', () => {
      let currentStream = '';
      let chunk: string;

      while (null !== (chunk = readable.read(1))) {
        index++;
        currentStream += chunk.toString();

        if (currentStream.length === countOfDistinctiveCharacters) {
          if (!hasDuplicatesInString(currentStream)) {
            readable.close();
            return resolve(index + 1);
          }

          currentStream = currentStream.substring(1);
        }
      }
    });

    readable.on('end', () => {
      return resolve(-1);
    });
  });
};

export const findStartOfPacketInStream = async ({
  inputFilePath,
}: {
  inputFilePath: string;
}): Promise<number> => {
  return findStartOfDistinctiveCharactersInStream({
    inputFilePath,
    countOfDistinctiveCharacters: 4,
  });
};

export const findStartOfMessageInStream = async ({
  inputFilePath,
}: {
  inputFilePath: string;
}): Promise<number> => {
  return findStartOfDistinctiveCharactersInStream({
    inputFilePath,
    countOfDistinctiveCharacters: 14,
  });
};
