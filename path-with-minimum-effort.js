/*

You are a hiker preparing for an upcoming hike. You are given heights, a 2D array of size rows x columns, where heights[row][col] represents the height of cell (row, col). You are situated in the top-left cell, (0, 0), and you hope to travel to the bottom-right cell, (rows-1, columns-1) (i.e., 0-indexed). You can move up, down, left, or right, and you wish to find a route that requires the minimum effort.

A route's effort is the maximum absolute difference in heights between two consecutive cells of the route.

Return the minimum effort required to travel from the top-left cell to the bottom-right cell.

 

Example 1:



Input: heights = [[1,2,2],[3,8,2],[5,3,5]]
Output: 2
Explanation: The route of [1,3,5,3,5] has a maximum absolute difference of 2 in consecutive cells.
This is better than the route of [1,2,2,2,5], where the maximum absolute difference is 3.
Example 2:



Input: heights = [[1,2,3],[3,8,4],[5,3,5]]
Output: 1
Explanation: The route of [1,2,3,4,5] has a maximum absolute difference of 1 in consecutive cells, which is better than route [1,3,5,3,5].
Example 3:


Input: heights = [[1,2,1,1,1],[1,2,1,2,1],[1,2,1,2,1],[1,2,1,2,1],[1,1,1,2,1]]
Output: 0
Explanation: This route does not require any effort.
 

Constraints:

rows == heights.length
columns == heights[i].length
1 <= rows, columns <= 100
1 <= heights[i][j] <= 106

*/

/**
 * @param {number[][]} heights
 * @return {number}
 */
var minimumEffortPath = function(heights) {
  const rows = heights.length;
  const cols = heights[0].length;
  if (rows === 1 && cols === 1) return 0;
  
  const visited = heights.map(row => row.map(() => false));
  const efforts = heights.map(row => row.map(() => Infinity));
  efforts[0][0] = 0;
  const pQueue = new MinPriorityQueue();
  pQueue.enqueue([0, 0], 0);
  const directions = [[0, -1], [-1, 0], [0, 1], [1, 0]];
  
  while (pQueue.size() > 0) {
    const [row, col] = pQueue.dequeue().element;
    
    if (visited[row][col]) continue;
    visited[row][col] = true;
    
    for (let i = 0; i < directions.length; i++) {
      const nextRow = row + directions[i][0];
      const nextCol = col + directions[i][1];
      
      if (nextRow < 0 || nextRow >= rows) continue;
      if (nextCol < 0 || nextCol >= cols) continue;
      
      const heightDifference = Math.abs(heights[row][col] - heights[nextRow][nextCol]);
      const effort = Math.max(efforts[row][col], heightDifference);
      efforts[nextRow][nextCol] = Math.min(efforts[nextRow][nextCol], effort);
      
      pQueue.enqueue([nextRow, nextCol], efforts[nextRow][nextCol]);
    }
  }
  
  return efforts[rows-1][cols-1];
};
