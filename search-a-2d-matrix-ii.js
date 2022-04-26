/*
Write an efficient algorithm that searches for a value target in an m x n integer matrix matrix. This matrix has the following properties:

Integers in each row are sorted in ascending from left to right.
Integers in each column are sorted in ascending from top to bottom.
 

Example 1:


Input: matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 5
Output: true
Example 2:


Input: matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 20
Output: false
 

Constraints:

m == matrix.length
n == matrix[i].length
1 <= n, m <= 300
-109 <= matrix[i][j] <= 109
All the integers in each row are sorted in ascending order.
All the integers in each column are sorted in ascending order.
-109 <= target <= 109
*/

/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function(matrix, target) {
  let rowRange = [0, 0];
  let colRange = [0, 0];
  for (let i = 0; i < matrix.length; i++) {
    if (matrix[i][0] <= target && matrix[i][matrix[i].length-1] >= target) {
      rowRange[0] = Math.min(rowRange[0], i);
      rowRange[1] = Math.max(rowRange[1], i);
    } else if (rowRange[0] !== 0) {
      break;
    }
  }
  for (let i = 0; i < matrix[0].length; i++) {
    if (matrix[0][i] <= target && matrix[matrix.length-1][i] >= target) {
      colRange[0] = Math.min(colRange[0], i);
      colRange[1] = Math.max(colRange[1], i);
    } else if (colRange[0] !== 0) {
      break;
    }
  }
  
  for (let i = rowRange[0]; i <= rowRange[1]; i++) {
    if (binaryTargetSearch(matrix[i], colRange[0], colRange[1], target)) {
      return true;
    }
  }
  
  return false;
};

function binaryTargetSearch(row, start, end, target) {
  let left = start;
  let right = end;
  
  if (target < row[left] || target > row[right]) return false;
  if (target === row[left] || target === row[right]) return true;
  
  while (right - left > 1) {
    const guess = Math.round((left + right) / 2);
    if (row[guess] === target) {
      return true;
    } else if (row[guess] > target) {
      right = guess;
    } else {
      left = guess;
    }
  }
  if (target === row[left] || target === row[right]) return true;

  return false;
}

/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function(matrix, target) {
  let row = 0;
  let col = matrix[0].length-1;
  
  while (row < matrix.length && col >= 0) {
    if (matrix[row][col] === target) {
      return true;
    } else if (matrix[row][col] > target) {
      col--;
    } else {
      row++;
    }
  }
  
  return false;
};
