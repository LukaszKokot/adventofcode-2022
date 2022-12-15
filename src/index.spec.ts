import { computeMostCaloriesCarriedByElf } from '.';

describe('Advent 01', () => {
  describe('On an empty file', () => {
    it('should return 0', async () => {
      await expect(
        computeMostCaloriesCarriedByElf(`${__dirname}/test-data/empty.txt`)
      ).resolves.toBe(0);
    });
  });

  describe('On a file with a single elf', () => {
    it('should return its calories', async () => {
      await expect(
        computeMostCaloriesCarriedByElf(`${__dirname}/test-data/one-elf.txt`)
      ).resolves.toBe(10000);
    });
  });

  describe('On a file with multiple elves', () => {
    it('should return the most calories', async () => {
      await expect(
        computeMostCaloriesCarriedByElf(`${__dirname}/test-data/many-elves.txt`)
      ).resolves.toBe(24000);
    });
  });

  describe('On a file with all elves', () => {
    it('should return the most calories', async () => {
      await expect(
        computeMostCaloriesCarriedByElf(`${__dirname}/test-data/all-elves.txt`)
      ).resolves.toMatchInlineSnapshot(`70509`);
    });
  });
});
