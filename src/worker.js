const { pid } = process;

console.log('hello from %d', pid);

const rand = Math.random();

if (rand < 0.5) {
  console.log('worker %d will now throw!', pid);
  throw Error();
}
