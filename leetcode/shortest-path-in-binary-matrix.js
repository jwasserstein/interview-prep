/*
Given an n x n binary matrix grid, return the length of the shortest clear path in the matrix. If there is no clear path, return -1.

A clear path in a binary matrix is a path from the top-left cell (i.e., (0, 0)) to the bottom-right cell (i.e., (n - 1, n - 1)) such that:

All the visited cells of the path are 0.
All the adjacent cells of the path are 8-directionally connected (i.e., they are different and they share an edge or a corner).
The length of a clear path is the number of visited cells of this path.

 

Example 1:


Input: grid = [[0,1],[1,0]]
Output: 2
Example 2:


Input: grid = [[0,0,0],[1,1,0],[1,1,0]]
Output: 4
Example 3:

Input: grid = [[1,0,0],[1,1,0],[1,1,0]]
Output: -1
 

Constraints:

n == grid.length
n == grid[i].length
1 <= n <= 100
grid[i][j] is 0 or 1
*/

/**
 * @param {number[][]} grid
 * @return {number}
 */
 var shortestPathBinaryMatrix = function(grid) {
    if(grid[0][0] === 1 || grid[grid.length-1][grid[grid.length-1].length-1] === 1) return -1;
    
    const costs = grid.map(r => r.map(() => Infinity));
    costs[0][0] = 1;
    
    const directions = [
        [0,1],
        [1,1],
        [1,0],
        [1,-1],
        [0,-1],
        [-1,-1],
        [-1,0],
        [-1,1],
    ];

    const visited = new Set();
    const elements = [[0,0]];
    while(elements.length > 0){
        const [row, col] = elements.shift();
        
        const stringElement = `${row},${col}`;
        if(visited.has(stringElement)) continue;
        
        visited.add(stringElement);
        for(let i = 0; i < directions.length; i++){
            const nextRow = directions[i][0] + row;
            const nextCol = directions[i][1] + col;
            
            if(grid[nextRow]?.[nextCol] === undefined ||
                grid[nextRow][nextCol] === 1) continue;
            
            if(!visited.has(`${nextRow},${nextCol}`)) elements.push([nextRow, nextCol]);
            
            costs[nextRow][nextCol] = Math.min(costs[nextRow][nextCol], costs[row][col] + 1);
        }
    }
    
    const minCost = costs[costs.length-1][costs[costs.length-1].length-1];
    return minCost !== Infinity ? minCost : -1;
};

/**
 * @param {number[][]} grid
 * @return {number}
 */
var shortestPathBinaryMatrix = function(grid) {
  if (grid[0][0] === 1 || grid[grid.length-1][grid[0].length-1] === 1) return -1;
  
  const distances = grid.map(row => row.map(() => Infinity));
  distances[0][0] = 1;
  const visited = grid.map(row => row.map(() => false));
  visited[0][0] = true;
  const queue = [[0, 0]];
  
  const directions = [[-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1]];
  
  while (queue.length > 0) {
    const [row, col] = queue.pop();

    for (let i = 0; i < directions.length; i++) {
      const [drow, dcol] = directions[i];
      const nextRow = row + drow;
      const nextCol = col + dcol;
      
      if (nextRow >= 0 && nextRow < grid.length && nextCol >= 0 && nextCol < grid[row].length) {
        distances[nextRow][nextCol] = Math.min(distances[nextRow][nextCol], distances[row][col] + 1);
        
        if (!visited[nextRow][nextCol] && grid[nextRow][nextCol] === 0) {
          queue.unshift([nextRow, nextCol]);
          visited[nextRow][nextCol] = true;
        }
      }
    }
  }
  
  const result = distances[distances.length-1][distances[0].length-1];
  return result === Infinity ? -1 : result;
};

/**
 * @param {number[][]} grid
 * @return {number}
 */
var shortestPathBinaryMatrix = function(grid) {
  const n = grid.length;
  if (grid[0][0] === 1 || grid[n-1][n-1] === 1) return -1;
  
  const visited = grid.map(row => row.map(() => false));
  visited[0][0] = true;
  const output = grid.map(row => row.map(() => Infinity));
  output[0][0] = 1;
  const queue = [[0, 0]];
  const directions = [[0, -1], [-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1]];
  
  while (queue.length > 0) {
    const [row, col] = queue.pop();
    
    if (grid[row][col] === 1) continue;
    
    for (let i = 0; i < directions.length; i++) {
      const newRow = row + directions[i][0];
      const newCol = col + directions[i][1];
      
      if (newRow < 0 || newRow >= n) continue; // check row bounds
      if (newCol < 0 || newCol >= n) continue; // check column bounds
      
      if (grid[newRow][newCol] === 0) {
        output[newRow][newCol] = Math.min(output[newRow][newCol], output[row][col] + 1);
        if (!visited[newRow][newCol]) {
          visited[newRow][newCol] = true;
          queue.unshift([newRow, newCol]);
        }
      }
    }
  }
  
  if (output[n-1][n-1] === Infinity) {
    return -1;
  } else {
    return output[n-1][n-1];
  }
};

/**
 * @param {number[][]} grid
 * @return {number}
 */
var shortestPathBinaryMatrix = function(grid) {
  if (grid[0][0] === 1) return -1;
  const n = grid.length;
  const pathLength = grid.map(row => row.map(() => Infinity));
  pathLength[0][0] = 1;
  const visited = grid.map(row => row.map(() => false));
  visited[0][0] = true;
  const queue = [[0, 0]]; // enqueue -> [...] -> dequeue
  const directions = [
    [-1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
    [0, -1],
    [-1, -1]
  ];
  
  while (queue.length > 0) {
    const [row, col] = queue.pop();
    
    for (let i = 0; i < directions.length; i++) {
      const newRow = row + directions[i][0];
      const newCol = col + directions[i][1];
      
      if (newRow < 0 || newRow >= n) continue;
      if (newCol < 0 || newCol >= n) continue;
      if (grid[newRow][newCol] === 1) continue;
      
      pathLength[newRow][newCol] = Math.min(
        pathLength[newRow][newCol],
        pathLength[row][col] + 1,
      );
      
      if (!visited[newRow][newCol]) {
        queue.unshift([newRow, newCol]);
        visited[newRow][newCol] = true;
      }
    }
  }
  
  if (pathLength[n-1][n-1] === Infinity) {
    return -1;
  } else {
    return pathLength[n-1][n-1];
  }
};
