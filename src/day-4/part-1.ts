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
  const passports = getFormattedPassports(filePath);
  return passports?.filter((passport: string) => {
    const passportParts = passport.split(" ");
    const testCid = /cid:/g;
    if (passportParts.length === 8) {
      return passport;
    } else if (
      passportParts.length === 7 &&
      !passportParts.some((e) => testCid.test(e))
    ) {
      return passport;
    }
  });
};

// Expect sample-input.txt to have 2 valid passports
// const validPassports = validatePassports("./input.txt");
// console.log("# of validPassports", validPassports?.length);
