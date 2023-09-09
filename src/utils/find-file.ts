import * as fs from 'fs';
import * as path from 'path';

export function findFile(
  directoryPath: string,
  targetFileName: string,
): string | undefined {
  const files = fs.readdirSync(directoryPath);

  for (const file of files) {
    const filePath = path.join(directoryPath, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      // Recursively search in subdirectories
      const foundFilePath = findFile(filePath, targetFileName);
      if (foundFilePath) {
        return foundFilePath;
      }
    } else if (file === targetFileName) {
      // File found
      return directoryPath;
    }
  }

  // File not found
  return undefined;
}
