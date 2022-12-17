import { open } from 'node:fs/promises';

enum THEIR_PLAYS {
  ROCK = 'A',
  PAPER = 'B',
  SCISSORS = 'C',
}

enum MY_PLAYS {
  ROCK = 'X',
  PAPER = 'Y',
  SCISSORS = 'Z',
}

enum PLAY_RESULT {
  LOSS = 0,
  DRAW = 3,
  WIN = 6,
}

const getPlayResult = (
  myPlay: MY_PLAYS,
  otherPlay: THEIR_PLAYS
): PLAY_RESULT => {
  if (
    Object.values(MY_PLAYS).indexOf(myPlay) ===
    Object.values(THEIR_PLAYS).indexOf(otherPlay)
  ) {
    return PLAY_RESULT.DRAW;
  }

  if (myPlay === MY_PLAYS.ROCK && otherPlay === THEIR_PLAYS.SCISSORS) {
    return PLAY_RESULT.WIN;
  }

  if (myPlay === MY_PLAYS.PAPER && otherPlay === THEIR_PLAYS.ROCK) {
    return PLAY_RESULT.WIN;
  }

  if (myPlay === MY_PLAYS.SCISSORS && otherPlay === THEIR_PLAYS.PAPER) {
    return PLAY_RESULT.WIN;
  }

  return PLAY_RESULT.LOSS;
};

const getPlayScore = (myPlay: MY_PLAYS): number => {
  switch (myPlay) {
    case MY_PLAYS.ROCK:
      return 1;
    case MY_PLAYS.PAPER:
      return 2;
    case MY_PLAYS.SCISSORS:
      return 3;
  }
};

export const computeTotalPoints = async ({
  inputFilePath,
}: {
  inputFilePath: string;
}): Promise<number | undefined> => {
  const file = await open(inputFilePath);
  let roundScore = 0;

  for await (const line of file.readLines()) {
    const [theirPlay, myPlay] = line.split(' ') as [THEIR_PLAYS, MY_PLAYS];
    roundScore += getPlayResult(myPlay, theirPlay);
    roundScore += getPlayScore(myPlay);
  }

  return roundScore;
};
