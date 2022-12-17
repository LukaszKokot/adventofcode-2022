import { open } from 'node:fs/promises';

export const computeMostCaloriesCarriedByElves = async ({
  inputFilePath,
  numberOfElvesToCount = 1,
}: {
  inputFilePath: string;
  numberOfElvesToCount?: number;
}): Promise<number | undefined> => {
  const file = await open(inputFilePath);
  let topNMaxCalories = new Array<number>();
  let calories = 0;

  for await (const line of file.readLines()) {
    const lineCalories = parseInt(line);

    if (!isNaN(lineCalories)) {
      calories += lineCalories;
    } else {
      addOnlyIfGreaterThanOne(calories, numberOfElvesToCount, topNMaxCalories);
      calories = 0;
    }
  }

  addOnlyIfGreaterThanOne(calories, numberOfElvesToCount, topNMaxCalories);

  return topNMaxCalories.reduce((sum: number, currentValue: number) => {
    return sum + currentValue;
  }, 0);
};

const addOnlyIfGreaterThanOne = (
  value: number,
  maxValues: number,
  values: Array<number>
): void => {
  if (values.length < maxValues || values.some(v => v < value)) {
    values.push(value);
    values.sort((a: number, b: number) => b - a);

    if (values.length > maxValues) {
      values.pop();
    }
  }
};
