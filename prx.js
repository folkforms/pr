const prx = (option, shell, prxTasks) => {

  if(option === "check-branch-name") {
    let foundError = false;

    let r = prxTasks.checkLengthOfBranchName();
    if (r.code === 1) {
      console.error("");
      console.error(`Branch name is too long (${r.length}/40 characters)`);
      foundError = true;
    }

    r = prxTasks.checkBranchNameStartsWithCorrectPrefix();
    if (r.code === 1) {
      console.error("");
      console.error(`Branch name does not start with 'ots-1234/'`);
      foundError = true;
    }

    if (!foundError) {
      console.log("");
      console.log("Branch name is ok");
    }

    return r;
  }

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
