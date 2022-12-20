import { countFullyContainingSets } from './advent.004';

describe('Advent 04', () => {
  describe('countFullyContainingSets', () => {
    describe('On an empty file', () => {
      it('should return 0', async () => {
        await expect(
          countFullyContainingSets({
            inputFilePath: `${__dirname}/test-data/empty.txt`,
          })
        ).resolves.toBe(0);
      });
    });

    describe('On a file with no fully containing sets', () => {
      it('should return 0', async () => {
        await expect(
          countFullyContainingSets({
            inputFilePath: `${__dirname}/test-data/advent.004/one-not-overlapping-section.txt`,
          })
        ).resolves.toBe(0);
      });
    });

    describe('On a file with a fully containing set', () => {
      it('should return 1', async () => {
        await expect(
          countFullyContainingSets({
            inputFilePath: `${__dirname}/test-data/advent.004/one-fully-containing-section.txt`,
          })
        ).resolves.toBe(1);
      });
    });

    describe('On a file with many sections', () => {
      it('should return a positive value', async () => {
        await expect(
          countFullyContainingSets({
            inputFilePath: `${__dirname}/test-data/advent.004/many-sections.txt`,
          })
        ).resolves.toBe(2);
      });
    });

    describe('On a file with all sections', () => {
      it('should return a positive value', async () => {
        await expect(
          countFullyContainingSets({
            inputFilePath: `${__dirname}/test-data/advent.004/all-sections.txt`,
          })
        ).resolves.toMatchInlineSnapshot(`424`);
      });
    });
  });
});
