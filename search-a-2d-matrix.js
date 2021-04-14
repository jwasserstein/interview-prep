/*
Write an efficient algorithm that searches for a value in an m x n matrix. This matrix has the following properties:

Integers in each row are sorted from left to right.
The first integer of each row is greater than the last integer of the previous row.
 

Example 1:


Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3
Output: true
Example 2:


Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13
Output: false
 

Constraints:

m == matrix.length
n == matrix[i].length
1 <= m, n <= 100
-104 <= matrix[i][j], target <= 104
*/

/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
 var searchMatrix = function(matrix, target) {
    let top = 0, bottom = matrix.length-1;
    while(bottom - top > 1){
        let guess = Math.round((bottom + top)/2);
        if(matrix[guess][0] > target){
            bottom = guess;
        } else if (matrix[guess][0] < target){
            top = guess;
        } else {
            return true;
        }
    }
    if(matrix[top][0] === target || matrix[bottom][0] === target) return true;
    
    const row = target < matrix[bottom][0] ? top : bottom;
    let left = 0, right = matrix[row].length-1;
    while(right - left > 1){
        let guess = Math.round((right + left)/2);
        if(matrix[row][guess] > target){
            right = guess;
        } else if (matrix[row][guess] < target){
            left = guess;
        } else {
            return true;
        }
    }
    
    return matrix[row][left] === target || matrix[row][right] === target;
};