#!/usr/bin/env node

const prx = require("./prx");
const gitUtils = require("./gitUtils");
const shelljs = require("shelljs");
const { dryRunShellJs } = require("dummy-shells");
const { Command } = require('commander');

const program = new Command();
program.option('-d, --done', 'Finish PR workflow');
program.option('-n, --dry-run', 'Dry run');
program.parse();

const option = program.opts().done ? "done" : "start";

const shell = program.opts().dryRun ? dryRunShellJs : shelljs;

return prx(option, shell, gitUtils);
