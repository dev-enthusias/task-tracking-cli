#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Colors
const reset = "\x1b[0m";
const green = "\x1b[32m";
const yellow = "\x1b[33m";

// Welcome Note
// console.log(`
// Welcome to Task Tracker

// This is a CLI tool to help developers track
// their progress on tasks on the CLI instead of toggling,
// GUI and thier code editor, it features
// colorful text that points you to what is done, in progress,
// and ongoing
// `);

// Get all tasks from database
const tasks = JSON.parse(fs.readFileSync(`${__dirname}/data/tasks.json`));

const arg = process.argv;

// Add new task
// tasks.push({
//   id: "A unique identifier for the taskssdfa",
//   description: "A short description of the task",
//   status: "The status of the task (todo, in-progress, done)",
//   createdAt: "The date and time when the task was created",
//   updatedAt: "The date and time when the task was last updated",
// });

// Update tasks in database
// fs.writeFileSync(
//   `${__dirname}/data/tasks.json`,
//   JSON.stringify(tasks, null, 2)
// );
// console.log("Task added successfully");

//Our status => in-progress | done | todo

if (arg[2] === "list") {
  console.log(`${yellow}[in progress]${reset} ${green}[done]${reset} [todo]\n`);

  tasks.forEach((t, i) =>
    t.status === "in-progress"
      ? console.log(`${i + 1} ${yellow}${t.description}...${reset}\n`)
      : t.status === "done"
      ? console.log(`${i + 1} ${green}${t.description}${reset}\n`)
      : console.log(`${i + 1} ${t.description}\n`)
  );
}
