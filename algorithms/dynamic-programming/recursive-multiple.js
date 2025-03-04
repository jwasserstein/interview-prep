/*
Write a recursive function to multple two positive integers without using the * operator.
You can use addition, subtraction, and bit shifting, but you should minimize the number of
those operations
*/
function recursiveMultiply(a, b) {
  if (b === 1) return a;
  if (a === 1) return b;
  return recursiveMultiply(a, b - 1) + a;
}

function recursiveMultiply2(a, b) {
  if (a === 1) return b;
  if (b === 1) return a;

  const smaller = Math.min(a, b);
  const bigger = Math.max(a, b);

  if (smaller % 2 === 0) {
    const halfProduct = recursiveMultiply2(bigger, smaller / 2);
    return halfProduct + halfProduct;
  } else {
    const halfProduct = recursiveMultiply2(bigger, (smaller - 1) / 2);
    return halfProduct + halfProduct + bigger;
  }
}

for (let i = 1; i < 100; i++) {
  for (let j = 1; j < 100; j++) {
    if (i * j !== recursiveMultiply2(i, j) || i * j !== recursiveMultiply2(j, i)) {
      throw new Error(`Fails for inputs i: ${i}, j: ${j}`);
    }
  }
}
