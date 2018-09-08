const { isMaster, fork, disconnect } = require('cluster');
const { cpus } = require('os');

if (isMaster) {
  console.log('forking for %d cores', cpus().length);
  const children = cpus().map(fork);
} else {
  const { pid } = process;
  setTimeout(() => console.log('hello from %d', pid), 500)
}