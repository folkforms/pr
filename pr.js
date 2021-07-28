const pr = (shell, option, branch) => {
  console.log(`#### pr: option = ${option}`);
  console.log(`#### pr: branch = '${branch}'`);

  if(option === "start") {
    shell.exec(`git push --set-upstream origin ${branch}`);
    shell.exec(`start https://github.com/IBM/spm-ui-upgrade-helper/pull/new/${branch}`);
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

module.exports = pr;
