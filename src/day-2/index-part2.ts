import input from "./input";

function getParts(values: string[]): string[][] {
  return values.map((value: string) => {
    return value.split(" ");
  });
}

function isValidPassword(entry: string[]): boolean {
  const [policy, character, password] = entry;
  const [pos1, pos2] = policy.split("-");
  const indexes = [];
  for (let i = 0; i < password.length; i++) {
    if (password[i] === character.replace(":", "")) {
      indexes.push(i + 1);
    }
  }
  if (
    (indexes.includes(Number(pos1)) && !indexes.includes(Number(pos2))) ||
    (indexes.includes(Number(pos2)) && !indexes.includes(Number(pos1)))
  ) {
    return true;
  }
  return false;
}

function getValidPasswords(values: string[]) {
  return getParts(values).filter((entry) => {
    if (isValidPassword(entry)) {
      return entry;
    }
  });
}

/**
 * About 6-6.5ms
 */
console.time("find valid passwords");
const validPasswords = getValidPasswords(input);
console.timeEnd("find valid passwords");
console.log("# of valid passwords: ", validPasswords.length);
