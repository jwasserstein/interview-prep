function mergeSort(arr, callback) {
  if (arr.length === 1) return arr;

  const halfIdx = Math.round((arr.length-1) / 2);
  const left = arr.slice(0, halfIdx);
  const right = arr.slice(halfIdx, arr.length);

  const sortedLeft = mergeSort(left, callback);
  const sortedRight = mergeSort(right, callback);

  const out = [];
  let l = 0;
  let r = 0;
  while (l < sortedLeft.length || r < sortedRight.length) {
    if (r >= sortedRight.length || (l < sortedLeft.length && callback(sortedLeft[l], sortedRight[r]) < 0)) {
      out.push(sortedLeft[l]);
      l++;
    } else {
      out.push(sortedRight[r]);
      r++;
    }
  }

  return out;
}

const arr = [3, 2, 1, 6, 4, 3, 7, 8, 3, 1, 4, 1];
console.log(mergeSort(arr, (a, b) => a - b));
arr.sort((a, b) => a - b);
console.log(arr);