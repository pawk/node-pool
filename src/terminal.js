const readline = require('readline');

const terminal = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '> '
});

terminal.on('line', line)

function line(line) {
  readline.moveCursor(process.stdout, 0, -1);
  terminal.prompt();
}

module.exports = terminal;
