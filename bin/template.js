#!/usr/bin/env node

const { Command } = require("commander");
const createCommand = require('../src/commands/create')

const path = require("path");

const program = new Command();

program
  .name("Scaffy")
  .description("CLI generator")
  .version("1.0.0");

program.addCommand(createCommand)


program.parse();
