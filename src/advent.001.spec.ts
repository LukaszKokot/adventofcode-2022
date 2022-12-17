import { computeMostCaloriesCarriedByElves } from './advent.001';

describe('Advent 01', () => {
  describe('On an empty file', () => {
    it('should return 0', async () => {
      await expect(
        computeMostCaloriesCarriedByElves({
          inputFilePath: `${__dirname}/test-data/empty.txt`,
        })
      ).resolves.toBe(0);
    });
  });

  describe('On a file with a single elf', () => {
    it('should return its calories', async () => {
      await expect(
        computeMostCaloriesCarriedByElves({
          inputFilePath: `${__dirname}/test-data/advent.001/one-elf.txt`,
        })
      ).resolves.toBe(10000);
    });
  });

  describe('On a file with multiple elves', () => {
    it('should return the most calories', async () => {
      await expect(
        computeMostCaloriesCarriedByElves({
          inputFilePath: `${__dirname}/test-data/advent.001/many-elves.txt`,
        })
      ).resolves.toBe(24000);
    });
  });

  describe('On a file with all elves', () => {
    describe('with only one top elf', () => {
      it('should return the most calories', async () => {
        await expect(
          computeMostCaloriesCarriedByElves({
            inputFilePath: `${__dirname}/test-data/advent.001/all-elves.txt`,
          })
        ).resolves.toMatchInlineSnapshot(`70509`);
      });
    });

    describe('with multiple top elves', () => {
      it('should return the sum of most calories', async () => {
        await expect(
          computeMostCaloriesCarriedByElves({
            inputFilePath: `${__dirname}/test-data/advent.001/all-elves.txt`,
            numberOfElvesToCount: 3,
          })
        ).resolves.toMatchInlineSnapshot(`208567`);
      });
    });
  });
});
