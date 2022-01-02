#!/usr/bin/env node

const prx = require("./prx");
const prxTasksLib = require("./prxTasks");
const gitUtils = require("./gitUtils");
const shelljs = require("shelljs");
const { dryRunShellJs } = require("dummy-shells");
const { Command, Option } = require('commander');

const program = new Command();
program.option('-d, --done', 'Finish PR workflow');
program.option('-dd, --done-delete', 'Finish PR workflow and delete remote branch');
program.option('-n, --dry-run', 'Dry run');
program.addOption(new Option('--test-mode').hideHelp())
program.parse();

let option = "start";
if(program.opts().done) { option = "done"; }
if(program.opts().doneDelete) { option = "doneDelete"; }
const shell = program.opts().dryRun ? dryRunShellJs : shelljs;
const prxTasks = prxTasksLib(shell, gitUtils);

if(program.opts().testMode) {
  console.log(`TEST MODE: option: ${option}`);
  console.log(`TEST MODE: dry run shell: ${!!program.opts().dryRun}`);
  process.exit(0);
} else {
  const r = prx(option, shell, prxTasks);
  process.exit(r);
}
