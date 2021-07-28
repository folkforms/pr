const shelljs = require("shelljs");

const gitUtils = {
  getBranch: () => shelljs.exec(`git symbolic-ref --short -q HEAD`).stdout,
  getRemoteUrl: () => shelljs.exec(`git remote get-url --push origin`).stdout,
  getRepoUrl: () => {
    // git@github.com:folkforms/pr.git => https://github.com/folkforms/pr
    let repo = this.getRemoteUrl().substring(4).replace(/:/, "/");
    repo = "https://" + repo.substring(0, repo.length - 4);
    return repo;
  }
}

module.exports = gitUtils;
