const readline = require('readline');

const terminal = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '> '
});

terminal.on('line', handleLine)

function handleLine(line) {
  execute(line);
  readline.moveCursor(process.stdout, 0, -1);
  terminal.prompt();
}

function execute(line) {
  readline.moveCursor(process.stdout, 0, -1);
  if (line === 'exit') {
    console.log('\nbye!\n')
    process.exit(0);
  } else if (/^kill/.test(line)) {
    console.log('killing\n')
  }
}

module.exports = terminal;
