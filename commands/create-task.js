import { red, reset } from "../data/colors.js";
import { tasks } from "../db/connect-db.js";
import updateDB from "../db/db.js";

export default function createTask(arg) {
  if (arg[2] === "add") {
    if (arg.length < 4)
      return console.error(`${red}Please provide a task description${reset}`);

    // Accepts multiple tasks args
    arg.slice(3).map((task) =>
      tasks.push({
        id: `task-${tasks.length + 1}`,
        description: task,
        status: "todo",
        createdAt: new Date().toISOString(),
      })
    );

    updateDB(`Task added successfully`);
  }
}
