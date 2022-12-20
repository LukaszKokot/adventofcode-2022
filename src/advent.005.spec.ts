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

    describe('On a file with all crates', () => {
      it('should return the expected top crates', async () => {
        await expect(
          computeFinalCratesState({
            inputFilePath: `${__dirname}/test-data/advent.005/all.moves.txt`,
          })
        ).resolves.toMatchInlineSnapshot(`"HBTMTBSDC"`);
      });
    });
  });

  describe('computeFinalCratesStateWithAllAtOnceMover', () => {
    describe('On a file with no crates', () => {
      it('should return an empty string', async () => {
        await expect(
          computeFinalCratesState({
            inputFilePath: `${__dirname}/test-data/empty.txt`,
            options: {
              moveCratesOneByOne: false,
            },
          })
        ).resolves.toMatchInlineSnapshot(`""`);
      });
    });

    describe('On a file with many crates', () => {
      it('should return the expected top crates', async () => {
        await expect(
          computeFinalCratesState({
            inputFilePath: `${__dirname}/test-data/advent.005/many.moves.txt`,
            options: {
              moveCratesOneByOne: false,
            },
          })
        ).resolves.toMatchInlineSnapshot(`"MCD"`);
      });
    });

    describe('On a file with all crates', () => {
      it('should return the expected top crates', async () => {
        await expect(
          computeFinalCratesState({
            inputFilePath: `${__dirname}/test-data/advent.005/all.moves.txt`,
            options: {
              moveCratesOneByOne: false,
            },
          })
        ).resolves.toMatchInlineSnapshot(`"PQTJRSHWS"`);
      });
    });
  });
});
