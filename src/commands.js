const cluster = require('cluster');

const { countWorkers } = require('./utils');

module.exports = {
  fork,
  scale
};

function fork() {
  const worker = cluster.fork();
  console.log('-> new worker (%d) spawned', worker.id);
  return worker;
}

function scale(num) {
  const count = countWorkers();
  if (Number.isNaN(parseInt(num))) {
    console.log('usage: scale [num]\n');
    return;
  }
  if (num > count) {
    [...Array(num - count)].forEach(cluster.fork)
  } else if (num < count) {
    [...Array(count - num)].forEach(() => {
      const key = Reflect.ownKeys(cluster.workers)[0];
      cluster.workers[key].kill();
    })
  }
}

