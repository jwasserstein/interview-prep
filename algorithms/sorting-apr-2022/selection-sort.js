// time: O(n^2), space: O(1)
function selectionSort(arr, callback) {
  for (let i = 0; i < arr.length - 1; i++) {
    let min = arr[i];
    let minIdx = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (callback(arr[j], min) < 0) {
        min = arr[j];
        minIdx = j;
      }
    }
    [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
  }
}

const arr = [3, 2, 1, 6, 4, 3, 7, 8, 3, 1, 4, 1];
selectionSort(arr, (a, b) => a - b);
console.log(arr);
arr.sort((a, b) => a - b);
console.log(arr);