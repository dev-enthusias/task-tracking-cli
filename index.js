#!/usr/bin/env node

import readTask from "./commands/read-task.js";
import createTask from "./commands/create-task.js";
import deleteTask from "./commands/delete-task.js";
import updateTask from "./commands/update-task.js";

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
  createTask(arg);
  readTask(arg);
  updateTask(arg);
  deleteTask(arg);
}
app(process.argv);
