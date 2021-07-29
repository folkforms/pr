#!/usr/bin/env node

const prx = require("./prx");
const gitUtils = require("./gitUtils");
const shelljs = require("shelljs");
const { Command } = require('commander');

const program = new Command();
program.option('-d, --done', 'Finish PR workflow');
program.parse();

const option = program.opts().done ? "done" : "start";

return prx(option, shelljs, gitUtils);
