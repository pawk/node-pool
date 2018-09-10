const readline = require('readline');
const cluster = require('cluster');

const { fork, scale } = require('./commands');
const { countWorkers } = require('./utils');

const commands = {
  ls: function(line) {
    console.log('list of running workers: %s\n', Reflect.ownKeys(cluster.workers).join(', '));
    logWorkersCount(cluster);
  },
  fork: function(line, cluster) {
    fork();
    logWorkersCount(cluster);
  },
  scale: function(line) {
    const [ , num ] = line.split(' ');
    scale(num);
    logWorkersCount(cluster);
  },
  kill: function(line) {
    const [ , num ] = line.split(' ');
    if (Number.isNaN(parseInt(num))) {
      console.log('usage: kill [num]\n');
      return;
    }
    if (num in cluster.workers) {
      console.log('killing %d\n', num);
      cluster.workers[num].kill();
      logWorkersCount(cluster);
    } else {
      console.log('there is no worker %d\n', num);
    }
  },
  exit: function(line) {
    readline.moveCursor(process.stdout, 0, -1);
    console.log('\nbye!\n');
    process.exit(0);
  }
};



  const terminal = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '> '
  });

  terminal.on('line', handleLine)

  function handleLine(line) {
    parse(line);
    readline.moveCursor(process.stdout, 0, -1);
    terminal.prompt();
  }

  function parse(line) {
    readline.moveCursor(process.stdout, 0, -1);
    const command = line.split(' ')[0];
    if (command in commands) {
      commands[command](line, cluster);
    } else {
      console.log('available commands are: %s\n', Reflect.ownKeys(commands).join(', '))
    }
  }

module.exports = terminal;

function logWorkersCount(cluster) {
  console.log('# number of workers: %d\n\n', countWorkers());
}
