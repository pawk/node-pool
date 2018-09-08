const cluster = require('cluster');
const { cpus } = require('os');

run();

function run() {
  configure();
  fork();
}

function configure() {
  cluster.setupMaster({
    exec: 'src/worker.js'
  });
  cluster.on('exit', restart);
}

function fork() {
  console.log('forking for %d cores', cpus().length);
  const children = cpus().map(cluster.fork);
}

function restart(worker, code, signal) {
  console.log(
    'worker %d died (%s), restarting...', worker.process.pid, signal || code
  );
  cluster.fork();
}