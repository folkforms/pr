const gitUtils = require("./dummyGitUtils");
const prx = require("./prx");

let shelljs;
beforeEach(() => {
  jest.mock("shelljs", () => {
    return {
      exec: jest.fn(() => ({ code: 0 })),
      echo: jest.fn(),
    }
  })
  shelljs = require("shelljs");
});

afterEach(() => {
  jest.resetModules();
  jest.resetAllMocks();
})

test("when we call 'prx' with 'start' argument it executes the correct commands", () => {
  const exitCode = prx("start", shelljs, gitUtils);
  expect(exitCode).toEqual(0);
  expect(shelljs.exec).toHaveBeenCalledWith(`git push --set-upstream origin ${gitUtils.getBranch()}`);
  expect(shelljs.exec).toHaveBeenCalledWith(`start ${gitUtils.getRepoUrl()}/pull/new/${gitUtils.getBranch()}`);
});

test("when we call 'prx' with 'done' argument it executes the correct commands", () => {
  const exitCode = prx("done", shelljs, gitUtils);
  expect(exitCode).toEqual(0);
  expect(shelljs.exec).toHaveBeenCalledWith("git checkout main");
  expect(shelljs.exec).toHaveBeenCalledWith("git pull --prune");
  expect(shelljs.exec).toHaveBeenCalledWith(`git branch --delete ${gitUtils.getBranch()}`);
  expect(shelljs.exec).toHaveBeenCalledWith("git log --oneline --graph --decorate --all -10");
});

test("when we call 'prx' on the main branch it fails", () => {
  const modGitUtils = { ...gitUtils, getBranch: () => "main" };
  const exitCode = prx("start", shelljs, modGitUtils);
  expect(exitCode).toEqual(1);
  expect(shelljs.echo).toHaveBeenCalledWith("ERROR: Cannot create a PR on branch 'main'.");
});

test("when we call 'prx' with no commits on the personal branch it fails", () => {
  const modGitUtils = { ...gitUtils, getCommitForBranch: branch => "abcdef1" };
  const exitCode = prx("start", shelljs, modGitUtils);
  expect(exitCode).toEqual(1);
  expect(shelljs.echo).toHaveBeenCalledWith(`ERROR: No commits on branch '${gitUtils.getBranch()}'. Did you forget to commit your files?`);
});
