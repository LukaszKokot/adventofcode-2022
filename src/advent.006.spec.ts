import { findStartOfPacketInStream } from './advent.006';

describe('Advent 06', () => {
  describe('findStartIndexOfStream', () => {
    describe('On a empty file', () => {
      it('should return a negative index', async () => {
        await expect(
          findStartOfPacketInStream({
            inputFilePath: `${__dirname}/test-data/empty.txt`,
          })
        ).resolves.toBe(-1);
      });
    });

    describe('On a small file', () => {
      it('should return a positive index', async () => {
        await expect(
          findStartOfPacketInStream({
            inputFilePath: `${__dirname}/test-data/advent.006/stream-small-start-of-packet.txt`,
          })
        ).resolves.toBe(5);
      });
    });

    describe('On a long file', () => {
      it('should return a positive index', async () => {
        await expect(
          findStartOfPacketInStream({
            inputFilePath: `${__dirname}/test-data/advent.006/stream-long-start-of-packet.txt`,
          })
        ).resolves.toMatchInlineSnapshot(`1625`);
      });
    });
  });
});
