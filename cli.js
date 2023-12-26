#!/usr/bin/env node

const prx = require("./prx");
const prxTasksLib = require("./prxTasks");
const gitUtils = require("./gitUtils");
const shelljs = require("shelljs");
const { dryRunShellJs } = require("dummy-shells");
const { Command, Option } = require('commander');

const program = new Command();
program.option('-c, --check-branch', 'Check branch name');
program.option('-d, --done', 'Finish PR workflow');
program.option('-dd, --done-delete', 'Finish PR workflow and delete remote branch');
program.option('-n, --dry-run', 'Dry run');
program.option('--no-verify', 'Skip checks when pusing');
program.option('-v, --version', 'Print version');
program.addOption(new Option('--test-mode').hideHelp())
program.parse();

let option = "start";
let flags = [];
if(program.opts().checkBranch) { option = "check-branch-name"; }
if(program.opts().done) { option = "done"; }
if(program.opts().doneDelete) { option = "doneDelete"; }
if(program.opts().version) { option = "version"; }
const shell = program.opts().dryRun ? dryRunShellJs : shelljs;
const prxTasks = prxTasksLib(shell, gitUtils);

if(program.opts().noVerify) { flags.add("no-verify"); }

if(program.opts().testMode) {
  console.log(`TEST MODE: option: ${option}`);
  console.log(`TEST MODE: dry run shell: ${!!program.opts().dryRun}`);
  process.exit(0);
} else {
  const r = prx(option, flags, shell, prxTasks);
  process.exit(r);
}
