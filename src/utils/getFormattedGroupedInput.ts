/**
 * Get file contents and format into array of passport entities
 *
 * @param filePath
 */
export const getFormattedGroupedInput = (
  input: string
): string[] | undefined => {
  const rawData = input?.split("\n");

  if (!rawData?.length) {
    return;
  }

  let line = 0;
  const groupedInput: string[] = [];
  for (let i = line; i < rawData?.length; i++) {
    if (rawData[i]) {
      groupedInput[line] = groupedInput[line]?.length
        ? `${groupedInput[line]} ${rawData[i]}`
        : rawData[i];
    } else {
      line += 1;
    }
  }

  return groupedInput;
};
