/*
Given a non-negative integer numRows, generate the first numRows of Pascal's triangle.


In Pascal's triangle, each number is the sum of the two numbers directly above it.

Example:

Input: 5
Output:
[
     [1],
    [1,1],
   [1,2,1],
  [1,3,3,1],
 [1,4,6,4,1]
]
*/

/**
 * @param {number} numRows
 * @return {number[][]}
 */
var generate = function(numRows) {
    const result = [];
    for(let i = 0; i < numRows; i++){
        result[i] = [];
        result[i][0] = 1;
        result[i][i] = 1;
        for(let j = 1; j < i; j++){
            result[i][j] = result[i-1][j-1] + result[i-1][j];
        }
    }
    return result;
};

/**
 * @param {number} numRows
 * @return {number[][]}
 */
var generate = function(numRows) {
    const out = [[1]];
    for(let i = 1; i < numRows; i++) {
      let rowLength = i + 1;
      const row = [];
      for(let j = 0; j < rowLength; j++) {
        if (j === 0 || j === rowLength - 1) {
          row.push(1);
        } else {
          row.push(out[i-1][j-1] + out[i-1][j]);
        }   
      }
      out.push(row);
    }
    return out;
  };