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