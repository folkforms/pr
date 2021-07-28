const { dummyShellJs } = require("dummy-shells");
const pr = require("./pr");

const branch = "foo-branch";
const repoUrl = "https://github.com/folkforms/pr";

beforeEach(() => {
  dummyShellJs._clear();
});

test("when we call 'pr' with 'start' argument it executes the correct commands", () => {
  const exitCode = pr(dummyShellJs, "start", branch, repoUrl);
  expect(exitCode).toEqual(0);
  expect(dummyShellJs.execList).toContain(`git push --set-upstream origin ${branch}`);
  expect(dummyShellJs.execList).toContain(`start ${repoUrl}/pull/new/${branch}`);
});

test("when we call 'pr' with 'done' argument it executes the correct commands", () => {
  const exitCode = pr(dummyShellJs, "done", branch);
  expect(exitCode).toEqual(0);
  expect(dummyShellJs.execList).toContain("git checkout main");
  expect(dummyShellJs.execList).toContain("git pull --prune");
  expect(dummyShellJs.execList).toContain(`git branch --delete ${branch}`);
  expect(dummyShellJs.execList).toContain("git log --oneline --graph --decorate --all -10");
});

test("when we call 'pr' on the main branch it fails", () => {
  const exitCode = pr(dummyShellJs, "start", "main");
  expect(exitCode).toEqual(1);
  expect(dummyShellJs.echoList).toContain("ERROR: Cannot create a PR on branch 'main'.");
});
