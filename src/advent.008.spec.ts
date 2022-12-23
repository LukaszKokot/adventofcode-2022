import { getTreeWithHighestScenicScore, getVisibleTrees } from './advent.008';

describe('Advent 08', () => {
  describe('computeSizeOfFolders', () => {
    describe('On a empty file', () => {
      it('should return 0', async () => {
        await expect(
          getVisibleTrees({
            inputFilePath: `${__dirname}/test-data/empty.txt`,
          })
        ).resolves.toEqual(0);
      });
    });

    describe('On a small forest', () => {
      it('should return a positive value', async () => {
        await expect(
          getVisibleTrees({
            inputFilePath: `${__dirname}/test-data/advent.008/small-forest.txt`,
          })
        ).resolves.toEqual(21);
      });
    });

    describe('On a large forest', () => {
      it('should return a positive value', async () => {
        await expect(
          getVisibleTrees({
            inputFilePath: `${__dirname}/test-data/advent.008/large-forest.txt`,
          })
        ).resolves.toMatchInlineSnapshot(`1854`);
      });
    });
  });

  describe('computeSizeOfFolders', () => {
    describe('On a empty file', () => {
      it('should return 0', async () => {
        await expect(
          getTreeWithHighestScenicScore({
            inputFilePath: `${__dirname}/test-data/empty.txt`,
          })
        ).resolves.toEqual(0);
      });
    });

    describe('On a small forest', () => {
      it('should return a positive value', async () => {
        await expect(
          getTreeWithHighestScenicScore({
            inputFilePath: `${__dirname}/test-data/advent.008/small-forest.txt`,
          })
        ).resolves.toEqual(8);
      });
    });

    describe('On a large forest', () => {
      it('should return a positive value', async () => {
        await expect(
          getTreeWithHighestScenicScore({
            inputFilePath: `${__dirname}/test-data/advent.008/large-forest.txt`,
          })
        ).resolves.toMatchInlineSnapshot(`527340`);
      });
    });
  });
});
