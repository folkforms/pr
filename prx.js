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
    shell.echo(`ERROR: No commits on branch '${branch}'.`);
    return 1;
  }

  if(option === "start") {
    shell.exec(`git push --set-upstream origin ${branch}`);
    shell.exec(`start ${repoUrl}/pull/new/${branch}`);
    return 0;
  }

  if(option === "done") {
    shell.exec("git checkout main");
    shell.exec("git pull --prune");
    shell.exec(`git branch --delete ${branch}`);
    shell.exec("git log --oneline --graph --decorate --all -10");
    return 0;
  }

  shell.echo(`ERROR: Unknown option: '${option}'`);
  return 1;
}

module.exports = prx;
