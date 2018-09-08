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
    } else if (line === 'ls') {
      readline.moveCursor(process.stdout, 0, -1);
      Reflect.ownKeys(cluster.workers)
        .map(num => console.log(num));
        console.log('\n');
    } else if (/^kill/.test(line)) {
      readline.moveCursor(process.stdout, 0, -1);
      const [ , num ] = line.split(' ');
      if (Number.isNaN(parseInt(num))) {
        console.log('usage: kill [num]\n');
        return;
      }
      if (num in cluster.workers) {
        console.log('killing %d\n', num);
        cluster.workers[num].kill();
      } else {
        console.log('there is no worker %d\n', num);
      }
    }
  }
}
