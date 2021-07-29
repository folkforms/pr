const { dummyShellJs } = require("dummy-shells");
const gitUtils = require("./dummyGitUtils");
const prx = require("./prx");

beforeEach(() => {
  dummyShellJs._clear();
});

test("when we call 'prx' with 'start' argument it executes the correct commands", () => {
  const exitCode = prx("start", dummyShellJs, gitUtils);
  expect(exitCode).toEqual(0);
  expect(dummyShellJs.execList[0]).toEqual(`git push --set-upstream origin ${gitUtils.getBranch()}`);
  expect(dummyShellJs.execList[1]).toEqual(`start ${gitUtils.getRepoUrl()}/pull/new/${gitUtils.getBranch()}`);
});

test("when we call 'prx' with 'done' argument it executes the correct commands", () => {
  const exitCode = prx("done", dummyShellJs, gitUtils);
  expect(exitCode).toEqual(0);
  expect(dummyShellJs.execList[0]).toEqual("git checkout main");
  expect(dummyShellJs.execList[1]).toEqual("git pull --prune");
  expect(dummyShellJs.execList[2]).toEqual(`git branch --delete ${gitUtils.getBranch()}`);
  expect(dummyShellJs.execList[3]).toEqual("git log --oneline --graph --decorate --all -10");
});

test("when we call 'prx' on the main branch it fails", () => {
  const modGitUtils = { ...gitUtils, getBranch: () => "main" };
  const exitCode = prx("start", dummyShellJs, modGitUtils);
  expect(exitCode).toEqual(1);
  expect(dummyShellJs.echoList[0]).toEqual("ERROR: Cannot create a PR on branch 'main'.");
});

test("when we call 'prx' with no commits on the personal branch it fails", () => {
  const modGitUtils = { ...gitUtils, getCommitForBranch: branch => "abcdef1" };
  const exitCode = prx("start", dummyShellJs, modGitUtils);
  expect(exitCode).toEqual(1);
  expect(dummyShellJs.echoList[0]).toEqual(`ERROR: No commits on branch '${gitUtils.getBranch()}'.`);
});
