import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const tasks = JSON.parse(
  fs.readFileSync(`${path.dirname(__dirname)}/data/tasks.json`)
);
