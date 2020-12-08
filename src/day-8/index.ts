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

export interface ProgramResults {
  acc: number;
  terminated: boolean;
}

/**
 * Test a set of commands to determine if the program terminates correctly
 * or enters an infinite loop state, as well as incrementing/decrementing
 * the accumulator value.
 *
 * @param commands
 */
function testProgramExec(commands: string[]): ProgramResults {
  let acc: number = 0;
  let index: number = 0;
  let commandsReceived: Record<string, string> = {};
  let terminated = false;

  while (
    (commands[index] && !commandsReceived.hasOwnProperty(index)) ||
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

  return {
    acc,
    terminated: index === commands.length || terminated,
  };
}

/**
 * Solution for Part 1
 */
function getAccumulatorValue() {
  const input = readInputFile("./input.txt");
  const commands = input?.split("\n");
  if (commands) {
    const results = testProgramExec(commands);
    return results.acc;
  }
}

/**
 * Correct answer is 1475
 *
 * Executes in ~0.5-0.6ms
 */
console.time("getAccumulatorValue");
const acc = getAccumulatorValue();
console.timeEnd("getAccumulatorValue");
console.log("acc", acc);

/**
 * Solution for Part 2
 *
 * Iterate over a set of commands, swapping out jmp/nop commands
 * and testing the execution of each new set of commands until
 * a result yields a successful termination.
 */
function fixProgramInput() {
  const input = readInputFile("./input.txt");
  const commands = input?.split("\n");

  if (!commands?.length) {
    return;
  }

  for (let i = 0; i < commands.length; i++) {
    const command = commands[i];
    const [inst] = command.split(" ");
    let tempCommands = [...commands];
    let results: ProgramResults = { acc: 0, terminated: false };

    if (inst === "jmp") {
      tempCommands[i] = command.replace("jmp", "nop");
      results = testProgramExec(tempCommands);
    } else if (inst === "nop") {
      tempCommands[i] = command.replace("jmp", "nop");
      results = testProgramExec(tempCommands);
    }

    if (results.terminated) {
      return results.acc;
    }
  }
}

/**
 * Correct answer is 1270
 *
 * Executes in 15-16ms
 */
console.time("fixProgramInput");
const acc2 = fixProgramInput();
console.timeEnd("fixProgramInput");
console.log("acc2", acc2);
