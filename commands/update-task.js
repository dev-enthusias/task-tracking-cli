import { tasks } from "../db/connect-db.js";
import updateDB from "../db/db.js";

export default function updateTask(arg) {
  // Update
  if (arg[2] === "update") {
    if (arg.length < 5) {
      console.error(
        `Wrong command${reset} \nDo you mean: ${blue}task-cli update id "New description"`
      );
      return;
    }

    const index = tasks.findIndex((task) => arg[3] === task.id);
    tasks[index].description = arg[4];
    tasks[index].updatedAt = new Date().toISOString();

    updateDB(`Task (ID: ${arg[3]}) updated successfully`);
  }
}
