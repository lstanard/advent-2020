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

    // Passport has fewer than 7 fields, invalidate
    if (passportParts.length < 7) {
      return;
    }

    // Validate all passport fields
    const validPassports = passportParts.every((field: string) => {
      const [key, value] = field.split(":");
      const patterns = {
        hcl: /^#([a-f]|[0-9]){6}/g,
        ecl: /(amb|blu|brn|gry|grn|hzl|oth)/g,
        pid: /^([0-9]){9}$/g,
      };

      // This should all be regex...
      if (key === "eyr") {
        return (
          value.length === 4 && Number(value) >= 2020 && Number(value) <= 2030
        );
      } else if (key === "hcl" || key === "ecl" || key === "pid") {
        return patterns[key].test(value);
      } else if (key === "iyr") {
        return (
          value.length === 4 && Number(value) >= 2010 && Number(value) <= 2020
        );
      } else if (key === "byr") {
        return (
          value.length === 4 && Number(value) >= 1920 && Number(value) <= 2002
        );
      } else if (key === "hgt") {
        const units = value.slice(value.length - 2);
        if (units !== "cm" && units !== "in") {
          return false;
        }
        const digits = value.replace(units, "");
        if (units === "cm" && (Number(digits) < 150 || Number(digits) > 193)) {
          return false;
        } else if (
          units === "in" &&
          (Number(digits) < 59 || Number(digits) > 76)
        ) {
          return false;
        }
        return true;
      } else if (key === "cid") {
        // ignored, missing or not
        return true;
      }
    });
    return validPassports;
  });
};

// First attempt 206, too high
const validPassports = validatePassports("./input.txt");
console.log("# of validPassports", validPassports?.length);
