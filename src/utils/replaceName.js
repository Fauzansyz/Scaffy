const fs = require("fs");

function replaceName(filePath, variables) {
	let content = fs.readFileSync(filePath, "utf-8");

	for (const key in variables) {
		const regex = new RegExp(`__${key}__`, "g");
		content = content.replace(regex, variables[key]);
	}

	fs.writeFileSync(filePath, content);
}

module.exports = replaceName;
