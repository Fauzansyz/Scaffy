const { Command } = require("commander");
const fs = require("fs");
const select = require("@inquirer/select").default;

const path = require("path");

const create = new Command('create');
const chalk = require('chalk').default
const processFile = require('../utils/processFile')

create
  .argument("<project-name>")
  .option("-t, --template <template>", "template name", "react-js")
  .action(async (projectName, options) => {
    const answer = await select({
      message: 'Select a framework template',
      choices: [
        {
          name: chalk.blue('React'),
          value: 'reactjs',
        },
        {
          name: chalk.green('Vue'),
          value: 'vuejs',
        },

        {
          name: chalk.yellow('Vanila'),
          value: 'vanilajs',
        },
        {
          name: chalk.red('Astro'),
          value: 'astrojs',
        },
      ],
    });
    const templateName = options.template;

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
