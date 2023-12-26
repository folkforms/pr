const fs = require('fs-extra');

const prx = (option, shell, prxTasks) => {

  const checkBranchNameLength = () => {
    let r = prxTasks.checkLengthOfBranchName();
    console.log("");
    if (r.code === 0) {
      console.log("Branch name is under the maximum length (success)");
      return false;
    } else {
      console.warn(`Branch name is too long (${r.length}/40 characters) (FAILED)`);
      return true;
    }
  }

  const checkBranchNameStartsWithCorrectPrefix = () => {
    let r = prxTasks.checkBranchNameStartsWithCorrectPrefix();
    console.log("");
    if (r.code === 0) {
      console.log("Branch name starts with correct 'ots-1234/' prefix (success)");
      return false;
    } else {
      console.warn("Branch name does not start with 'ots-1234/' (FAILED)");
      return true;
    }
  }

  if(option === "check-branch-name") {

    const foundError = checkBranchNameLength() || checkBranchNameStartsWithCorrectPrefix();
    return foundError ? 1 : 0;

  } else if(option === "version") {

    var packageDotJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
    console.log(`prx v${packageDotJson.version}`);
    return 0;

  } else {

    let r;
    r = prxTasks.checkBranchIsNotMain();
    if(r !== 0) { return r; }
    r = prxTasks.checkBranchHasCommits();
    if(r !== 0) { return r; }

    if(option === "start") {
      const foundError = checkBranchNameLength() || checkBranchNameStartsWithCorrectPrefix();
      if (foundError) {
        return 1;
      }
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
}

module.exports = prx;
