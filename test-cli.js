const { spawn } = require('child_process');

/**
 * FIXME
 *
 * @param {array} cmdArray FIXME
 * @param {array} expectedDataArray FIXME
 * @param {function} done jest `done` function
 */
const testCli = (cmdArray, expectedDataArray, done) => {
  expectedStr = expectedDataArray.join("\n") + "\n";
  const cli = spawn('node', cmdArray);
  const chunks = [];
  cli.stdout.on('data', chunk => {
    chunks.push(chunk);
  });
  cli.stdout.on('end', () => {
    const output = Buffer.concat(chunks).toString();
    expect(output).toBe(expectedStr);
    done();
  });
};

module.exports = testCli;
