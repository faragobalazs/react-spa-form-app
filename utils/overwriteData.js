import { writeFile, mkdir } from "fs/promises";
import path from "path";

const dir = "data";
const rootFolder = process.cwd();
const fileName = "formData.json";
const filePath = path.join(rootFolder, dir, fileName);
const dirPath = path.dirname(filePath);

export const overwriteData = async (dataArray) => {
  await mkdir(dirPath, { recursive: true });
  await writeFile(filePath, JSON.stringify(dataArray, null, 2), "utf-8");
};
