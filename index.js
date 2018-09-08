const cluster = require('cluster');
const { cpus } = require('os');

run();

function run() {
  configure();
  deploy();
}

function configure() {
  cluster.setupMaster({
    exec: 'src/worker.js'
  });
  cluster.on('exit', restart);
}

function deploy() {
  console.log('forking for %d cores', cpus().length);
  const children = cpus().map(cluster.fork);
  logWorkersCount();
}

function restart(worker, code, signal) {
  console.log(
    'worker %d died (%s), restarting...', worker.process.pid, signal || code
  );
  cluster.fork();
  logWorkersCount();
}

function logWorkersCount() {
  console.log(' :: there is now %s workers', Object.keys(cluster.workers).length);
}