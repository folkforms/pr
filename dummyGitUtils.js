const gitUtils = {
  getBranch: () => "dummy-branch",
  getRemoteUrl: () => "dummy-remote-url",
  getRepoUrl: () => "dummy-repo-url",
  getCommitForBranch: branch => branch === "main" ? "1aabbcc" : "2ddeeff",
}

module.exports = gitUtils;
