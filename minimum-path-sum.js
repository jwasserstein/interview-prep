/*
Given a m x n grid filled with non-negative numbers, find a path from top left to bottom right, which minimizes the sum of all numbers along its path.

Note: You can only move either down or right at any point in time.

 

Example 1:


Input: grid = [[1,3,1],[1,5,1],[4,2,1]]
Output: 7
Explanation: Because the path 1 → 3 → 1 → 1 → 1 minimizes the sum.
Example 2:

Input: grid = [[1,2,3],[4,5,6]]
Output: 12
 

Constraints:

m == grid.length
n == grid[i].length
1 <= m, n <= 200
0 <= grid[i][j] <= 100
*/

/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function(grid) {
    const sums = grid.map(r => Array(r.length).fill(Infinity));
    sums[0][0] = grid[0][0];
    
    for(let row = 0; row < grid.length; row++){
        for(let col = 0; col < grid[row].length; col++){
            if(grid[row+1]?.[col] !== undefined && 
               (sums[row][col] + grid[row+1][col] < sums[row+1][col])){
                sums[row+1][col] = sums[row][col] + grid[row+1][col];
            }
            
            if(grid[row]?.[col+1] !== undefined && 
               (sums[row][col] + grid[row][col+1] < sums[row][col+1])){
                sums[row][col+1] = sums[row][col] + grid[row][col+1];
            }
        }
    }
    
    return sums[sums.length-1][sums[sums.length-1].length-1];
};
