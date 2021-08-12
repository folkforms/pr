const testCli = require("./test-cli");

test('cli with no options', done => {
  const testCmd = [ "cli.js", "--test-mode" ];
  const expectedStdOut = [
    "TEST MODE: option: start",
    "TEST MODE: dry run shell: false",
  ];
  testCli(testCmd, expectedStdOut, done);
});

test('cli with -d option', done => {
  const testCmd = [ "cli.js", "-d", "--test-mode" ];
  const expectedStdOut = [
    "TEST MODE: option: done",
    "TEST MODE: dry run shell: false",
  ];
  testCli(testCmd, expectedStdOut, done);
});

test('cli with -dd option', done => {
  const testCmd = [ "cli.js", "-dd", "--test-mode" ];
  const expectedStdOut = [
    "TEST MODE: option: doneDelete",
    "TEST MODE: dry run shell: false",
  ];
  testCli(testCmd, expectedStdOut, done);
});
