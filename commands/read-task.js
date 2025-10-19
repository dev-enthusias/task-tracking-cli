import { green, reset, yellow } from "../data/colors.js";
import { tasks } from "../db/connect-db.js";

export default function readTask(arg) {
  if (arg[2] === "list") {
    if (arg[3] === "done" || arg[3] === "in-progress" || arg[3] === "todo") {
      const todos = tasks
        .filter((t) => t.status === arg[3])
        .map((t) => {
          return { id: t.id, status: t.status, task: t.description };
        });
      return console.table(todos);
    }

    tasks.forEach((t, i) =>
      t.status === "in-progress"
        ? console.table(`${i + 1} ${yellow}${t.description}...${reset}\n`)
        : t.status === "done"
        ? console.table(`${i + 1} ${green}${t.description}${reset}\n`)
        : console.table(`${i + 1} ${t.description}\n`)
    );
    return;
  }
}
