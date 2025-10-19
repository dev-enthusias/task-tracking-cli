import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { tasks } from "./connect-db.js";
import { green, reset } from "../data/colors.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default function updateDB(message) {
  fs.writeFileSync(
    `${path.dirname(__dirname)}/data/tasks.json`,
    JSON.stringify(tasks, null, 2)
  );
  console.log(`${green}${message}${reset}`);
}
