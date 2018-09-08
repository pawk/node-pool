const readline = require('readline');

module.exports = function terminal(cluster) {
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
    if (line === 'exit') {
      readline.moveCursor(process.stdout, 0, -1);
      console.log('\nbye!\n');
      process.exit(0);
    } else if (/^kill/.test(line)) {
      readline.moveCursor(process.stdout, 0, -1);
      const [ , pid ] = line.split(' ');
      if (Number.isNaN(parseInt(pid))) {
        console.log('usage: kill [pid]\n');
        return;
      }
      console.log('killing %d\n', pid);
    }
  }
}
