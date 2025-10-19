import { blue, red, reset } from "../data/colors.js";
import { tasks } from "../db/connect-db.js";
import updateDB from "../db/db.js";

export default function deleteTask(arg) {
  if (arg[2] === "delete") {
    if (arg.length < 4) {
      return console.log(
        `${red}Wrong command${reset} \nDo you mean: ${blue}task-cli delete id`
      );
    }

    const index = tasks.findIndex((task) => arg[3] === task.id);
    tasks.splice(index, 1);

    updateDB(`Task (ID: ${arg[3]}) deleted successfully`);
  }
}
