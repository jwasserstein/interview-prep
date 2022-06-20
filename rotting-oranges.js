/*

You are given an m x n grid where each cell can have one of three values:

0 representing an empty cell,
1 representing a fresh orange, or
2 representing a rotten orange.
Every minute, any fresh orange that is 4-directionally adjacent to a rotten orange becomes rotten.

Return the minimum number of minutes that must elapse until no cell has a fresh orange. If this is impossible, return -1.

 

Example 1:


Input: grid = [[2,1,1],[1,1,0],[0,1,1]]
Output: 4
Example 2:

Input: grid = [[2,1,1],[0,1,1],[1,0,1]]
Output: -1
Explanation: The orange in the bottom left corner (row 2, column 0) is never rotten, because rotting only happens 4-directionally.
Example 3:

Input: grid = [[0,2]]
Output: 0
Explanation: Since there are already no fresh oranges at minute 0, the answer is just 0.
 

Constraints:

m == grid.length
n == grid[i].length
1 <= m, n <= 10
grid[i][j] is 0, 1, or 2.

*/

/**
 * @param {number[][]} grid
 * @return {number}
 */
var orangesRotting = function(grid) {
  const queue = [];
  let freshCount = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      switch(grid[i][j]) {
        case 2:
          queue.push([i, j]);
          break;
        case 1:
          freshCount++;
          break;
      }
    }
  }
  queue.push(null);
  
  let counter = 0;
  while (queue.length > 1) {
    const orange = queue.shift();
    if (orange === null) {
      counter++;
      queue.push(null);
      continue;
    }
    const [rottenRow, rottenCol] = orange;
    if (rottenRow > 0 && grid[rottenRow-1][rottenCol] === 1) {
      grid[rottenRow-1][rottenCol] = 2;
      queue.push([rottenRow-1, rottenCol]);
      freshCount--;
    }
    if (rottenRow < grid.length-1 && grid[rottenRow+1][rottenCol] === 1) {
      grid[rottenRow+1][rottenCol] = 2;
      queue.push([rottenRow+1, rottenCol]);
      freshCount--;
    }
    if (rottenCol > 0 && grid[rottenRow][rottenCol-1] === 1) {
      grid[rottenRow][rottenCol-1] = 2;
      queue.push([rottenRow, rottenCol-1]);
      freshCount--;
    }
    if (rottenCol < grid[rottenRow].length-1 && grid[rottenRow][rottenCol+1] === 1) {
      grid[rottenRow][rottenCol+1] = 2;
      queue.push([rottenRow, rottenCol+1]);
      freshCount--;
    }
  }
  
  return freshCount === 0 ? counter : -1;
};
