#!/usr/bin/env node

const prx = require("./prx");
const gitUtils = require("./gitUtils");
const shelljs = require("shelljs");
const { dryRunShellJs } = require("dummy-shells");
const { Command } = require('commander');

const program = new Command();
program.option('-d, --done', 'Finish PR workflow');
program.option('-dd, --done-delete', 'Finish PR workflow and delete remote branch');
program.option('-n, --dry-run', 'Dry run');
program.parse();

let option = "start";
if(program.opts().done) { option = "done"; }
if(program.opts().doneDelete) { option = "doneDelete"; }
const shell = program.opts().dryRun ? dryRunShellJs : shelljs;

return prx(option, shell, gitUtils);
