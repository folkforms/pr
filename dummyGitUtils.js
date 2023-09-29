const gitUtils = {
  _reset: () => {
    gitUtils.getBranch = () => "dummy-branch";
    gitUtils.getRemoteUrl = () => "dummy-remote-url";
    gitUtils.getRepoUrl = () => "dummy-repo-url";
    gitUtils.getCommitForBranch = branch => branch === "main" ? "1aabbcc" : "2ddeeff";
    gitUtils.getMainBranchName = () => "main";
    gitUtils.getRemoteName = () => "git@github.com:folkforms/prx.git";
  }
}

gitUtils._reset();
module.exports = gitUtils;
