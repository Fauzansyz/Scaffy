const fs = require("fs");
const path = require("path");
const replaceName = require("./replaceName");

function processFile(dir, variables) {
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);

    if (fs.lstatSync(fullPath).isDirectory()) {
      processFile(fullPath, variables);
    } else {
      replaceName(fullPath, variables);
    }
  }
}

module.exports = processFile;
