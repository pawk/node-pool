const cluster = require('cluster');

module.exports = {
  fork: function() {
    const worker = cluster.fork();
    console.log('new worker (%d) spawned', worker.id);
    return worker;
  },
  scale: function (cluster) {

  }
}