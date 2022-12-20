import { computeFinalCratesState } from './advent.005';

describe('Advent 05', () => {
  describe('computeFinalCratesState', () => {
    describe('On a file with no crates', () => {
      it('should return an empty string', async () => {
        await expect(
          computeFinalCratesState({
            inputFilePath: `${__dirname}/test-data/empty.txt`,
          })
        ).resolves.toMatchInlineSnapshot(`""`);
      });
    });

    describe('On a file with many crates', () => {
      it('should return the expected top crates', async () => {
        await expect(
          computeFinalCratesState({
            inputFilePath: `${__dirname}/test-data/advent.005/many.moves.txt`,
          })
        ).resolves.toMatchInlineSnapshot(`"CMZ"`);
      });
    });

    describe.only('On a file with all crates', () => {
      it('should return the expected top crates', async () => {
        await expect(
          computeFinalCratesState({
            inputFilePath: `${__dirname}/test-data/advent.005/all.moves.txt`,
          })
        ).resolves.toMatchInlineSnapshot(`"HBTMTBSDC"`);
      });
    });
  });
});
