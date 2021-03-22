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