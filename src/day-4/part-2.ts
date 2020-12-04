import fs from "fs";

/**
 * NOTE:
 * Wanted to try using node fs instead of a module import, but it seems
 * to make testing using jest more difficult. Might need to refactor if
 * I want to write tests for this day - don't feel like mocking all of that
 * in the test file.
 */

/**
 * Simple file reader for getting input
 *
 * @param path Path to file, "./input.txt"
 */
export const readInputFile = (path: string): string | undefined => {
  try {
    const data = fs.readFileSync(path, "utf8");
    return data;
  } catch (error) {
    console.error(error);
  }
};

/**
 * Get file contents and format into array of passport entities
 *
 * @param filePath
 */
export const getFormattedPassports = (
  filePath: string
): string[] | undefined => {
  const input = readInputFile(filePath);
  const rawData = input?.split("\n");

  if (!rawData?.length) {
    return;
  }

  let line = 0;
  const passports: string[] = [];
  for (let i = line; i < rawData?.length; i++) {
    if (rawData[i]) {
      passports[line] = passports[line]?.length
        ? `${passports[line]} ${rawData[i]}`
        : rawData[i];
    } else {
      line += 1;
    }
  }

  return passports;
};

/**
 * Validate passport entities
 *
 * @param filePath
 */
export const validatePassports = (filePath: string): string[] | undefined => {
  const formattedPassports = getFormattedPassports(filePath);
  const passports = formattedPassports?.filter((passport: string) => {
    const passportParts = passport.split(" ");
    const testCid = /cid:/g;
    if (
      passportParts.length < 7 ||
      (passportParts.length < 8 && passportParts.some((e) => testCid.test(e)))
    ) {
      return false;
    }

    // Return true if all fields validate, return false if ANY field invalidates
    const validPassports = passportParts.every((field) => {
      const [key, value] = field.split(":");
      const patterns: Record<string, RegExp> = {
        hcl: /^#([a-f]|[0-9]){6}/g,
        ecl: /(amb|blu|brn|gry|grn|hzl|oth)/g,
        pid: /^([0-9]){9}$/g,
        eyr: /^(20[2|3]((?<=2)[0-9]|[0]))$/g,
        iyr: /^(20[1|2]((?<=1)[0-9]|[0]))$/g,
        byr: /^(19|20)(((?<=20)0[0-2])|((?<=19)[2-9][0-9]))/g,
        hgt: /^(1[5-9]((?<=9)[0-3]|(?<=[5-8])[0-9])(?=cm)(cm)$)|^([5-7]((?<=7)[0-6]|(?<=[6])[0-9]|(?<=5)9)(?=in)(in)$)/g,
        cid: /.*/g,
      };
      return patterns[key].test(value);
    });

    return validPassports;
  });
  return passports;
};

// correct answer is 198
const validPassports = validatePassports("./input.txt");
console.log("# of validPassports", validPassports?.length);
