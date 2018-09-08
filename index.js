const cluster = require('cluster');
const { cpus } = require('os');

cluster.setupMaster({
  exec: 'src/worker.js'
});
cluster.on('exit', restart);

console.log('forking for %d cores', cpus().length);
const children = cpus()
  .map(cluster.fork);

function restart(worker, code, signal) {
  console.log('worker %d died (%s). restarting...',
              worker.process.pid, signal || code);
  cluster.fork();
}