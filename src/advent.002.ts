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

enum EXPECTED_RESULT {
  LOSS = 'X',
  DRAW = 'Y',
  WIN = 'Z',
}

enum PLAY_RESULT {
  LOSS = 0,
  DRAW = 3,
  WIN = 6,
}

const getExpectedPlay = (
  otherPlay: THEIR_PLAYS,
  expectedResult: EXPECTED_RESULT
): MY_PLAYS => {
  switch (expectedResult) {
    case EXPECTED_RESULT.DRAW: {
      return MY_PLAYS[
        Object.keys(MY_PLAYS).at(
          Object.values(THEIR_PLAYS).indexOf(otherPlay)
        ) as string
      ];
    }
    case EXPECTED_RESULT.LOSS: {
      switch (otherPlay) {
        case THEIR_PLAYS.PAPER:
          return MY_PLAYS.ROCK;
        case THEIR_PLAYS.ROCK:
          return MY_PLAYS.SCISSORS;
        case THEIR_PLAYS.SCISSORS:
          return MY_PLAYS.PAPER;
      }
    }
    case EXPECTED_RESULT.WIN: {
      switch (otherPlay) {
        case THEIR_PLAYS.PAPER:
          return MY_PLAYS.SCISSORS;
        case THEIR_PLAYS.ROCK:
          return MY_PLAYS.PAPER;
        case THEIR_PLAYS.SCISSORS:
          return MY_PLAYS.ROCK;
      }
    }
  }
};

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

export const computeTotalPointsWhenRightValueIsPlay = async ({
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

export const computeTotalPointsWhenRightValueIsExpectedResult = async ({
  inputFilePath,
}: {
  inputFilePath: string;
}): Promise<number | undefined> => {
  const file = await open(inputFilePath);
  let roundScore = 0;

  for await (const line of file.readLines()) {
    const [theirPlay, expectedResult] = line.split(' ') as [
      THEIR_PLAYS,
      EXPECTED_RESULT
    ];
    const myPlay = getExpectedPlay(theirPlay, expectedResult);

    roundScore += getPlayResult(myPlay, theirPlay);
    roundScore += getPlayScore(myPlay);
  }

  return roundScore;
};
