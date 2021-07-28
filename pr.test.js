const { dummyShellJs, failingShellJs } = require("dummy-shells");
const pr = require("./pr");

beforeEach(() => {
  dummyShellJs._clear();
});

test.only("when we call 'pr' with 'start' argument it executes the correct commands", () => {
  const exitCode = pr(dummyShellJs, "start");
  expect(exitCode).toEqual(0);
  expect(dummyShellJs.echoList).toContain("foo");
  expect(dummyShellJs.echoList).toContain("bar");
});

test("when we call 'pr' with 'done' argument it executes the correct commands", () => {
  const exitCode = pr(dummyShellJs, props, ["-d"]);
  expect(exitCode).toEqual(0);
  expect(dummyShellJs.echoList).toContain("ERROR: Unknown option 'foo'.");
});

test("when we call 'pr' on the main branch it fails", () => {
  const exitCode = pr(dummyShellJs, props, ["-d"]);
  expect(exitCode).toEqual(0);
  expect(dummyShellJs.echoList).toContain("ERROR: Unknown option 'foo'.");
});
