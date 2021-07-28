const shelljs = require("shelljs");
const { dummyShellJs, failingShellJs } = require("dummy-shells");
const pr = require("./pr");

beforeEach(() => {
  dummyShellJs._clear();
});

test("when we call 'pr' with 'start' argument it executes the correct commands", () => {
  const branch = "foo-branch";
  const exitCode = pr(dummyShellJs, "start", branch);
  expect(exitCode).toEqual(0);
  expect(dummyShellJs.execList).toContain(`git push --set-upstream origin ${branch}`);
  expect(dummyShellJs.execList).toContain(`start https://github.com/IBM/spm-ui-upgrade-helper/pull/new/${branch}`);
});

test.only("when we call 'pr' with 'done' argument it executes the correct commands", () => {
  const branch = "foo-branch";
  const exitCode = pr(dummyShellJs, "done", branch);
  expect(exitCode).toEqual(0);
  expect(dummyShellJs.execList).toContain("git checkout main");
  expect(dummyShellJs.execList).toContain("git pull --prune");
  expect(dummyShellJs.execList).toContain(`git branch --delete ${branch}`);
  expect(dummyShellJs.execList).toContain("git log --oneline --graph --decorate --all -10");
});

test("when we call 'pr' with 'start' argument on the main branch it fails", () => {
  const exitCode = pr(dummyShellJs, "start", "main");
  expect(exitCode).toEqual(1);
  expect(dummyShellJs.echoList).toContain("ERROR: foo");
});
