import input from "./input";

function isValidPassword(entry: string[]): boolean {
  let [policy, character, password] = entry;
  let [pos1, pos2] = policy.split("-");
  character = character.replace(":", "");
  if (
    (password[Number(pos1) - 1] === character &&
      password[Number(pos2) - 1] !== character) ||
    (password[Number(pos1) - 1] !== character &&
      password[Number(pos2) - 1] === character)
  ) {
    return true;
  }
  return false;
}

function getValidPasswords(values: string[]) {
  return values
    .map((value) => value.split(" "))
    .filter((entry) => isValidPassword(entry) && entry);
}

/**
 * About 2-3ms
 */
console.time("find valid passwords");
const validPasswords = getValidPasswords(input);
console.timeEnd("find valid passwords");
console.log("# of valid passwords: ", validPasswords.length);
