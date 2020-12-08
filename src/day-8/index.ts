import fs from "fs";

/**
 * Simple file reader for getting input
 *
 * @param filePath path to file, "./input.txt"
 */
export const readInputFile = (filePath: string): string | undefined => {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    return data;
  } catch (error) {
    console.error(error);
  }
};

/**
 * Solution for Part 1
 */
function getAccValue(): number | undefined {
  const input = readInputFile("./input.txt");
  const commands = input?.split("\n");

  if (!commands?.length) {
    return;
  }

  let acc: number = 0;
  let index: number = 0;
  let commandsReceived: Record<string, string> = {};

  while (
    !commandsReceived.hasOwnProperty(index) ||
    (commandsReceived.hasOwnProperty(index) &&
      commandsReceived[index] !== commands[index])
  ) {
    const command = commands[index];
    const [inst, steps] = command.split(" "); // nop, acc, jmp
    const direction = steps.substring(0, 1); // + or -
    const value = Number(steps.substring(1, steps.length)); // 0, 1, 4, 99, etc.
    switch (inst) {
      case "nop":
        commandsReceived[index] = command;
        index += 1;
        break;
      case "acc":
        commandsReceived[index] = command;
        index += 1;
        acc = direction === "+" ? acc + value : acc - value;
        break;
      case "jmp":
        commandsReceived[index] = command;
        index = direction === "+" ? index + value : index - value;
        break;
    }
  }
  return acc;
}

/**
 * Correct answer is 1475
 */
const accumulator = getAccValue();
console.log("accumulator", accumulator);
