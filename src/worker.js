const { pid } = process;
setTimeout(() => console.log('hello from %d', pid), 500)