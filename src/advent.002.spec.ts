import { computeTotalPointsWhenRightValueIsExpectedResult, computeTotalPointsWhenRightValueIsPlay } from './advent.002';

describe('Advent 02', () => {
  describe('computeTotalPointsWhenRightValueIsPlay', () => {
    describe('On an empty file', () => {
      it('should return 0', async () => {
        await expect(
          computeTotalPointsWhenRightValueIsPlay({
            inputFilePath: `${__dirname}/test-data/empty.txt`,
          })
        ).resolves.toBe(0);
      });
    });

    describe('On a single fight', () => {
      it('should return the score', async () => {
        await expect(
          computeTotalPointsWhenRightValueIsPlay({
            inputFilePath: `${__dirname}/test-data/advent.002/one-battle.txt`,
          })
        ).resolves.toBe(15);
      });
    });

    describe('On many fights', () => {
      it('should return the score', async () => {
        await expect(
          computeTotalPointsWhenRightValueIsPlay({
            inputFilePath: `${__dirname}/test-data/advent.002/many-battles.txt`,
          })
        ).resolves.toMatchInlineSnapshot(`13005`);
      });
    });
  });

  describe('computeTotalPointsWhenRightValueIsExpectedResult', () => {
    describe('On an empty file', () => {
      it('should return 0', async () => {
        await expect(
          computeTotalPointsWhenRightValueIsExpectedResult({
            inputFilePath: `${__dirname}/test-data/empty.txt`,
          })
        ).resolves.toBe(0);
      });
    });

    describe('On a single fight', () => {
      it('should return the score', async () => {
        await expect(
          computeTotalPointsWhenRightValueIsExpectedResult({
            inputFilePath: `${__dirname}/test-data/advent.002/one-battle.txt`,
          })
        ).resolves.toBe(12);
      });
    });

    describe('On many fights', () => {
      it('should return the score', async () => {
        await expect(
          computeTotalPointsWhenRightValueIsExpectedResult({
            inputFilePath: `${__dirname}/test-data/advent.002/many-battles.txt`,
          })
        ).resolves.toMatchInlineSnapshot(`11373`);
      });
    });
  });
});
