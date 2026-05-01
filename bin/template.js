#!/usr/bin/env node

const { Command } = require("commander");
const fs = require("fs");
const select = require("@inquirer/select").default;

const path = require("path");

const program = new Command();

program
	.name("zan")
	.description("CLI generator")
	.version("1.0.0");

program
	.command("create <project-name>")
	.option("-t, --template <template>", "template name", "react-js")
	.action(async (projectName, options) => {
		const answer = await select({
			message: 'Select a package manager',
			choices: [
				{
					name: 'npm',
					value: 'npm',
					description: 'npm is the most popular package manager',
				},
				{
					name: 'yarn',
					value: 'yarn',
					description: 'yarn is an awesome package manager',
				},

				{
					name: 'jspm',
					value: 'jspm',
					disabled: true,
				},
				{
					name: 'pnpm',
					value: 'pnpm',
					disabled: '(pnpm is not available)',
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

		console.log(`✅ Project ${projectName} berhasil dibuat`);
	});

program.parse();
