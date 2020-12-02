import input from "./input";

function getParts(values: string[]): string[][] {
  return values.map((value: string) => {
    return value.split(" ");
  });
}

function isValidPassword(entry: string[]): boolean {
  const [policy, character, password] = entry;
  const [min, max] = policy.split("-");
  const occurrences = [];
  for (let i = 0; i < password.length; i++) {
    if (password[i] === character.replace(":", "")) {
      occurrences.push(i);
    }
  }
  if (occurrences.length >= Number(min) && occurrences.length <= Number(max)) {
    return true;
  }
  return false;
}

function getValidPasswords(values: string[]) {
  const passwords = getParts(values);
  return passwords.filter((entry) => {
    if (isValidPassword(entry)) {
      return entry;
    }
  });
}

const validPasswords = getValidPasswords(input);
console.log("# of valid passwords: ", validPasswords.length);
