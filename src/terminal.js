const readline = require('readline');

const terminal = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '> '
});

terminal.on('line', line)

function line(line) {
  if (line === 'exit') {
    console.log('\nbye!\n')
    process.exit(0);
  }
  readline.moveCursor(process.stdout, 0, -1);
  terminal.prompt();
}

module.exports = terminal;
