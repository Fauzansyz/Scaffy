const { Command } = require("commander");
const fs = require("fs");
const { select, confirm } = require("@inquirer/prompts");

const path = require("path");

const create = new Command('create');
const chalk = require('chalk').default
const processFile = require('../utils/processFile');

create
  .argument("<project-name>")
  .option("-t, --template <template>", "template name", "react-js")
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

    const templateName = `${answer.value}-${useTs ? "ts" : "js"}`;


    const projectPath = path.join(process.cwd(), projectName);
    const templatePath = path.join(__dirname, "../templates", templateName);

    console.log("TEMPLATE:", templatePath);

    if (!fs.existsSync(templatePath)) {
      console.log("❌ Template tidak ditemukan");
      return;
    }

    if (fs.existsSync(projectPath)) {
      console.log("❌ Project sudah ada");
      return;
    }

    fs.cpSync(templatePath, projectPath, { recursive: true });

    processFiles(projectPath, {
      PROJECT_NAME: projectName,
    });


    console.log(`✅ Project ${projectName} berhasil dibuat`);
  });

module.exports = create
