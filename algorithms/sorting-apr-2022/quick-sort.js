function quickSort(arr, callback) {
  if (arr.length <= 1) return arr;
  if (arr.length === 2) return callback(arr[0], arr[1]) < 0 ? [arr[0], arr[1]] : [arr[1], arr[0]];

  let pivot = arr.length-1;
  let l = 0;
  let r = pivot - 1;

  while (l < r) {
    while (l < r && callback(arr[l], arr[pivot]) <= 0) l++;
    while (r > l && callback(arr[r], arr[pivot]) >= 0) r--;
    [arr[l], arr[r]] = [arr[r], arr[l]];
  }
  
  if (callback(arr[pivot], arr[r]) < 0) {
    [arr[pivot], arr[r]] = [arr[r], arr[pivot]];
    [pivot, r] = [r, pivot];
  }

  return [...quickSort(arr.slice(0, pivot), callback), arr[pivot], ...quickSort(arr.slice(pivot+1, arr.length), callback)];
}

const arr = [3, 2, 1, 6, 4, 3, 7, 8, 3, 1, 4, 1];
console.log(quickSort(arr, (a, b) => a - b));
arr.sort((a, b) => a - b);
console.log(arr);
  