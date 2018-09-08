const { pid } = process;

console.log('hello from %d', pid);

const rand = Math.random();

if (rand < 0.5) {
  console.log(rand)
  process.exit(2)
}