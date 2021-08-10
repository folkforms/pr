const prx = (option, shell, gitUtils) => {

  const branch = gitUtils.getBranch();
  const repoUrl = gitUtils.getRepoUrl();
  const commitHashForBranch = gitUtils.getCommitForBranch(branch);
  const commitHashForMain = gitUtils.getCommitForBranch("main");

  if(branch === "main" || branch === "master" || branch === "develop") {
    shell.echo(`ERROR: Cannot create a PR on branch '${branch}'.`);
    return 1;
  }

  if(commitHashForBranch === commitHashForMain) {
    shell.echo(`ERROR: No commits on branch '${branch}'. Did you forget to commit your files?`);
    return 1;
  }

  if(option === "start") {
    exec(shell, `git push --set-upstream origin ${branch}`);
    exec(shell, `${openCmd()} ${repoUrl}/pull/new/${branch}`);
    return 0;
  }

  if(option === "done") {
    exec(shell, "git checkout main");
    exec(shell, "git pull --prune");
    exec(shell, `git branch --delete ${branch}`);
    exec(shell, "git log --oneline --graph --decorate --all -10");
    return 0;
  }

  if(option === "doneDelete") {
    exec(shell, "git checkout main");
    exec(shell, `git push --delete origin ${branch}`);
    exec(shell, "git pull --prune");
    exec(shell, `git branch --delete ${branch}`);
    exec(shell, "git log --oneline --graph --decorate --all -10");
    return 0;
  }

  shell.echo(`ERROR: Unknown option: '${option}'`);
  return 1;
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

const openCmd = () => {
  if(process.platform.startsWith("win")) {
    return "start";
  } else if(process.platform.startsWith("darwin")) {
    return "open";
  } else {
    return "xdg-open";
  }
}

module.exports = prx;
