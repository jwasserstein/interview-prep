// time: O(n^2), space: O(1)
function insertionSort(arr, callback) {
  for (let i = 1; i < arr.length; i++) {
    let j = i;
    while (j > 0 && callback(arr[j], arr[j-1]) < 0) {
      [arr[j], arr[j-1]] = [arr[j-1], arr[j]];
      j--;
    }
  }
}

const arr = [3, 2, 1, 6, 4, 3, 7, 8, 3, 1, 4, 1];
insertionSort(arr, (a, b) => a - b);
console.log(arr);
arr.sort((a, b) => a - b);
console.log(arr);
