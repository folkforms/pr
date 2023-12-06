const { spawn } = require('child_process');

/**
 * Runs the cli code with the given args and returns the output
 *
 * @param {array} cmdArray FIXME
 * @param {array} expectedOutput FIXME
 * @param {function} done jest `done` function
 */
const testCli = (cmdArray, expectedOutput, done) => {
  expectedOutputStr = expectedOutput.join("\n") + "\n";
  const cli = spawn('node', cmdArray);
  const chunks = [];
  cli.stdout.on('data', chunk => {
    chunks.push(chunk);
  });
  cli.stdout.on('end', () => {
    const output = Buffer.concat(chunks).toString();
    expect(output).toBe(expectedOutputStr);
    done();
  });
};

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

test('cli with -c option', done => {
  const testCmd = [ "cli.js", "-c", "--test-mode" ];
  const expectedStdOut = [
    "TEST MODE: option: check-branch-name",
    "TEST MODE: dry run shell: false",
  ];
  testCli(testCmd, expectedStdOut, done);
});
