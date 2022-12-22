import { computeSizeOfFolders } from './advent.007';

describe('Advent 07', () => {
  describe('computeSizeOfFolders', () => {
    describe('On a empty file', () => {
      it('should return 0,0', async () => {
        await expect(
          computeSizeOfFolders({
            inputFilePath: `${__dirname}/test-data/empty.txt`,
            options: {
              maxFolderSize: 100000,
              spaceToFind: 30000000,
              totalSpace: 0,
            },
          })
        ).resolves.toEqual([0, 0]);
      });
    });

    describe('On a small file', () => {
      it('should return positive values', async () => {
        await expect(
          computeSizeOfFolders({
            inputFilePath: `${__dirname}/test-data/advent.007/small-commands.txt`,
            options: {
              maxFolderSize: 100000,
              spaceToFind: 30000000,
              totalSpace: 70000000,
            },
          })
        ).resolves.toEqual([95437, 24933642]);
      });
    });

    describe('On a large file', () => {
      it('should return positive values', async () => {
        await expect(
          computeSizeOfFolders({
            inputFilePath: `${__dirname}/test-data/advent.007/large-commands.txt`,
            options: {
              maxFolderSize: 100000,
              spaceToFind: 30000000,
              totalSpace: 70000000,
            },
          })
        ).resolves.toMatchInlineSnapshot(`
          [
            1642503,
            6999588,
          ]
        `);
      });
    });
  });
});
