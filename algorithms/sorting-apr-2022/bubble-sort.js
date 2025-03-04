// time: O(n^2), space: O(1)
function bubbleSort(arr, callback) {
  for (let end = arr.length - 1; end > 0; end--) {
    let left = 0;
    let right = 1;
    while (right <= end) {
      if (callback(arr[left], arr[right]) > 0) {
        [arr[left], arr[right]] = [arr[right], arr[left]];
      }
      left++;
      right++;
    }
  }
}

const arr = [3, 2, 1, 6, 4, 3, 7, 8, 3, 1, 4, 1];
bubbleSort(arr, (a, b) => b - a);
console.log(arr);
arr.sort((a, b) => b - a);
console.log(arr);