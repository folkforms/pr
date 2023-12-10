const prxTasks = (shell, gitUtils) => {
  return {
    checkBranchIsNotMain: () => {
      const branch = gitUtils.getBranch();
      if(branch === gitUtils.getMainBranchName()) {
        shell.echo(`ERROR: Cannot create a PR on branch '${branch}'.`);
        return 1;
      }
      return 0;
    },
    checkBranchHasCommits: () => {
      const branch = gitUtils.getBranch();
      const commitHashForBranch = gitUtils.getCommitForBranch(branch);
      const commitHashForMain = gitUtils.getCommitForBranch(gitUtils.getMainBranchName());
      if(commitHashForBranch === commitHashForMain) {
        shell.echo(`ERROR: No commits on branch '${branch}'. Did you forget to commit your files?`);
        return 1;
      }
      return 0;
    },
    pushBranch: () => {
      const branch = gitUtils.getBranch();
      return exec(shell, `git push --set-upstream origin ${branch}`);
    },
    createPR: () => {
      const repoUrl = gitUtils.getRepoUrl();
      const branch = gitUtils.getBranch();
      return exec(shell, `${openCmd()} ${repoUrl}/pull/new/${branch}`);
    },
    pullLatest: () => {
      const r = exec(shell, `git checkout ${gitUtils.getMainBranchName()}`);
      if(r.code !== 0) {
        return r;
      }
      return exec(shell, "git pull --prune");
    },
    deleteRemoteBranch: () => {
      const branch = gitUtils.getBranch();
      return exec(shell, `git push --delete origin ${branch}`);
    },
    deleteLocalBranch: () => {
      const branch = gitUtils.getBranch();
      return exec(shell, `git branch --delete ${branch}`);
    },
    printLog: () => {
      return exec(shell, "git log --oneline --graph --decorate --all -10");
    },
    checkLengthOfBranchName: () => {
      const branch = gitUtils.getBranch();
      return {
        length: branch.length,
        code: branch.length > 48 ? 1 : 0
      };
    },
    checkBranchNameStartsWithCorrectPrefix: () => {
      const branch = gitUtils.getBranch();
      return {
        code: !!branch.match(/^ots-\d{1,}\/.*$/) ? 0 : 1
      };
    }
  }
}

/**
 * Executes the given command.
 *
 * @param {string} cmd command to execute
 */
const exec = (shell, cmd) => {
  cmd = cmd.replace(/\s+/g, " ");
  const r = shell.exec(cmd);
  if (r.code) {
    shell.echo(`ERROR: Could not run command: '${cmd}'.`);
    shell.exit(1);
  }
  return 0;
};

/**
 * Gets the OS-specific command to open a URL in the browser.
 */
const openCmd = () => {
  if(process.platform.startsWith("win")) {
    return "start";
  } else if(process.platform.startsWith("darwin")) {
    return "open";
  } else {
    return "xdg-open";
  }
}

module.exports = prxTasks;
