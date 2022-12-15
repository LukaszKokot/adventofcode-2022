import { open } from 'node:fs/promises';

export const computeMostCaloriesCarriedByElf = async (
  inputFilePath: string
): Promise<number | undefined> => {
  const file = await open(inputFilePath);
  let calories = 0;
  let maxCalories = 0;

  for await (const line of file.readLines()) {
    const lineCalories = parseInt(line);

    if (!isNaN(lineCalories)) {
      calories += lineCalories;
    } else {
      if (maxCalories <= calories) {
        maxCalories = calories;
      }
      calories = 0;
    }
  }

  if (calories > maxCalories) {
    maxCalories = calories;
  }

  return maxCalories;
};
