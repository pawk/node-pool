const { isMaster, fork, disconnect, setupMaster } = require('cluster');
const { cpus } = require('os');

setupMaster({
  exec: 'src/worker.js'
});

console.log('forking for %d cores', cpus().length);
const children = cpus()
  .map(fork)
  //.map(child => child.stdout.pipe(process.stdout));

console.log(children[0])
