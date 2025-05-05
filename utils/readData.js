import { readFile } from "fs/promises";
import path from "path";
export const readData = async () => {
  const dir = "data";
  const rootFolder = process.cwd();
  const fileName = "formData.json";
  const filePath = path.join(rootFolder, dir, fileName);

  const data = await readFile(filePath, "utf-8");

  return JSON.parse(data);
};
 