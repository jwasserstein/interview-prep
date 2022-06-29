/*
Given an m x n matrix, return all elements of the matrix in spiral order.

 

Example 1:


Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
Output: [1,2,3,6,9,8,7,4,5]
Example 2:


Input: matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
Output: [1,2,3,4,8,12,11,10,9,5,6,7]
 

Constraints:

m == matrix.length
n == matrix[i].length
1 <= m, n <= 10
-100 <= matrix[i][j] <= 100
*/

/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
 var spiralOrder = function(matrix) {
    let out = [matrix[0][0]];
    
    let left = 0, right = matrix[0].length-1;
    let top = 0, bottom = matrix.length-1;
    
    let row = 0, col = 0;
    for(let i = 0; i < matrix.length*matrix[0].length; i++){
        while(col < right){
            col++;
            out.push(matrix[row][col]);
        }
        top++;
        if(bottom <= row) break;

        while(row < bottom){
            row++;
            out.push(matrix[row][col]);
        }
        right--;
        if(col <= left) break;

        while(col > left){
            col--;
            out.push(matrix[row][col]);
        }
        bottom--;
        if(row <= top) break;

        while(row > top){
            row--;
            out.push(matrix[row][col]);
        }
        left++;
        if(right <= col) break;
    }
    
    return out;
};

/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function(matrix) {
    const out = [];
    
    let left = 0;
    let right = matrix[0].length-1;
    let bottom = matrix.length-1;
    let top = 0;
  
    while (right >= left && bottom >= top) {
      for (let col = left; bottom >= top && col <= right; col++) {
        out.push(matrix[top][col]);
      }
      top++;
      
      for (let row = top; right >= left && row <= bottom; row++) {
        out.push(matrix[row][right]);
      }
      right--;
  
      for (let col = right; bottom >= top && col >= left; col--) {
        out.push(matrix[bottom][col]);
      }
      bottom--;
      
      for (let row = bottom; right >= left && row >= top; row--) {
        out.push(matrix[row][left]);
      }
      left++;
  
    }
      
    return out;
};

/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function(matrix) {
  let top = 0;
  let right = matrix[0].length - 1;
  let bottom = matrix.length - 1;
  let left = 0;
  
  const out = [];
  
  let row = 0;
  let col = -1;
  
  while (left <= right || top <= bottom) {
    // left to right
    while (col < right && top <= bottom) {
      col++;
      out.push(matrix[row][col]);
    }
    top++;

    // top to bottom
    while (row < bottom && left <= right) {
      row++;
      out.push(matrix[row][col]);
    }
    right--;

    // right to left
    while (col > left && top <= bottom) {
      col--;
      out.push(matrix[row][col]);
    }
    bottom--;

    // bottom to top
    while (row > top && left <= right) {
      row--;
      out.push(matrix[row][col]);
    }
    left++;
  }

  return out;
};
