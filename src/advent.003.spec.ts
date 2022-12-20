import { computeSumOfPriorities } from './advent.003';

describe('Advent 02', () => {
  describe('computeSumOfPriorities', () => {
    describe('On an empty file', () => {
      it('should return 0', async () => {
        await expect(
          computeSumOfPriorities({
            inputFilePath: `${__dirname}/test-data/empty.txt`,
          })
        ).resolves.toBe(0);
      });
    });

    describe('On a file with one rucksack', () => {
      it('should return one priority', async () => {
        await expect(
          computeSumOfPriorities({
            inputFilePath: `${__dirname}/test-data/advent.003/one-rucksack.txt`,
          })
        ).resolves.toBe(16);
      });
    });

    describe('On a file with many rucksacks', () => {
      it('should return the sum of priorities', async () => {
        await expect(
          computeSumOfPriorities({
            inputFilePath: `${__dirname}/test-data/advent.003/many-rucksacks.txt`,
          })
        ).resolves.toBe(157);
      });
    });

    describe('On a file with all rucksacks', () => {
      it('should return the sum of priorities', async () => {
        await expect(
          computeSumOfPriorities({
            inputFilePath: `${__dirname}/test-data/advent.003/all-rucksacks.txt`,
          })
        ).resolves.toMatchInlineSnapshot(`8401`);
      });
    });
  });
});
