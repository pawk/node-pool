const { fork, setupMaster } = require('cluster');
const { cpus } = require('os');

setupMaster({
  exec: 'src/worker.js'
});

console.log('forking for %d cores', cpus().length);
const children = cpus().map(fork);
