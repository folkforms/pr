const gitUtils = require("./dummyGitUtils");
const prxTasksLib = require("./prxTasks");
const prx = require("./prx");

let shelljs;
let prxTasks;
let prxTasksOriginal;
beforeEach(() => {
  jest.mock("shelljs", () => {
    return {
      exec: jest.fn(() => ({ code: 0 })),
      echo: jest.fn(),
    }
  })
  shelljs = require("shelljs");

  // FIXME Can we jest.mock this?
  prxTasks = prxTasksLib(shelljs, gitUtils);
  prxTasks.checkBranchIsNotMain = jest.fn(() => 0);
  prxTasks.pushBranch = jest.fn();
  prxTasks.createPR = jest.fn();
  prxTasks.pullLatest = jest.fn();
  prxTasks.deleteRemoteBranch = jest.fn();
  prxTasks.deleteLocalBranch = jest.fn();
  prxTasks.printLog = jest.fn();
  prxTasks.checkLengthOfBranchName = jest.fn(() => ({ code: 0, length: 20 }));

  prxTasksOriginal = prxTasksLib(shelljs, gitUtils);
});

afterEach(() => {
  jest.resetModules();
  jest.resetAllMocks();
});

test("when we call 'prx' with 'start' argument it executes the correct commands", () => {
  const exitCode = prx("start", shelljs, prxTasks);

  expect(prxTasks.pushBranch).toHaveBeenCalled();
  expect(prxTasks.createPR).toHaveBeenCalled();
  expect(exitCode).toEqual(0);
});

test("when we call 'prx' with 'done' argument it executes the correct commands", () => {
  const exitCode = prx("done", shelljs, prxTasks);

  expect(prxTasks.pullLatest).toHaveBeenCalled();
  expect(prxTasks.deleteLocalBranch).toHaveBeenCalled();
  expect(prxTasks.printLog).toHaveBeenCalled();
  expect(exitCode).toEqual(0);
});

test("when we call 'prx' with 'doneDelete' argument it executes the correct commands", () => {
  const exitCode = prx("doneDelete", shelljs, prxTasks);

  expect(prxTasks.deleteRemoteBranch).toHaveBeenCalled();
  expect(prxTasks.pullLatest).toHaveBeenCalled();
  expect(prxTasks.deleteLocalBranch).toHaveBeenCalled();
  expect(prxTasks.printLog).toHaveBeenCalled();
  expect(exitCode).toEqual(0);
});

test("when we call 'prx' on the main branch it fails", () => {
  gitUtils.getBranch = () => "main";
  prxTasks.checkBranchIsNotMain = prxTasksOriginal.checkBranchIsNotMain;

  const exitCode = prx("start", shelljs, prxTasks);

  expect(shelljs.echo).toHaveBeenCalledWith("ERROR: Cannot create a PR on branch 'main'.");
  expect(exitCode).toEqual(1);
});

test("when we call 'prx' with no commits on the personal branch it fails", () => {
  gitUtils.getBranch = () => "dummy-branch";
  gitUtils.getCommitForBranch = () => "abcdef1";
  prxTasks.checkBranchHasCommits = prxTasksOriginal.checkBranchHasCommits;

  const exitCode = prx("start", shelljs, prxTasks);

  expect(shelljs.echo).toHaveBeenCalledWith(`ERROR: No commits on branch 'dummy-branch'. Did you forget to commit your files?`);
  expect(exitCode).toEqual(1);
});

test("when we call 'prx' with 'check-length-of-branch-name' argument it executes the correct commands", () => {
  prx("check-length-of-branch-name", shelljs, prxTasks);
  expect(prxTasks.checkLengthOfBranchName).toHaveBeenCalled();
});
