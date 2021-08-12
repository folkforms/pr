const prx = (option, shell, prxTasks) => {

  let r;
  r = prxTasks.checkBranchIsNotMain();
  if(r !== 0) { return r; }
  r = prxTasks.checkBranchHasCommits();
  if(r !== 0) { return r; }

  if(option === "start") {
    prxTasks.pushBranch();
    prxTasks.createPR();
    return 0;
  }

  if(option === "done") {
    prxTasks.pullLatest()
    prxTasks.deleteLocalBranch()
    prxTasks.printLog()
    return 0;
  }

  if(option === "doneDelete") {
    prxTasks.deleteRemoteBranch()
    prxTasks.pullLatest()
    prxTasks.deleteLocalBranch()
    prxTasks.printLog()
    return 0;
  }

  shell.echo(`ERROR: Unknown option: '${option}'`);
  return 1;
}

module.exports = prx;
