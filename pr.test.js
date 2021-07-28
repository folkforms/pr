const { dummyShellJs } = require("dummy-shells");
const gitUtils = require("./dummyGitUtils");
const pr = require("./pr");

beforeEach(() => {
  dummyShellJs._clear();
});

test("when we call 'pr' with 'start' argument it executes the correct commands", () => {
  const exitCode = pr(dummyShellJs, gitUtils, "start");
  expect(exitCode).toEqual(0);
  expect(dummyShellJs.execList).toContain(`git push --set-upstream origin ${gitUtils.getBranch()}`);
  expect(dummyShellJs.execList).toContain(`start ${gitUtils.getRepoUrl()}/pull/new/${gitUtils.getBranch()}`);
});

test("when we call 'pr' with 'done' argument it executes the correct commands", () => {
  const exitCode = pr(dummyShellJs, gitUtils, "done");
  expect(exitCode).toEqual(0);
  expect(dummyShellJs.execList).toContain("git checkout main");
  expect(dummyShellJs.execList).toContain("git pull --prune");
  expect(dummyShellJs.execList).toContain(`git branch --delete ${gitUtils.getBranch()}`);
  expect(dummyShellJs.execList).toContain("git log --oneline --graph --decorate --all -10");
});

test("when we call 'pr' on the main branch it fails", () => {
  const modGitUtils = { ...gitUtils, getBranch: () => "main" };
  const exitCode = pr(dummyShellJs, modGitUtils, "start");
  expect(exitCode).toEqual(1);
  expect(dummyShellJs.echoList).toContain("ERROR: Cannot create a PR on branch 'main'.");
});

test("when we call 'pr' with no commits on the personal branch it fails", () => {
  const modGitUtils = { ...gitUtils, getCommitForBranch: branch => "abcdef1" };
  const exitCode = pr(dummyShellJs, modGitUtils, "start");
  expect(exitCode).toEqual(1);
  expect(dummyShellJs.echoList).toContain(`ERROR: No commits on branch '${gitUtils.getBranch()}'.`);
});
