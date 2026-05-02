const { Command } = require("commander");
const fs = require("fs");
const { select, confirm } = require("@inquirer/prompts");

const path = require("path");

const create = new Command('create');
const chalk = require('chalk').default
const processFile = require('../utils/processFile');

create
  .argument("<project-name>")
  .option("-t, --template <template>", "template name", "react")
  .action(async (projectName, options) => {
    const answer = await select({
      message: 'Select a framework template',
      choices: [
        {
          name: chalk.blue('React'),
          value: 'react',
        },
        {
          name: chalk.green('Vue'),
          value: 'vue',
        },

        {
          name: chalk.yellow('Vanila'),
          value: 'vanila',
        },
        {
          name: chalk.red('Astro'),
          value: 'astro',
        },
        {
          name: chalk.white("Next"),
          value: "next"
        },
      ],
    });

    const useTs = await confirm({
      message: "Use Typescript ?"
    })

    const templateName = `${answer}-${useTs ? "ts" : "js"}`;


    const projectPath = path.join(process.cwd(), projectName);
    const templatePath = path.join(__dirname, "../../templates", templateName);

    if (!fs.existsSync(templatePath)) {
      console.log("❌ Template not found");
      return;
    }

    if (fs.existsSync(projectPath)) {
      console.log("❌ The project already exists");
      return;
    }

    fs.cpSync(templatePath, projectPath, { recursive: true });

    processFile(projectPath, {
      PROJECT_NAME: projectName,
    });


    console.log(`✅ Project ${projectName}  successfully created`);
  });

module.exports = create
