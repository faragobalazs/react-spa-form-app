import { writeFile } from "fs/promises";
import path from "path";

export const writeData = async (oldData, newObject) => {
  const dir = "data";
  const rootFolder = process.cwd();
  const fileName = "formData.json";
  const filePath = path.join(rootFolder, dir, fileName);

  const newData = [...oldData, newObject];

  await writeFile(filePath, JSON.stringify(newData, null, 2));
};
