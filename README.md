# Nodead

Features:
 * run a cluster,
 * orchestrate workers pool (add, remove, scale workers group),
 * keep the workers group of fixed size - workers disaster recovery

## Install

```
git clone git@github.com:pawk/node-pool.git
```

There are no dependencies for this project.

## Run

```
node src/index.js [worker/file/path]
```

## Application commands

#### `ls`

lists all the workers

#### `fork`

forks cluster with another worker

#### `scale [size]`

Autoscales workers group to desired size

#### `kill [num]`

kills worker denoted by `num` parameter

#### `exit`

exits from the application
