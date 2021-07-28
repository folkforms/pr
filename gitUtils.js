const shelljs = require("shelljs");

const gitUtils = {
  getBranch: () => shelljs.exec(`git symbolic-ref --short -q HEAD`).stdout,
}

module.exports = gitUtils;
