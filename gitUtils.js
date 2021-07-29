const shelljs = require("shelljs");

const gitUtils = {
  getBranch: () => {
    const branch = shelljs.exec(`git symbolic-ref --short -q HEAD`).stdout;
    return branch.substring(0, branch.length - 1);
  },
  getRemoteUrl: () => {
    const url = shelljs.exec(`git remote get-url --push origin`).stdout;
    return url.substring(0, url.length - 1);
  },
  getRepoUrl: () => {
    // git@github.com:folkforms/pr.git => https://github.com/folkforms/pr
    let repo = gitUtils.getRemoteUrl().substring(4).replace(/:/, "/");
    repo = "https://" + repo.substring(0, repo.length - 4);
    return repo;
  },
  getCommitForBranch: branch => shelljs.exec(`git rev-parse --short ${branch}`).stdout,
}

module.exports = gitUtils;
