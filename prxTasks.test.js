const gitUtils = require("./dummyGitUtils");
const prxTasksLib = require("./prxTasks");

let prxTasks;
let shelljs;
beforeEach(() => {
  jest.mock("shelljs", () => {
    return {
      exec: jest.fn(() => ({ code: 0 })),
      echo: jest.fn(),
    }
  })
  shelljs = require("shelljs");
  prxTasks = prxTasksLib(shelljs, gitUtils);
});

afterEach(() => {
  jest.resetModules();
  jest.resetAllMocks();
})

test("FIXME prxTasks.checkBranchIsNotMain", () => {
  const exitCode = prxTasks.checkBranchIsNotMain();
  expect(exitCode).toEqual(0);
});

// FIXME Negative test of the above

test("FIXME prxTasks.pushBranch", () => {
  const exitCode = prxTasks.pushBranch();
  expect(exitCode).toEqual(0);
  expect(shelljs.exec).toHaveBeenCalledWith(`git push --set-upstream origin ${gitUtils.getBranch()}`);
  // expect(shelljs.exec).toHaveBeenCalledWith(`start ${gitUtils.getRepoUrl()}/pull/new/${gitUtils.getBranch()}`);
});

test("FIXME prxTasks.createPR", () => {
  const exitCode = prxTasks.createPR();
  expect(exitCode).toEqual(0);
  expect(shelljs.exec).toHaveBeenCalledWith(`start ${gitUtils.getRepoUrl()}/pull/new/${gitUtils.getBranch()}`);
});

// FIXME More tests...
