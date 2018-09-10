const cluster = require('cluster');

module.exports = { countWorkers };

function countWorkers() {
  return Reflect.ownKeys(cluster.workers).length;
}
