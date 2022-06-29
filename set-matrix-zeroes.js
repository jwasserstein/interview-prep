/*
Given an m x n matrix. If an element is 0, set its entire row and column to 0. Do it in-place.

Follow up:

A straight forward solution using O(mn) space is probably a bad idea.
A simple improvement uses O(m + n) space, but still not the best solution.
Could you devise a constant space solution?
 

Example 1:


Input: matrix = [[1,1,1],[1,0,1],[1,1,1]]
Output: [[1,0,1],[0,0,0],[1,0,1]]
Example 2:


Input: matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]
Output: [[0,0,0,0],[0,4,5,0],[0,3,1,0]]
 

Constraints:

m == matrix.length
n == matrix[0].length
1 <= m, n <= 200
-231 <= matrix[i][j] <= 231 - 1
*/

/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
 var setZeroes = function(matrix) {
    const rowZero = new Set(), colZero = new Set();
    for(let row = 0; row < matrix.length; row++){
        for(let col = 0; col < matrix[row].length; col++){
            if(matrix[row][col] === 0) {
                rowZero.add(row);
                colZero.add(col);
            }
        }
    }
    
    for(let row of rowZero){
        for(let col = 0; col < matrix[row].length; col++){
            matrix[row][col] = 0;
        }
    }
    for(let col of colZero){
        for(let row = 0; row < matrix.length; row++){
            matrix[row][col] = 0;
        }
    }
};

/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
 var setZeroesString = function(matrix) {
    for(let row = 0; row < matrix.length; row++){
        for(let col = 0; col < matrix[row].length; col++){
            if(+matrix[row][col] === 0) {
                for(let thisRow = 0; thisRow < matrix.length; thisRow++){
                    matrix[thisRow][col] = String(matrix[thisRow][col]);
                }
                for(let thisCol = 0; thisCol < matrix[row].length; thisCol++){
                    matrix[row][thisCol] = String(matrix[row][thisCol]);
                }
            }
        }
    }
    
    for(let row = 0; row < matrix.length; row++){
        for(let col = 0; col < matrix[row].length; col++){
            if(typeof matrix[row][col] === 'string') {
                matrix[row][col] = 0;
            }
        }
    }
};

/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
 var setZeroesFirstRowCol = function(matrix) {
    let zeroFirstCol = false;
    for(let row = 0; row < matrix.length; row++){
        if(matrix[row][0] === 0) zeroFirstCol = true;
    }
    let zeroFirstRow = false;
    for(let col = 0; col < matrix[0].length; col++){
        if(matrix[0][col] === 0) zeroFirstRow = true;
    }
    
    for(let row = 1; row < matrix.length; row++){
        for(let col = 1; col < matrix[row].length; col++){
            if(matrix[row][col] === 0) {
                matrix[0][col] = 0;
                matrix[row][0] = 0;
            }
        }
    }
    
    for(let row = 1; row < matrix.length; row++){
        if(matrix[row][0] !== 0) continue;
        
        for(let col = 1; col < matrix[row].length; col++){
            matrix[row][col] = 0;
        }
    }
    
    for(let col = 1; col < matrix[0].length; col++){
        if(matrix[0][col] !== 0) continue;
        
        for(let row = 1; row < matrix.length; row++){
            matrix[row][col] = 0;
        }
    }
    
    if(zeroFirstCol){
        for(let row = 0; row < matrix.length; row++){
            matrix[row][0] = 0;
        }
    }
    if(zeroFirstRow){
        for(let col = 0; col < matrix[0].length; col++){
            matrix[0][col] = 0;
        }
    }
};

/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var setZeroes = function(matrix) {
    let zeroFirstRow = matrix[0].includes(0);
    let zeroFirstCol = matrix.map(row => row[0]).includes(0);
  
    for (let row = 1; row < matrix.length; row++) {
      for (let col = 1; col < matrix[row].length; col++) {
        if (matrix[row][col] === 0) {
          matrix[0][col] = 0;
          matrix[row][0] = 0;
        }
      }
    }
    
    for (let row = 1; row < matrix.length; row++) {
      if (matrix[row][0] === 0) {
        for (let col = 1; col < matrix[row].length; col++) {
          matrix[row][col] = 0;
        }
      }
    }
    for (let col = 1; col < matrix[0].length; col++) {
      if (matrix[0][col] === 0) {
        for (let row = 1; row < matrix.length; row++) {
          matrix[row][col] = 0;
        }
      }
    }
  
    if (zeroFirstCol) {
      for (let row = 0; row < matrix.length; row++) {
        matrix[row][0] = 0;
      }
    }
    if (zeroFirstRow) {
      for (let col = 0; col < matrix[0].length; col++) {
        matrix[0][col] = 0;
      }
    }
};
  