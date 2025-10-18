#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Colors
const red = "\x1b[31m";
const reset = "\x1b[0m";
const blue = "\x1b[34m";
const green = "\x1b[32m";
const yellow = "\x1b[33m";

// Get all tasks from database
const tasks = JSON.parse(fs.readFileSync(`${__dirname}/data/tasks.json`));

function updateDB(message) {
  fs.writeFileSync(
    `${__dirname}/data/tasks.json`,
    JSON.stringify(tasks, null, 2)
  );
  console.log(message);
}

// available status => in-progress | done | todo
function app(arg) {
  // Welcome Note
  if (!arg[2]) {
    console.log(`
      Welcome to Task Tracker

      This is a CLI tool to help developers track
      their progress on tasks on the CLI instead of toggling,
      GUI and thier code editor, it features
      colorful text that points you to what is done, in progress,
      and ongoing
    `);
  }

  // Create
  if (arg[2] === "add") {
    if (arg.length < 4)
      console.log(`${red}Please provide a task description${reset}`);

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

  // Read
  if (arg[2] === "list") {
    if (arg[3] === "done") {
      tasks
        .filter((t) => t.status === "done")
        .map((d, i) => console.log(`${i + 1} ${d.description}\n`));

      return;
    }

    if (arg[3] === "in-progress") {
      tasks
        .filter((t) => t.status === "in-progress")
        .map((p, i) => console.log(`${i + 1} ${p.description}\n`));

      return;
    }

    if (arg[3] === "todo") {
      tasks
        .filter((t) => t.status === "todo")
        .map((p, i) => console.log(`${i + 1} ${p.description}\n`));

      return;
    }

    tasks.forEach((t, i) =>
      t.status === "in-progress"
        ? console.log(`${i + 1} ${yellow}${t.description}...${reset}\n`)
        : t.status === "done"
        ? console.log(`${i + 1} ${green}${t.description}${reset}\n`)
        : console.log(`${i + 1} ${t.description}\n`)
    );
    return;
  }

  // Update
  if (arg[2] === "update") {
    if (arg.length < 5) {
      console.log(
        `${red}Wrong command${reset} \nDo you mean: ${blue}task-cli update id "New description"${reset}`
      );
      return;
    }

    const index = tasks.findIndex((task) => arg[3] === task.id);
    tasks[index].description = arg[4];
    tasks[index].updatedAt = new Date().toISOString();

    updateDB(`Task (ID: ${arg[3]}) updated successfully`);
  }

  // Update task status
  if (arg[2] === "mark-in-progress" || arg[2] === "mark-done") {
    if (arg.length < 4) {
      console.log(
        `${red}Wrong command${reset} \nDo you mean: ${blue}task-cli ${arg[2]} id${reset}`
      );
      return;
    }

    const index = tasks.findIndex((task) => arg[3] === task.id);

    tasks[index].status =
      arg[2] === "mark-in-progress" ? "in-progress" : "done";
    console.log(arg[2]);
    console.log(arg[2].split("-").splice(0, 1).join("-"));
    tasks[index].updatedAt = new Date().toISOString();

    updateDB(`Task status (ID: ${arg[3]}) updated successfully`);
  }

  // Delete
  if (arg[2] === "delete") {
    if (arg.length < 4) {
      console.log(
        `${red}Wrong command${reset} \nDo you mean: ${blue}task-cli delete id`
      );
      return;
    }

    const index = tasks.findIndex((task) => arg[3] === task.id);
    tasks.splice(index, 1);

    updateDB(`Task (ID: ${arg[3]}) deleted successfully`);
  }
}
app(process.argv);
