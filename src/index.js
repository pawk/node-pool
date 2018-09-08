#!/usr/bin/env node

const cluster = require('cluster');
const path = require('path');
const { cpus } = require('os');

const terminal = require('./terminal');

run();

function run() {
  terminal(cluster);
  configure();
  deploy();
}

function configure() {
  const workerFile = process.argv[2] || 'src/worker/http-echo-server.js';
  console.log('worker file path: %s', workerFile)

  cluster.setupMaster({
    exec: workerFile
  });

  cluster.on('exit', handleExit);
}

function deploy() {
  console.log('forking for %d cores', cpus().length);
  const children = cpus().map(cluster.fork);
  logWorkersCount();
}

function handleExit(worker, code, signal) {
  if (!worker.exitedAfterDisconnect) {
    console.log(
      'worker %d died (%s), restarting...', worker.process.pid, signal || code
    );
    cluster.fork();
  }
  logWorkersCount();
}

function logWorkersCount() {
  console.log(' :: there is now %s workers', Object.keys(cluster.workers).length);
}