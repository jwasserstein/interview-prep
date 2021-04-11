/*
Given a positive integer n, generate an n x n matrix filled with elements from 1 to n2 in spiral order.

 

Example 1:


Input: n = 3
Output: [[1,2,3],[8,9,4],[7,6,5]]
Example 2:

Input: n = 1
Output: [[1]]
 

Constraints:

1 <= n <= 20
*/

/**
 * @param {number} n
 * @return {number[][]}
 */
 var generateMatrix = function(n) {
    const matrix = new Array(n).fill(1).map(() => new Array(n).fill(1));
    
    let left = 0, right = n-1;
    let top = 0, bottom = n-1;
    let row = 0, col = 0;
    let i = 1;
    while(i < n**2){
        while(col < right){
            i++;
            col++;
            matrix[row][col] = i;
        }
        top++;
        
        while(row < bottom){
            i++;
            row++;
            matrix[row][col] = i;
        }
        right--;
        
        while(col > left){
            i++;
            col--;
            matrix[row][col] = i;
        }
        bottom--;
        
        while(row > top){
            i++;
            row--;
            matrix[row][col] = i;
        }
        left++;
    }
    
    return matrix;
};